sap.ui.controller("haui.area.weather.WeatherChart", {
    year: new Date().getFullYear(),
	month: new Date().getMonth() + 1,
	day: new Date().getDate()-2,
	displayData: "", //Weather--temperatureData, Weather--humidityData, Weather--pressureData
	
	onInit: function() {
		if(this.day < 10){
			this.day = "0"+this.day;
		}
		if(this.month < 10){
			this.month = "0"+this.month;
		}		
		this.getView().byId("allButton").setText("Alle Jahre");
		this.getView().byId("yearButton").setText("Jahr "+this.year);
		this.getView().byId("monthButton").setText("Monat "+this.month);
		this.getView().byId("dayButton").setText("Tag "+this.day);		
        var weatherChartModel = new sap.ui.model.json.JSONModel();
        this.getView().byId("weatherChart").setModel(weatherChartModel);
        this.getView().addEventDelegate({
            // call every time when page is displayed
            onBeforeShow: function(evt) {
                this.displayData = evt.data.customData;
				if(this.displayData === "Weather--temperatureData"){
					this.getView().byId("weatherChartPage").setTitle("Temperatur");
					this.getView().byId("weatherChart").getValues()[0].setDisplayName("Temperatur C°");
					var weatherChartModel = this.getView().byId("weatherChart").getModel();
					weatherChartModel.loadData("/weather/historicTemperatures?year="+this.year+"&month="+this.month);
				}
				else if(this.displayData === "Weather--humidityData"){
					this.getView().byId("weatherChartPage").setTitle("Luftfeuchtigkeit");
					this.getView().byId("weatherChart").getValues()[0].setDisplayName("Luftfeuchtigkeit %RH");
					var weatherChartModel = this.getView().byId("weatherChart").getModel();
					weatherChartModel.loadData("/weather/historicHumidities?year="+this.year+"&month="+this.month);				
				}
				else if(this.displayData === "Weather--pressureData"){
					this.getView().byId("weatherChartPage").setTitle("Luftdruck");
					this.getView().byId("weatherChart").getValues()[0].setDisplayName("Luftdruck mBar");
					var weatherChartModel = this.getView().byId("weatherChart").getModel();
					weatherChartModel.loadData("/weather/historicPressures?year="+this.year+"&month="+this.month);				
				}
            }
        }, this);
	},
	
	handleAllPress: function(){
		this.getView().byId("weatherChart").setType("Column");
		var weatherChartModel = this.getView().byId("weatherChart").getModel();
		if(this.displayData === "Weather--temperatureData"){
			weatherChartModel.loadData("/weather/historicTemperatures");
		}
		else if(this.displayData === "Weather--humidityData"){
			weatherChartModel.loadData("/weather/historicHumidities");
		}
		else if(this.displayData === "Weather--pressureData"){
			weatherChartModel.loadData("/weather/historicPressures");
		}	
	},
	
	handleYearPress: function(oEvent){
		this.getView().byId("weatherChart").setType("Line");
		var weatherChartModel = this.getView().byId("weatherChart").getModel();
		if(this.displayData === "Weather--temperatureData"){
			weatherChartModel.loadData("/weather/historicTemperatures?year="+this.year);
		}
		else if(this.displayData === "Weather--humidityData"){
			weatherChartModel.loadData("/weather/historicHumidities?year="+this.year);
		}
		else if(this.displayData === "Weather--pressureData"){
			weatherChartModel.loadData("/weather/historicPressures?year="+this.year);
		}
	},

	handleMonthPress: function(oEvent){
		this.getView().byId("weatherChart").setType("Line");
		var weatherChartModel = this.getView().byId("weatherChart").getModel();
		if(this.displayData === "Weather--temperatureData"){
			weatherChartModel.loadData("/weather/historicTemperatures?year="+this.year+"&month="+this.month);	
		}
		else if(this.displayData === "Weather--humidityData"){
			weatherChartModel.loadData("/weather/historicHumidities?year="+this.year+"&month="+this.month);
		}
		else if(this.displayData === "Weather--pressureData"){
			weatherChartModel.loadData("/weather/historicPressures?year="+this.year+"&month="+this.month);
		}
	},

	handleDayPress: function(oEvent){
		this.getView().byId("weatherChart").setType("Line");
		var weatherChartModel = this.getView().byId("weatherChart").getModel();
		if(this.displayData === "Weather--temperatureData"){
			weatherChartModel.loadData("/weather/historicTemperatures?year="+this.year+"&month="+this.month+"&day="+this.day);
		}
		else if(this.displayData === "Weather--humidityData"){
			weatherChartModel.loadData("/weather/historicHumidities?year="+this.year+"&month="+this.month+"&day="+this.day);
		}
		else if(this.displayData === "Weather--pressureData"){
			weatherChartModel.loadData("/weather/historicPressures?year="+this.year+"&month="+this.month+"&day="+this.day);
		}
	},
	
	chartPressed: function(oEvent){
		var category = this.getView().byId("weatherChart").getSelectedCategory();
		if(category && category.indexOf(':') == -1){
			if(category.length === 4){
				// year selected
				var weatherChartModel = this.getView().byId("weatherChart").getModel();
				
			}
			else if(category.length === 7){
				// month selected
				var weatherChartModel = this.getView().byId("weatherChart").getModel();
				
			}
			else if(category.length === 11){
				// day selected
				var weatherChartModel = this.getView().byId("weatherChart").getModel();
				
			}
		}
	},
	
	handleNavButtonPress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	}
});