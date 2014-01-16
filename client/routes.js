Meteor.Router.add({
	'/': 'home',
	'/classroom/:id': function(id){
		return 'classroom';
	},
	'*': '404'
});