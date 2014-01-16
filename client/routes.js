Meteor.Router.add({
	'/': 'home',
	'/classroom/:id': function(id){
		window.currentClassroom = Classrooms.findOne({_id: id});
    if(typeof window.currentClassroom == 'undefined'){
       return '404';
    }
    else{
			window.classId = id;
			return 'classroom';
    }
	},
	'*': '404'
});