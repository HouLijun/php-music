-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-03-30 10:37:19
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `music`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin_user`
--

CREATE TABLE IF NOT EXISTS `admin_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `hash` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `admin_user`
--

INSERT INTO `admin_user` (`id`, `account`, `password`, `hash`) VALUES
(1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', '88468d8478342c7b664e011062129a10');

-- --------------------------------------------------------

--
-- 表的结构 `album`
--

CREATE TABLE IF NOT EXISTS `album` (
  `album_id` int(12) NOT NULL AUTO_INCREMENT,
  `album_name` varchar(255) NOT NULL,
  `album_pic` varchar(255) NOT NULL,
  `artist_id` int(12) NOT NULL,
  `cate_id` int(12) NOT NULL,
  `primary_music` int(12) DEFAULT NULL,
  PRIMARY KEY (`album_id`),
  KEY `cate_id` (`cate_id`),
  KEY `artist_id` (`artist_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=66 ;

--
-- 转存表中的数据 `album`
--

INSERT INTO `album` (`album_id`, `album_name`, `album_pic`, `artist_id`, `cate_id`, `primary_music`) VALUES
(6, '天竺少女', '/music/static/images/tzsv.jpg', 9, 1, 0),
(7, 'New Day', '/music/static/images/newday.jpg', 10, 1, 0),
(8, '光年之外', '/music/static/images/gnzw.jpg', 11, 1, 0),
(9, '施文彬电音本铺', '/music/static/images/施文彬.jpg', 12, 1, 0),
(10, '爱情故事', '/music/static/images/爱情故事.jpg', 13, 1, 0),
(11, '一枝孤芳', '/music/static/images/一枝孤芳.jpg', 14, 1, 0),
(12, '喜气洋洋 福到万家', '/music/static/images/喜气洋洋.jpg', 15, 1, 0),
(13, '我赖你', '/music/static/images/我赖你.jpg', 16, 1, 0),
(14, '爱在当下', '/music/static/images/爱在当下.jpg', 17, 1, 0),
(15, '桃花旗袍', '/music/static/images/桃花旗袍.jpg', 18, 1, 0),
(16, '初.爱(影音典藏版)', '/music/static/images/初爱.jpg', 19, 1, 0),
(17, '绅士', '/music/static/images/绅士.jpg', 20, 1, 0),
(18, 'Sorry(对不起)', '/music/static/images/sorry.jpg', 21, 2, 0),
(19, 'Demi (黛米·洛瓦托同名专辑)', '/music/static/images/demi.jpg', 22, 2, 0),
(20, 'Honeymoon (蜜月)', '/music/static/images/Honeymoon.jpg', 23, 2, 0),
(21, 'V (Deluxe Version)V（豪华版)', '/music/static/images/V (Deluxe Version).jpg', 24, 2, 0),
(22, 'Libra (天秤)', '/music/static/images/Libra.jpg', 25, 2, 0),
(23, 'Sonny', '/music/static/images/Sonny.jpg', 26, 2, 0),
(24, 'Boss Sounds', '/music/static/images/Boss Sounds.jpg', 27, 2, 0),
(25, 'Deserts', '/music/static/images/Deserts.jpg', 28, 2, 0),
(26, 'Fire In My Soul', '/music/static/images/Fire In My Soul.jpg', 29, 2, 0),
(27, 'Easy (Acoustic)', '/music/static/images/Easy(Acoustic).jpg', 30, 2, 0),
(28, 'You Redeem (Studio Version)', '/music/static/images/You Redeem (Studio Version).jpg', 31, 2, 0),
(29, 'You''re My Star', '/music/static/images/You''re My Star.jpg', 32, 2, 0),
(30, '똑 똑 똑 (Knock Knock Knock)', '/music/static/images/똑 똑 똑 (Knock Knock Knock).jpg', 33, 3, 0),
(31, '单曲 - 三只小熊女声韩语', '/music/static/images/三只小熊.jpg', 34, 3, 0),
(32, 'First Beginning II', '/music/static/images/First Beginning II.jpg', 35, 3, 0),
(33, 'Best Of K-Pop', '/music/static/images/Best Of K-Pop.jpg', 36, 3, 0),
(34, 'If You and Me', '/music/static/images/If You and Me.jpg', 37, 3, 0),
(35, 'SUPER HITS', '/music/static/images/SUPER HITS.jpg', 38, 3, 0),
(36, '韩剧恋人', '/music/static/images/韩剧恋人.jpg', 39, 3, 0),
(37, 'You Bring Tears to My Eyes', '/music/static/images/You Bring Tears to My Eyes.jpg', 40, 3, 0),
(38, 'A K-Pop Rookie Salute', '/music/static/images/A K-Pop Rookie Salute.jpg', 41, 3, 0),
(39, '单曲 - 三心二意(韩文)', '/music/static/images/三心二意.jpg', 42, 3, 0),
(40, 'Wind', '/music/static/images/Wind.jpg', 43, 3, 0),
(41, 'State Of Emergency', '/music/static/images/State Of Emergency.jpg', 44, 3, 0),
(54, 'Beautiful Hangover', '/music/static/images/Beautiful Hangover.jpg', 45, 4, 0),
(55, 'Sexy Love (Japanese Ver.)', '/music/static/images/Sexy Love.jpg', 46, 4, 0),
(56, 'WAVE', '/music/static/images/WAVE.jpg', 47, 4, 0),
(57, 'U&I (初回限定盘)', '/music/static/images/U&I.jpg', 48, 4, 0),
(58, 'The Wall 长城', '/music/static/images/The Wall 长城.jpg', 49, 4, 0),
(59, 'GO AWAY', '/music/static/images/GO AWAY.jpg', 50, 4, 0),
(60, 'Truth', '/music/static/images/Truth.jpg', 51, 4, 0),
(61, 'yayaya', '/music/static/images/yayaya.jpg', 52, 4, 0),
(62, 'The Show', '/music/static/images/The Show.jpg', 53, 4, 0),
(63, '邓丽君 璀璨东瀛原音集', '/music/static/images/邓丽君.jpg', 54, 4, 0),
(64, 'I LOVE YOU (CD Single)', '/music/static/images/I LOVE YOU.jpg', 55, 4, 0),
(65, 'NOLZA', '/music/static/images/NOLZA.jpg', 55, 2, 0);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `album_list`
--
CREATE TABLE IF NOT EXISTS `album_list` (
`album_id` int(12)
,`album_name` varchar(255)
,`album_pic` varchar(255)
,`artist_name` varchar(255)
,`cate_name` varchar(255)
);
-- --------------------------------------------------------

--
-- 表的结构 `artist`
--

CREATE TABLE IF NOT EXISTS `artist` (
  `artist_id` int(12) NOT NULL AUTO_INCREMENT,
  `artist_name` varchar(255) NOT NULL,
  `artist_sex` smallint(1) NOT NULL,
  `artist_age` int(12) NOT NULL,
  `artist_avatar` varchar(255) NOT NULL,
  PRIMARY KEY (`artist_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=56 ;

--
-- 转存表中的数据 `artist`
--

INSERT INTO `artist` (`artist_id`, `artist_name`, `artist_sex`, `artist_age`, `artist_avatar`) VALUES
(9, '岳云鹏', 1, 39, ''),
(10, '黄子韬', 1, 39, '/music/static/images/gnzw.jpg'),
(11, 'G.E.M.邓紫棋', 2, 39, '/music/static/images/gnzw.jpg'),
(12, '施文彬', 1, 39, '/php/4.png'),
(13, '何洁', 2, 39, '/php/4.png'),
(14, '钟汉良', 1, 39, '/php/4.png'),
(15, '新七小福', 1, 39, '/php/4.png'),
(16, '苏打绿', 1, 39, '/php/4.png'),
(17, '邰正宵', 1, 39, '/php/4.png'),
(18, 'BY2', 2, 39, '/php/4.png'),
(19, '杨宗纬', 1, 39, '/php/4.png'),
(20, '薛子谦', 1, 39, '/php/4.png'),
(21, 'Justin Bieber(贾斯汀·比伯)', 1, 39, '/php/4.png'),
(22, 'Demi Lovato (黛米·洛瓦托)', 2, 39, '/php/4.png'),
(23, 'Lana Del Rey (拉娜·德雷)', 2, 39, '/php/4.png'),
(24, 'Maroon 5 (魔力红乐团)', 1, 39, '/php/4.png'),
(25, 'Toni Braxton (唐妮·布蕾斯顿)', 1, 39, '/php/4.png'),
(26, 'Sonny Stitt (桑尼·史提特)', 2, 39, '/php/4.png'),
(27, 'Shelly Manne', 2, 39, '/php/4.png'),
(28, 'KH4OT1C', 1, 39, '/php/4.png'),
(29, 'Walk Off The Earth (离开地球)', 2, 39, '/php/4.png'),
(30, 'Seinabo Sey', 1, 39, '/php/4.png'),
(31, 'Aaron Shust', 1, 39, '/php/4.png'),
(32, 'Louis Sebastian', 2, 39, '/php/4.png'),
(33, '배다해 (裴多海)', 2, 39, '/php/4.png'),
(34, '熊妈妈', 2, 39, '/php/4.png'),
(35, '全永禄', 1, 39, '/php/4.png'),
(36, 'Korean Poptastic', 1, 39, '/php/4.png'),
(37, 'Juris', 1, 39, '/php/4.png'),
(38, 'B1A4', 1, 39, '/php/4.png'),
(39, '纯音乐', 1, 39, '/php/4.png'),
(40, '알리 (Ali)', 1, 39, '/php/4.png'),
(41, 'Korean Poptastic', 2, 39, '/php/4.png'),
(42, 'The Color (더 칼라)', 1, 39, '/php/4.png'),
(43, '쉬즈 (She''z)', 1, 39, '/php/4.png'),
(44, 'DMTN (디엠티엔)', 1, 39, '/php/4.png'),
(45, 'BIGBANG (빅뱅)', 1, 39, '/php/4.png'),
(46, 'T-ara (티아라)', 2, 39, '/music/static/images/s_case6.png'),
(47, 'CNBLUE (씨엔블루)', 1, 39, '/php/4.png'),
(48, '에일리 (Ailee)', 2, 39, '/php/4.png'),
(49, 'BEYOND', 1, 39, '/php/4.png'),
(50, '2NE1 (투애니 원)', 2, 39, '/music/static/images/NOLZA.jpg'),
(51, 'CNBLUE (씨엔블루)', 1, 39, '/music/static/images/Truth.jpg'),
(52, 'T-ara (티아라)', 2, 39, '/music/static/images/yayaya.jpg'),
(53, '罗志祥', 1, 39, '/music/static/images/The Show.jpg'),
(54, '邓丽君', 2, 39, '/music/static/images/邓丽君.jpg'),
(55, '2NE1 (투애니 원)', 2, 39, '/music/static/images/NOLZA.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `cate_id` int(12) NOT NULL AUTO_INCREMENT,
  `cate_name` varchar(255) NOT NULL,
  PRIMARY KEY (`cate_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- 转存表中的数据 `categories`
--

INSERT INTO `categories` (`cate_id`, `cate_name`) VALUES
(1, '华语'),
(2, '欧美'),
(3, '韩国'),
(4, '日本');

-- --------------------------------------------------------

--
-- 表的结构 `hot`
--

CREATE TABLE IF NOT EXISTS `hot` (
  `hot_id` int(12) NOT NULL AUTO_INCREMENT,
  `album_id` int(12) NOT NULL,
  PRIMARY KEY (`hot_id`),
  KEY `album_id` (`album_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20 ;

--
-- 转存表中的数据 `hot`
--

INSERT INTO `hot` (`hot_id`, `album_id`) VALUES
(5, 8),
(6, 10),
(7, 12),
(2, 15),
(8, 18),
(9, 20),
(10, 22),
(11, 26),
(12, 30),
(14, 31),
(13, 36),
(15, 39),
(16, 55),
(17, 57),
(18, 61),
(19, 64);

-- --------------------------------------------------------

--
-- 表的结构 `music`
--

CREATE TABLE IF NOT EXISTS `music` (
  `music_id` int(12) NOT NULL AUTO_INCREMENT,
  `music_name` varchar(255) NOT NULL,
  `music_src` varchar(255) NOT NULL,
  `music_duration` varchar(255) NOT NULL,
  `album_id` int(12) NOT NULL,
  PRIMARY KEY (`music_id`),
  KEY `album_id` (`album_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=110 ;

--
-- 转存表中的数据 `music`
--

INSERT INTO `music` (`music_id`, `music_name`, `music_src`, `music_duration`, `album_id`) VALUES
(5, '天竺少女', '/music/static/musics/岳云鹏_柳岩 - 天竺少女.mp3', '02:53', 6),
(58, 'New day', '/music/static/musics/黄子韬 - New day.mp3', '03:18', 7),
(59, '她(Live)', '/music/static/musics/赵洋 - 她 (Live).mp3', '03:32', 7),
(60, '光年之外', '/music/static/musics/G.E.M. 邓紫棋 - 光年之外.mp3', '03:55', 8),
(61, '只是想告诉你', '/music/static/musics/施文彬_梁一贞 - 只是想要告诉你.mp3', '04:41', 9),
(62, '天之骄子', '/music/static/musics/施文彬_鄞雅茹 - 天之骄子.mp3', '05:11', 9),
(63, '爱情故事', '/music/static/musics/何洁 - 爱情故事.mp3', '05:12', 10),
(64, '一枝孤芳', '/music/static/musics/钟汉良 - 一枝孤芳.mp3', '04:19', 11),
(65, '喜气洋洋 福到万家', '/music/static/musics/新七小福 - 喜气洋洋 福到万家.mp3', '03:29', 12),
(66, '我赖你', '/music/static/musics/苏打绿 - 我赖你.mp3', '04:18', 13),
(67, '爱在当下', '/music/static/musics/邰正宵 - 爱在当下.mp3', '04:19', 14),
(68, '一起筑梦', '/music/static/musics/邰正宵 - 一起筑梦.mp3', '04:00', 14),
(69, '桃花旗袍', '/music/static/musics/BY2 - 桃花旗袍.mp3', '03:45', 15),
(70, '其实都没有', '/music/static/musics/杨宗纬 - 其实都没有.mp3', '03:51', 16),
(71, '初爱', '/music/static/musics/杨宗纬 - 初爱.mp3', '03:53', 16),
(72, '绅士', '/music/static/musics/薛之谦 - 绅士.mp3', '04:51', 17),
(73, '演员', '/music/static/musics/薛之谦 - 演员.mp3', '04:21', 17),
(74, 'Sorry', '/music/static/musics/Justin Bieber - Sorry.mp3', '03:20', 18),
(75, 'Heart Attack', '/music/static/musics/Demi Lovato - Heart Attack.mp3', '03:30', 19),
(76, 'Honeymoon', '/music/static/musics/Lana Del Rey - Honeymoon.mp3', '05:50', 20),
(77, 'Maps', '/music/static/musics/Maroon 5 - Maps.mp3', '03:10', 21),
(78, 'Please', '/music/static/musics/Toni Braxton - Please.mp3', '03:57', 22),
(79, 'Duketation', '/music/static/musics/Sonny Stitt - Duketation.mp3', '02:51', 23),
(80, 'Margie', '/music/static/musics/Shelly Manne - Margie.mp3', '07:31', 24),
(81, 'Deserts', '/music/static/musics/KH4OT1C - Deserts.mp3', '03:07', 25),
(82, 'Fire In May Soul', '/music/static/musics/Walk Off The Earth - Fire In My Soul.mp3', '03:34', 26),
(83, 'Easy(Acoustic)', '/music/static/musics/Seinabo Sey - Easy (Acoustic).mp3', '03:28', 27),
(84, 'You Redeem (Studio Version)', '/music/static/musics/Aaron Shust - You Redeem (Studio Version).mp3', '03:42', 28),
(85, 'You''re My Star(Radio Edit)', '/music/static/musics/Louis Sebastian - You''re My Star (Radio Edit).mp3', '03:35', 29),
(86, '똑 똑 똑 (Knock Knock Knock)', '/music/static/musics/배다해 (裴多海) - 똑 똑 똑 (Knock Knock Knock).mp3', '04:33', 30),
(87, '곰 세마리 (三只小熊)', '/music/static/musics/熊妈妈 - 곰 세마리 (三只小熊).mp3', '02:07', 31),
(88, 'Epilogue', '/music/static/musics/全永禄 - Epilogue.mp3', '06:58', 32),
(89, 'Coup D''Etat 쿠데타', '/music/static/musics/Korean Poptastic - Coup D''Etat 쿠데타.mp3', '03:14', 33),
(90, 'If You and Me(假如我和你)', '/music/static/musics/Juris - If You And Me (如果你和我).mp3', '04:35', 34),
(91, 'SUPER SONIC', '/music/static/musics/B1A4 (비원에이포) - SUPER SONIC.mp3', '03:07', 35),
(92, 'Love Song', '/music/static/musics/群星 - Love Song.mp3', '04:13', 36),
(93, 'You Bring Tears to My Eyes (你让我落泪)', '/music/static/musics/알리 (Ali) - You Bring Tears to My Eyes (你让我落泪).mp3', '03:48', 37),
(94, 'I Will Show You 보여줄게', '/music/static/musics/Korean Poptastic - I Will Show You 보여줄게.mp3', '03:50', 38),
(95, '三心二意韩文版', '/music/static/musics/The Color (더 칼라) - 三心二意韩文版.mp3', '03:49', 39),
(96, 'Wind(风)', '/music/static/musics/쉬즈 (She''z) - Wind (风).mp3', '03:40', 40),
(97, 'E.R', '/music/static/musics/DMTN (디엠티엔) - E.R.mp3', '03:42', 41),
(98, 'Beautiful Hangover', '/music/static/musics/BIGBANG (빅뱅) - Beautiful Hangover.mp3', '03:46', 54),
(99, 'DAY BY DAY (Japanese ver.)', '/music/static/musics/T-ara (티아라) - DAY BY DAY (Japanese ver.).mp3', '03:33', 55),
(100, 'Intro', '/music/static/musics/CNBLUE (씨엔블루) - Intro.mp3', '01:11', 56),
(101, 'U&I (Jpn Ver.)', '/music/static/musics/에일리 (Ailee) - U&I (Jpn Ver.).mp3', '03:18', 57),
(102, 'THE WALL(長城)', '/music/static/musics/BEYOND - THE WALL(長城).mp3', '04:11', 58),
(103, 'GO AWAY', '/music/static/musics/2NE1 (투애니 원) - GO AWAY.mp3', '03:38', 59),
(104, 'Truth', '/music/static/musics/CNBLUE (씨엔블루) - Truth.mp3', '03:42', 60),
(105, 'yayaya(日语)', '/music/static/musics/T-ara (티아라) - yayaya (日语).mp3', '03:28', 61),
(106, 'RUNNER', '/music/static/musics/罗志祥 - RUNNER.mp3', '04:19', 62),
(107, '今夜かしら明日かしら (不论今宵或明天)', '/music/static/musics/邓丽君 - 今夜かしら明日かしら (不论今宵或明天).mp3', '03:01', 63),
(108, 'I LOVE YOU', '/music/static/musics/2NE1 (투애니 원) - I LOVE YOU.mp3', '04:00', 64),
(109, 'I AM THE BEST', '/music/static/musics/2NE1 (투애니 원) - I AM THE BEST.mp3', '03:30', 65);

-- --------------------------------------------------------

--
-- 视图结构 `album_list`
--
DROP TABLE IF EXISTS `album_list`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `album_list` AS select `album`.`album_id` AS `album_id`,`album`.`album_name` AS `album_name`,`album`.`album_pic` AS `album_pic`,`artist`.`artist_name` AS `artist_name`,`categories`.`cate_name` AS `cate_name` from ((`album` join `artist`) join `categories`) where ((`album`.`artist_id` = `artist`.`artist_id`) and (`album`.`cate_id` = `categories`.`cate_id`));

--
-- 限制导出的表
--

--
-- 限制表 `album`
--
ALTER TABLE `album`
  ADD CONSTRAINT `album_ibfk_1` FOREIGN KEY (`cate_id`) REFERENCES `categories` (`cate_id`),
  ADD CONSTRAINT `album_ibfk_2` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`artist_id`);

--
-- 限制表 `hot`
--
ALTER TABLE `hot`
  ADD CONSTRAINT `hot_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `album` (`album_id`);

--
-- 限制表 `music`
--
ALTER TABLE `music`
  ADD CONSTRAINT `music_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `album` (`album_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
