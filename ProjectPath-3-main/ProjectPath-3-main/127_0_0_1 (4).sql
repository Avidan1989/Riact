-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 08, 2025 at 09:45 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `products_db`
--
CREATE DATABASE IF NOT EXISTS `products_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `products_db`;

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `image`, `content`, `path`) VALUES
(1, 'ניהול מלאי', 'products.jpg', 'מעקב אחר מצב המלאי בעגלת הקפה.', '/manger-product'),
(2, 'ניהול עובדים', 'arrangement.jpg', 'ניהול סידורי העבודה עבור העובדים.', '/arrangement'),
(3, 'דוחות', 'reports.jpg', 'צפייה בדוחות המכירות היומיים, שבועיים וחודשיים.', '/reports'),
(4, 'מבצעים ואירועים', 'messege.jpg', 'ניהול מבצעים ואירועים עבור לקוחות העגלה.', '/messege'),
(5, 'תחזוקה', 'sales.jpg', 'צפייה בהתראות תחזוקה וטיפול בציוד.', '/sales');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `manufacturer` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `experienceDate` date NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `manufacturer`, `price`, `experienceDate`, `quantity`) VALUES
(1, 'hhhhh', 'Manufacturer1', '29.99', '2025-12-31', 100),
(17, 'לחמניות', 'אגמי', '8.10', '2025-02-14', 2),
(18, 'לחמניות', 'אגמי', '8.99', '2025-02-13', 2),
(19, 'לחמניות', 'אג', '8.99', '2025-02-27', 2),
(20, 'ל', 'אגמי', '8.99', '2025-02-05', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `id_number` varchar(9) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` varchar(50) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `id_number`, `email`, `phone`, `first_name`, `last_name`, `username`, `password_hash`, `role`) VALUES
(11, '316397389', 'bar54547@gmail.com', '0506456887', 'בר', 'כהן', 'root', '$2b$10$0nHIKwWjCB9g1iYyfe7WfOTEk6gpzqF4npYO1HAqVdTB5PNm2kT4C', 'admin'),
(12, '111111111', 'bar111@gmail.com', '0501111111', 'isreal', 'isreal', 'israel', '$2b$10$4MfV3wl0UDvprZh7G8f/LuT4jkNFprJJq6tR8Cuc9uWbNgvMhMtBq', 'employee'),
(13, '123456789', 'bar545@gmail.com', '0506456887', 'בר', 'כהן', 'lllooo', '$2b$10$zZKilETeTV7f6KwepKJbxejrnXkpiK4VRRs0C.0fNf1hjNNROiTMq', 'employee'),
(14, '201519329', 'avidab1989@gmail.com', '0543320933', 'אבידן', 'סלומי', 'AvidanTheKing', '$2b$10$oC6nck58uuu96sWREUOg.u8zCok4sLYNvY0Gv.fV0AZEa0i4vNBuW', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
