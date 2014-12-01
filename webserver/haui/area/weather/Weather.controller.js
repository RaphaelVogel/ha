sap.ui.controller("haui.area.weather.Weather", {
	onInit: function() {
	},
	
	handleRefreshPress: function(oEvent){
		var weatherModel = sap.ui.getCore().getModel("weatherModel");
		weatherModel.loadData("/weather/currentData");
	},
	
	handleNavButtonPress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	},
	
	handleTempPress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "to", {id : "WeatherTempChart", viewname: 'haui.area.weather.WeatherTempChart'});
	},
	
	handleHumidityPress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "to", {id : "WeatherHumidityChart", viewname: 'haui.area.weather.WeatherHumidityChart'});
	},
	
	handlePressurePress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "to", {id : "WeatherPressureChart", viewname: 'haui.area.weather.WeatherPressureChart'});
	}

});