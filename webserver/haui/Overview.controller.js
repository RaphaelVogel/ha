sap.ui.controller("haui.Overview", {
	onInit: function() {
        var tempModel = new sap.ui.model.json.JSONModel();
		tempModel.loadData("/weather/temperature");
        this.getView().byId("Weather").setModel(tempModel);
        
        var solarModel = new sap.ui.model.json.JSONModel();
		solarModel.loadData("/solar/data");
        var solarTile = this.getView().byId("Solar");
        solarTile.setModel(solarModel);
        solarModel.attachRequestCompleted(function(){
            solarTile.setInfo("In Betrieb");
            solarTile.setInfoState("Success");
        });
        solarModel.attachRequestFailed(function(){
            solarTile.setInfo("Nicht in Betrieb");
            solarTile.setInfoState("Error");
        });
	},
	
	handleTilePress: function(oEvent) {
		var tileId = oEvent.getSource().getId().substring("Mainview--Overview--".length);
		sap.ui.getCore().getEventBus().publish("nav", "to", {id : tileId});
	},
	
});