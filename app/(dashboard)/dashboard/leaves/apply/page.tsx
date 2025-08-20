"use client";
import { storeLeaveApplication } from "@/lib/actions/leave_actions";

export default function ApplyLeavePage() {  
  return (
    <>
      <h3 className="mb-8 text-2xl font-bold">Apply Leave</h3>

      <form action={storeLeaveApplication}>

        <div className="form-group">
          <label htmlFor="leave_type">Leave Type</label>
          
          <select name="leave_type" id="leave_type" className="form-control">
            <option value="">Select Type</option>
            {/* TODO: change to dynamic  */}
            <option value="annual">Annual Leave</option>
            <option value="medical">Medical Leave</option>
            <option value="maternity">Maternity Leave</option>
            <option value="paternity">Paternity Leave</option>
            <option value="compassionate">Compassionate Leave</option>
            <option value="unpaid">Unpaid Leave</option>
          </select> 
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>

          <textarea
            name="description"
            id="description"
            className="form-control"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="start_date">Start Date</label>
          <input
            type="date"
            name="start_date"
            id="start_date"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="end_date">End Date</label>
          <input
            type="date"
            name="end_date"
            id="end_date"
            className="form-control"
          />
        </div>


        <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg">Submit</button>    
        </div>       

      </form>
    </>
  );
}
