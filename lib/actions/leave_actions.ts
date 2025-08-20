"use server";

import { desc, and, eq, isNull } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { users, leave_applications } from "@/lib/db/schema";
import { getUser } from "@/lib/db/queries";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const LeaveApplicationFormRequest = z.object({
  leave_type: z.string().min(1, "Leave type is required"),
  description: z.string().min(1, "Description is required"),
  start_date: z.string().date().min(1, "Start Date is required"),
  end_date: z.string().date().min(1, "End Date is required"),
});

export async function getUserLeaves() {
  console.log("Fetching user leaves...");

  const user = await getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const result = await db
    .select()
    .from(leave_applications)
    .where(eq(leave_applications.userId, user.id));

  return result.length > 0 ? result : null;
}

export async function storeLeaveApplication(formData: FormData) {
  console.log("Storing leave application...");

  const user = await getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const leave_type = formData.get("leave_type") as string;
  const description = formData.get("description") as string;
  const start_date = formData.get("start_date") as string;
  const end_date = formData.get("end_date") as string;

  const leave_data = {
    leave_type: leave_type,
    description: description,
    start_date: start_date,
    end_date: end_date,
    userId: user.id,
  };

  //   validate form data

  const validate_result = LeaveApplicationFormRequest.safeParse(leave_data);

  if (!validate_result.success) {
    console.error("Validation errors:", validate_result.error.errors);
    return;
  }

  const latest_leave = await db
    .insert(leave_applications)
    .values(leave_data)
    .returning();

  console.log("Leave application stored:", latest_leave);

  revalidatePath("/dashboard/leaves");
  redirect("/dashboard/leaves");
}
