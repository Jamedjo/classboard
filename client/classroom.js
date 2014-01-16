Template.addClassroom.events({
'click input.add-classroom' : function(event){
  event.preventDefault();
  var className = document.getElementById("className").value;
  Meteor.call("createClass", className, handleError);
  document.getElementById("className").value = "";
  }
});