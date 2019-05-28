({
  init : function(component, event, helper) {
  },

  noOp : function(component, event, helper) {
  },

  handleCloseClick : function(component, event, helper) {
    helper.close(component);
  },

  handleNextClick : function(component, event, helper) {
    helper.context(component,'someKey', 'this is from step 1');
    helper.next(component);

  },
})