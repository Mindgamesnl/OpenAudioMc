<?
// Load the stamp and the photo to apply the watermark to
$stamp = imagecreatefrompng('Vaandel-transparant.png');
$im = imagecreatefrompng($_GET["img"]);

// Set the margins for the stamp and get the height/width of the stamp image
$marge_right = 50;
$marge_bottom = 50;
$sx = imagesx($stamp);
$sy = imagesy($stamp);

// Copy the stamp image onto our photo using the margin offsets and the photo 
// width to calculate positioning of the stamp. 
imagecopy($im, $stamp, imagesx($im) - $sx - $marge_right, imagesy($im) - $sy - $marge_bottom, 0, 0, imagesx($stamp), imagesy($stamp));

$string = "This is phpGang.com";
 
$font = 4;
 
$width = imagefontwidth($font) * strlen($string) ;
 
$height = imagefontheight($font) ;
 
$im = imagecreatefromjpeg($_GET["img"]);
 
$x = imagesx($im) - $width ;
 
$y = imagesy($im) - $height;
 
$backgroundColor = imagecolorallocate ($im, 255, 255, 255);
 
$textColor = imagecolorallocate ($im, 0, 0,0);
 
imagestring ($im, $font, $x, $y, $string, $textColor);

// Output and free memory
header('Content-type: image/png');
imagepng($im);
imagedestroy($im);
?>
