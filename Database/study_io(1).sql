-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 20, 2020 at 03:38 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `study.io`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `commenter` varchar(255) NOT NULL,
  `comment` varchar(2000) NOT NULL,
  `postId` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`commenter`, `comment`, `postId`, `id`) VALUES
('brad', 'Hey man. Stop posting rubbish lol', 14, 1),
('brad', 'Idk man. Imma see if I can make up for my holidays. ', 13, 2),
('brad', 'Lol. Cringe times', 5, 3),
('taylor', 'Man you one OC ', 5, 4),
('taylor', 'I dont know man. Imma head out', 5, 5),
('pittstop', 'Lmao. Speak in a native language man. You know we can\'t understand this ', 14, 6);

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `follower` varchar(255) NOT NULL,
  `following` varchar(255) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`follower`, `following`, `id`) VALUES
('brad', 'usman', 2),
('brad', 'dual', 3),
('brad', 'taylor', 4),
('pittstop', 'taylor', 5),
('taylor', 'brad', 6);

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `postId` int(11) NOT NULL,
  `likedbyuname` varchar(255) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`postId`, `likedbyuname`, `id`) VALUES
(2, 'usman', 1),
(2, 'dual', 2),
(3, 'brad', 18),
(1, 'brad', 19),
(4, 'brad', 21),
(16, 'brad', 23),
(17, 'brad', 24),
(12, 'brad', 25),
(14, 'pittstop', 26),
(2, 'taylor', 27),
(5, 'brad', 29),
(5, 'taylor', 30),
(14, 'brad', 31);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `uname` varchar(255) NOT NULL,
  `post` varchar(2000) NOT NULL,
  `likes` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`uname`, `post`, `likes`, `id`) VALUES
('brad', 'Hi this is my first post', 1, 1),
('brad', 'Hi this is my Second Post', 3, 2),
('brad', 'Hi this is my third post with no likes', 1, 3),
('brad', 'This is my fifth posts with id dynamically coming from the database. Hope it works out :O (Here is some edited part I forgot to add previously). Editing again to see how stuff works out', 2, 5),
('taylor', 'Recusandae nihil sapiente dolorum. Labore aspernatur ipsa. Dolores soluta necessitatibus molestiae perspiciatis repellat quo mollitia molestiae.', 1, 12),
('taylor', 'Velit repellat velit autem. Nobis reiciendis eligendi voluptas. Vero tenetur aliquid et aut laudantium vitae. Fugit qui dignissimos ipsum asperiores.', 0, 13),
('taylor', 'Veniam quia quisquam rerum suscipit saepe dolores. Ea sunt aut accusantium voluptates error officia quis eum. Et dolores quasi hic itaque laudantium sapiente. Delectus quos consequatur facilis.', 2, 14),
('pittstop', 'I am feeling good about it hmn', 0, 21),
('pittstop', 'Thank God. The sites set up', 0, 22);

-- --------------------------------------------------------

--
-- Table structure for table `profileimage`
--

CREATE TABLE `profileimage` (
  `uname` varchar(255) NOT NULL,
  `imageName` varchar(255) NOT NULL,
  `ext` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `uname` varchar(255) NOT NULL,
  `id` int(11) NOT NULL,
  `profileStatus` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`fname`, `lname`, `pwd`, `uname`, `id`, `profileStatus`) VALUES
('Brad', 'Traversy', 'brad', 'brad', 1, 0),
('Taylor', 'Swift', 'taylor', 'taylor', 2, 0),
('Dua', 'Lipa', 'dual', 'dual', 3, 0),
('Brad', 'Pitt', 'pittstop', 'pittstop', 4, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
