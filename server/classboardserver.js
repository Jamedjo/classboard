Meteor.startup(function () {
  // Users = new Meteor.Collection('users');
  Meteor.methods({
    addRequest : function(requestText, description){
      console.log('Adding Request');
      var requestId = Requests.insert({
            'requestText' : requestText,
            'description' : description,
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