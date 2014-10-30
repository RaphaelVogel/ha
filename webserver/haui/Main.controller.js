sap.ui.controller("haui.Main", {
	onInit: function() {
		// Set up navigation handling
		var oBus = sap.ui.getCore().getEventBus();
		oBus.subscribe("nav", "to", this.navToHandler, this);
		oBus.subscribe("nav", "back", this.navBackHandler, this);
	},

	navToHandler : function(channelId, eventId, data) {
		var mainView = this.getView();
		var haApp = mainView.byId("haapp");
		haApp.to(mainView.byId(data.id));
	},

	navBackHandler : function(channelId, eventId, data) {
		var mainView = this.getView();
		var haApp = mainView.byId("haapp");
		haApp.back();
	}
});