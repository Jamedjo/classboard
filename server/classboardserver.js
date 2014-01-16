Meteor.startup(function () {
  // Users = new Meteor.Collection('users');
  Meteor.methods({
    addRequest : function(classId, requestText, description){
      console.log('Adding Request');
      var requestId = Requests.insert({
            'classId': classId,
            'requestText' : requestText,
            'description' : description,
            'submittedOn': new Date(),
            'username' : userName(),
            'submittedBy' : Meteor.userId()
        });
      return requestId;
    },
    solveRequest: function(requestId, solutionText){
      return Requests.update({_id: requestId},{$set:{
        'solved': true,
        'solutionText': solutionText
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