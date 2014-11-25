sap.ui.controller("haui.area.Weather", {
	onInit: function() {
	},
	
	handleRefreshPress: function(oEvent){
		var weatherModel = sap.ui.getCore().getModel("weatherModel");
		weatherModel.loadData("/weather/currentData");
	},
	
	handleNavButtonPress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	},
	
	handleListItemPress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "to", {id : "WeatherChart"});		
	}

});