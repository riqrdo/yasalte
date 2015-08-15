var YaLoginView = MasterView.extend({
	tagName : 'li',
	className : 'content',
	templateURL : YaGlobals.LOGIN_TEMPLATE,
	initialize : function(){
		this.constructor.__super__.initialize.apply(this, []);
	},
	
	render : function(){
		this.$el.append(this.template());
		this.trigger('onViewRendered');
		return this;
	},
	
	onViewReady : function(textTemplate){
		this.render();
	}
});