sap.ui.controller("haui.area.weather.WeatherChart", {
    year: new Date().getFullYear(),
	month: new Date().getMonth() + 1,
	day: new Date().getDate(),
	displayData: "", //Weather--temperatureData, Weather--humidityData, Weather--pressureData
	
	onInit: function() {
		if(this.day < 10){
			this.day = "0"+this.day;
		}
		if(this.month < 10){
			this.month = "0"+this.month;
		}		
		this.getView().byId("allButton").setText("Alle Jahre");
		this.getView().byId("yearButton").setText(this.year);
		this.getView().byId("monthButton").setText(haui.Util.numberToMonth(this.month.toString()));
		this.getView().byId("dayButton").setText("Heute");		
        var weatherChartModel = new sap.ui.model.json.JSONModel();
        this.getView().byId("weatherChart").setModel(weatherChartModel);
        this.getView().addEventDelegate({
            // call every time when page is displayed
            onBeforeShow: function(evt) {
                this.displayData = evt.data.customData;
                var weatherChartModel = this.getView().byId("weatherChart").getModel();
				if(this.isTemperatureChart()){
					this.getView().byId("weatherChartPage").setTitle("Temperatur");
					this.getView().byId("weatherChart").getValues()[0].setDisplayName("Temperatur C°");
					weatherChartModel.loadData("/weather/historicTemperatures?year="+this.year+"&month="+this.month);
				}
				else if(this.isHumidityChart()){
					this.getView().byId("weatherChartPage").setTitle("Luftfeuchtigkeit");
					this.getView().byId("weatherChart").getValues()[0].setDisplayName("Luftfeuchtigkeit %RH");
					weatherChartModel.loadData("/weather/historicHumidities?year="+this.year+"&month="+this.month);				
				}
				else if(this.isPressureChart()){
                    this.getView().byId("weatherChartPage").setTitle("Luftdruck");
                    this.getView().byId("weatherChart").getValues()[0].setDisplayName("Luftdruck mBar");
                    this.getView().byId("weatherChart").setValueAxis(new sap.makit.ValueAxis({min : 930, max: 1100})); 
                    weatherChartModel.loadData("/weather/historicPressures?year="+this.year+"&month="+this.month);				
				}
            }
        }, this);
	},
	
	handleAllPress: function(){
		this.getView().byId("weatherChart").setType("Column");
		var weatherChartModel = this.getView().byId("weatherChart").getModel();
		if(this.isTemperatureChart()){
			weatherChartModel.loadData("/weather/historicTemperatures");
		}
		else if(this.isHumidityChart()){
			weatherChartModel.loadData("/weather/historicHumidities");
		}
		else if(this.isPressureChart()){
			weatherChartModel.loadData("/weather/historicPressures");
		}	
	},
	
	handleYearPress: function(oEvent){
		this.getView().byId("weatherChart").setType("Line");
		var weatherChartModel = this.getView().byId("weatherChart").getModel();
		if(this.isTemperatureChart()){
			weatherChartModel.loadData("/weather/historicTemperatures?year="+this.year);
		}
		else if(this.isHumidityChart()){
			weatherChartModel.loadData("/weather/historicHumidities?year="+this.year);
		}
		else if(this.isPressureChart()){
			weatherChartModel.loadData("/weather/historicPressures?year="+this.year);
		}
	},

	handleMonthPress: function(oEvent){
		this.getView().byId("weatherChart").setType("Line");
		var weatherChartModel = this.getView().byId("weatherChart").getModel();
		if(this.isTemperatureChart()){
			weatherChartModel.loadData("/weather/historicTemperatures?year="+this.year+"&month="+this.month);	
		}
		else if(this.isHumidityChart()){
			weatherChartModel.loadData("/weather/historicHumidities?year="+this.year+"&month="+this.month);
		}
		else if(this.isPressureChart()){
			weatherChartModel.loadData("/weather/historicPressures?year="+this.year+"&month="+this.month);
		}
	},

	handleDayPress: function(oEvent){
		this.getView().byId("weatherChart").setType("Line");
		var weatherChartModel = this.getView().byId("weatherChart").getModel();
		if(this.isTemperatureChart()){
			weatherChartModel.loadData("/weather/historicTemperatures?year="+this.year+"&month="+this.month+"&day="+this.day);
		}
		else if(this.isHumidityChart()){
			weatherChartModel.loadData("/weather/historicHumidities?year="+this.year+"&month="+this.month+"&day="+this.day);
		}
		else if(this.isPressureChart()){
			weatherChartModel.loadData("/weather/historicPressures?year="+this.year+"&month="+this.month+"&day="+this.day);
		}
	},
	
	chartPressed: function(oEvent){
		var category = this.getView().byId("weatherChart").getSelectedCategory();
		var weatherChartModel = this.getView().byId("weatherChart").getModel();
        if(category && category.indexOf(':') == -1){
            this.getView().byId("weatherChart").setType("Line");
			if(category.length === 4){
				// year selected e.g. 2014
				if(this.isTemperatureChart()){
                    weatherChartModel.loadData("/weather/historicTemperatures?year="+category);
                }
                else if(this.isHumidityChart()){
                    weatherChartModel.loadData("/weather/historicHumidities?year="+category);
                }
                else if(this.isPressureChart()){
                    weatherChartModel.loadData("/weather/historicPressures?year="+category);
                }
			}
			else if(category.length === 7){
				// month selected e.g. 12 2014
				var splitDate = category.split(' ');
                if(this.isTemperatureChart()){
                    weatherChartModel.loadData("/weather/historicTemperatures?year="+splitDate[1]+"&month="+splitDate[0]);
                }
                else if(this.isHumidityChart()){
                    weatherChartModel.loadData("/weather/historicHumidities?year="+splitDate[1]+"&month="+splitDate[0]);
                }
                else if(this.isPressureChart()){
                    weatherChartModel.loadData("/weather/historicPressures?year="+splitDate[1]+"&month="+splitDate[0]);
                }				
			}
			else if(category.length === 11){
                // day selected e.g. 05.12. 2014
                var splitDate = category.split(' ');
                var splitMonth = splitDate[0].split('.');
                if(this.isTemperatureChart()){
                    weatherChartModel.loadData("/weather/historicTemperatures?year="+splitDate[1]+"&month="+splitMonth[1]+"&day="+splitMonth[0]);
                }
                else if(this.isHumidityChart()){
                    weatherChartModel.loadData("/weather/historicHumidities?year="+splitDate[1]+"&month="+splitMonth[1]+"&day="+splitMonth[0]);
                }
                else if(this.isPressureChart()){
                    weatherChartModel.loadData("/weather/historicPressures?year="+splitDate[1]+"&month="+splitMonth[1]+"&day="+splitMonth[0]);
                }				
			}
		}
	},
	
    isTemperatureChart: function(){
        return (this.displayData === "Weather--temperatureData");
    },
    
    isHumidityChart: function(){
        return (this.displayData === "Weather--humidityData");
    },
    
    isPressureChart: function(){
        return (this.displayData === "Weather--pressureData");
    },    
    
	handleNavButtonPress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	}
});