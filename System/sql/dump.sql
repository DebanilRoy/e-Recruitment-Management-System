-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: ehrms
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `applicants`
--

DROP TABLE IF EXISTS `applicants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applicants` (
  `applicantID` bigint unsigned NOT NULL,
  `email` varchar(45) NOT NULL,
  `mobile` bigint unsigned NOT NULL,
  `alternateMobile` bigint unsigned DEFAULT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `dob` date NOT NULL,
  `qualification` varchar(45) NOT NULL,
  `category` varchar(3) NOT NULL,
  `addressFirstLine` varchar(45) NOT NULL,
  `addressSecondLine` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `district` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  `pinCode` int NOT NULL,
  `createDate` date NOT NULL,
  PRIMARY KEY (`applicantID`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `mobile_UNIQUE` (`mobile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `applicants_BEFORE_INSERT` BEFORE INSERT ON `applicants` FOR EACH ROW BEGIN
	SET NEW.createDate = NOW();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `applicationID` varchar(45) NOT NULL,
  `recruitmentID` varchar(12) NOT NULL,
  `applicantID` bigint unsigned NOT NULL,
  `submissionDate` date NOT NULL,
  `alternateMobile` bigint DEFAULT NULL,
  `addressFirstLine` varchar(45) NOT NULL,
  `addressSecondLine` varchar(45) DEFAULT NULL,
  `city` varchar(45) NOT NULL,
  `district` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  `pinCode` int NOT NULL,
  `isActive` tinyint NOT NULL DEFAULT '1',
  `isCancelled` tinyint NOT NULL DEFAULT '0',
  `isVerified` tinyint NOT NULL DEFAULT '0',
  `verifyStatus` int DEFAULT NULL,
  `verifiedBy` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`applicationID`),
  UNIQUE KEY `applicationID_recruitmentID_idx` (`applicationID`,`recruitmentID`) /*!80000 INVISIBLE */,
  KEY `applicantID_idx` (`applicantID`),
  KEY `recruitmentID_idx` (`recruitmentID`) /*!80000 INVISIBLE */,
  KEY `verifiedBy_idx` (`verifiedBy`) /*!80000 INVISIBLE */,
  CONSTRAINT `applicantID_application_applicants` FOREIGN KEY (`applicantID`) REFERENCES `applicants` (`applicantID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `recruitmentID_application_recruitment` FOREIGN KEY (`recruitmentID`) REFERENCES `recruitment` (`recruitmentID`),
  CONSTRAINT `verifiedBy_application_recruiters` FOREIGN KEY (`verifiedBy`) REFERENCES `recruiters` (`recruiterID`) ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `applications_BEFORE_INSERT` BEFORE INSERT ON `applications` FOR EACH ROW BEGIN
	SET NEW.submissionDate = curdate(),
        NEW.isActive = true,
        NEW.isVerified = false,
        NEW.submissionDate = NOW();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `appointmentID` varchar(12) NOT NULL,
  `applicationID` varchar(45) NOT NULL,
  `offerDate` date NOT NULL,
  `offerLastDate` date DEFAULT NULL,
  `offerStatus` enum('open','accepted','rejected','lapsed') NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `submittedBy` varchar(45) NOT NULL,
  PRIMARY KEY (`appointmentID`),
  UNIQUE KEY `applicationID_UNIQUE` (`applicationID`),
  KEY `applicationID` (`applicationID`),
  CONSTRAINT `fk_applications` FOREIGN KEY (`applicationID`) REFERENCES `applications` (`applicationID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `appointments_BEFORE_INSERT` BEFORE INSERT ON `appointments` FOR EACH ROW BEGIN
	SET
    NEW.offerDate = NOW(),
    NEW.offerLastDate = DATE_ADD(NOW(), INTERVAL 60 DAY),
    NEW.offerStatus = "open",
    NEW.isActive = true;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `passwordrecruitee`
--

DROP TABLE IF EXISTS `passwordrecruitee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passwordrecruitee` (
  `applicantID` bigint unsigned NOT NULL,
  `pwd` varchar(256) NOT NULL,
  UNIQUE KEY `applicantID_UNIQUE` (`applicantID`),
  CONSTRAINT `fk_applicantID` FOREIGN KEY (`applicantID`) REFERENCES `applicants` (`applicantID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `passwordrecruiter`
--

DROP TABLE IF EXISTS `passwordrecruiter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passwordrecruiter` (
  `recruiterID` varchar(45) NOT NULL,
  `pwd` varchar(256) NOT NULL,
  UNIQUE KEY `recruiterID` (`recruiterID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rank_table_r001`
--

DROP TABLE IF EXISTS `rank_table_r001`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rank_table_r001` (
  `rank` bigint unsigned NOT NULL DEFAULT '0',
  `applicationID` varchar(45) NOT NULL,
  `applicantName` varchar(91) DEFAULT NULL,
  `applicantID` bigint unsigned NOT NULL,
  `dob` varchar(10) DEFAULT NULL,
  `total` decimal(32,0) DEFAULT NULL,
  `Hindi` bigint DEFAULT NULL,
  `EVS` bigint DEFAULT NULL,
  `Maths` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ranklist`
--

DROP TABLE IF EXISTS `ranklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ranklist` (
  `applicationID` varchar(45) NOT NULL,
  `recruitmentID` varchar(12) NOT NULL,
  `rank` bigint NOT NULL,
  PRIMARY KEY (`applicationID`,`recruitmentID`),
  CONSTRAINT `applications_fkey` FOREIGN KEY (`applicationID`, `recruitmentID`) REFERENCES `applications` (`applicationID`, `recruitmentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `recruiters`
--

DROP TABLE IF EXISTS `recruiters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recruiters` (
  `recruiterID` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `mobile` bigint NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `post` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`recruiterID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `recruitment`
--

DROP TABLE IF EXISTS `recruitment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recruitment` (
  `recruitmentID` varchar(12) NOT NULL,
  `postName` varchar(45) NOT NULL,
  `salary` int NOT NULL,
  `location` varchar(45) NOT NULL,
  `vacancyTotal` int NOT NULL,
  `vacancyGEN` int NOT NULL,
  `vacancySC` int NOT NULL,
  `vacancyST` int NOT NULL,
  `vacancyOBC` int NOT NULL,
  `datePublished` date NOT NULL,
  `appLastDate` date NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `isPublished` tinyint DEFAULT NULL,
  `isFrozen` tinyint(1) NOT NULL,
  `createdBy` varchar(45) NOT NULL,
  `createDate` date NOT NULL,
  `advertFileName` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`recruitmentID`),
  KEY `recruitment_ibfk_1` (`createdBy`),
  CONSTRAINT `recruitment_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `recruiters` (`recruiterID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `recruitment_BEFORE_INSERT` BEFORE INSERT ON `recruitment` FOR EACH ROW BEGIN
	SET
		NEW.isActive = 1,
        NEW.isPublished = 0,
        NEW.isFrozen = 0,
        NEW.createDate = NOW();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `results` (
  `recruitmentID` varchar(12) NOT NULL,
  `applicationID` varchar(45) NOT NULL,
  `subjectID` varchar(10) NOT NULL,
  `result` int NOT NULL,
  PRIMARY KEY (`recruitmentID`,`applicationID`,`subjectID`),
  KEY `subjectID-results_subjects_idx` (`subjectID`) /*!80000 INVISIBLE */,
  KEY `fk_results_application` (`applicationID`,`recruitmentID`),
  CONSTRAINT `fk_results_application` FOREIGN KEY (`applicationID`, `recruitmentID`) REFERENCES `applications` (`applicationID`, `recruitmentID`),
  CONSTRAINT `subjectID_results_subjects` FOREIGN KEY (`subjectID`) REFERENCES `subjects` (`subjectID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `subjectID` varchar(10) NOT NULL,
  `recruitmentID` varchar(45) NOT NULL,
  `subjectName` varchar(45) NOT NULL,
  `priority` int NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  PRIMARY KEY (`subjectID`),
  KEY `recruitmentID_idx` (`recruitmentID`),
  CONSTRAINT `recruitmentID` FOREIGN KEY (`recruitmentID`) REFERENCES `recruitment` (`recruitmentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_create_subjects` BEFORE INSERT ON `subjects` FOR EACH ROW SET NEW.subjectID = LEFT(REPLACE(UUID(), '-', ''), 6), NEW.isActive = true */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping events for database 'ehrms'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `recruitment_check_event` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8mb4 */ ;;
/*!50003 SET character_set_results = utf8mb4 */ ;;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`localhost`*/ /*!50106 EVENT `recruitment_check_event` ON SCHEDULE EVERY 1 DAY STARTS '2025-05-13 00:00:00' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE recruitment 
	SET isPublished = true
	WHERE isPublished = false AND datePublished = CURRENT_DATE */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

--
-- Dumping routines for database 'ehrms'
--
/*!50003 DROP PROCEDURE IF EXISTS `accept` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `accept`(IN appointmentID VARCHAR(12))
BEGIN
	UPDATE appointments
    SET offerStatus = "accepted"
    WHERE appointments.appointmentID = appointmentID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `applicant_login` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `applicant_login`(IN email VARCHAR(45))
BEGIN
	SELECT a.applicantID, a.email, p.pwd FROM applicants a 
	INNER JOIN passwordrecruitee p ON a.applicantID = p.applicantID
	WHERE a.email = email;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cancel_application` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `cancel_application`(IN applicationID VARCHAR(45))
BEGIN
	UPDATE applications
    SET isCancelled = true,
		isActive = false
	WHERE applications.applicationID = applicationID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_recruitment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_recruitment`(IN recruitmentInfo JSON)
BEGIN
	INSERT INTO recruitment (recruitmentID,
							 postName,
							 salary,
							 location,
							 vacancyTotal,
							 vacancyGEN,
							 vacancySC,
							 vacancyST,
							 vacancyOBC,
							 datePublished,
							 appLastDate,
                             createdBy)
    SELECT * FROM JSON_TABLE(
		recruitmentInfo,
        '$' COLUMNS (
			recruitmentID varchar(12) PATH '$.recruitmentID',
			postName varchar(45) PATH '$.postName',
			salary int PATH '$.salary',
			location varchar(45) PATH '$.location',
			vacancyTotal int PATH '$.vacancyTotal',
			vacancyGEN int PATH '$.vacancyGEN',
			vacancySC int PATH '$.vacancySC',
			vacancyST int PATH '$.vacancyST',
			vacancyOBC int PATH '$.vacancyOBC',
			datePublished date PATH '$.datePublished',
			appLastDate	date PATH '$.appLastDate',
            createdBy VARCHAR(45) PATH '$.createdBy'
        )
    ) as jt;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `edit_profile` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `edit_profile`(IN userID BIGINT, profile JSON)
BEGIN
	UPDATE applicants a
    JOIN JSON_TABLE(
    profile,
    '$'COLUMNS (
		applicantID BIGINT PATH '$.applicantID',
		email VARCHAR(45) PATH '$.email',
		mobile BIGINT PATH '$.mobile',
		alternateMobile BIGINT PATH '$.alternateMobile',
		qualification VARCHAR(45) PATH '$.qualification',
		category VARCHAR(45) PATH '$.category',
		addressFirstLine VARCHAR(45) PATH '$.addressFirstLine',
		addressSecondLine VARCHAR (45) PATH '$.addressSecondLine',
		city VARCHAR(45) PATH '$.city',
		district VARCHAR(45) PATH '$.district',
		state VARCHAR(45) PATH '$.state',
		pinCode INT PATH '$.pinCode'
    )) as jt
    ON a.applicantID = jt.applicantID
    SET
		a.email = jt.email,
		a.mobile = jt.mobile,
		a.alternateMobile = jt.alternateMobile,
		a.qualification = jt.qualification,
		a.category = jt.category,
		a.addressFirstLine = jt.addressFirstLine,
		a.addressSecondLine = jt.addressSecondLine,
		a.city = jt.city,
		a.district = jt.district,
		a.state = jt.state,
		a.pinCode = jt.pinCode;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `edit_recruitment_info` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `edit_recruitment_info`(IN recruitmentInfo JSON)
BEGIN
	UPDATE recruitment r
    JOIN JSON_TABLE(
		recruitmentInfo ,
        '$[*]' COLUMNS (
			recruitmentID VARCHAR(12) PATH '$.recruitmentID',
            postName VARCHAR(45) PATH '$.postName',
            salary INT PATH '$.salary',
            location VARCHAR(45) PATH '$.location',
            appLastDate DATE PATH '$.appLastDate',
			vacancyTotal INT PATH '$.vacancyTotal',
            vacancyGEN INT PATH '$.vacancyGEN',
			vacancySC INT PATH '$.vacancySC',
			vacancyST INT PATH '$.vacancyST',
            vacancyOBC INT PATH '$.vacancyOBC'
		)
    ) AS jt
    ON r.recruitmentID = jt.recruitmentID
    SET r.postName = jt.postName,
		r.salary = jt.salary,
        r.location = jt.location,
        r.appLastDate = jt.appLastDate,
        r.vacancyTotal = jt.vacancyTotal,
        r.vacancyGEN = jt.vacancyGEN,
        r.vacancySC = jt.vacancySC,
        r.vacancyST = jt.vacancyST,
        r.vacancyOBC = jt.vacancyOBC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `freeze_ranklist` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `freeze_ranklist`(IN recruitmentID VARCHAR(12))
BEGIN    
    SELECT CONCAT("INSERT INTO ranklist (applicationID, recruitmentID, ranklist.rank)
	SELECT rt.applicationID, '" , recruitmentID, "' as 'recruitmentID', rt.rank 
    FROM rank_table_", recruitmentID, " rt ;") into @freeze_ranklist_query;

	SET @delete_ranklist_query = CONCAT("DROP TABLE rank_table_", recruitmentID);
	PREPARE stmt FROM @freeze_ranklist_query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
    
    PREPARE stmt FROM @delete_ranklist_query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
    
	UPDATE recruitment r
    SET isFrozen = true
    WHERE r.recruitmentID = recruitmentID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_applications_verify` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_applications_verify`(IN recruitmentID VARCHAR(12))
BEGIN
	SELECT 	r.rank, 
		a.applicationID, 
        CONCAT(ap.firstName , " ", ap.lastName) AS applicantName, 
        a.applicantID,
        a.isVerified,
        a.verifyStatus,
        date_format(ap.dob, "%d/%m/%Y") as "dob"
	FROM ranklist r
	INNER JOIN applications a ON a.applicationID = r.applicationID
	INNER JOIN applicants ap ON ap.applicantID = a.applicantID
	WHERE r.recruitmentID = recruitmentID
	ORDER BY r.rank;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_application_status` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_application_status`(IN applicationID VARCHAR(6))
BEGIN
	SELECT  applications.isActive, applications.isCancelled, applications.isVerified, applications.verifyStatus,
			appointments.offerStatus
    FROM applications
    LEFT JOIN appointments ON appointments.applicationID = applications.applicationID
    WHERE applications.applicationID = applicationID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_appointments` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_appointments`(IN applicantID BIGINT)
BEGIN
	SELECT offer.appointmentID, offer.offerStatus, a.recruitmentID, r.postName, r.salary, r.location, DATE_FORMAT(offer.offerDate, '%d/%m/%Y') as "offerDate", DATE_FORMAT(offer.offerLastDate, '%d/%m/%Y') as "offerLastDate"
	FROM appointments offer
	INNER JOIN applications a ON a.applicationID = offer.applicationID
	INNER JOIN recruitment r ON r.recruitmentID = a.recruitmentID
	WHERE a.applicantID = applicantID AND (offer.offerStatus = "open"); 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_appointments_view` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_appointments_view`(IN recruitmentID VARCHAR(12))
BEGIN
	SELECT 	app.appointmentID, 
			app.offerDate, 
			app.offerLastDate, 
			app.offerStatus, 
            app.submittedBy,
            r.rank,
            CONCAT(a.firstName, " ", a.lastName) AS applicantName,
            ap.applicationID,
            ap.applicantID,
            a.dob,
            a.category
	FROM appointments app 
    JOIN applications ap ON app.applicationID = ap.applicationID
    JOIN ranklist r ON r.applicationID = ap.applicationID
    JOIN applicants a ON a.applicantID = ap.applicantID
    WHERE ap.recruitmentID = recruitmentID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_closed_applications` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_closed_applications`(IN applicantID BIGINT)
BEGIN
	SELECT  a.applicationID, a.recruitmentID, 
			DATE_FORMAT(a.submissionDate, "%d/%m/%Y") as 'submissionDate',
            a.isCancelled,  
			r.postName, r.salary, r.location, 
            DATE_FORMAT(r.datePublished, "%d/%m/%Y") as 'datePublished',
            DATE_FORMAT(r.appLastDate, "%d/%m/%Y") as 'appLastDate',
            (CASE WHEN a.isCancelled = true THEN "Cancelled"
			 WHEN a.isVerified = false THEN "Recruitment Closed - No Offers"
			 WHEN a.verifyStatus = false THEN "Rejected"
			 WHEN app.isActive IS NULL THEN "Recruitment Closed - No Offers"
			 ELSE app.offerStatus END) as 'status'
	FROM applications a 
    LEFT JOIN appointments app ON app.applicationID = a.applicationID
	JOIN recruitment r ON r.recruitmentID = a.recruitmentID 
	WHERE a.isActive = false AND a.applicantID = applicantID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_closed_appointments` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_closed_appointments`(IN applicantID BIGINT)
BEGIN
	SELECT  offer.appointmentID, offer.offerStatus, a.recruitmentID, 
			r.postName, r.salary, r.location, 
            DATE_FORMAT(offer.offerDate, '%d/%m/%Y') as "offerDate", 
            DATE_FORMAT(offer.offerLastDate, '%d/%m/%Y') as "offerLastDate"
	FROM appointments offer
	INNER JOIN applications a ON a.applicationID = offer.applicationID
	INNER JOIN recruitment r ON r.recruitmentID = a.recruitmentID
	WHERE a.applicantID = applicantID AND offer.offerStatus IN ("accepted", "rejected", "lapsed")
    ORDER BY offer.offerDate ASC; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_closed_recruitments` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_closed_recruitments`()
BEGIN
	SELECT  postName, recruitmentID, salary, location, 
			DATE_FORMAT(datePublished, "%d/%m/%Y") as 'datePublished', 
            DATE_FORMAT(appLastDate, "%d/%m/%Y") as 'appLastDate'
	FROM recruitment
	WHERE isActive = false OR (appLastDate < NOW());
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_open_applications` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_open_applications`(IN applicantID BIGINT)
BEGIN
	SELECT  a.applicationID, a.recruitmentID, 
			DATE_FORMAT(a.submissionDate, '%d/%m/%Y') as submissionDate,  
			r.postName, r.salary, r.location, r.isFrozen,
			DATE_FORMAT(r.datePublished, '%d/%m/%Y') as datePublished, 
			DATE_FORMAT(r.appLastDate, '%d/%m/%Y') as appLastDate,
            isVerified, verifyStatus,
            CASE WHEN app.isActive IS NULL THEN NULL ELSE app.offerStatus END AS 'appStatus'
	FROM applications a 
	LEFT JOIN appointments app ON app.applicationID = a.applicationID
    JOIN recruitment r ON a.recruitmentID = r.recruitmentID 
	WHERE a.isActive = true AND a.applicantID = applicantID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_profile` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_profile`(IN userID BIGINT)
BEGIN
	SELECT  applicantID, email, mobile, alternateMobile,
			firstName, lastName, dob,
			qualification, category,
			addressFirstLine, addressSecondLine,
			city, district, state, pinCode
	FROM applicants
    WHERE applicantID = userID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_ranklist` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_ranklist`(IN recruitmentID VARCHAR(12))
BEGIN
	SELECT GROUP_CONCAT(
		DISTINCT CONCAT("MAX(CASE WHEN subjects.subjectID = '", s.subjectID, "' THEN results.result ELSE 0 END) AS '", s.subjectName, "'")
			ORDER BY s.priority ASC
		) INTO @pivot_query
	FROM subjects s
	WHERE s.recruitmentID = recruitmentID;
    
	IF (SELECT !recruitment.isFrozen FROM recruitment WHERE recruitment.recruitmentID = recruitmentID) THEN
	BEGIN
		SELECT CONCAT("SELECT * FROM rank_table_", recruitmentID) into @select_table_query;
		SELECT CONCAT("DROP TABLE IF EXISTS rank_table_", recruitmentID) into @drop_table_query;
			
		PREPARE stmt FROM @drop_table_query;
		EXECUTE stmt;
		DEALLOCATE PREPARE stmt;

		SELECT GROUP_CONCAT(
			DISTINCT CONCAT (s.subjectName, " DESC")
				ORDER BY s.priority ASC
			) INTO @subject_query
			FROM subjects s
		WHERE s.recruitmentID = recruitmentID;
			
		SELECT GROUP_CONCAT(
			DISTINCT CONCAT ("rt.", s.subjectName)
				ORDER BY s.priority ASC
			) INTO @rank_subject_query
			FROM subjects s
		WHERE s.recruitmentID = recruitmentID;

		SET @sql = CONCAT (
			"CREATE TABLE rank_table_", recruitmentID ," AS SELECT
				ROW_NUMBER() OVER (ORDER BY total DESC, ", @subject_query, ", dob DESC) as 'rank',
				rt.applicationID,
				rt.applicantName,
				rt.applicantID,
				rt.dob,
				rt.total,", @rank_subject_query, 
				" 
			FROM (SELECT v.* FROM (SELECT	
					applications.applicationID, 
					CONCAT(applicants.firstName, ' ' , applicants.lastName) AS 'applicantName', 
					applicants.applicantID, 
					date_format(applicants.dob, '%d/%m/%Y') as dob, 
					SUM(CASE WHEN subjects.recruitmentID = '", recruitmentID, "' THEN results.result ELSE 0 END) as total, ", 
					@pivot_query,
				"FROM applications applications 
				JOIN applicants applicants ON applications.applicantID = applicants.applicantID
				INNER JOIN results results ON applications.applicationID = results.applicationID 
				INNER JOIN subjects subjects ON subjects.subjectID = results.subjectID
				WHERE applications.recruitmentID = '", recruitmentID , "' 
				GROUP BY applications.applicationID) as v) as rt; "); 
				
		PREPARE stmt FROM @sql;
		EXECUTE stmt;
		DEALLOCATE PREPARE stmt;
		
		PREPARE stmt FROM @select_table_query;
		EXECUTE stmt;
		DEALLOCATE PREPARE stmt;
	END;
    
    ELSE 
    BEGIN
		SET @sql = CONCAT("SELECT	r.rank,
							applications.applicationID, 
							CONCAT(applicants.firstName, ' ' , applicants.lastName) AS 'applicantName', 
							applicants.applicantID, 
							date_format(applicants.dob, '%d/%m/%Y') as dob, 
							SUM(CASE WHEN subjects.recruitmentID = 'R003' THEN results.result ELSE 0 END) as total, ", 
							@pivot_query,
							" FROM applications applications
					INNER JOIN ranklist r ON r.applicationID = applications.applicationID
                    INNER JOIN applicants applicants ON applicants.applicantID = applications.applicantID
					INNER JOIN results results ON applications.applicationID = results.applicationID 
					INNER JOIN subjects subjects ON subjects.subjectID = results.subjectID
					WHERE applications.recruitmentID = '", recruitmentID , "' 
					GROUP BY applications.applicationID, r.rank
                    ORDER BY r.rank");

		PREPARE stmt FROM @sql;
		EXECUTE stmt;
		DEALLOCATE PREPARE stmt ;
    END;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_recruitments_manage` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_recruitments_manage`()
BEGIN
	SELECT  recruitmentID,
			postName,
			salary,
			location,
			vacancyTotal,
			vacancyGEN,
			vacancySC,
			vacancyST,
			vacancyOBC,
            datePublished,
			appLastDate,
            isPublished,
            advertFileName
	FROM recruitment;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_recruitment_data_ranklist` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_recruitment_data_ranklist`(IN recruitmentID VARCHAR(12))
BEGIN
SELECT  (SELECT COUNT(applicationID) from applications a WHERE a.recruitmentID = recruitmentID) as applicationCount,
		(SELECT COUNT(DISTINCT applicationID) from results WHERE results.recruitmentID = recruitmentID) as applicationResultCount, 
        ((SELECT COUNT(applicationID) from applications a WHERE a.recruitmentID = recruitmentID) 
         - (SELECT COUNT(DISTINCT applicationID) from results WHERE results.recruitmentID = recruitmentID)) as applicationNonResultCount
FROM recruitment post
WHERE post.recruitmentID = recruitmentID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_recruitment_details_appointments` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_recruitment_details_appointments`(IN recruitmentID VARCHAR(12))
BEGIN
SELECT  r.postName,
		r.location,
		r.vacancytotal,
		r.vacancyGEN,
		r.vacancyST,
		r.vacancySC,
		r.vacancyOBC,
		COUNT(CASE WHEN a.recruitmentID = r.recruitmentID THEN 1 END) as 'applicationCount',
        COUNT(CASE WHEN ap.applicationID = a.applicationID THEN 1 END) as 'appointmentCount',
		COUNT(CASE WHEN ap.applicationID = a.applicationID AND ap.offerStatus = "open" THEN 1 END) as 'open',
		COUNT(CASE WHEN ap.applicationID = a.applicationID AND ap.offerStatus = "accepted" THEN 1 END) as 'accepted',
		COUNT(CASE WHEN ap.applicationID = a.applicationID AND (ap.offerStatus = "rejected" OR ap.offerStatus = "lapsed") THEN 1 END) as 'rejected_lapsed'
	FROM recruitment r
	RIGHT JOIN applications a ON a.recruitmentID = r.recruitmentID
	LEFT JOIN appointments ap ON ap.applicationID = a.applicationID
	WHERE r.recruitmentID = recruitmentID
    GROUP BY r.recruitmentID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_results` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_results`(IN recruitmentID VARCHAR(12))
BEGIN
	SELECT GROUP_CONCAT(
	DISTINCT CONCAT("MAX(CASE WHEN subjects.subjectID = '", s.subjectID, "' THEN results.result ELSE 0 END) AS '", s.subjectName, "'")
		ORDER BY s.priority ASC
	) INTO @pivot_query
	FROM subjects s
	WHERE s.recruitmentID = recruitmentID;

	SET @sql = CONCAT (
	"SELECT applications.applicationID, CONCAT(applicants.firstName, ' ' , applicants.lastName) AS 'applicantName', applicants.applicantID, applicants.dob, ", @pivot_query,
	"FROM applications applications 
	JOIN applicants applicants ON applications.applicantID = applicants.applicantID
    INNER JOIN results results ON applications.applicationID = results.applicationID 
	INNER JOIN subjects subjects ON subjects.subjectID = results.subjectID
    WHERE applications.recruitmentID = '", recruitmentID , "' 
	GROUP BY applications.applicationID"); 

	PREPARE stmt FROM @sql;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `modify_subjects` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `modify_subjects`(IN recruitmentID VARCHAR(12), subjects JSON)
BEGIN
	CREATE TEMPORARY TABLE temp_subjects
    SELECT recruitmentID AS 'recruitmentID', jt.* FROM JSON_TABLE(
		subjects,
        '$[*]' COLUMNS (
			subjectName VARCHAR(45) PATH '$.subjectName',
            priority INT PATH '$.priority'
        )
    ) as jt;
    
    DELETE FROM subjects
    WHERE subjects.recruitmentID = recruitmentID;
    
    INSERT INTO subjects (recruitmentID, subjectName, priority)
    SELECT * FROM temp_subjects;
    
    DROP TEMPORARY TABLE temp_subjects;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `recruiter_login` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `recruiter_login`(IN email VARCHAR(45))
BEGIN
	SELECT a.recruiterID, a.email, p.pwd FROM recruiters a 
	INNER JOIN passwordrecruiter p ON a.recruiterID = p.recruiterID
	WHERE a.email = email;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `register` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `register`(IN details JSON)
BEGIN
	INSERT INTO applicants (applicantID, firstName, lastName, 
							email, mobile, alternateMobile, dob, 
							qualification, category, 
							addressFirstLine, addressSecondLine,
                            city, district, state, pinCode) 
    SELECT * FROM JSON_TABLE(
    details,
    '$[*]' COLUMNS (
		applicantID BIGINT UNSIGNED PATH '$.applicantID',
        firstName VARCHAR(45) PATH '$.firstName',
		lastName VARCHAR(45) PATH '$.lastName',
        email VARCHAR(45) PATH '$.email',
        mobile BIGINT UNSIGNED PATH '$.mobile',
        alternateMobile BIGINT UNSIGNED PATH '$.alternateMobile',
        dob DATE PATH '$.dob',
        qualification VARCHAR(45) PATH '$.qualification',
        category VARCHAR(45) PATH '$.category',
        addressFirstLine VARCHAR(45) PATH '$.addressFirstLine',
        addressSecondLine VARCHAR(45) PATH '$.addressSecondLine',
        city VARCHAR(45) PATH '$.city',
        district VARCHAR(45) PATH '$.district',
        state VARCHAR(45) PATH '$.state',
        pinCode INT PATH '$.pinCode'
    )) AS jt;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `reject` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `reject`(IN appointmentID VARCHAR(12))
BEGIN
	UPDATE appointments
    SET offerStatus = "rejected"
    WHERE appointmentID = appointmentID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `save_password` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `save_password`(IN details JSON)
BEGIN
	INSERT INTO passwordrecruitee (applicantID, pwd)
    SELECT * FROM JSON_TABLE(
		details,
		'$[*]' COLUMNS (
			applicantID BIGINT PATH '$.applicantID',
            pwd VARCHAR(256) PATH '$.pwd'
        )
    ) as jt;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `save_results` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `save_results`(IN recruitmentID VARCHAR(12), results JSON)
BEGIN
	
    CREATE TEMPORARY TABLE temp_results (
		recruitmentID VARCHAR(12),
		applicationID VARCHAR(45),
		subjectID VARCHAR(6),
		result INT);
    
    INSERT INTO temp_results (recruitmentID, applicationID, subjectID, result) 
    SELECT 
		recruitmentID as 'recruitmentID', 
        jt.* FROM JSON_TABLE (
			results, 
			'$[*]' COLUMNS (
				applicationID VARCHAR(45) PATH '$.applicationID',
				subjectID VARCHAR(6) PATH '$.subjectID',
				result INT PATH '$.result'
			) 
		) AS jt;
    
	INSERT INTO results (recruitmentID, applicationID, subjectID, result) 
    SELECT * FROM temp_results
    ON DUPLICATE KEY UPDATE 
		result = VALUES(result);
	
    DELETE FROM results
    WHERE results.recruitmentID = recruitmentID
    AND applicationID NOT IN (SELECT applicationID FROM temp_results);

    DROP TEMPORARY TABLE temp_results;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `send_appointment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `send_appointment`(IN applications JSON, recruiterID VARCHAR(12))
BEGIN
	INSERT INTO appointments (appointmentID, applicationID, submittedBy)
    SELECT jt.appointmentID, jt.applicationID, recruiterID as rID FROM JSON_TABLE(
		applications,
		'$[*]' COLUMNS (
			appointmentID VARCHAR(06) PATH '$.appointmentID',
            applicationID VARCHAR(45) PATH '$.applicationID'
        ) 
    ) as jt;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateApplications` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateApplications`()
BEGIN
	UPDATE applications a
    JOIN recruitment r ON r.recruitmentID = a.recruitmentID
    SET
		a.isActive = false
		WHERE r.isActive = false;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-15 20:14:11
