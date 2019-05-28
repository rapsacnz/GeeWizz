({
  init: function(component, event, helper) {
    helper.init(component);
  },

  next: function(component, event, helper) {
    helper.loadNextComponent(component);
  },

  previous: function(component, event, helper) {
    helper.loadPreviousComponent(component);
  },

})