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
        <input type="hidden" name="leave_application_id" value={leaveId} />

        <div className="form-group">
          <label htmlFor="remark">Remark</label>
          <textarea
            name="remark"
            id="remark"
            className="form-control"
            placeholder="Enter your remark here"
          ></textarea>

          {state.errors?.remark && (
            <p className="text-red-500">{state.errors.remark[0]}</p>
          )}
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
