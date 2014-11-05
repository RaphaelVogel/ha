sap.ui.controller("haui.area.Weather", {
	onInit: function() {
		var data = {
			"tempValues": [
				{"temperature":"18.2", "measureDate": "2014-10-31 08:16:49"},
				{"temperature":"19.6", "measureDate": "2014-10-31 08:43:20"},
				{"temperature":"20.3", "measureDate": "2014-10-31 08:59:49"},
				{"temperature":"21", "measureDate": "2014-10-31 09:10:49"},
				{"temperature":"21.7", "measureDate": "2014-11-01 08:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-01 09:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-01 10:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-01 11:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-02 08:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-02 09:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-02 10:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-02 11:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-03 08:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-03 09:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-03 10:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-03 11:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-04 08:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-04 09:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-04 10:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-04 11:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-05 08:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-05 09:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-05 10:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-05 11:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-06 08:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-06 09:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-06 10:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-06 11:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-07 08:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-07 09:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-07 10:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-07 11:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-08 08:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-08 09:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-08 10:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-08 11:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-09 08:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-09 09:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-09 10:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-09 11:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-10 08:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-10 09:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-10 10:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-10 11:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-11 08:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-11 09:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-11 10:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-11 11:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-12 08:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-12 09:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-12 10:16:49"},
				{"temperature":"21.7", "measureDate": "2014-11-12 11:16:49"}				
			]
		};
	
	    var tempChartModel = new sap.ui.model.json.JSONModel();
        tempChartModel.setData(data);
		this.getView().byId("temperatureChart").setModel(tempChartModel);
		this.getView().byId("temperatureChart").setRangeSelectorStartPosition(data.tempValues.length - 8);
		
	},
	handleNavButtonPress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	}

});