/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.6.2-MariaDB, for osx10.20 (arm64)
--
-- Host: localhost    Database: db_imwp
-- ------------------------------------------------------
-- Server version	11.6.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `Contract`
--

DROP TABLE IF EXISTS `Contract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Contract` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `engineer_id` int(11) NOT NULL,
  `contract_amount` decimal(10,0) NOT NULL,
  `date` date NOT NULL,
  `date_start` date NOT NULL,
  `date_end` date DEFAULT NULL,
  `remarks` varchar(500) NOT NULL,
  `status` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Contract_client_id_fk` (`client_id`),
  KEY `Contract_engineer_id_fk` (`engineer_id`),
  KEY `Contract_location_id_fk` (`location_id`),
  KEY `Contract_project_id_fk` (`project_id`),
  CONSTRAINT `Contract_client_id_fk` FOREIGN KEY (`client_id`) REFERENCES `Client` (`id`),
  CONSTRAINT `Contract_engineer_id_fk` FOREIGN KEY (`engineer_id`) REFERENCES `Engineer` (`id`),
  CONSTRAINT `Contract_location_id_fk` FOREIGN KEY (`location_id`) REFERENCES `Location` (`id`),
  CONSTRAINT `Contract_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `Project` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contract`
--

LOCK TABLES `Contract` WRITE;
/*!40000 ALTER TABLE `Contract` DISABLE KEYS */;
INSERT INTO `Contract` VALUES
(2,1,1,2,1,1000,'2025-03-07','2025-03-07','2025-09-07','pending','active');
/*!40000 ALTER TABLE `Contract` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Document`
--

DROP TABLE IF EXISTS `Document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Document` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL,
  `description` text DEFAULT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT 0,
  `file` longblob DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_1` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Document`
--

