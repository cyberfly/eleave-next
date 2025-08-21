"use client";

import { useActionState } from "react";

import { storeLeaveApproval } from "@/lib/actions/leave_actions";

const initialState = {
  success: false,
  errors: {},
  data: null,
};

const LeaveApprovalForm = (props) => {
  const { leaveId } = props;

  const [state, formAction, pending] = useActionState(
    storeLeaveApproval,
    initialState
  );

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="id" value={leaveId} />

        <div className="form-group">
          <label htmlFor="remark">Remark</label>
          <textarea
            name="remark"
            id="remark"
            className="form-control"
            placeholder="Enter your remark here"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <button
            type="submit"
            name="status"
            value="approved"
            className="btn btn-success btn-lg"
          >
            Approve
          </button>

          <button
            type="submit"
            name="status"
            value="rejected"
            className="btn btn-danger btn-lg"
          >
            Reject
          </button>
        </div>
      </form>
    </>
  );
};

export default LeaveApprovalForm;
