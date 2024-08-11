ALTER TABLE "txn_table" ALTER COLUMN "user_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "user_table" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "user_table" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();