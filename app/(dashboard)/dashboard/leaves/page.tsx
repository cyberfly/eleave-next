import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserLeaves } from "@/lib/actions/leave_actions";

export default async function LeavesPage() {
  const user_leaves = await getUserLeaves();

  console.log("User Leaves:", user_leaves);

  return (
    <>
      <h3 className="mb-8 text-2xl font-bold">Manage Leaves</h3>

      <Card>
        <CardHeader>
          <CardTitle>Your Leave Applications</CardTitle>
        </CardHeader>
        <CardContent>

        <table className="table">
            <tr>
                <th>Description</th>
                <th>Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Action</th>
            </tr>

            {user_leaves.map((leave_row, index) => (

            <tr>
                <td>{leave_row.description}</td>
                <td>{leave_row.leave_type}</td>
                <td>{leave_row.start_date}</td>
                <td>{leave_row.end_date}</td>
                <td>{leave_row.status}</td>
                <td>

                </td>
            </tr>

            ))}

        </table>

        </CardContent>
      </Card>
    </>
  );
}
