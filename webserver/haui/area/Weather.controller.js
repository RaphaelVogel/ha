sap.ui.controller("haui.area.Weather", {
	onInit: function() {
	
	},
	handleNavButtonPress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	}

});