var MasterView = Backbone.View.extend({
	initialize : function(){
		 YaGlobals.on('onTemplateLoaded',this.onTemplateLoaded,this);
		 YaGlobals.getTemplate(this.templateURL);
	},
	
	onTemplateLoaded : function(textTemplate){
		console.log($(textTemplate));
		this.template = _.template(textTemplate,{});
		YaGlobals.off('onTemplateLoaded');
		this.onViewReady();
	}
});
