({
    handleRecordUpdated: function(component, event, helper) {

    },

    init: function(component, event, helper) {

      var cc = component.getConcreteComponent();
      var ccName = cc.getName();
      cc.init();

    }
  })