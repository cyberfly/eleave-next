import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMemberLeaveApplications } from "@/lib/actions/leave_actions";

export default async function LeaveApprovalsPage() {
  const leave_applications_data = await getMemberLeaveApplications();

  console.log("leave_applications_data:", leave_applications_data);

  return (
    <>
      <h3 className="mb-8 text-2xl font-bold">Manage Leave Application Approvals</h3>

      <Card>
        <CardHeader>
          <CardTitle>Leave Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="table">
            <thead>
              <tr>
                <th>Staff Info</th>
                <th>Apply At</th>
                <th>Description</th>
                <th>Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Approval By</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {leave_applications_data &&
                leave_applications_data.map((leave_row, index) => (
                  <tr key={index}>
                    <td>{leave_row.users?.name} - {leave_row.users?.email}</td>
                    <td>{new Date(leave_row.leave_applications.createdAt).toLocaleDateString()}</td>
                    <td>{leave_row.leave_applications.description}</td>
                    <td>{leave_row.leave_applications.leave_type}</td>
                    <td>{leave_row.leave_applications.start_date}</td>
                    <td>{leave_row.leave_applications.end_date}</td>
                    <td>{leave_row.leave_applications.status}</td>
                    <td>{leave_row.approver?.name || '-'}</td>
                    <td></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </>
  );
}
