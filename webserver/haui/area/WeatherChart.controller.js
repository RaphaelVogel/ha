sap.ui.controller("haui.area.WeatherChart", {
	onInit: function() {
	    var tempChartModel = new sap.ui.model.json.JSONModel();
        tempChartModel.loadData("/weather/historicData");
		this.getView().byId("temperatureChart").setModel(tempChartModel);
	},
	
	handleNavButtonPress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	}

});