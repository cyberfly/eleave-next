"use server";

import { desc, asc, and, eq, isNull } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { users, leave_applications } from "@/lib/db/schema";
import { getUser } from "@/lib/db/queries";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { alias } from "drizzle-orm/pg-core";

const approver = alias(users, "approver");

const LeaveApplicationFormRequest = z.object({
  leave_type: z.string().min(1, "Leave type is required"),
  description: z.string().min(1, "Description is required"),
  start_date: z.string().date().min(1, "Start Date is required"),
  end_date: z.string().date().min(1, "End Date is required"),
});

const LeaveApprovalFormRequest = z.object({
  status: z.string().min(1, "Status is required"),
  remark: z.string().min(1, "Remark is required"),
  leave_application_id: z.string().min(1, "leave_application_id is required"),
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
    .leftJoin(users, eq(leave_applications.userId, users.id))
    .leftJoin(approver, eq(leave_applications.approvalBy, approver.id))
    .where(eq(leave_applications.userId, user.id))
    .orderBy(desc(leave_applications.createdAt));

  return result.length > 0 ? result : null;
}

export async function storeLeaveApplication(
  prevState: any,
  formData: FormData
) {
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

    // return this object to show errors in the UI
    // also shown back the previous form data

    return {
      success: false,
      errors: validate_result.error.flatten().fieldErrors,
      data: leave_data,
    };
  }

  const latest_leave = await db
    .insert(leave_applications)
    .values(leave_data)
    .returning();

  console.log("Leave application stored:", latest_leave);

  revalidatePath("/dashboard/leaves");
  redirect("/dashboard/leaves");
}

export async function getMemberLeaveApplications() {
  console.log("Fetching member leave applications...");

  const user = await getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const status = "pending";

  const result = await db
    .select()
    .from(leave_applications)
    .leftJoin(users, eq(leave_applications.userId, users.id))
    .leftJoin(approver, eq(leave_applications.approvalBy, approver.id))
    .where(and(eq(users.role, "member"), eq(leave_applications.status, status)))
    .orderBy(asc(leave_applications.createdAt));

  return result.length > 0 ? result : null;
}

export async function storeLeaveApproval(prevState: any, formData: FormData) {
  console.log("Storing leave approval...");

  console.log("formData", formData);

  const user = await getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const status = formData.get("status") as string;
  const remark = formData.get("remark") as string;
  const leave_application_id = formData.get("leave_application_id") as string;

  const form_payload = {
    status: status,
    remark: remark,
    leave_application_id: leave_application_id,
  };

  const validate_result = LeaveApprovalFormRequest.safeParse(form_payload);

  if (!validate_result.success) {
    console.error("Validation errors:", validate_result.error.errors);

    // return this object to show errors in the UI
    // also shown back the previous form data

    return {
      success: false,
      errors: validate_result.error.flatten().fieldErrors,
      data: form_payload,
    };
  }

  // on succes, update the leave application status

  const update_payload = {
    status: status,
    approvalBy: user.id,
  };

  await db
    .update(leave_applications)
    .set(update_payload)
    .where(eq(leave_applications.id, leave_application_id));

  revalidatePath("/dashboard/leave_approvals");
  redirect("/dashboard/leave_approvals");
}
