CREATE TABLE `career_audits` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text DEFAULT '' NOT NULL,
	`email` text DEFAULT '' NOT NULL,
	`answers` text DEFAULT '{}' NOT NULL,
	`recommended_role` text NOT NULL,
	`readiness_score` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `career_audits_role_created` ON `career_audits` (`recommended_role`, `created_at`);
--> statement-breakpoint
CREATE INDEX `career_audits_email_created` ON `career_audits` (`email`, `created_at`);
