var NotificationsView = Backbone.View.extend({
	el : 'div.chat.chat-light',
	events :{
//		'click .contacts .user' : 'onItemClicked',
		'click .delete-notification' : 'deleteNotifications',
	},

	initialize : function(){
		
	},
	
	render : function(){
		
	},
	
	onItemClicked : function(event){
		event.preventDefault();
		event.stopPropagation();
		console.log('clicked');
	},
	
	deleteNotifications : function(event){
		var element = $(event.currentTarget);
		element.parent().one('webkitAnimationEnd mozAnimationEnd '+
		 'MSAnimationEnd oanimationend animationend')
			.one('webkitAnimationEnd mozAnimationEnd '+
					 'MSAnimationEnd oanimationend animationend',function(e){
				
			this.remove();
		});
		element.parent().addClass('animated slideOutRight');
		console.log('clicked deleted');
	},
	
	
});