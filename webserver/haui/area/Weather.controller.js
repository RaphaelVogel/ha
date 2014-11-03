sap.ui.controller("haui.area.Weather", {
	onInit: function() {
		var data = {
			"tempValues": [
				{"temperature":"18.2", "datetime": "2014-10-31 08:16:49"},
				{"temperature":"19.6", "datetime": "2014-10-31 08:43:20"},
				{"temperature":"20.3", "datetime": "2014-10-31 08:59:49"},
				{"temperature":"21", "datetime": "2014-10-31 09:10:49"},
				{"temperature":"21.7", "datetime": "2014-10-31 09:16:49"},
				{"temperature":"22.1", "datetime": "2014-10-31 09:45:49"},
				{"temperature":"23.4", "datetime": "2014-10-31 09:55:49"}
			]
		};
	
	    var tempChartModel = new sap.ui.model.json.JSONModel();
        tempChartModel.setData(data);
		this.getView().byId("temperatureChart").setModel(tempChartModel);
	},
	handleNavButtonPress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	}

});