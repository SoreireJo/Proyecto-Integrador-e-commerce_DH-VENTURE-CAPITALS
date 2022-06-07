-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-06-2022 a las 21:25:49
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tecnocom`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `ultimaActualizacion` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `ultimaActualizacion`) VALUES
(1, 'Monitores', '2022-06-06 01:18:54'),
(2, 'Audio', '2022-06-06 01:18:54'),
(3, 'Periféricos', '2022-06-06 01:18:54'),
(4, 'Notebooks', '2022-06-06 01:18:54'),
(5, 'Pc Componentes', '2022-06-06 01:18:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `id` int(11) UNSIGNED NOT NULL,
  `productoId` int(11) NOT NULL,
  `usuarioId` int(11) NOT NULL,
  `precio` decimal(15,2) NOT NULL,
  `descuento` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `total` decimal(15,2) NOT NULL,
  `fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`id`, `productoId`, `usuarioId`, `precio`, `descuento`, `cantidad`, `total`, `fechaCreacion`) VALUES
(1, 1, 5, '119999.00', 5, 2, '227998.10', '2022-06-06 01:54:41'),
(2, 1, 6, '119999.00', 5, 1, '113999.05', '2022-06-06 11:38:22'),
(3, 2, 7, '9809.00', 11, 3, '8810.11', '2022-06-06 11:38:22'),
(4, 3, 8, '3399.00', 18, 1, '2787.18', '2022-06-06 11:38:22'),
(5, 4, 7, '83999.00', 5, 2, '79799.05', '2022-06-06 11:41:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localidad`
--

CREATE TABLE `localidad` (
  `id` int(10) UNSIGNED NOT NULL,
  `provinciaId` int(10) UNSIGNED NOT NULL,
  `localidad` varchar(50) NOT NULL,
  `ultimaActualizacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `localidad`
--

INSERT INTO `localidad` (`id`, `provinciaId`, `localidad`, `ultimaActualizacion`) VALUES
(1, 1, 'La Plata', '2022-06-06 10:05:26'),
(2, 2, 'Capital', '2022-06-06 10:05:26'),
(3, 3, 'San Fernando del Valle de Catamarca', '2022-06-06 10:05:26'),
(4, 4, 'Resistencia', '2022-06-06 10:05:26'),
(5, 5, 'Rawson', '2022-06-06 10:05:26'),
(6, 6, 'Córdoba', '2022-06-06 10:05:26'),
(7, 7, 'Corrientes', '2022-06-06 10:05:26'),
(8, 8, '	Paraná', '2022-06-06 10:05:26'),
(9, 9, 'Formosa', '2022-06-06 10:05:26'),
(10, 10, 'San Salvador de Jujuy', '2022-06-06 10:05:26'),
(11, 11, 'Santa Rosa', '2022-06-06 10:05:26'),
(12, 12, 'La Rioja', '2022-06-06 10:05:26'),
(13, 13, 'Mendoza', '2022-06-06 10:05:26'),
(14, 14, 'Posadas', '2022-06-06 10:05:26'),
(15, 15, 'Neuquén', '2022-06-06 10:05:26'),
(16, 16, 'Viedma', '2022-06-06 10:05:26'),
(17, 17, 'Salta', '2022-06-06 10:05:26'),
(18, 18, 'San Juan', '2022-06-06 10:05:26'),
(19, 19, 'San Luis', '2022-06-06 10:05:26'),
(20, 20, 'Río Gallegos', '2022-06-06 10:05:26'),
(21, 21, 'Santa Fe de la Vera Cruz', '2022-06-06 10:05:26'),
(22, 22, 'Santiago del Estero', '2022-06-06 10:05:26'),
(23, 23, 'Ushuaia', '2022-06-06 10:05:26'),
(24, 24, 'San Miguel de Tucumán', '2022-06-06 10:05:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pais`
--

CREATE TABLE `pais` (
  `id` int(10) UNSIGNED NOT NULL,
  `pais` varchar(50) NOT NULL,
  `ultimaActualizacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pais`
--

INSERT INTO `pais` (`id`, `pais`, `ultimaActualizacion`) VALUES
(1, 'Argentina', '2022-06-06 09:52:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(10) UNSIGNED NOT NULL,
  `categoriaId` int(10) UNSIGNED NOT NULL,
  `promoId` int(10) UNSIGNED NOT NULL,
  `usuarioId` int(10) UNSIGNED NOT NULL DEFAULT 9,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` decimal(15,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `imagen` varchar(200) NOT NULL,
  `descuento` int(11) NOT NULL,
  `ultimaActualizacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `categoriaId`, `promoId`, `usuarioId`, `nombre`, `descripcion`, `precio`, `stock`, `imagen`, `descuento`, `ultimaActualizacion`) VALUES
(1, 1, 2, 1, 'Benq Led Monitor Ex2780q Metallic 2k 144hz', 'IMPRESIONANTE PANTALLA QHD 2K Disfrute de una calidad de imagen inmaculada 16 9 con resolución 2K QHD 2560x1440 en un panel de ángulo de visión IPS amplio con 95% de espacio de color DCI-P3.', '119999.00', 8, 'product-1654628960061-monitor_benq.png', 5, '2022-06-06 01:27:25'),
(2, 2, 2, 2, 'Auriculares Cat Ear Headset Plegable Led Light Cosplay', 'IMPRESIONANTE PANTALLA QHD 2K Disfrute de una calidad de imagen inmaculada 16 9 con resolución 2K QHD 2560x1440 en un panel de ángulo de visión IPS amplio con 95% de espacio de color DCI-P3', '9809.00', 11, 'auriculares-girl.png', 20, '2022-06-06 01:27:25'),
(3, 3, 1, 3, 'Mouse inalámbrico Logitech Lightspeed blue', 'Los dispositivos Logitech cuentan con un diseño ergonómico pensado para tu confort. Lightspeed es una tecnología ultrarrápida y confiable con desempeño probado en competencias por profesionales. No vuelvas a preocuparte por la duración de la batería. Simplemente, el mouse se mantiene cargado.', '3399.00', 18, 'mouse-cyan.png', 15, '2022-06-06 01:27:25'),
(4, 1, 1, 4, 'Monitor Gamer 24 Viewsonic 240hz', 'La tecnología AMD FreeSync™ Premium sincroniza el monitor con la salida GPU, que elimina fragmentaciones y retraso en la pantalla. La tecnología Fast-IPS combina colores intensos, un contraste sorprendente y amplios ángulos de visión, y, a su vez, ofrece tiempos de respuesta hasta 4 veces más rápidos que las pantallas tradicionales.', '83999.00', 3, 'monitor-omni.png', 5, '2022-06-06 01:27:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promos`
--

CREATE TABLE `promos` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `ultimaActualizacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `promos`
--

INSERT INTO `promos` (`id`, `nombre`, `ultimaActualizacion`) VALUES
(1, 'Ofertas', '2022-06-06 01:20:01'),
(2, 'Lo Ultimo en Tecnología', '2022-06-06 01:20:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provincia`
--

CREATE TABLE `provincia` (
  `id` int(10) UNSIGNED NOT NULL,
  `paisId` int(10) UNSIGNED NOT NULL,
  `provincia` varchar(50) NOT NULL,
  `ultimaActualizacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `provincia`
--

INSERT INTO `provincia` (`id`, `paisId`, `provincia`, `ultimaActualizacion`) VALUES
(1, 1, 'Buenos Aires', '2022-06-06 09:53:39'),
(2, 1, 'Ciudad Autónoma de Buenos Aires', '2022-06-06 09:53:54'),
(3, 1, 'Catamarca', '2022-06-06 09:57:14'),
(4, 1, 'Chaco', '2022-06-06 09:59:50'),
(5, 1, 'Chubut', '2022-06-06 09:59:50'),
(6, 1, 'Córdoba', '2022-06-06 09:59:50'),
(7, 1, 'Corrientes', '2022-06-06 09:59:50'),
(8, 1, 'Entre Ríos', '2022-06-06 09:59:50'),
(9, 1, 'Formosa', '2022-06-06 09:59:50'),
(10, 1, 'Jujuy', '2022-06-06 09:59:50'),
(11, 1, 'La Pampa', '2022-06-06 09:59:50'),
(12, 1, 'La Rioja', '2022-06-06 09:59:50'),
(13, 1, 'Mendoza', '2022-06-06 09:59:50'),
(14, 1, 'Misiones', '2022-06-06 09:59:50'),
(15, 1, 'Neuquén', '2022-06-06 09:59:50'),
(16, 1, 'Río Negro', '2022-06-06 09:59:50'),
(17, 1, 'Salta', '2022-06-06 09:59:50'),
(18, 1, 'San Juan', '2022-06-06 09:59:50'),
(19, 1, 'San Luis', '2022-06-06 09:59:50'),
(20, 1, 'Santa Cruz', '2022-06-06 09:59:50'),
(21, 1, 'Santa Fe', '2022-06-06 09:59:50'),
(22, 1, 'Santiago del Estero', '2022-06-06 09:59:50'),
(23, 1, 'Tierra del Fuego', '2022-06-06 09:59:50'),
(24, 1, 'Tucumán', '2022-06-06 10:10:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `descripcion`, `create_time`) VALUES
(1, 'Administrador', '2022-06-06 01:20:36'),
(2, 'Clientes', '2022-06-06 01:20:36'),
(3, 'Usuarios', '2022-06-06 01:20:36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(10) UNSIGNED NOT NULL,
  `localidadId` int(10) UNSIGNED NOT NULL,
  `rolesId` int(10) UNSIGNED NOT NULL,
  `nombres` varchar(45) NOT NULL,
  `apellidos` varchar(45) NOT NULL,
  `imagen` varchar(254) NOT NULL,
  `email` varchar(50) NOT NULL,
  `activo` int(11) NOT NULL DEFAULT 1,
  `nombreUsuario` varchar(16) NOT NULL,
  `claveIngreso` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `codigoPostal` varchar(45) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  `fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `dni` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `localidadId`, `rolesId`, `nombres`, `apellidos`, `imagen`, `email`, `activo`, `nombreUsuario`, `claveIngreso`, `telefono`, `codigoPostal`, `direccion`, `fechaCreacion`, `dni`) VALUES
(1, 12, 3, 'Luciano', 'Montero', 'user-1650578200093.jpg', 'montero.arg@gmail.com', 1, 'lmontero', '123456', '3804120340', '5300', 'Los Colorados', '2022-06-06 03:32:56', 25737986),
(2, 12, 3, 'Jose', 'Soreire', 'user-1648916112364.png', 'jose@gmail.com', 1, 'jsoreire', '123456', '3804321654', '5300', 'Centro', '2022-06-06 10:57:31', 26357912),
(3, 12, 3, 'Sigrid', 'Vera Gomez', 'user-1650581990690.png', 'sigrid@gmail.com', 1, 'sgomez', '123456', '3804651321', '5300', 'Panamericano', '2022-06-06 10:57:31', 32852159),
(4, 12, 3, 'Nerea', 'Chanampe', 'user-1654315702804.jpg', 'nerea@gmail.com', 1, 'nchanampe', '123456', '3804927483', '5300', 'Vargas', '2022-06-06 10:57:31', 33471935),
(5, 15, 2, 'Andres', 'Calamaro', 'user-6213897524.png', 'acalamaro@email.com', 1, 'acalamaro', '123456', '3514456321', '5000', 'Las Palmas', '2022-06-06 10:57:31', 36951753),
(6, 21, 2, 'Pablo', 'Gonzalez', 'user-5194276315.png', 'pgonzalez@email.com', 1, 'pgonzalez', '123456', '3414654789', '2000', 'El tala', '2022-06-06 11:24:49', 28654912),
(7, 2, 2, 'Maria', 'Ortiz', 'user9994443337.png', 'mortiz@email.com', 1, 'mortiz', '123456', '1154654654', '1000', 'Nuñez', '2022-06-06 11:24:49', 30582419),
(8, 24, 2, 'Jorge', 'Asis', 'user-3569862793.png', 'jasis@email.com', 1, 'jasis', '123456', '3814987654', '4000', 'Colonia', '2022-06-06 11:24:49', 31761382),
(9, 1, 1, 'Admin', 'Administrador', 'user-admin.png', 'admin@admin.com', 1, 'admin', '654321', '1111111111', '1000', 'Capital', '2022-06-06 12:46:56', 99999999);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `localidad`
--
ALTER TABLE `localidad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pais`
--
ALTER TABLE `pais`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `promos`
--
ALTER TABLE `promos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `provincia`
--
ALTER TABLE `provincia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `localidad`
--
ALTER TABLE `localidad`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `pais`
--
ALTER TABLE `pais`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `promos`
--
ALTER TABLE `promos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `provincia`
--
ALTER TABLE `provincia`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
