sap.ui.controller("haui.area.WeatherTempChart", {
    onInit: function() {
        var tempChartModel = new sap.ui.model.json.JSONModel();
        this.getView().byId("temperatureChart").setModel(tempChartModel);
        this.getView().addEventDelegate({
            // call every time when page is displayed
            onBeforeShow: function(evt) {
                this.refreshTempData(); 
            }
        }, this);
	},
    
    refreshTempData: function(){
        var tempChartModel = this.getView().byId("temperatureChart").getModel();
		tempChartModel.loadData("/weather/historicTemperatures");
    },
	
	handleNavButtonPress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	}

});