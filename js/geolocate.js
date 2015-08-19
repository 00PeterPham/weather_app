$.get("http://ipinfo.io", function (response) {
	var city = response.city;
	var country = response.region;
}, "jsonp");