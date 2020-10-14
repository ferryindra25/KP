-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 14, 2020 at 07:01 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bintangterang`
--
CREATE DATABASE IF NOT EXISTS `bintangterang` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bintangterang`;

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

DROP TABLE IF EXISTS `barang`;
CREATE TABLE `barang` (
  `id_barang` int(11) NOT NULL,
  `id_katagori` int(11) NOT NULL,
  `nama_barang` varchar(50) NOT NULL,
  `deskripsi` text NOT NULL,
  `harga_barang` int(11) NOT NULL,
  `status` varchar(1) NOT NULL,
  `gambar` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`id_barang`, `id_katagori`, `nama_barang`, `deskripsi`, `harga_barang`, `status`, `gambar`) VALUES
(21, 22, 'cervelo s3', 'sepeda balap', 1000, '0', 'gambar-1602132044444.jpg'),
(22, 22, 'Focus Izalcomax DISC', ' SUPER-LIGHTWEIGHT MAX AERO CARBON FRAME (890 G) INCLUDING C.I.S. AERO CARBON STEM AND R.A.T. QUICK-RELEASE AXLES\n\n MAXIMUM ELECTRONIC SHIFTING PRECISION: SHIMANO DURA-ACE DI2\n\n SUPER-FAST DT SWISS ARC1450 DICUT CARBON WHEELSET WITH RIM HEIGHT OF 48 MM', 5000, '0', 'gambar-1602163683431.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id_customer` int(11) NOT NULL,
  `email_customer` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `nama_customer` text NOT NULL,
  `alamat_customer` text NOT NULL,
  `telp_customer` varchar(12) NOT NULL,
  `status` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id_customer`, `email_customer`, `password`, `nama_customer`, `alamat_customer`, `telp_customer`, `status`) VALUES
(1, '', '', 'Ferry Indra Gunawan', 'Jl. Raya Sukodono no 7', '089514322227', '0'),
(3, 'ferryindra77@gmail.com', '1234', 'Ferry Indra', 'surabaya', '089999999', '0'),
(4, 'ferryindra77@gmail.com', '1234', 'Ferry Indra', 'surabaya', '089999999', '0'),
(5, 'ferryindra25@gmail.com', '123', 'Ferry Indra Gunawan', 'Legian no 1', '123', '0'),
(6, 'ferry7@mhs.stts.edu', '123', 'gunawan', 'sby', '123', '0'),
(7, 'ferry@google.com', '234', 'fer', 'jkt', '345', '0');

-- --------------------------------------------------------

--
-- Table structure for table `dtrans`
--

DROP TABLE IF EXISTS `dtrans`;
CREATE TABLE `dtrans` (
  `id_trans` int(11) NOT NULL,
  `id_barang` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `harga` int(11) NOT NULL,
  `pesan` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `htrans`
--

DROP TABLE IF EXISTS `htrans`;
CREATE TABLE `htrans` (
  `id_trans` int(11) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `tgl_trans` date NOT NULL,
  `total` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `katagori`
--

DROP TABLE IF EXISTS `katagori`;
CREATE TABLE `katagori` (
  `id_katagori` int(11) NOT NULL,
  `nama_katagori` varchar(50) NOT NULL,
  `deskripsi` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `katagori`
--

INSERT INTO `katagori` (`id_katagori`, `nama_katagori`, `deskripsi`) VALUES
(18, 'Folding Bike', 'Sepeda Lipat'),
(21, 'MTB', 'sepeda gunung'),
(22, 'Road bike', 'sepeda jalanan');

-- --------------------------------------------------------

--
-- Table structure for table `spesifikasi`
--

DROP TABLE IF EXISTS `spesifikasi`;
CREATE TABLE `spesifikasi` (
  `id_barang` int(11) NOT NULL,
  `color` varchar(50) NOT NULL,
  `frame` varchar(50) NOT NULL,
  `fork` varchar(50) NOT NULL,
  `shifter` varchar(50) NOT NULL,
  `rd` varchar(50) NOT NULL,
  `brake` varchar(50) NOT NULL,
  `freewheel` varchar(50) NOT NULL,
  `pedal` varchar(50) NOT NULL,
  `crankset` varchar(50) NOT NULL,
  `bb` varchar(50) NOT NULL,
  `chain` varchar(50) NOT NULL,
  `fh` varchar(50) NOT NULL,
  `rh` varchar(50) NOT NULL,
  `spokes` varchar(50) NOT NULL,
  `rim` varchar(50) NOT NULL,
  `tires` varchar(50) NOT NULL,
  `saddle` varchar(50) NOT NULL,
  `stem` varchar(50) NOT NULL,
  `seatpost` varchar(50) NOT NULL,
  `handlebar` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `spesifikasi`
--

INSERT INTO `spesifikasi` (`id_barang`, `color`, `frame`, `fork`, `shifter`, `rd`, `brake`, `freewheel`, `pedal`, `crankset`, `bb`, `chain`, `fh`, `rh`, `spokes`, `rim`, `tires`, `saddle`, `stem`, `seatpost`, `handlebar`) VALUES
(21, 'green', 'carbon', 'carbon', 'shifter', 'rd', 'brake', 'free wheel', 'pedal', 'crank', 'bb', 'chain', 'f hub', 'r hub', 'spokes', 'rim', 'tires', 'saddle', 'stem', 'seatpos', 'handlebar'),
(22, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`id_barang`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id_customer`);

--
-- Indexes for table `htrans`
--
ALTER TABLE `htrans`
  ADD PRIMARY KEY (`id_trans`);

--
-- Indexes for table `katagori`
--
ALTER TABLE `katagori`
  ADD PRIMARY KEY (`id_katagori`);

--
-- Indexes for table `spesifikasi`
--
ALTER TABLE `spesifikasi`
  ADD PRIMARY KEY (`id_barang`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barang`
--
ALTER TABLE `barang`
  MODIFY `id_barang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id_customer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `htrans`
--
ALTER TABLE `htrans`
  MODIFY `id_trans` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `katagori`
--
ALTER TABLE `katagori`
  MODIFY `id_katagori` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
