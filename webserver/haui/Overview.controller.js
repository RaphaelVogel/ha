sap.ui.controller("haui.Overview", {
	onInit: function() {
        var tempModel = new sap.ui.model.json.JSONModel("/weather/temperature");
        this.getView().byId("weather").setModel(tempModel);
	},
	
	handleTilePress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "to", {
			id : "Temperature",
			context: oEvent.getSource().getBindingContext()
		});
	}
});