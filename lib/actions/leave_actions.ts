import { desc, and, eq, isNull } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { users, leave_applications } from '@/lib/db/schema';
import { getUser } from "@/lib/db/queries";

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
