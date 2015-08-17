var UserModel = Backbone.Model.extend({
	url : "assets/custom/test/user.json",
	initialize : function(){
		
	},
	
	parse : function(response){
		return response.user;
	}
});

var UserMenuView = MasterView.extend({
	tagName : 'ul',
	className : 'sidebar-view',
	templateURL : YaGlobals.USER_MENU_TEMPLATE,
	
	initialize : function(){
		this.constructor.__super__.initialize.apply(this, []);
	},
	
	render : function(){
		this.$el.append(this.template(this.model.toJSON()));
		this.trigger('onViewRendered',this);
		return this;
	},
	
	onViewReady : function(){
		this.render();
	}
});