sap.ui.controller("haui.area.HomeControl", {    
    onInit: function() {
        this.getView().addEventDelegate({
            onBeforeShow: function(evt) {
                this.refreshZWaveState(); 
            }
        }, this);
	},
    
    refreshZWaveState: function(){
        var zwaveModel = new sap.ui.model.json.JSONModel();
		zwaveModel.loadData("/zwave/state");
        this.getView().byId("HomeControlPage").setModel(zwaveModel);
    },
	
	handleLivingroomLight: function(oEvent){
		var state = oEvent.getSource().getState();
		state = haui.Util.boolToString(state);
		var getRequest = $.ajax({
			type: 'GET',
			url: "/zwave/livingroomLight/"+state,
			dataType: "json"
		});
	},
	
	handleRefreshPress: function(oEvent){
        this.refreshZWaveState();
	},
	
	handleNavButtonPress: function(oEvent) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	}

});