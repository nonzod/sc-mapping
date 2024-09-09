CREATE TABLE `actionmap` (
	`id` integer PRIMARY KEY NOT NULL,
	`profile` text,
	`device` text,
	`section` text,
	`button` text,
	`action` text,
	FOREIGN KEY (`profile`) REFERENCES `profile`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `profile` (
	`uuid` text PRIMARY KEY NOT NULL,
	`name` text,
	`version` integer,
	`rebind_version` integer,
	`options_version` integer
);
