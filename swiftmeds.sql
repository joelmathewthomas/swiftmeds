-- MariaDB dump 10.19-11.3.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: swiftmeds
-- ------------------------------------------------------
-- Server version	11.3.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL DEFAULT 'patient',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES
(1,'admin','admin@123','admin@swiftmeds.com','admin'),
(13,'DrJohnDoe','John@123','JohnDoe@swiftmeds@123','doctor'),
(14,'DrSarahSmith','Sarah@123','SarahSmith@swiftmeds@123','doctor'),
(15,'DrMichaelJohnson','Michael@123','MichaelJohnson@swiftmeds@123','doctor'),
(16,'DrEmilyBrown','Emily@123','EmilyBrown@swiftmeds@123','doctor'),
(17,'DrDavidJones','David@123','DavidJones@swiftmeds@123','doctor'),
(18,'DrEmmaWilliams','Emma@123','EmmaWilliams@swiftmeds@123','doctor'),
(19,'DrDanielTaylor','Daniel@123','DanielTaylor@swiftmeds@123','doctor'),
(20,'DrOliviaMartinez','Olivia@123','OliviaMartinez@swiftmeds@123','doctor'),
(21,'DrWilliamAnderson','William@123','WilliamAnderson@swiftmeds@123','doctor'),
(22,'DrSophiaJackson','Sophia@123','SophiaJackson@swiftmeds@123','doctor'),
(24,'JohnDoe','John@123','JohnDoe@swiftmeds@123','patient'),
(25,'SarahSmith','Sarah@123','SarahSmith@swiftmeds@123','patient'),
(26,'MichaelJohnson','Michael@123','MichaelJohnson@swiftmeds@123','patient'),
(27,'EmilyBrown','Emily@123','EmilyBrown@swiftmeds@123','patient'),
(28,'DavidJones','David@123','DavidJones@swiftmeds@123','patient'),
(29,'EmmaWilliams','Emma@123','EmmaWilliams@swiftmeds@123','patient'),
(30,'DanielTaylor','Daniel@123','DanielTaylor@swiftmeds@123','patient'),
(31,'OliviaMartinez','Olivia@123','OliviaMartinez@swiftmeds@123','patient'),
(32,'WilliamAnderson','William@123','WilliamAnderson@swiftmeds@123','patient'),
(33,'SophiaJackson','Sophia@123','SophiaJackson@swiftmeds@123','patient'),
(45,'DrAdithyanAs','adithyanas@swiftmeds@123.com','AdithyanAS@swiftmeds.com','doctor'),
(49,'Amal','Amal@123','Amal@swiftmeds.com','patient');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicine`
--

DROP TABLE IF EXISTS `medicine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medicine` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicine`
--

LOCK TABLES `medicine` WRITE;
/*!40000 ALTER TABLE `medicine` DISABLE KEYS */;
INSERT INTO `medicine` VALUES
(1,'Hand Sanitizer 500ml',10,100.00),
(2,'Shampoo & Conditioner 180ml',11,200.00),
(3,'Moisturizing Cream 100gm',5,150.00),
(4,'Anti Bacterial Soap',7,25.00);
/*!40000 ALTER TABLE `medicine` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-16  0:22:39
