sap.ui.controller("haui.area.weather.WeatherPressureChart", {
    onInit: function() {
        var pressureChartModel = new sap.ui.model.json.JSONModel();
        this.getView().byId("pressureChart").setModel(pressureChartModel);
        this.getView().byId("pressureChart").setValueAxis(new sap.makit.ValueAxis({min: "800", max: "1100"}));  
        this.getView().addEventDelegate({
            // call every time when page is displayed
            onBeforeShow: function(evt) {
                this.refreshPressureData(); 
            }
        }, this);
	},
    
    refreshPressureData: function(){
        var pressureChartModel = this.getView().byId("pressureChart").getModel();
		pressureChartModel.loadData("/weather/historicPressures");
    },
	
	handleNavButtonPress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	}

});