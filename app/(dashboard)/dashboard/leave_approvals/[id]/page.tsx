import { storeLeaveApproval } from "@/lib/actions/leave_actions";

export default function LeaveApprovalDetailPage() {



    return (
        <>
            <h3>Detail</h3>

            <form action={storeLeaveApproval}>

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
                    <button type="submit" name="status" value="approved" className="btn btn-success btn-lg">
                        Approve
                    </button>

                    <button type="submit" name="status" value="rejected" className="btn btn-danger btn-lg">
                        Reject
                    </button>
                </div>
            </form>
        </>
    );
}