ALTER TABLE "txn_table" ALTER COLUMN "user_id" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "txn_table" DROP COLUMN IF EXISTS "updated_at";