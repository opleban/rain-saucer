(function($){
	var $cityOptions = $('.city-options');
	var $rainSaucers = $('.rainSaucer');
	var $rainPotential = $('.rain-potential');
	var $averageRainfall = $('.average-rainfall');
	var $rainfallCapturePotential = $('.rain-collected');
	var $gallonBarrels = $('#gallon-barrels');

	$.getJSON('data/rainfallByCity.json', function(rainfallData){
		for (var i=0; i<rainfallData.length; i++){
			$cityOptions.append(generateCityDropdownOption(rainfallData[i]));
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
			var captureRate = +$(rainsaucer).attr('data-capacity');
			totalRainsaucerCapacity += rainsaucer.value * captureRate;
		}
		renderRainCapacity(totalRainsaucerCapacity);
	};

	var renderRainCapacity = function(n){
		if(n > 0){
			n = n.toFixed(2);
		}
		$rainPotential.html(n);
	};

	var renderRainfallCapturePotential = function(n){
		if(n > 0){
			n = n.toFixed(2);
		}
		$rainfallCapturePotential.html(n);
	};

	var renderAverageRainfall = function(n){
		$averageRainfall.html(n);
	}

	var calculateRainfallCapturePotential = function(){
		var rainPotential = +($rainPotential.html());
		var averageRainfall = +($averageRainfall.html());
		return rainPotential * averageRainfall;
	}

	var calculateBarrelsFilled = function(rainfallCapture){
		if (rainfallCapture > 0){
			return rainfallCapture/55;
		} else {
			return 0;
		}

	}

	var renderBarrelsFilled = function(n){
		if(n > 0){
			n = n.toFixed(2);
		}
		$gallonBarrels.html(n);
	}

	$rainSaucers.on('input', function(){
		calculateRainSaucerCapacity();
		var rainfallCapture = calculateRainfallCapturePotential();
		renderRainfallCapturePotential(rainfallCapture);
		var barrelsFilled = calculateBarrelsFilled(rainfallCapture)
		renderBarrelsFilled(barrelsFilled);	
	});

	$cityOptions.on('change', function(){
		var averageRainfall = $(this).val();
		renderAverageRainfall(averageRainfall);
		var rainfallCapture = calculateRainfallCapturePotential();
		renderRainfallCapturePotential(rainfallCapture);
		var barrelsFilled = calculateBarrelsFilled(rainfallCapture)
		renderBarrelsFilled(barrelsFilled);	
	});


}(jQuery));