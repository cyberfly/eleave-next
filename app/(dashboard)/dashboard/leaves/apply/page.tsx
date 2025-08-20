"use client";
import { storeLeaveApplication } from "@/lib/actions/leave_actions";
import { useActionState } from "react";

const initialState = {
  success: false,
  errors: {},
  data: null,
};

export default function ApplyLeavePage() {
  const [state, formAction, pending] = useActionState(
    storeLeaveApplication,
    initialState
  );

  return (
    <>
      <h3 className="mb-8 text-2xl font-bold">Apply Leave</h3>

      <form action={formAction}>
        <div className="form-group">
          <label htmlFor="leave_type">Leave Type</label>

          <select
            name="leave_type"
            id="leave_type"
            className="form-control"
            key={state.data?.leave_type || "default"}
            defaultValue={state.data?.leave_type?.toString() || ""}
          >
            <option value="">Select Type</option>
            {/* TODO: change to dynamic  */}
            <option value="annual">Annual Leave</option>
            <option value="medical">Medical Leave</option>
            <option value="maternity">Maternity Leave</option>
            <option value="paternity">Paternity Leave</option>
            <option value="compassionate">Compassionate Leave</option>
            <option value="unpaid">Unpaid Leave</option>
          </select>

          {state.errors?.leave_type && (
            <p className="text-red-500">{state.errors.leave_type[0]}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>

          <textarea
            name="description"
            id="description"
            className="form-control"
            defaultValue={state.data?.description?.toString() || ""}
          ></textarea>

          {state.errors?.description && (
            <p className="text-red-500">{state.errors.description[0]}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="start_date">Start Date</label>
          <input
            type="date"
            name="start_date"
            id="start_date"
            className="form-control"
            defaultValue={state.data?.start_date?.toString() || ""}
          />

          {state.errors?.start_date && (
            <p className="text-red-500">{state.errors.start_date[0]}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="end_date">End Date</label>
          <input
            type="date"
            name="end_date"
            id="end_date"
            className="form-control"
            defaultValue={state.data?.end_date?.toString() || ""}
          />

          {state.errors?.end_date && (
            <p className="text-red-500">{state.errors.end_date[0]}</p>
          )}
        </div>

        <div className="form-group">
          <button
            disabled={pending}
            type="submit"
            className="btn btn-primary btn-lg"
          >
            {pending ? "Submitting ..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}
