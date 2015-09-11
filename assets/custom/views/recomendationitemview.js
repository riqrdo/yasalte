var RecomendationItemView = MasterView.extend({
	tagName : 'li',
	templateURL : YaGlobals.RECOMENDATION_ITEM,
	events : {
		'click .mdi-content-clear.option' : 'closeRecomendation',
		'click .mdi-action-favorite' : 'likeNotification'
	},
	initialize : function(){
		_.bindAll(this,'closeRecomendation');
		this.constructor.__super__.initialize.apply(this, []);
	},
	
	render : function(){
		this.$el.append(this.template(this.model.toJSON()));
		this.$el.addClass(this.model.get('className'));
		this.trigger('onViewRendered',this);
		return this;
	},
	
	onViewReady : function(){
		this.render();
	},
	
	closeRecomendation : function(event){
		this.$el.one('webkitAnimationEnd mozAnimationEnd '+
		 'MSAnimationEnd oanimationend animationend')
			.one('webkitAnimationEnd mozAnimationEnd '+
					 'MSAnimationEnd oanimationend animationend',function(e){
			this.remove();
		});
		this.$el.addClass('animated slideOutRight');
	},
	likeNotification : function(event){
		$('.mdi-action-favorite',this.$el).toggleClass('active');
	}
	
});