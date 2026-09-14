CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`event` text NOT NULL,
	`page` text NOT NULL,
	`target` text DEFAULT '' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`organization` text DEFAULT '' NOT NULL,
	`interest` text NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`source` text NOT NULL,
	`attribution` text DEFAULT '{}' NOT NULL,
	`consent` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `leads_email_created` ON `leads` (`email`,`created_at`);