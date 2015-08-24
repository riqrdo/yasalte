var SearchResultModel  = Backbone.Model.extend({
	url : 'assets/custom/test/searchResults.json',
	icons : {
		restaurant: "ya-food",
		cafeteria : "mdi-maps-local-cafe",
		"night-life" : "mdi-maps-local-bar",
		cultura : "ya-cultura",
		eventos : "mdi-editor-insert-invitation",
		recreativo : "ya-recreativo",
		cines : "ya-cine",
		"sitios-interes": "ya-sitios",
		guia : "mdi-maps-beenhere"
		
	},
	parse : function(resp){
		var response = resp.results; 
		var that = this;
		response.destacados.forEach(function(item){
			item.iconIndicator = that.icons[item.type];
		});
		
		response.searchResults.forEach(function(item){
			item.iconIndicator = that.icons[item.type];
		});
		return response;
	}
}); 

var CardView = Backbone.View.extend({
	className : 'card',
	initialize : function(){
		this.template = _.template($('#card-template').html());
	},
	
	render : function(){
		this.$el.append(this.template(this.model.toJSON()));
		this.$el.addClass(this.model.get('type'));
		this.$el.css('background-image',"url('"+this.model.get('mainImage')+"')");
		return this;
	}
});

var CardSearchView = Backbone.View.extend({
	className : 'result-item',
	tagName : 'li',
	initialize : function(){
		this.template = _.template($("#search-result-template").html());
	},
	
	render : function(){
		this.$el.append(this.template(this.model.toJSON()));
		this.$el.addClass(this.model.get('type'));
		return this;
	}
	
});

var SearchResultsView = Backbone.View.extend({
	el:".content-wrap",
	className : 'search-result',
	initialize : function(searchString){
		this.model = new SearchResultModel();
		this.model.on('sync',this.onModelReady,this);
		this.model.fetch();
	},
	
	render : function(){
		this.destacadosCollection1 = new Backbone.Collection(this.model.get('destacados'));
		this.searchResults = new Backbone.Collection(this.model.get('searchResults'));
		this.destacadosCollection2 = new Backbone.Collection(this.model.get('destacados2'));
		//render destacados top!
		this.renderDestacados1();
		this.renderSearchresults();
		return this;
	},
	
	renderSearchresults : function(){
		this.searchResults.forEach(function(searchResultModel){
			var resultCard = new CardSearchView({model: searchResultModel});
			//TODO: Agregar aquí TODOS los eventos a escuchar!!!
			$('.search-suggest>ul',this.$el).append(resultCard.render().$el);
		},this);
	},
	
	renderDestacados1 : function(){
		var that = this;
		$(".destacados>.col.s12.m6.l3",this.$el).each(function(index,DOMElement){
			var destacadosView = new CardView({model:that.destacadosCollection1.at(index)});
			$(DOMElement).append(destacadosView.render().$el);
		});
		
	},
	
	onModelReady : function(model){
		this.render();
	}
});

var mainView = new SearchResultsView();