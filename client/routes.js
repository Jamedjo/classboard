Meteor.Router.add({
	'/': 'home',
	'/classroom/:id': function(id){
		window.classId = id;
		return 'classroom';
	},
	'*': '404'
});