Meteor.startup(function () {
  Meteor.methods({
    createClass : function(name){
      var classId = Classrooms.insert({
            'name' : name,
            'teacher' : Meteor.userId()
        });
      return classId;
    }
  });
});