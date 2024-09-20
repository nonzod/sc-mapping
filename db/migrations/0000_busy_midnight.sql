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
CREATE TABLE `device` (
	`id` integer PRIMARY KEY NOT NULL,
	`profile` text,
	`type` text,
	`name` text,
	`instance` integer,
	`prefix` text,
	FOREIGN KEY (`profile`) REFERENCES `profile`(`uuid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `profile` (
	`uuid` text PRIMARY KEY NOT NULL,
	`name` text,
	`user_id` integer,
	`device_type` text,
	`num_of_devices` integer,
	`version` integer,
	`rebind_version` integer,
	`options_version` integer,
	`filepath` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text,
	`password` text,
	`role` text,
	`email` text,
	`consent` text
);
