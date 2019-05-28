({
  init : function(component, event, helper) {
  },
    noOp : function(component, event, helper) {
  },
    handleCloseClick : function(component, event, helper) {
    helper.close(component);
  },
    handleNextClick : function(component, event, helper) {
    helper.context(component,'someKey', 'this is from step 3');
    helper.next(component);
  },

  init: function (cmp, event, helper) {
    cmp.set('v.mapMarkers', [
      {
        location: {
          Street: '415 Mission Street',
          City: 'San Francisco',
          State: 'CA'
        },

        title: 'The Salesforce Tower',
        description: 'Landmark, Salesforce Tower is the centerpiece of the San Francisco Transbay redevelopment plan.'
      }
    ]);
    cmp.set('v.zoomLevel', 16);
  }
  })