<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '8Lx|U_kB*OC^S=:0[DK_K5}FftzD%>_4:2I$mnIxk+I`:+*v>sFS]ouChZF|`Ca+' );
define( 'SECURE_AUTH_KEY',  '?[Ut8mC #B{pY4-A_OS3z]65gz@DcHQSaMxN Z-;>I0D+_ y2lk]Zf]YeX~DM=kY' );
define( 'LOGGED_IN_KEY',    '~3*n) S[G(k#KX0Y#)ptxBpnHrE)k])7`3g813p=N;u:0=XMjwaZg&{fO%PUTJ[P' );
define( 'NONCE_KEY',        'ErAGr^&F?=L^|c5%s`L>IaHD6{t[uGV~@dN1Q#9SNs3@nd)4oK,PdhqRx0FRc30f' );
define( 'AUTH_SALT',        'Lv6aQ;O_oX@}*k21kw8[ysi)!;b1vHq^wxsc/_c;I?^RZwg}{4H.hb?kN<wG/<.4' );
define( 'SECURE_AUTH_SALT', '6=^5V+3&`]s+>+b~j/(*Nn=*mKM?G_9v*y{zt&FYk>ps0h)SFSL3bqTm)$(pkMF?' );
define( 'LOGGED_IN_SALT',   '&]p6CF~5f<T1z&z>:f@<Gid-{2$2]1buW3&QE+=H(o.gBy%j)jl/s@iF{U)O_i^$' );
define( 'NONCE_SALT',       'x@VJlhkB1F3r}-;#v`hn)!G>EpTd${{m)%b;51@V?KUF4xb=sr4r|uX|ml;z;eDF' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', true );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
