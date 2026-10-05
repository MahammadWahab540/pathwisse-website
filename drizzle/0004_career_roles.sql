CREATE TABLE IF NOT EXISTS `career_roles` (
	`slug` text PRIMARY KEY NOT NULL,
	`role_name` text NOT NULL,
	`stream_name` text NOT NULL,
	`role_hook` text NOT NULL,
	`what_work_looks_like` text NOT NULL,
	`problems_solves` text NOT NULL,
	`skill_count` integer DEFAULT 15 NOT NULL,
	`top_skills` text DEFAULT '[]' NOT NULL,
	`proof_project` text NOT NULL,
	`evidence_to_show` text NOT NULL,
	`pathwisse_approach` text NOT NULL,
	`role_cta` text DEFAULT 'Try for Free on Pathwisse' NOT NULL,
	`reference_skill` text DEFAULT '' NOT NULL,
	`reference_book` text DEFAULT '' NOT NULL,
	`reference_author` text DEFAULT '' NOT NULL,
	`onet_benchmark` text DEFAULT '' NOT NULL,
	`external_url` text DEFAULT '' NOT NULL,
	`seo_title` text NOT NULL,
	`meta_description` text NOT NULL,
	`faq` text DEFAULT '[]' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS `career_roles_stream` ON `career_roles` (`stream_name`);
