if (Meteor.isClient) {
  // Template.hello.greeting = function () {
  //   return "Welcome to classboard.";

  Template.addRequest.events({
  'click input.add-request' : function(event){
    event.preventDefault();
    var requestText = document.getElementById("requestText").value;
    Meteor.call("addRequest",requestText,function(error , requestId){
      console.log('added request with Id .. '+requestId);
    });
    document.getElementById("requestText").value = "";

    }
  });
  // };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Requests = new Meteor.Collection("requests");

    Meteor.methods({
      addRequest : function(requestText){
        console.log('Adding Request');
        var requestId = Requests.insert({
              'requestText' : requestText,
              'submittedOn': new Date(),
              'submittedBy' : Meteor.userId()
          });
        return requestId;
      }
    });
        // code to run on server at startup
  });
}
