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
      return Requests.find({solved:null},{sort:{'submittedOn':-1}});
  };

  // Template.request.userName = userName;
  Template.request.date = function(date){
    return moment(date).fromNow();
  };

  Template.helpForm.events({
  'click input.add-request' : function(event){
    event.preventDefault();
    var requestText = document.getElementById("requestText").value;
    Meteor.call("addRequest",requestText,handleError);
    document.getElementById("requestText").value = "";
    }
  });

  Template.request.events({
    'click button.delete' : function(event){
      var Id = event.target.getAttribute('data-id')
      Meteor.call("solveRequest",Id, handleError);
    }
  });

  Template.request.owner = function(userId){
    if (Meteor.user()) {
      return userId == Meteor.user()._id || Meteor.user().admin == true;
    };
  };
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
      solveRequest: function(requestId){
        return Requests.update({_id: requestId},{$set:{
          'solved': true
        }});
      },
      setAdmin: function(userId){
        return Meteor.users.update({_id: userId},{$set:{
          'admin': true
        }});
      }  
    });

    Meteor.publish(null, function () {
      return Meteor.users.find({_id: this.userId},{fields: {'admin': 1}});
    }); 
        // code to run on server at startup
  });
}


