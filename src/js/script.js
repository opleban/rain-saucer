(function($){
	var $cityOptions = $('.city-options');
	var $rainSaucers = $('.rainSaucer');
	var $rainPotential = $('.rain-potential');
	var $averageRainfall = $('average-rainfall');
	var $rainfallCapture = $('.rain-collected');

	$.getJSON('js/rainfallByCity.json', function(rainfallData){
		for (var i=0; i<rainfallData.length; i++){
			$cityOptions.append(generateCityDropdownOption(rainfallData[i]))
		}
	});

	var generateCityDropdownOption  = function(rainfallDatum){
		return "<option value='" + rainfallDatum["Inches"] + "'>" +
		rainfallDatum["City"] + "</option>";
	};

	var isInt = function(n){
		return Number(n) === n;
	}

	var calculateRainSaucerCapacity = function(){
		var totalRainsaucerCapacity = 0;
		for(var i=0; i<$rainSaucers.length; i++){
			var rainsaucer = $rainSaucers[i]
			var rainsaucerCapacity = +$(rainsaucer).attr('data-capacity');
			totalRainsaucerCapacity += rainsaucer.value * rainsaucerCapacity;
		}
		renderRainPotential(totalRainsaucerCapacity);
	};

	var renderRainPotential = function(n){
		$rainPotential.html(n);
	};

	var renderRainfallCapture = function(n){
		$rainfallCapture.html(n);
	};

	var renderAverageRainfall = function(n){
		$averageRainfall.html(n);
	}

	var calculateRainfallCapture = function(){
		var rainPotential = +($rainPotential.html());
		var averageRainfall = +($averageRainfall.html());
		console.log($averageRainfall);
		return rainPotential * averageRainfall;
	}

	$rainSaucers.on('input', function(){
		calculateRainSaucerCapacity();	
	});

	$cityOptions.on('change', function(){
		console.log(this);
		console.log(averageRainfall);
		renderAverageRainfall(averageRainfall);
		var rainfallCapture = calculateRainfallCapture();
		renderRainfallCapture(rainfallCapture);
	});


}(jQuery));