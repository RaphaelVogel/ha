sap.ui.controller("haui.area.SolarChart", {
    onInit: function() {
        var solarChartModel = new sap.ui.model.json.JSONModel();
        this.getView().byId("solarChart").setModel(solarChartModel);
        this.getView().addEventDelegate({
            onBeforeShow: function(evt) {
                this.refreshSolarData(); 
            }
        }, this);
	},
    
    refreshSolarData: function(){
        var solarChartModel = this.getView().byId("solarChart").getModel();
		solarChartModel.loadData("/solar/historicProductionData");
    },
	
	handleNavButtonPress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	}

});