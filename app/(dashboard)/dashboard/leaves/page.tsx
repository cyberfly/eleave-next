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
        <CardContent></CardContent>
      </Card>
    </>
  );
}
