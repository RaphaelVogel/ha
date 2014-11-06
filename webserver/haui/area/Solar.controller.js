sap.ui.controller("haui.area.Solar", {
	onInit: function() {
		var solarModel = new sap.ui.model.json.JSONModel();
		solarModel.loadData("/solar/data");
        this.getView().byId("SolarPage").setModel(solarModel);
	},
	
	handleRefreshPress: function(oEvent){
		var solarModel = this.getView().byId("SolarPage").getModel();
		solarModel.loadData("/solar/data");
	},
	
	handleNavButtonPress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	}

});