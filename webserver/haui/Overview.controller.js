sap.ui.controller("haui.Overview", {
	onInit: function() {
        var weatherModel = new sap.ui.model.json.JSONModel();
		weatherModel.loadData("/weather/data");
		sap.ui.getCore().setModel(weatherModel, "weatherModel");
        
        var solarModel = new sap.ui.model.json.JSONModel();
		solarModel.loadData("/solar/data");
		sap.ui.getCore().setModel(solarModel, "solarModel");
        var solarTile = this.getView().byId("Solar");
        solarModel.attachRequestCompleted(function(){
            solarTile.setInfo("In Betrieb");
            solarTile.setInfoState("Success");
        });
        solarModel.attachRequestFailed(function(){
            solarTile.setInfo("Nicht in Betrieb");
            solarTile.setInfoState("Error");
        });
	},
	
	handleRefreshPress: function(oEvent){
		var weatherModel = sap.ui.getCore().getModel("weatherModel");
		weatherModel.loadData("/weather/data");
		var solarModel = sap.ui.getCore().getModel("solarModel");
		solarModel.loadData("/solar/data");
	},
	
	handleTilePress: function(oEvent) {
		var tileId = oEvent.getSource().getId().substring("Mainview--Overview--".length);
		sap.ui.getCore().getEventBus().publish("nav", "to", {id : tileId});
	},
	
});