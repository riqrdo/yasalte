/**
 * 
 */
var SearchSuggestView = MasterView.extend({
	templateURL : YaGlobals.SEARCH_SUGGEST_TEMPLATE,
	className : 'search-suggest-view animated',
	isVisible : false,
	initialize : function(){
		this.constructor.__super__.initialize.apply(this, []);
	},
	
	render : function(){
		this.$el.append(this.template());
		this.$el.hide();
		this.trigger('onViewRendered',this);
		return this;
	},
	
	onViewReady : function(textTemplate){
		this.render();
	},
	
	show : function(){
		var that = this;
		this.$el.one('webkitAnimationEnd mozAnimationEnd '+
					 'MSAnimationEnd oanimationend animationend',
					 function(event){
			that.$el.removeClass("fadeInDown");
			event.stopPropagation();
			that.isVisible = true;
		});
		this.$el.addClass('fadeInDown');
		this.$el.show();
		this.isVisible = true;
	},
	
	hide : function(){
		this.isVisible = false;
		var that = this;
		this.$el.one('webkitAnimationEnd mozAnimationEnd '+
				 'MSAnimationEnd oanimationend animationend',function(){
			that.$el.hide();
			that.$el.removeClass('fadeOutUp');
			event.stopPropagation();
			that.isVisible = false;
		});
		this.$el.addClass('fadeOutUp');
	}
	
	
});