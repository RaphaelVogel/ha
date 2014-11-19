sap.ui.controller("haui.area.HomeControl", {
	onInit: function() {
		var homeControlModel = new sap.ui.model.json.JSONModel();
		
	},
	
	handleRefreshPress: function(oEvent){
	
	},
	
	handleNavButtonPress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	}

});