LOCK TABLES `Document` WRITE;
/*!40000 ALTER TABLE `Document` DISABLE KEYS */;
INSERT INTO `Document` VALUES
(1,'sample doc','sample desc',0,NULL),
(2,'sample doc 2','sample',1,NULL);
/*!40000 ALTER TABLE `Document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employee`
--

DROP TABLE IF EXISTS `Employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) NOT NULL,
  `status` text DEFAULT NULL,
  `skills` text DEFAULT NULL,
  `date_contracted` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_1` (`id`),
  KEY `Employee_person_id_fk` (`person_id`),
  CONSTRAINT `Employee_person_id_fk` FOREIGN KEY (`person_id`) REFERENCES `Person` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employee`
--

LOCK TABLES `Employee` WRITE;
/*!40000 ALTER TABLE `Employee` DISABLE KEYS */;
INSERT INTO `Employee` VALUES
(1,3,'active','test','2025-03-07'),
(3,6,'bb','bbbb','2025-03-12');
/*!40000 ALTER TABLE `Employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Engineer`
--

DROP TABLE IF EXISTS `Engineer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Engineer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) NOT NULL,
  `username` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_1` (`id`),
  KEY `Engineer_person_id_fk` (`person_id`),
  CONSTRAINT `Engineer_person_id_fk` FOREIGN KEY (`person_id`) REFERENCES `Person` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Engineer`
--

LOCK TABLES `Engineer` WRITE;
/*!40000 ALTER TABLE `Engineer` DISABLE KEYS */;
INSERT INTO `Engineer` VALUES
(1,1,'admin','$argon2id$v=19$m=65536,t=2,p=1$rDhKiC6lwY0l9XawD23ao2E4XwvrAMjH/HFcG7nq0iQ$hegwezMkHMxUsF99GtifGJdxHze6OtUGWRsRywfft2A');
/*!40000 ALTER TABLE `Engineer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Location`
--

DROP TABLE IF EXISTS `Location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `street` varchar(500) NOT NULL,
  `barangay` varchar(500) NOT NULL,
  `city` varchar(500) NOT NULL,
  `province` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Location`
--

LOCK TABLES `Location` WRITE;
/*!40000 ALTER TABLE `Location` DISABLE KEYS */;
INSERT INTO `Location` VALUES
(1,'B6 L2 Victor\'s Valley','Tigatto','Davao','Davao del Sur'),
(2,'B11 L15 North Eagle Homes 3','Visayan Village','Tagum','Davao del Norte'),
(3,'test street','test barangay','test city','test province'),
(4,'B6 L3 Victor\'s Valley','Tigatto','Davao City','Davao del Sur'),
(5,'aaaaaa','aaaaaaaa','aaaaaa','aaaaaa');
/*!40000 ALTER TABLE `Location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Person`
--

DROP TABLE IF EXISTS `Person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location_id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `gender` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `contact_number` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Person_location_id_fk` (`location_id`),
  CONSTRAINT `Person_location_id_fk` FOREIGN KEY (`location_id`) REFERENCES `Location` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Person`
--

LOCK TABLES `Person` WRITE;
/*!40000 ALTER TABLE `Person` DISABLE KEYS */;
INSERT INTO `Person` VALUES
(1,1,'Lythe Marvin L. Lacre','Male','lythe1107@gmail.com','09276279266'),
(2,2,'test','Male','test@a.com','99999999999'),
(3,1,'bbbbbbb','Female','a@b.com','11111111111'),
(4,3,'test','male','lmlacre@mcm.edu.ph','0123456789'),
(5,4,'Lythe Marvin Lacre','Male','lythe1107@icloud.com','0123456789'),
(6,5,'test aaa','Female','ifwahahfa@fjjf.com','0123456789');
/*!40000 ALTER TABLE `Person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Project`
--

DROP TABLE IF EXISTS `Project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `description` text NOT NULL,
  `date_added` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_1` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Project`
--

LOCK TABLES `Project` WRITE;
/*!40000 ALTER TABLE `Project` DISABLE KEYS */;
INSERT INTO `Project` VALUES
(1,'sample','sample desc','2025-03-07');
/*!40000 ALTER TABLE `Project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Requirements`
--

DROP TABLE IF EXISTS `Requirements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Requirements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contract_id` int(11) NOT NULL,
  `document_id` int(11) NOT NULL,
  `permit_number` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Requirements_contract_id_fk` (`contract_id`),
  KEY `Requirements_document_id_fk` (`document_id`),
  CONSTRAINT `Requirements_contract_id_fk` FOREIGN KEY (`contract_id`) REFERENCES `Contract` (`id`),
  CONSTRAINT `Requirements_document_id_fk` FOREIGN KEY (`document_id`) REFERENCES `Document` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Requirements`
--

LOCK TABLES `Requirements` WRITE;
/*!40000 ALTER TABLE `Requirements` DISABLE KEYS */;
INSERT INTO `Requirements` VALUES
(2,2,1,'123456789');
/*!40000 ALTER TABLE `Requirements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Role`
--

DROP TABLE IF EXISTS `Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Role`
--

LOCK TABLES `Role` WRITE;
/*!40000 ALTER TABLE `Role` DISABLE KEYS */;
INSERT INTO `Role` VALUES
(2,'aaa'),
(3,'bbbbb'),
(1,'test role');
/*!40000 ALTER TABLE `Role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `client` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_1` (`id`),
  KEY `Client_person_id_fk` (`person_id`),
  CONSTRAINT `Client_person_id_fk` FOREIGN KEY (`person_id`) REFERENCES `Person` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES
(1,2),
(2,4);
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `clientdata`
--

DROP TABLE IF EXISTS `clientdata`;
/*!50001 DROP VIEW IF EXISTS `clientdata`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `clientdata` AS SELECT
 1 AS `client_id`,
  1 AS `person_name`,
  1 AS `person_gender`,
  1 AS `person_email`,
  1 AS `person_contact_number`,
  1 AS `person_location_id`,
  1 AS `project_ids` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `contractemployeedata`
--

DROP TABLE IF EXISTS `contractemployeedata`;
/*!50001 DROP VIEW IF EXISTS `contractemployeedata`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `contractemployeedata` AS SELECT
 1 AS `contract_id`,
  1 AS `employee_id`,
  1 AS `employee_person_id`,
  1 AS `employee_status`,
  1 AS `employee_skills`,
  1 AS `employee_date_contracted`,
  1 AS `person_name`,
  1 AS `person_email`,
  1 AS `person_contact_number`,
  1 AS `role_id`,
  1 AS `role_name`,
  1 AS `employee_designation_id`,
  1 AS `designation_remarks` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `contractfullview`
--

DROP TABLE IF EXISTS `contractfullview`;
/*!50001 DROP VIEW IF EXISTS `contractfullview`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `contractfullview` AS SELECT
 1 AS `contract_id`,
  1 AS `contract_project_id`,
  1 AS `contract_client_id`,
  1 AS `contract_location_id`,
  1 AS `contract_engineer_id`,
  1 AS `contract_amount`,
  1 AS `date`,
  1 AS `date_start`,
  1 AS `date_end`,
  1 AS `remarks`,
  1 AS `status`,
  1 AS `project_id`,
  1 AS `project_name`,
  1 AS `project_description`,
  1 AS `project_date_added`,
  1 AS `location_id`,
  1 AS `location_street`,
  1 AS `location_barangay`,
  1 AS `location_city`,
  1 AS `location_province`,
  1 AS `client_table_id`,
  1 AS `client_person_id`,
  1 AS `client_person_db_id`,
  1 AS `client_person_location_id`,
  1 AS `client_name`,
  1 AS `client_gender`,
  1 AS `client_email`,
  1 AS `client_contact_number`,
  1 AS `engineer_table_id`,
  1 AS `engineer_person_id`,
  1 AS `engineer_person_db_id`,
  1 AS `engineer_person_location_id`,
  1 AS `engineer_name`,
  1 AS `engineer_gender`,
  1 AS `engineer_email`,
  1 AS `engineer_contact_number` */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `employeedesignation`
--

