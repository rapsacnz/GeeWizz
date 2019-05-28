({
  init : function(component, event, helper) {
  },

  noOp : function(component, event, helper) {
  },

  handleCloseClick : function(component, event, helper) {
    helper.close(component);
  },

  handleNextClick : function(component, event, helper) {
    helper.context(component,'someKey', 'from step 2');
    helper.next(component);

  },
})