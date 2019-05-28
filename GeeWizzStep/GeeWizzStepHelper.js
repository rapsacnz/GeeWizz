({
  //override this in subcomponent
  loadDependentData: function(component) {},
  next: function(component) {
    var action = component.get("v.next");
    if (!action) {
      return;
    }
    action(component.getConcreteComponent().getName());
  },
  previous: function(component) {
    var action = component.get("v.previous");
    if (!action) {
      return;
    }
    action(component.getConcreteComponent().getName());
  },
  close: function(component) {
    var action = component.get("v.close");
    if (!action) {
      return;
    }
    action();
  },
  notify: function(component, message, severity) {
    var action = component.get("v.notify");
    if (!action) {
      return;
    }
    action(message, severity);
  },
  setStatus: function(component,status){
    var action = component.get("v.setStatus");
    if ($A.util.isEmpty(action)){
      return;
    }
    action(status);
  },
  showSuccess: function(component, message) {
    this.notify(component,message,'success');
  },
  context: function(component, key, data) {
    var action = component.get("v.context");
    if (!action) {
      return;
    }
    return action(key, data);
  },

})