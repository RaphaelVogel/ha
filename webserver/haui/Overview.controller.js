sap.ui.controller("haui.Overview", {
	onInit: function() {
        var weatherModel = new sap.ui.model.json.JSONModel();
		weatherModel.loadData("/weather/currentData");
		sap.ui.getCore().setModel(weatherModel, "weatherModel");
        var weatherTile = this.getView().byId("Weather");
        weatherModel.attachRequestCompleted(function(){
            weatherTile.setInfo("Status: OK");
            weatherTile.setInfoState("Success");
        });
        weatherModel.attachRequestFailed(function(){
			weatherTile.setNumber("-");
			weatherTile.setNumberUnit("Grad");
            weatherTile.setInfo("Keine Verbindung");
            weatherTile.setInfoState("Error");
        });        
		
        var solarModel = new sap.ui.model.json.JSONModel();
		solarModel.loadData("/solar/currentData");
		sap.ui.getCore().setModel(solarModel, "solarModel");
        var solarTile = this.getView().byId("Solar");
        solarModel.attachRequestCompleted(function(){
            solarTile.setInfo("Status: OK");
            solarTile.setInfoState("Success");
        });
        solarModel.attachRequestFailed(function(){
			solarTile.setNumber("-");
			solarTile.setNumberUnit("kW");
            solarTile.setInfo("Nicht in Betrieb");
            solarTile.setInfoState("Error");
        });
	},
	
	handleRefreshPress: function(oEvent){
		var weatherModel = sap.ui.getCore().getModel("weatherModel");
		weatherModel.loadData("/weather/currentData");
		var solarModel = sap.ui.getCore().getModel("solarModel");
		solarModel.loadData("/solar/currentData");
	},
	
	handleTilePress: function(oEvent) {
		var tileId = oEvent.getSource().getId().substring("Mainview--Overview--".length);
		sap.ui.getCore().getEventBus().publish("nav", "to", {id : tileId});
	},
	
});