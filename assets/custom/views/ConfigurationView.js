var ConfigurationView = MasterView.extend({
	tagName : 'ul',
	className : 'sidebar-view',
	templateURL : YaGlobals.CONFIG_MENU_TEMPLATE,
	initialize : function(){
		this.constructor.__super__.initialize.apply(this, []);
	},
	
	render : function(){
		this.$el.append(this.template());
	},
	
	onViewReady : function(){
		this.render();
	}
	
});