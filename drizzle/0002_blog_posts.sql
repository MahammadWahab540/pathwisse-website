CREATE TABLE `blog_posts` (
	`slug` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`excerpt` text NOT NULL,
	`body` text NOT NULL,
	`hero_image` text DEFAULT '' NOT NULL,
	`og_image` text DEFAULT '' NOT NULL,
	`author` text DEFAULT 'Pathwisse Team' NOT NULL,
	`author_bio` text DEFAULT '' NOT NULL,
	`category` text NOT NULL,
	`tags` text DEFAULT '[]' NOT NULL,
	`publish_date` text NOT NULL,
	`modified_date` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`featured` integer DEFAULT 0 NOT NULL,
	`seo_title` text NOT NULL,
	`meta_description` text NOT NULL,
	`canonical` text DEFAULT '' NOT NULL,
	`audience` text DEFAULT 'all' NOT NULL,
	`related_careers` text DEFAULT '[]' NOT NULL,
	`related_skills` text DEFAULT '[]' NOT NULL,
	`related_products` text DEFAULT '[]' NOT NULL,
	`related_guides` text DEFAULT '[]' NOT NULL,
	`cta_type` text DEFAULT 'demo' NOT NULL,
	`cta_url` text DEFAULT '/contact' NOT NULL,
	`faq` text DEFAULT '[]' NOT NULL,
	`references` text DEFAULT '[]' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `blog_status_date` ON `blog_posts` (`status`,`publish_date`);
--> statement-breakpoint
CREATE INDEX `blog_category` ON `blog_posts` (`category`);
