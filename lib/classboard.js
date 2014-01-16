Requests = new Meteor.Collection("requests");
Classrooms = new Meteor.Collection("classrooms");

userName = function(){
  if(Meteor.user()){
    return Meteor.user().profile.name || Meteor.user().services.github.username;
  }
}

handleError = function(error, response){
  if(error) console.log(error);
}

currentClassId = function(){
	if(Meteor.Router.page()=='classroom') return window.classId;
};