var RecomendationItemView = MasterView.extend({
	tagName : 'li',
//	className : '',
	templateURL : YaGlobals.RECOMENDATION_ITEM,
	initialize : function(){
		this.constructor.__super__.initialize.apply(this, []);
	},
	
	render : function(){
		this.$el.append(this.template(this.model.toJSON()));
		this.$el.addClass(this.model.get('className'));
		console.log(this.model.toJSON());
		this.trigger('onViewRendered',this);
		return this;
	},
	
	onViewReady : function(){
		this.render();
	}
	
});