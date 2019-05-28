({
	notify : function(component, event, helper) {
		var params = event.getParam("arguments");
		if (!params || !params.category ){
			return;
		}
		var category = params.category;
		var message = params.message;
		if (category == 'error'){
			helper.showError(component,params.message)
		}
		else if (category == 'warning'){
			helper.showWarning(component,params.message)
		}
		else if (category == 'info'){
			helper.showInfo(component,params.message)
		}
		else if (category == 'success'){
			helper.showSuccess(component,params.message)
		}
	}
})