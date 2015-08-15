var YaLoginView = Backbone.View.extend({
	tagName : 'li',
	className : 'content',
	initialize : function(){
		YaGlobals.on('onTemplateLoaded',this.onTemplateLoaded,this);
	},
	
	render : function(){
		this.$el.append(this.template());
		this.trigger('onLoaded');
		return this;
	},
	
	onTemplateLoaded : function(textTemplate){
		console.log($(textTemplate));
		this.template = _.template(textTemplate,{});
		YaGlobals.off('onTemplateLoaded');
		this.render();
	}


});