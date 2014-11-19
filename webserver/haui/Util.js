jQuery.sap.declare("haui.Util");
jQuery.sap.require("sap.ui.core.format.DateFormat");

haui.Util = {
	dateFormatter: function(value){
		if(!value) return;
		var inDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-dd HH:mm:ss"});
		var outDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "dd.MM.yy - HH:mm"});
		var inDate = inDateFormat.parse(value);
		return outDateFormat.format(inDate);
	},
	
	stringToBool: function(stringVal){
		if(!stringVal) return;
		if(stringVal === "ON"){
			return true;
		}
		else if(stringVal === "OFF"){
			return false
		}
		else
			return null;
	},
	
	boolToString: function(boolVal){
		if(boolVal === undefined) return;
		if(boolVal === true){
			return "ON";
		}
		else if(boolVal === false){
			return "OFF";
		}
		else
			return null;
	}	
};