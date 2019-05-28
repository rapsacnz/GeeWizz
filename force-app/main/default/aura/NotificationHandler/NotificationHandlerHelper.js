({
	showInfo: function (component, message) {
		// record is saved successfully
		var toast = this.getToast(component);
		if (toast) {
			toast.setParams({
				"message": message
			});
			toast.fire();
		}
		else {
			alert(message);
		}
	},

	showSuccess: function (component, message) {
		// record is saved successfully
		var toast = this.getToast(component);
		if (toast) {
			toast.setParams({
				"message": message,
				"type": "success",
			});
			toast.fire();
		}
		else {
			alert(message);
		}
	},

	showWarning: function (component, message) {
		// record is saved successfully
		var toast = this.getToast(component);
		if (toast) {
			toast.setParams({
				"message": message,
				"type": "warning",
				"mode":"sticky"
			});
			toast.fire();
		}
		else {
			alert(message);
		}
	},

	showError: function (component, message) {
		// record is saved successfully
		var toast = this.getToast(component);
		if (toast) {
			toast.setParams({
				"message": message,
				"type": "error",
				"mode":"sticky"
			});
			toast.fire();
		}
		else {
			alert(message);
		}
	},

	getToast : function (component){
		var toast = $A.get("e.force:showToast");
		if (!toast || !toast.getType() == 'force:showToast'){
			return false;
		}
		return toast;
	}

	// showWarning: function (component, message) {
	// 	var notifLib = component.find('notifLib');
	// 	if (component.isInstanceOf('lightning:notificationsLibrary')){
	// 		notifLib.showNotice({
	// 			"variant": "warning",
	// 			"header": "Something went wrong.",
	// 			"message": message,
	// 			closeCallback: function () {
	// 			}
	// 		});
	// 	}else {
	// 		alert(message);
	// 	}

	// },

	// showError: function (component, message) {
	// 	var notifLib = component.find('notifLib');
	// 	if (component.isInstanceOf('lightning:notificationsLibrary')){
	// 		notifLib.showNotice({
	// 			"variant": "error",
	// 			"header": "Something went wrong.",
	// 			"message": message,
	// 			closeCallback: function () {
	// 			}
	// 		});
	// 	}else {
	// 		alert(message);
	// 	}

	// }
})