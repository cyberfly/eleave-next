"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as React from "react";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

// TODO: move to libs/utils.ts
function buildUrl(
  pathname: string,
  currentParams: URLSearchParams,
  updates: Record<string, string | undefined>
) {
  const params = new URLSearchParams(currentParams);

  for (const [key, value] of Object.entries(updates)) {
    if (!value || value === "all" || value.trim() === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
  }

  const queryString = params.toString();
  return `${pathname}${queryString ? `?${queryString}` : ""}`;
}

const LeaveApprovalFilter = (props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const defaultStatus = searchParams.get("status") || "pending";
  const defaultLeaveType = searchParams.get("leave_type") || "";

  const [current_status, setStatus] = useState(defaultStatus);
  const [leave_type, setLeaveType] = useState(defaultLeaveType);

  function handleSubmit(event) {
    console.log("Form submitted");

    const newUrl = buildUrl(pathname, searchParams, {
      current_status,
      leave_type,
      page: "1",
    });

    router.push(newUrl, { scroll: false });
  }

  return (
    <>
      <Card className="mb-8">
        <CardContent>
          <form action="">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                name="status"
                id="status"
                className="form-control"
                value={current_status}
                onChange={(e) => setStatus(e.target.value)}
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
                value={leave_type}
                onChange={(e) => setLeaveType(e.target.value)}
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
              <button
                type="button"
                onClick={(e) => handleSubmit(e)}
                className="btn btn-primary"
              >
                Search
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default LeaveApprovalFilter;
