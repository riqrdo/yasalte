var MasterViewTools = function() {
	_.extend(this, Backbone.Events);
	this.getTemplate = function(templateURL){
			var scope = this;
			 $.get(templateURL, function (data) {
			        scope.trigger('onTemplateLoaded',data);
			    }, 'html');
	};	
	
	
};


var MasterView = Backbone.View.extend({
	initialize : function(){
		 this.viewTools = new MasterViewTools();
		 this.viewTools.on('onTemplateLoaded',this.onTemplateLoaded,this);
		 this.viewTools.getTemplate(this.templateURL);
//		 YaGlobals.on('onTemplateLoaded',this.onTemplateLoaded,this);
//		 YaGlobals.getTemplate(this.templateURL);
	},
	
	onTemplateLoaded : function(textTemplate){
		this.template = _.template(textTemplate,{});
		this.viewTools.off('onTemplateLoaded');
		this.onViewReady();
	}
});

