CREATE TYPE "public"."education_level" AS ENUM('high_school', 'undergraduate', 'graduate', 'doctoral', 'post_doctoral');--> statement-breakpoint
CREATE TYPE "public"."educational_status" AS ENUM('accepted_planning_to_attend', 'currently_enrolled', 'graduated', 'gap_year', 'transferring');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('student', 'parent', 'counselor');--> statement-breakpoint
CREATE TABLE "institutions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"domain" varchar(100) NOT NULL,
	"type" varchar(100),
	"address" text,
	"contact_email" varchar(255),
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "institutions_domain_unique" UNIQUE("domain")
);
--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "name" TO "first_name";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_name" varchar(100);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone_number" varchar(20);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_role" NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "educational_status" "educational_status";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "education_level" "education_level";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "expected_graduation_year" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "current_institution" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "future_institution" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "parent_id" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "institution_id" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email_verified" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email_verified_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_parent_id_users_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;