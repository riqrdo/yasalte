var UserModel = Backbone.Model.extend({
	url : "assets/custom/test/user.json",
	initialize : function(){
		
	},
	
	parse : function(response){
		return response.user;
	}
});

var UserMenuView = MasterView.extend({
	events : {
		'click .mnuConfigAccount' : 'openConfigView'
	},
	tagName : 'ul',
	className : 'sidebar-view animated ',
	templateURL : YaGlobals.USER_MENU_TEMPLATE,
	configurationView : undefined,
	WINDOW_EVENT : 'close',
	initialize : function(){
		_.bindAll(this,'openConfigView');
		this.constructor.__super__.initialize.apply(this, []);
	},
	
	render : function(){
		this.$el.append(this.template(this.model.toJSON()));
		this.configurationView = new ConfigurationView();
		this.configurationView.on('onViewRendered',function(view){
			this.$el.parent().append(view.$el);
		},this);
		this.configurationView.on('onConfigHide',this.backFromConfig,this);
		this.trigger('onViewRendered',this);
		return this;
	},
	
	onViewReady : function(){
		this.render();
	},
	
	backFromConfig : function(){
		this.$el.show();
	},
	
	openConfigView : function(event) {
		var _that = this;
		this.$el.on('webkitAnimationEnd mozAnimationEnd '+
				  'MSAnimationEnd oanimationend animationend',function(event){
			_that.$el.removeClass('slideOutLeft');
			_that.$el.hide();
			event.stopPropagation();
		});
		this.configurationView.show();
		this.$el.addClass('slideOutLeft');
	},
});