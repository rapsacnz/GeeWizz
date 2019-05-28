({
  handleShowModal: function (component, evt, helper) {
    var modalBody;
    $A.createComponent("c:GeeWizz", {},
      function (content, status) {
        if (status === "SUCCESS") {
          modalBody = content;
          component.find('overlayLib').showCustomModal({
            header: "",
            body: modalBody,
            showCloseButton: false,
            cssClass: "geewizz-extra-wide",
            closeCallback: function () {}
          })
        }
      });
  }
})