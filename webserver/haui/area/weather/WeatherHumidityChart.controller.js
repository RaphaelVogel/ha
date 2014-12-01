sap.ui.controller("haui.area.weather.WeatherHumidityChart", {
    onInit: function() {
        var humidityChartModel = new sap.ui.model.json.JSONModel();
        this.getView().byId("humidityChart").setModel(humidityChartModel);
        this.getView().addEventDelegate({
            // call every time when page is displayed
            onBeforeShow: function(evt) {
                this.refreshHumidityData(); 
            }
        }, this);
	},
    
    refreshHumidityData: function(){
        var humidityChartModel = this.getView().byId("humidityChart").getModel();
		humidityChartModel.loadData("/weather/historicHumidities");
    },
	
	handleNavButtonPress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	}

});