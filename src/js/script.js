(function($){
	var $cityOptions = $('.city-options');
	var $rainSaucers = $('.rainSaucer');
	var $rainPotential = $('.rain-potential');
	var $averageRainfall = $('.average-rainfall');
	var $rainfallCapturePotential = $('.rain-collected');
	var $otherSurfaceArea = $('custom-surface-area');

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
		$rainPotential.html(n.toFixed(2));
	};

	var renderRainfallCapturePotential = function(n){
		$rainfallCapture.html(n.toFixed(2));
	};

	var renderAverageRainfall = function(n){
		$averageRainfall.html(n);
	}

	var calculateRainfallCapturePotential = function(){
		var rainPotential = +($rainPotential.html());
		var averageRainfall = +($averageRainfall.html());
		return rainPotential * averageRainfall;
	}

	var calculateOtherSurfaceAreaCapturePotential = function(){
		var otherSurfaceArea = $otherSurfaceArea.value();
		var captureRate = +$($otherSurfaceArea.attr('data-capacity'));
		var rainCapturePotential = $otherSurfaceArea.value * captureRate;
	}

	$rainSaucers.on('input', function(){
		calculateRainSaucerCapacity();
		var rainfallCapture = calculateRainfallCapturePotential();
		renderRainfallCapturePotential(rainfallCapturePotential);	
	});

	$cityOptions.on('change', function(){
		var averageRainfall = $(this).val();
		renderAverageRainfall(averageRainfall);
		var rainfallCapture = calculateRainfallCapture();
		renderRainfallCapture(rainfallCapture);
	});


}(jQuery));