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
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES
(1,'admin','admin@123','admin@swiftmeds.com','admin'),
(56,'DrJohn','john@123','john@swiftmeds.com','doctor'),
(57,'DrAlice','alice@123','alice@swiftmeds.com','doctor'),
(58,'DrMichael','michael@123','michael@swiftmeds.com','doctor'),
(59,'DrEmily','emily@123','emily@swiftmeds.com','doctor'),
(60,'DrDaniel','daniel@123','daniel@swiftmeds.com','doctor'),
(61,'John','john@123','john@swiftmeds.com','patient'),
(62,'Alice','alice@123','alice@swiftmeds.com','patient'),
(63,'Michael','michael@123','michael@swiftmeds.com','patient'),
(64,'Emily','emily@123','emily@swiftmeds.com','patient'),
(65,'Daniel','daniel@123','daniel@swiftmeds.com','patient');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb3 */ ;
/*!50003 SET character_set_results = utf8mb3 */ ;
/*!50003 SET collation_connection  = utf8mb3_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`swiftmeds`@`localhost`*/ /*!50003 TRIGGER insert_into_doctors
AFTER INSERT ON accounts
FOR EACH ROW
BEGIN
    IF NEW.type = 'doctor' THEN
        INSERT INTO doctors (id, username, password, email, type)
        VALUES (NEW.id, NEW.username, NEW.password, NEW.email, NEW.type);
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES
(56,'DrJohn','john@123','john@swiftmeds.com','doctor'),
(57,'DrAlice','alice@123','alice@swiftmeds.com','doctor'),
(58,'DrMichael','michael@123','michael@swiftmeds.com','doctor'),
(59,'DrEmily','emily@123','emily@swiftmeds.com','doctor'),
(60,'DrDaniel','daniel@123','daniel@swiftmeds.com','doctor');
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
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
  `img` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicine`
--

LOCK TABLES `medicine` WRITE;
/*!40000 ALTER TABLE `medicine` DISABLE KEYS */;
INSERT INTO `medicine` VALUES
(1,'Hand Sanitizer 500ml',10,100.00,'handsanitizer500ml.png','It is one of its kin hygiene product that kills 99.99% germs. It also keeps your hands soft and moisturised.'),
(2,'Shampoo & Conditioner 180ml',11,200.00,'shampoo&conditioner180ml.png','Advanced formula facilitates deep cleansing to help make your scalp fight dandruff and itchiness.'),
(3,'Moisturizing Cream 100gm',5,150.00,'moisturizingcream100gm.png','Keratolytic qualities of moisturex cream can smoothe rough, scaly skin. It makes the skin healthy, fully protected, and shiny.'),
(4,'Anti Bacterial Soap',7,25.00,'antibacterialsoap.png','Provide protection against germs. It has triclosan that helps to keep your body clean and protected.'),
(5,'Paracetamol',1,50.00,'antibacterialsoap.png','Helps to get rid of fever from body.'),
(6,'Medicine 1',100,10.99,'antibacterialsoap.png','Helps to relieve pain and reduce inflammation.'),
(7,'Medicine 2',150,15.99,'antibacterialsoap.png','Provides fast relief from cold and flu symptoms.'),
(8,'Medicine 3',80,8.49,'antibacterialsoap.png','Effective in treating allergies and hay fever.'),
(9,'Medicine 4',120,12.79,'antibacterialsoap.png','Relieves symptoms of indigestion and heartburn.'),
(10,'Medicine 5',200,18.99,'antibacterialsoap.png','Helps to lower cholesterol levels and improve heart health.'),
(11,'Medicine 6',90,9.99,'antibacterialsoap.png','Aids in weight loss and boosts metabolism.'),
(12,'Medicine 7',110,11.29,'antibacterialsoap.png','Promotes relaxation and relieves stress and anxiety.'),
(13,'Medicine 8',70,7.99,'antibacterialsoap.png','Improves memory and cognitive function.'),
(14,'Medicine 9',130,14.49,'antibacterialsoap.png','Strengthens the immune system and helps fight infections.'),
(15,'Medicine 10',160,16.99,'antibacterialsoap.png','Supports healthy digestion and relieves constipation.'),
(16,'Medicine 11',95,10.79,'antibacterialsoap.png','Promotes healthy skin and reduces acne.'),
(17,'Medicine 12',105,11.99,'antibacterialsoap.png','Relieves menstrual cramps and symptoms of PMS.'),
(18,'Medicine 13',180,17.49,'antibacterialsoap.png','Provides essential nutrients and vitamins.'),
(19,'Medicine 14',0,9.49,'antibacterialsoap.png','Improves sleep quality and regulates sleep patterns.');
/*!40000 ALTER TABLE `medicine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `pin_code` int(11) NOT NULL,
  `card_name` varchar(100) NOT NULL,
  `card_number` varchar(16) NOT NULL,
  `exp_month` varchar(20) NOT NULL,
  `exp_year` int(11) NOT NULL,
  `cvv` int(11) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb3 */ ;
/*!50003 SET character_set_results = utf8mb3 */ ;
/*!50003 SET collation_connection  = utf8mb3_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`swiftmeds`@`localhost`*/ /*!50003 TRIGGER update_user_id_trigger
BEFORE INSERT ON orders
FOR EACH ROW
BEGIN
    DECLARE user_id_value INT;
    SELECT id INTO user_id_value FROM accounts WHERE username = NEW.username;
    SET NEW.user_id = user_id_value;
END */;;
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

-- Dump completed on 2024-04-27 12:21:07
