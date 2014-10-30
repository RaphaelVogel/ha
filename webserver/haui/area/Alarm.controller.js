sap.ui.controller("haui.area.Alarm", {
	onInit: function() {
	
	},
	handleNavButtonPress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	}

});