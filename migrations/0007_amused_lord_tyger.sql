ALTER TABLE "txn_table" DROP CONSTRAINT "txn_table_user_id_user_table_id_fk";
--> statement-breakpoint
ALTER TABLE "txn_table" ALTER COLUMN "user_id" SET DATA TYPE serial;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "txn_table" ADD CONSTRAINT "txn_table_user_id_user_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
