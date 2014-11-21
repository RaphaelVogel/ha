sap.ui.controller("haui.area.Solar", {
	onInit: function() {
	},
	
	handleRefreshPress: function(oEvent){
		var solarModel = sap.ui.getCore().getModel("solarModel");
		solarModel.loadData("/solar/data");
	},
	
	handleNavButtonPress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	}

});