DROP TABLE IF EXISTS `employeedesignation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employeedesignation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contract_id` int(11) DEFAULT NULL,
  `employee_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `remarks` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `EmployeeDesignation_contract_id_fk` (`contract_id`),
  KEY `EmployeeDesignation_employee_id_fk` (`employee_id`),
  KEY `EmployeeDesignation_role_id_fk` (`role_id`),
  CONSTRAINT `EmployeeDesignation_contract_id_fk` FOREIGN KEY (`contract_id`) REFERENCES `Contract` (`id`) ON DELETE SET NULL,
  CONSTRAINT `EmployeeDesignation_employee_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `Employee` (`id`) ON DELETE CASCADE,
  CONSTRAINT `EmployeeDesignation_role_id_fk` FOREIGN KEY (`role_id`) REFERENCES `Role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeedesignation`
--

LOCK TABLES `employeedesignation` WRITE;
/*!40000 ALTER TABLE `employeedesignation` DISABLE KEYS */;
INSERT INTO `employeedesignation` VALUES
(2,2,1,1,'test'),
(4,NULL,3,3,'bbbbbbb');
/*!40000 ALTER TABLE `employeedesignation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `clientdata`
--

/*!50001 DROP VIEW IF EXISTS `clientdata`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_uca1400_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`moni`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `clientdata` AS select `c`.`id` AS `client_id`,`p`.`name` AS `person_name`,`p`.`gender` AS `person_gender`,`p`.`email` AS `person_email`,`p`.`contact_number` AS `person_contact_number`,`p`.`location_id` AS `person_location_id`,json_arrayagg(`proj`.`id`) AS `project_ids` from (((`client` `c` join `person` `p` on(`c`.`person_id` = `p`.`id`)) join `contract` `con` on(`con`.`client_id` = `c`.`id`)) join `project` `proj` on(`con`.`project_id` = `proj`.`id`)) group by `c`.`id`,`p`.`name`,`p`.`gender`,`p`.`email`,`p`.`contact_number`,`p`.`location_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `contractemployeedata`
--

/*!50001 DROP VIEW IF EXISTS `contractemployeedata`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_uca1400_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`moni`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `contractemployeedata` AS select `ed`.`contract_id` AS `contract_id`,`e`.`id` AS `employee_id`,`e`.`person_id` AS `employee_person_id`,`e`.`status` AS `employee_status`,`e`.`skills` AS `employee_skills`,`e`.`date_contracted` AS `employee_date_contracted`,`p`.`name` AS `person_name`,`p`.`email` AS `person_email`,`p`.`contact_number` AS `person_contact_number`,`r`.`id` AS `role_id`,`r`.`name` AS `role_name`,`ed`.`id` AS `employee_designation_id`,`ed`.`remarks` AS `designation_remarks` from (((`employeedesignation` `ed` join `employee` `e` on(`ed`.`employee_id` = `e`.`id`)) join `role` `r` on(`ed`.`role_id` = `r`.`id`)) left join `person` `p` on(`e`.`person_id` = `p`.`id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `contractfullview`
--

/*!50001 DROP VIEW IF EXISTS `contractfullview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_uca1400_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`moni`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `contractfullview` AS select `c`.`id` AS `contract_id`,`c`.`project_id` AS `contract_project_id`,`c`.`client_id` AS `contract_client_id`,`c`.`location_id` AS `contract_location_id`,`c`.`engineer_id` AS `contract_engineer_id`,`c`.`contract_amount` AS `contract_amount`,`c`.`date` AS `date`,`c`.`date_start` AS `date_start`,`c`.`date_end` AS `date_end`,`c`.`remarks` AS `remarks`,`c`.`status` AS `status`,`p`.`id` AS `project_id`,`p`.`name` AS `project_name`,`p`.`description` AS `project_description`,`p`.`date_added` AS `project_date_added`,`loc`.`id` AS `location_id`,`loc`.`street` AS `location_street`,`loc`.`barangay` AS `location_barangay`,`loc`.`city` AS `location_city`,`loc`.`province` AS `location_province`,`cl`.`id` AS `client_table_id`,`cl`.`person_id` AS `client_person_id`,`cp`.`id` AS `client_person_db_id`,`cp`.`location_id` AS `client_person_location_id`,`cp`.`name` AS `client_name`,`cp`.`gender` AS `client_gender`,`cp`.`email` AS `client_email`,`cp`.`contact_number` AS `client_contact_number`,`e`.`id` AS `engineer_table_id`,`e`.`person_id` AS `engineer_person_id`,`ep`.`id` AS `engineer_person_db_id`,`ep`.`location_id` AS `engineer_person_location_id`,`ep`.`name` AS `engineer_name`,`ep`.`gender` AS `engineer_gender`,`ep`.`email` AS `engineer_email`,`ep`.`contact_number` AS `engineer_contact_number` from ((((((`contract` `c` join `project` `p` on(`c`.`project_id` = `p`.`id`)) join `location` `loc` on(`c`.`location_id` = `loc`.`id`)) join `client` `cl` on(`c`.`client_id` = `cl`.`id`)) join `person` `cp` on(`cl`.`person_id` = `cp`.`id`)) join `engineer` `e` on(`c`.`engineer_id` = `e`.`id`)) join `person` `ep` on(`e`.`person_id` = `ep`.`id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-03-12  1:34:37
