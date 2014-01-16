Requests = new Meteor.Collection("requests");
Classrooms = new Meteor.Collection("Classrooms");

userName = function(){
  if(Meteor.user()){
    return Meteor.user().profile.name || Meteor.user().services.github.username;
  }
}

handleError = function(error, response){
  if(error) console.log(error);
}
