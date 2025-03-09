-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `Client` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`person_id` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Contract` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`project_id` int(11) NOT NULL,
	`client_id` int(11) NOT NULL,
	`location_id` int(11) NOT NULL,
	`engineer_id` int(11) NOT NULL,
	`contract_amount` decimal NOT NULL,
	`date` date NOT NULL,
	`date_start` date NOT NULL,
	`date_end` date DEFAULT 'NULL',
	`remarks` varchar(500) NOT NULL,
	`status` varchar(500) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Document` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`title` varchar(500) NOT NULL,
	`description` text DEFAULT 'NULL',
	`completed` tinyint(1) NOT NULL DEFAULT 0,
	`file` longblob DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `Employee` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`person_id` int(11) NOT NULL,
	`status` text DEFAULT 'NULL',
	`skills` text DEFAULT 'NULL',
	`date_contracted` date NOT NULL
);
--> statement-breakpoint
CREATE TABLE `EmployeeDesignation` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`contract_id` int(11) NOT NULL,
	`employee_id` int(11) NOT NULL,
	`role_id` int(11) NOT NULL,
	`remarks` text DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `Engineer` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`person_id` int(11) NOT NULL,
	`username` varchar(500) NOT NULL,
	`password` varchar(500) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Location` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`street` varchar(500) NOT NULL,
	`barangay` varchar(500) NOT NULL,
	`city` varchar(500) NOT NULL,
	`province` varchar(500) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Person` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`location_id` int(11) NOT NULL,
	`name` varchar(500) NOT NULL,
	`gender` varchar(500) NOT NULL,
	`email` varchar(500) NOT NULL,
	`contact_number` varchar(500) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Project` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(500) NOT NULL,
	`description` text NOT NULL,
	`date_added` date NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Requirements` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`contract_id` int(11) NOT NULL,
	`document_id` int(11) NOT NULL,
	`permit_number` text DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `Role` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(500) NOT NULL,
	CONSTRAINT `name` UNIQUE(`name`)
);
--> statement-breakpoint
ALTER TABLE `Client` ADD CONSTRAINT `Client_person_id_fk` FOREIGN KEY (`person_id`) REFERENCES `Person`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `Contract` ADD CONSTRAINT `Contract_client_id_fk` FOREIGN KEY (`client_id`) REFERENCES `Client`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `Contract` ADD CONSTRAINT `Contract_engineer_id_fk` FOREIGN KEY (`engineer_id`) REFERENCES `Engineer`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `Contract` ADD CONSTRAINT `Contract_location_id_fk` FOREIGN KEY (`location_id`) REFERENCES `Location`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `Contract` ADD CONSTRAINT `Contract_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `Project`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_person_id_fk` FOREIGN KEY (`person_id`) REFERENCES `Person`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `EmployeeDesignation` ADD CONSTRAINT `EmployeeDesignation_contract_id_fk` FOREIGN KEY (`contract_id`) REFERENCES `Contract`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `EmployeeDesignation` ADD CONSTRAINT `EmployeeDesignation_employee_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `EmployeeDesignation` ADD CONSTRAINT `EmployeeDesignation_role_id_fk` FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `Engineer` ADD CONSTRAINT `Engineer_person_id_fk` FOREIGN KEY (`person_id`) REFERENCES `Person`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `Person` ADD CONSTRAINT `Person_location_id_fk` FOREIGN KEY (`location_id`) REFERENCES `Location`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `Requirements` ADD CONSTRAINT `Requirements_contract_id_fk` FOREIGN KEY (`contract_id`) REFERENCES `Contract`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `Requirements` ADD CONSTRAINT `Requirements_document_id_fk` FOREIGN KEY (`document_id`) REFERENCES `Document`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
CREATE INDEX `index_1` ON `Client` (`id`);--> statement-breakpoint
CREATE INDEX `index_1` ON `Document` (`id`);--> statement-breakpoint
CREATE INDEX `index_1` ON `Employee` (`id`);--> statement-breakpoint
CREATE INDEX `index_1` ON `Engineer` (`id`);--> statement-breakpoint
CREATE INDEX `index_1` ON `Project` (`id`);--> statement-breakpoint
CREATE ALGORITHM = undefined
SQL SECURITY definer
VIEW `clientdata` AS (select `c`.`id` AS `client_id`,`p`.`name` AS `person_name`,`p`.`gender` AS `person_gender`,`p`.`email` AS `person_email`,`p`.`contact_number` AS `person_contact_number`,`p`.`location_id` AS `person_location_id`,json_arrayagg(`proj`.`id`) AS `project_ids` from (((`db_imwp`.`client` `c` join `db_imwp`.`person` `p` on(`c`.`person_id` = `p`.`id`)) join `db_imwp`.`contract` `con` on(`con`.`client_id` = `c`.`id`)) join `db_imwp`.`project` `proj` on(`con`.`project_id` = `proj`.`id`)) group by `c`.`id`,`p`.`name`,`p`.`gender`,`p`.`email`,`p`.`contact_number`,`p`.`location_id`);--> statement-breakpoint
CREATE ALGORITHM = undefined
SQL SECURITY definer
VIEW `contractfullview` AS (select `c`.`id` AS `contract_id`,`c`.`project_id` AS `contract_project_id`,`c`.`client_id` AS `contract_client_id`,`c`.`location_id` AS `contract_location_id`,`c`.`engineer_id` AS `contract_engineer_id`,`c`.`contract_amount` AS `contract_amount`,`c`.`date` AS `date`,`c`.`date_start` AS `date_start`,`c`.`date_end` AS `date_end`,`c`.`remarks` AS `remarks`,`c`.`status` AS `status`,`p`.`id` AS `project_id`,`p`.`name` AS `project_name`,`p`.`description` AS `project_description`,`p`.`date_added` AS `project_date_added`,`loc`.`id` AS `location_id`,`loc`.`street` AS `location_street`,`loc`.`barangay` AS `location_barangay`,`loc`.`city` AS `location_city`,`loc`.`province` AS `location_province`,`cl`.`id` AS `client_table_id`,`cl`.`person_id` AS `client_person_id`,`cp`.`id` AS `client_person_db_id`,`cp`.`location_id` AS `client_person_location_id`,`cp`.`name` AS `client_name`,`cp`.`gender` AS `client_gender`,`cp`.`email` AS `client_email`,`cp`.`contact_number` AS `client_contact_number`,`e`.`id` AS `engineer_table_id`,`e`.`person_id` AS `engineer_person_id`,`ep`.`id` AS `engineer_person_db_id`,`ep`.`location_id` AS `engineer_person_location_id`,`ep`.`name` AS `engineer_name`,`ep`.`gender` AS `engineer_gender`,`ep`.`email` AS `engineer_email`,`ep`.`contact_number` AS `engineer_contact_number` from ((((((`db_imwp`.`contract` `c` join `db_imwp`.`project` `p` on(`c`.`project_id` = `p`.`id`)) join `db_imwp`.`location` `loc` on(`c`.`location_id` = `loc`.`id`)) join `db_imwp`.`client` `cl` on(`c`.`client_id` = `cl`.`id`)) join `db_imwp`.`person` `cp` on(`cl`.`person_id` = `cp`.`id`)) join `db_imwp`.`engineer` `e` on(`c`.`engineer_id` = `e`.`id`)) join `db_imwp`.`person` `ep` on(`e`.`person_id` = `ep`.`id`)));--> statement-breakpoint
CREATE ALGORITHM = undefined
SQL SECURITY definer
VIEW `contractemployeedata` AS (select `ed`.`contract_id` AS `contract_id`,`e`.`id` AS `employee_id`,`e`.`person_id` AS `employee_person_id`,`e`.`status` AS `employee_status`,`e`.`skills` AS `employee_skills`,`e`.`date_contracted` AS `employee_date_contracted`,`p`.`name` AS `person_name`,`p`.`email` AS `person_email`,`p`.`contact_number` AS `person_contact_number`,`r`.`id` AS `role_id`,`r`.`name` AS `role_name`,`ed`.`id` AS `employee_designation_id`,`ed`.`remarks` AS `designation_remarks` from (((`db_imwp`.`employeedesignation` `ed` join `db_imwp`.`employee` `e` on(`ed`.`employee_id` = `e`.`id`)) join `db_imwp`.`role` `r` on(`ed`.`role_id` = `r`.`id`)) left join `db_imwp`.`person` `p` on(`e`.`person_id` = `p`.`id`)));
*/