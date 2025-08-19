import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LeavesPage() {
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
