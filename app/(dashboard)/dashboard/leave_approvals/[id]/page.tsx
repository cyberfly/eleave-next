import LeaveApprovalForm from "@/components/leave-approval-form";

export default async function LeaveApprovalDetailPage(props) {
  const { params } = props;

  const { id } = await params;

  console.log("Leave Approval ID:", id);

  return (
    <>
      <h3>Detail</h3>

      <LeaveApprovalForm />
    </>
  );
}
