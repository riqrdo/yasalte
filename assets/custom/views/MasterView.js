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
	},
	
	show : function(effect){
		var that = this;
		this.$el.one('webkitAnimationEnd mozAnimationEnd '+
					 'MSAnimationEnd oanimationend animationend',
					 function(event){
			that.$el.removeClass(effect);
			event.stopPropagation();
			that.isVisible = true;
		});
		this.$el.addClass(effect);
		this.$el.show();
		this.isVisible = true;
	},
	
	hide : function(effect){
		this.isVisible = false;
		var that = this;
		this.$el.one('webkitAnimationEnd mozAnimationEnd '+
				 'MSAnimationEnd oanimationend animationend',function(){
			that.$el.hide();
			that.$el.removeClass(effect);
			event.stopPropagation();
			that.isVisible = false;
		});
		this.$el.addClass(effect);
	}
});

