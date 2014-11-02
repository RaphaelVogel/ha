sap.ui.controller("haui.Overview", {
	onInit: function() {
        var tempModel = new sap.ui.model.json.JSONModel("/weather/temperature");
        this.getView().byId("Weather").setModel(tempModel);
        var solarModel = new sap.ui.model.json.JSONModel("/solar/data");
        this.getView().byId("Solar").setModel(solarModel);
	},
	
	handleTilePress: function(oEvent) {
		var tileId = oEvent.getSource().getId().substring("Mainview--Overview--".length);
		sap.ui.getCore().getEventBus().publish("nav", "to", {id : tileId});
	}
});