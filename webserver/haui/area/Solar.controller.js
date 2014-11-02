sap.ui.controller("haui.area.Solar", {
	onInit: function() {
	
	},
	handleNavButtonPress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	}

});