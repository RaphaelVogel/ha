sap.ui.controller("haui.area.Solar", {
	onInit: function() {
	},
	
	handleRefreshPress: function(oEvent){
		var solarModel = sap.ui.getCore().getModel("solarModel");
		solarModel.loadData("/solar/data");
	},
	
	handleChartDisplay: function(oEvent){
		sap.ui.getCore().getEventBus().publish("nav", "to", {id : "SolarChart"});
	},

	handleNavButtonPress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	}

});