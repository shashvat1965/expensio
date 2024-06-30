ALTER TABLE "txn_table" DROP CONSTRAINT "txn_table_user_id_user_table_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "txn_table" ADD CONSTRAINT "txn_table_user_id_user_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_table"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
