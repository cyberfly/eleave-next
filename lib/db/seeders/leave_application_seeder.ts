import { db } from "@/lib/db/drizzle";
import { desc, and, eq, isNull } from "drizzle-orm";
import { users, leave_applications } from "@/lib/db/schema";

async function seedLeaveApplications() {
  console.log("Seeding leave applications...");

  // fetch users with role 'member'

  const members = await db.select().from(users).where(eq(users.role, "member"));
  const managers = await db
    .select()
    .from(users)
    .where(eq(users.role, "manager"));

  //   console.log("members", members);
  //   console.log("managers", managers);

  const getRandomManagerId = () => {
    const randomIndex = Math.floor(Math.random() * managers.length);
    return managers[randomIndex].id;
  };

  //  loop each memnber and create a leave application

  for (const member of members) {
    // console.log('member', member);

    const leave_applications_data = [
      {
        description: "balik kampung",
        start_date: "2023-10-01",
        end_date: "2023-10-05",
        status: "pending",
        leave_type: "annual",
        userId: member.id,
        approvalBy: null,
      },
      {
        description: "oversea",
        start_date: "2023-11-01",
        end_date: "2023-11-05",
        status: "pending",
        leave_type: "annual",
        userId: member.id,
        approvalBy: null,
      },
      {
        description: "kenduri",
        start_date: "2023-12-01",
        end_date: "2023-12-05",
        status: "pending",
        leave_type: "annual",
        userId: member.id,
        approvalBy: null,
      },
      {
        description: "school holiday",
        start_date: "2023-12-11",
        end_date: "2023-12-11",
        status: "pending",
        leave_type: "annual",
        userId: member.id,
        approvalBy: null,
      },
      {
        description: "demam",
        start_date: "2023-12-31",
        end_date: "2023-12-31",
        status: "approved",
        leave_type: "medical",
        userId: member.id,
        approvalBy: getRandomManagerId(),
      },
      {
        description: "demam",
        start_date: "2024-01-31",
        end_date: "2024-01-31",
        status: "rejected",
        leave_type: "medical",
        userId: member.id,
        approvalBy: getRandomManagerId(),
      },
    ];

    console.log("leave_applications_data", leave_applications_data);

    for (const leave_row of leave_applications_data) {
      const leave_application = await db
        .insert(leave_applications)
        .values(leave_row)
        .returning();
    }
  }
}

seedLeaveApplications()
  .catch((error) => {
    console.error("Seed process failed:", error);
    process.exit(1);
  })
  .finally(() => {
    console.log("Seed process finished. Exiting...");
    process.exit(0);
  });
