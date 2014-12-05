jQuery.sap.declare("haui.Util");
jQuery.sap.require("sap.ui.core.format.DateFormat");

haui.Util = {
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