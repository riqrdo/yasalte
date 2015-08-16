/*var recomendationListView = Backbone.View.extend({
	element : 'ul',
	
	initialize : function(){
		this.collection.on('change',this.onCollectionFetched,this);
		this.collection.fetch({reset:true});
	},
	
	render : function(){
		recomendacionView.on('onViewRendered',this);
		return this;
	},
	
	
});*/


var RecomendationsView = MasterView.extend({
	tagName : 'nav',
	className : 'side-recomendaciones grey lighten-3',
	templateURL : YaGlobals.RECOMENDATIONS_TEMPLATE,
	listView : undefined,
	initialize : function(){
		this.collection =  new RecomendacionesCollection();
		this.collection.on('reset',this.onCollectionFetched,this);
		this.constructor.__super__.initialize.apply(this, []);
	},
	
	render : function(){
		this.trigger('onViewRendered',this);
		$(".nano").nanoScroller();
		return this;
		
	},
	
	onCollectionFetched : function(collection){
		this.collection.forEach(function(item){
			var recomendacionModel = new RecomendationModel(item.toJSON());
			var recomendacionView = new RecomendationItemView({model : recomendacionModel});
			//TODO: Poner aqui todos los eventos relacionados con la vista hija!!!
			//Inyecta la vista hija en esta vista, cuando ya fue creada
			recomendacionView.on('onViewRendered',function(view){
				$('ul',this.$el).append(view.$el);
			},this);
		},this);
		this.render();
	},
	
	onViewReady : function(){
		this.$el.append(this.template());
		this.collection.fetch({reset:true});
	}
});