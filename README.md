# GeeWizz
Integrated Wizard Container - Just implement the interface, add transitions, connect to hooks and you're done!
[![Deploy](https://deploy-to-sfdx.com/dist/assets/images/DeployToSFDX.svg)](https://deploy-to-sfdx.com/?template=https://github.com/rapsacnz/GeeWizz/)

<h3>Why?</h3>

Wizards are very useful for gathing a set of data that won't easily fit on one page or is grouped into specific areas for collection.

Of course, you can use a flow or a process to gather this data, but there are limits to what you can do with flows.
Using this new component, you can pretty much do anything you like with data inputs and outputs, types of components that you would like to display, state that you would like to maintain and more.

You have full control of the wizard. And you really want to be in control of your wizard. Who knows what they might get up to otherwise?

<h3>How (High level)</h3>
The Wizard is a container component that instantiates and destroys child components as needed. It maintains state across all children (as long as you tell it to).
It also handles back, forward, close and other actions triggered from the children.

In my version, I generally put the back, forward etc buttons on the children and call the wizard functions from them.

If you would like the buttons on the Wizard itself rather than the children, that's fine and it'll handle that too.

The header is a wizard component which is used to main continuity across all the screens. You of course can update the text as you proceed through the screens.

Here's what it looks like:

[su_spacer size="10"]
<iframe src="https://giphy.com/embed/C8KC65nH1pM1bdlTYh" width="480" height="396" frameBorder="0" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/C8KC65nH1pM1bdlTYh"></a></p>

<h3>Details</h3>

The Wizard consists of:
<ul class="bullet-list">
  <li>A main wizard component</li>
  <li>An opener (the wizard is opened like a quick action at present, but it could be hosted anywhere)</li>
  <li>An interface with a few common attributes for each of the Wizard sub components</li>
  <li>A Wizard base component that all components must extend</li>
  <li>Some event definitions.</li>
</ul>

The main component contains attributes that define what components it should load and in what order.
In the future, I'm going to feed this in via a wizard wrapper so the same wizard can be used for muliple applications.

These attributes define the next and previous components eg:
[code lang="html"]
<aura:attribute name="nextComponentNameMap" type="Map" default='{
    "":"GeeWizzStep1",
    "cGeeWizzStep1":"GeeWizzStep2",
    "cGeeWizzStep2":"GeeWizzStep3",
    "cGeeWizzStep3":""
  }' />
[/code]

[code lang="html"]
  <aura:attribute name="previousComponentNameMap" type="Map" default='{
    "cGeeWizzStep1":"",
    "cGeeWizzStep2":"GeeWizzStep1",
    "cGeeWizzStep3":"GeeWizzStep2",
    "":"GeeWizzStep3"
  }' />
[/code]


When the Wizard opens, it finds the first component and attempts to instantiate it.

It binds several useful functions to the subcomponent:
<ul class="bullet-list">
  <li>Next (goes to the next component)</li>
  <li>Previous (goes to the previous one)</li>
  <li>Close (closes the Wizard)</li>
  <li>Notify (shows an alert or other notification (configurable by the developer))</li>
  <li>Context (a getter/setter allowing storage of data between components)</li>
</ul>

Typically you would load a component and then retrieve the context.
Thinking about this now, I really should inject it on load...

Another thing to note is that a function "init" is called on load of the component, rather than using the regular init event, as I have had timing issues using the standard technique.

Here is the most important part - creating the new components:
[code lang="javascript"]

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
      },
      function(newComponent, status, errorMessage) {

        console.log(status);

        if (status === "SUCCESS") {
          var body = component.get("v.body");
          body = [];
          body.push(newComponent);
          component.set("v.body", body);
        } else if (status === "INCOMPLETE") { console.log(errorMessage); }
          else if (status === "ERROR") { console.log(errorMessage) }
      }
    );
  },
[/code]

Note the `bind` calls - these bind the calls from the sub-components to this component, which is a nice direct way to call methods on the parent.

And lastly, the Wizard Opener uses the Overlay library to instantiate the Wizard itself in a popup.
Of course you could just put it on a page or load it onto a lightning layout.

Currently this wizard does not save it's status / context to salesforce, so you need to open it fresh every time.
This again could be easily rectfied by saving a current status variable to an appropriate location.
You could also save the context object (encoded as JSON) and rehydrate it on load.
