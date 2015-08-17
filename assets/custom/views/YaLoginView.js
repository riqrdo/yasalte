var YaLoginView = MasterView.extend({
	tagName : 'li',
	className : 'content',
	events : {
		'click .facebook-login' : 'loginWithFacebook'
	},
	templateURL : YaGlobals.LOGIN_TEMPLATE,
	initialize : function(){
		_.bindAll(this,'loginWithFacebook','onAnimationFinished');
		this.constructor.__super__.initialize.apply(this, []);
	},
	render : function(){
		this.$el.append(this.template());
		this.trigger('onViewRendered',this);
		$('.login-content',this.$el).one('webkitAnimationEnd mozAnimationEnd '+
				  'MSAnimationEnd oanimationend animationend', 
				 this.onAnimationFinished);
		return this;
	},
	onViewReady : function(textTemplate){
		this.render();
	},
	loginWithFacebook : function(event){
		/**
		 * TODO: Poner aqui la lógica para el
		 * login con facebook!!
		 */
		YaGlobals.tmp.isLogged = true;
		this.trigger('loginSuccess');
	},
	close : function(){
		$('.login-content',this.$el).addClass('slideOutLeft');
	},
	
	onAnimationFinished : function(event){
		this.$el.remove();
	}
	
	
});