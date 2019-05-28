({

  init: function(component) {

    component.set("v.userId", $A.get("$SObjectType.CurrentUser.Id"));
    this.loadNextComponent(component);

  },

  loadNextComponent: function(component) {

    var nextComponent = "";
    var nameMap = component.get("v.nextComponentNameMap");
    var subComponent = component.get("v.body")[0];
    var componentName = "";
    if (!$A.util.isEmpty(subComponent)) {
      componentName = subComponent.getName();
    }
    console.log('currentComponent: ' + componentName);

    nextComponent = nameMap[componentName];
    this.loadWhenReady(component, nextComponent);
  },

  loadPreviousComponent: function(component) {

    var previousComponent = "";
    var nameMap = component.get("v.previousComponentNameMap");
    var subComponent = component.get("v.body")[0];
    if (!$A.util.isEmpty(subComponent)) {
      previousComponent = nameMap[subComponent.getName()];

    }
    if (!previousComponent) {
      return;
    }
    this.loadWhenReady(component, previousComponent,'backwards');
  },

  loadWhenReady: function(component, nextComponent, direction) {

    var self = this;

    //need to sort this out
    window.setTimeout(
      $A.getCallback(function() {
        self.createComponent(component, nextComponent,direction);
      }), 200
    );

  },

  next: function(component, context) {
    this.loadNextComponent(component);
  },
  previous: function(component) {
    this.loadPreviousComponent(component);
  },
  notify: function(component, message, severity) {
    component.find('NotificationHandler').notify(severity, message);
  },
  close: function(component) {

    component.find("overlayLib").notifyClose();

  },

  goToHome: function(component) {
    component.find("navigationService").navigate({
      type: "standard__recordPage",
      attributes: {
        recordId: component.get("v.recordId"),
        objectApiName: "Your_SObject__c",
        actionName: "view"
      }
    });
  },

  setStatus: function(component, status) {
  },

  context: function(component, key, value) {
    if (arguments.length == 2 || value == undefined) {
      //getter
      var val = component.get("v.context" + '.' + key);
      return component.get("v.context" + '.' + key);
    } else if (arguments.length == 3) {
      //setter
      component.set("v.context" + '.' + key, value);
      return value;
    }
  },

  createComponent: function(component, nextComponent, dir) {

    var self = this;
    var direction = (!dir || dir == undefined) ? 'forwards' : 'backwards';

    $A.createComponent(
      "c:" + nextComponent, {
        "aura:id": nextComponent,
        userId: component.getReference("v.userId"),
        direction: direction,

        next: self.next.bind(self, component),
        previous: self.previous.bind(self, component),
        close: self.close.bind(self, component),
        notify: self.notify.bind(self, component),
        context: self.context.bind(self, component),
        setStatus: self.setStatus.bind(self, component)
      },
      function(newComponent, status, errorMessage) {

        console.log(status);

        if (status === "SUCCESS") {

          window.setTimeout(
            $A.getCallback(function() {
              var body = component.get("v.body");
              body = [];
              body.push(newComponent);
              component.set("v.body", body);
            }), 300
          );

        } else if (status === "INCOMPLETE") { console.log(errorMessage); } else if (status === "ERROR") { console.log(errorMessage) }
      }
    );
  },



})