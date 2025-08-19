ALTER TABLE "leave_applications" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "leave_applications" ADD COLUMN "approval_by" integer;--> statement-breakpoint
ALTER TABLE "leave_applications" ADD CONSTRAINT "leave_applications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leave_applications" ADD CONSTRAINT "leave_applications_approval_by_users_id_fk" FOREIGN KEY ("approval_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;