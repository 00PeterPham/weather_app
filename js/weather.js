// This weather app uses the 'open weather map api' from http://openweathermap.org/

var APIKEY = 'c04b3040979ba35420fd409afed8b3cc';

$( document ).ready(function() {  

	// Gets location of user
	$.get("http://ipinfo.io", function (response) {
		var city = response.city;
		var country = response.region;

		getWeather(city, country);
		getForecast(city, country);

	}, "jsonp");

	// API CALL for current weather	
	function getWeather(city, country){		
		$.ajax({
		    url: "http://api.openweathermap.org/data/2.5/weather?q="+city+","+country+"&mode=json&units=metric&APPID="+APIKEY+"",		    
		    dataType: 'jsonp',
		    success: function(results){	 			    	
		    	var w_weather_icon = results.weather[0].icon;
		    	var w_temp = results.main.temp;		    	
		    	var w_desc = results.weather[0].description;
		    	var w_humidity = results.main.humidity;
		    	var w_wind = results.wind.speed;
		    	var w_icon_url = "img/weather-icons/"+w_weather_icon+".png";

		    	att_icon = getIcon(w_temp, w_weather_icon);		    

		    	//Assigns data to html		    
		    	$("img.weather-icon").attr('src', w_icon_url);
		    	$(".weather .temp").html(w_temp.toFixed(0) + "&#8451;");		    	
		    	$(".weather .details .desc").html(w_desc);
		    	$(".weather .details .humidity").html("humidty: " + w_humidity + " %");
		    	$(".weather .details .wind").html("wind: " + w_wind.toFixed(0) + " km/h");

		    	//Applies styling when weather block is clicked
		        $(".weather").click(function(){ 
		        	$(".forecast-con .fc").removeClass(" active");		        	
		        	$(this).toggleClass(" active");	

		        	//Changes attire icon
					getIcon(w_temp, w_weather_icon);		        	
		        });		     
		    }
		});
	}
	// API CALL for 5 day forcast
	function getForecast(city, country){		
		$.ajax({
		    url: "http://api.openweathermap.org/data/2.5/forecast?q="+city+","+country+"&mode=json&units=metric&APPID="+APIKEY+"",
		    dataType: 'jsonp',
		    success: function(results){
		    	var f_list = results.list;		
		    	var f_list_time;
		    	var f_list_array = [];	
		    	var f_weather_icon;
		    	var f_icon_url;
		    	var f_temp;
		    	var f_desc;
		    	var f_humidity;
		    	var f_wind;
		    	var f_day = [];

		    	var j = 1;

		    	//Loops through weather json from Open Weather Map
		    	for (i = 0; i < f_list.length; i++) { 
		    		f_list_time = f_list[i].dt_txt.split(" ");		    		
		    		f_list_array[i] = f_list_time[1];

		    		//Retrieves Data for specific time
				    if(f_list_array[i] == "12:00:00"){
				    	var forecast_date = f_list_time[0];					    	

				    	f_weather_icon = f_list[i].weather[0].icon;
				    	f_icon_url = "img/weather-icons/"+f_weather_icon+".png";
				    	f_temp = f_list[i].main.temp;
				    	f_desc = f_list[i].weather[0].description;
				    	f_humidity = f_list[i].main.humidity;
				    	f_wind = f_list[i].wind.speed;	

				    	//Retrieves Forecast Day
				    	f_date = Date.parse(forecast_date);
				    	f_day = f_date.toString().split(" ");

				    	//Assigns data to html
				    	$(".forecast-con .forecast-"+j+" .date").html(f_day[0]);
				    	$(".forecast-con .forecast-"+j+" .forecast-icon").attr('src', f_icon_url);
				    	$(".forecast-con .forecast-"+j+" .temp").html(f_temp.toFixed(0) + "&#8451;");
				    	$(".forecast-con .forecast-"+j+" .desc").html(f_desc);
				    	$(".forecast-con .forecast-"+j+" .humidity").html("humidty: " +f_humidity + " %");
				    	$(".forecast-con .forecast-"+j+" .wind").html("wind: " +f_wind.toFixed(0) + " km/h");

				    	j++;
				    }
				}

				//Retrieves forecast block weather details
		        $(".forecast-con .fc").click(function(){
		        	var fc_temp = $(this).children(".temp").html();
		        	var fc_temp_val = parseInt(fc_temp);
		        	var fc_icon = $(this).children(".icon-con").children(".forecast-icon").prop('src');
		        	var fc_icon_src = fc_icon.split(".png");
		        	var fc_icon_src_string = fc_icon_src[0].toString();
		        	var fc_icon_val = fc_icon_src_string.substr(fc_icon_src_string.length - 3);

		        	//Applies styling when forecast block is clicked
		        	$(".weather").removeClass(" active");
		        	$(".forecast-con .fc").removeClass(" active");
		        	$(this).toggleClass(" active");

		        	//Changes attire icon
		        	getIcon(fc_temp_val, fc_icon_val);
		        });		        
		    }
		});
	}

	//Changes Attire Icon and Attire Description
	function getIcon(temp, desc) {
		var att_icon;
		var att_icon_url;
		var att_desc;

		iconBG_clear();

		if(temp >= 23 && desc != "01d" && desc != "10d"){
			att_icon = "icon-shorts";
			att_desc = "It's a scorcher! You better get your shorts on and find a pool. Don't forget to bring a towel!";
			$(".attire .icon-con").addClass(" orange");
		}else if (temp > 20 && temp < 23 && desc != "01d" && desc != "10d"){
			att_icon = "icon-tshirt";
			att_desc = "It's pretty hot. Time to show off those arm cannons with some short sleeves.";
			$(".attire .icon-con").addClass(" yellow");
		}else if (temp >= 16 && temp <= 20 && desc != "01d" && desc != "10d"){
			att_icon = "icon-pants";
			att_desc = "It's pretty warm. Time to show off that denim. Make those pants look good!";
			$(".attire .icon-con").addClass(" grey");
		}else if (temp < 16 && desc != "01d" && desc != "10d"){
			att_icon = "icon-jacket";
			att_desc = "It's kinda chilly. Throw on your favourite jacket and don't forget the attitude.";
			$(".attire .icon-con").addClass(" grey");
		}else if (desc == "01d" && desc != "10d"){
			att_icon = "icon-sunglasses";
			att_desc = "It's sunny. Time to show off your badass shades. It's called being cool.";
			$(".attire .icon-con").addClass(" yellow");
		}else if (desc == "10d"){
			att_icon = "icon-umbrella";
			att_desc = "It's Rainy. Grab that umbrella to defend yourself against that downpour.";
			$(".attire .icon-con").addClass(" blue");
		}

		att_icon_url = "img/icon-set/"+att_icon+".png";
		$(".attire .icon-con .icon").attr('src', att_icon_url);
		$(".attire .attire-desc").html(att_desc);
	}

	//Removes icon background color
	function iconBG_clear(){
		$(".attire .icon-con").removeClass("orange");
		$(".attire .icon-con").removeClass("yellow");
		$(".attire .icon-con").removeClass("grey");
		$(".attire .icon-con").removeClass("blue");
	}

});