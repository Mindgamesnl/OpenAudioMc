function toXY(red, green, blue) {
	//Gamma correctie
	red = (red > 0.04045) ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : (red / 12.92);
	green = (green > 0.04045) ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : (green / 12.92);
	blue = (blue > 0.04045) ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : (blue / 12.92);

	//Apply wide gamut conversion D65
	var X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
	var Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
	var Z = red * 0.000088 + green * 0.072310 + blue * 0.986039;

	var fx = X / (X + Y + Z);
	var fy = Y / (X + Y + Z);
	if (isnan(fx)) {
		fx = 0.0f;
	}
	if (isnan(fy)) {
		fy = 0.0f;
	}

	return [fx.toPrecision(4), fy.toPrecision(4)];
}