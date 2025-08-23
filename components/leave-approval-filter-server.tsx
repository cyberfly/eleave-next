"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as React from "react";

interface LeaveApprovalFilterProps {
  status?: string;
  leave_type?: string;
}

const LeaveApprovalFilterServer = (props: LeaveApprovalFilterProps) => {
  const { status, leave_type } = props;

  console.log("props:", props);

  return (
    <>
      <Card className="mb-8">
        <CardContent>
          <form action={`/dashboard/leave_approvals`}>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                name="status"
                id="status"
                className="form-control"
                defaultValue={status}
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="leave_type">Leave Type</label>
              <select
                name="leave_type"
                id="leave_type"
                className="form-control"
                defaultValue={leave_type}
              >
                <option value="">All</option>
                <option value="annual">Annual</option>
                <option value="medical">Medical</option>
                <option value="maternity">Maternity</option>
                <option value="paternity">Paternity</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default LeaveApprovalFilterServer;
