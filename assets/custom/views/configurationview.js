var ConfigurationView = MasterView.extend({
	tagName : 'ul',
	className : 'sidebar-view configuration animated slideOutRight',
	templateURL : YaGlobals.CONFIG_MENU_TEMPLATE,
	events : {
		'click .close' : 'hide'
	},
	initialize : function(){
		_.bindAll(this,'hide');
		this.$el.hide();
		this.constructor.__super__.initialize.apply(this, []);
	},
	
	render : function(){
		this.$el.append(this.template());
		this.trigger('onViewRendered',this);
		return this;
	},
	
//	animationEnd : function(event){
//		this.$el.removeClass('slideOutRight');
//		this.$el.hide();
//		this.trigger('onConfigHide');
//		event.stopPropagation();
//		this.$el.one('webkitAnimationEnd mozAnimationEnd '+
//				  'MSAnimationEnd oanimationend animationend',this.animationEnd);
//	},
	
	onViewReady : function(){
		this.render();
	},
	
	show : function(){
		$('aside.yaybar').removeClass('usermenu');
		$('aside.yaybar').addClass('config');
		var _that = this;
		this.$el.show();
		this.$el.one('webkitAnimationEnd mozAnimationEnd '+
				  'MSAnimationEnd oanimationend animationend',function(){
			_that.$el.removeClass('slideInRight');
		});
		this.$el.removeClass('slideOutRight');
		this.$el.addClass('slideInRight');
	},
	
	hide : function(){
		$('aside.yaybar').removeClass('config');
		$('aside.yaybar').addClass('usermenu');
		var _that = this;
		this.$el.one('webkitAnimationEnd mozAnimationEnd '+
				  'MSAnimationEnd oanimationend animationend',function(event){
			_that.$el.removeClass('slideOutRight');
			_that.$el.hide();
			_that.trigger('onConfigHide');
			event.stopPropagation();
		});
		this.$el.addClass('slideOutRight');
	},
	
});