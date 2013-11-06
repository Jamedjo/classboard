Requests = new Meteor.Collection("requests");

userName = function(){
  if(Meteor.user()){
    return Meteor.user().profile.name || Meteor.user().services.github.username;
  }
}

handleError = function(error, response){
  if(error) console.log(error);
}

if (Meteor.isClient) {
  Template.requests.items = function(){
      return Requests.find({},{sort:{'submittedOn':-1}});
  };

  // Template.request.userName = userName;
  Template.request.date = function(date){
    return moment(date).fromNow();
  };

  Template.requests.events({
  'click input.add-request' : function(event){
    var requestText = document.getElementById("requestText").value;
    Meteor.call("addRequest",requestText,handleError);
    document.getElementById("requestText").value = "";
    }
  });

  Template.request.events({
    'click button.delete' : function(event){
      var Id = event.target.getAttribute('data-id')
      Meteor.call("removeRequest",Id, handleError);
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // Users = new Meteor.Collection('users');
    Meteor.methods({
      addRequest : function(requestText){
        console.log('Adding Request');
        var requestId = Requests.insert({
              'requestText' : requestText,
              'submittedOn': new Date(),
              'username' : userName(),
              'submittedBy' : Meteor.userId()
          });
        return requestId;
      },
      removeRequest: function(requestId){
        return Requests.remove({
          '_id': requestId
        });
      },
      setAdmin: function(userId){
        console.log('asdf');
        console.log(userId);
        return Meteor.users.update({_id: userId},{$set:{
          'admin': true
        }});
      }  
    });
        // code to run on server at startup
  });
}


