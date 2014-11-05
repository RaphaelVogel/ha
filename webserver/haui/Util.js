jQuery.sap.declare("haui.Util");
jQuery.sap.require("sap.ui.core.format.DateFormat");

haui.Util = {
	dateFormatter: function(value){
		if(!value) return;
		var inDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-dd HH:mm:ss"});
		var outDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "dd.MM.yy - HH:mm"});
		var inDate = inDateFormat.parse(value);
		return outDateFormat.format(inDate);
	}
};