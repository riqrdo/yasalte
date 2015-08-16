var RecomendationItemView = MasterView.extend({
	tagName : 'li',
	templateURL : YaGlobals.RECOMENDATION_ITEM,
	initialize : function(){
		this.constructor.__super__.initialize.apply(this, []);
	},
	
	render : function(){
		this.$el.append(this.template(this.model.toJSON()));
		console.log(this.model.toJSON());
		this.trigger('onViewRendered',this);
		return this;
	},
	
	onViewReady : function(){
		this.render();
	}
	
});