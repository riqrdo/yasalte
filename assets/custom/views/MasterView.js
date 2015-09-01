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
	inputEffect : 'slideInUp',
	outputEffect: 'slideOutDown',
	initialize : function(){
		 this.viewTools = new MasterViewTools();
		 this.viewTools.on('onTemplateLoaded',this.onTemplateLoaded,this);
		 this.viewTools.getTemplate(this.templateURL);
	},
	
	onTemplateLoaded : function(textTemplate){
		this.template = _.template(textTemplate,{});
		this.viewTools.off('onTemplateLoaded');
		this.onViewReady();
	},
	
	show : function(effect){
		this.inputEffect = (typeof effect === "undefined") ? this.inputEffect : effect;
		var that = this;
		this.$el.off('webkitAnimationEnd mozAnimationEnd '+
				 'MSAnimationEnd oanimationend animationend')
				.one('webkitAnimationEnd mozAnimationEnd '+
						 'MSAnimationEnd oanimationend animationend',
						 function(event){
					console.log("termina animacion show");
				that.$el.removeClass(that.inputEffect + " " + that.outputEffect);
				event.preventDefault();
				event.stopPropagation();
				that.isVisible = true;
		});
		this.$el.show();
		this.$el.addClass(this.inputEffect);
		this.isVisible = true;
	},
	
	hide : function(effect){
		this.outputEffect = (typeof effect === "undefined") ? this.outputEffect : effect;
		this.isVisible = false;
		var that = this;
		this.$el.off('webkitAnimationEnd mozAnimationEnd '+
		 'MSAnimationEnd oanimationend animationend')
		 .one('webkitAnimationEnd mozAnimationEnd '+
				 'MSAnimationEnd oanimationend animationend',
				 function(event){
			 	console.log("termina animacion hide");
			 	that.$el.hide();
			 	that.$el.removeClass(that.inputEffect + " "  + that.outputEffect);
				event.stopPropagation();
				that.isVisible = false;
		 });
		this.$el.addClass(this.outputEffect);
	}
});

