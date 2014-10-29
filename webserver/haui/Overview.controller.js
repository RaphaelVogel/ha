sap.ui.controller("haui.Overview", {
	onInit: function() {
	
	},
	
	handleTilePress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "to", {
			id : "Temperature",
			context: oEvent.getSource().getBindingContext()
		});
	}
});