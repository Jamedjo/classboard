Template.requests.items = function(){
    return Requests.find({solved:null},{sort:{'submittedOn':-1}});
};

Template.requests.solved_items = function(){
    return Requests.find({solved:true},{sort:{'submittedOn':-1}});
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