CREATE TABLE `device` (
	`id` integer PRIMARY KEY NOT NULL,
	`profile` text,
	`type` text,
	`name` text,
	`instance` integer,
	FOREIGN KEY (`profile`) REFERENCES `profile`(`uuid`) ON UPDATE no action ON DELETE no action
);
