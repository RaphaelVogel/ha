sap.ui.controller("haui.Temperature", {
	onInit: function() {
	
	},
	handleNavButtonPress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	}

});