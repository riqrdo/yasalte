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
		
		response.destacados2.forEach(function(item){
			item.iconIndicator = that.icons[item.type];
		});
		
		return response;
	}
}); 

var CardView = MasterView.extend({
	className : 'card of-h custom',
	templateURL : YaGlobals.CARD_VIEW,
	initialize : function(){
		this.constructor.__super__.initialize.apply(this, []);
	},
	
	render : function(){
		this.$el.append(this.template(this.model.toJSON()));
		this.$el.addClass(this.model.get('type'));
		return this;
	},
	
	onViewReady : function(textTemplate){
		this.trigger('onViewRendered',this);
	}
	
});

var CardSearchView = MasterView.extend({
	className : 'result-item card-panel z-depth-1',
	tagName : 'li',
	events : {
		'click .card-search-result .likes' : 'onHeartClicked',
	},

	templateURL : YaGlobals.CARD_RESULT_ITEM_VIEW,
	initialize : function(){
//		_.bindAll(this,"onHeartClicked");
		this.constructor.__super__.initialize.apply(this, []);
	},
	
	onViewReady : function(textTemplate){
		this.trigger('onViewRendered',this);
	},
	
	render : function(){
		this.$el.append(this.template(this.model.toJSON()));
		this.$el.addClass(this.model.get('type'));
		return this;
	},
	
	onHeartClicked : function(event){
		$('.card-search-result .likes',this.$el).toggleClass('red-text');
	}
	
});

var SearchResultsView = MasterView.extend({
	className : 'searchView animated',
	templateURL : YaGlobals.SEARCH_RESULT_VIEW,
	isVisible : false,
	initialize : function(searchString){
		this.constructor.__super__.initialize.apply(this, []);
	},
	
	initializePlugins : function(){
		 $('.dropdown-button').dropdown({});
	},
	
	render : function(){
		this.destacadosCollection1 = new Backbone.Collection(this.model.get('destacados'));
		this.searchResults = new Backbone.Collection(this.model.get('searchResults'));
		this.destacadosCollection2 = new Backbone.Collection(this.model.get('destacados2'));
		//render destacados top!
		this.renderDestacados1();
		this.renderSearchresults();
		this.renderDestacados2();
		this.initializePlugins();
		return this;
	},
	
	renderSearchresults : function(){
		this.searchResults.forEach(function(searchResultModel){
			var resultCard = new CardSearchView({model: searchResultModel});
			//TODO: Agregar aquí TODOS los eventos a escuchar!!!
			resultCard.on('onViewRendered',function(view){
				$('.search-suggest>ul',this.$el).append(resultCard.render().$el);
			},this);
		},this);
	},
	
	renderDestacados1 : function(){
		var that = this;
		$(".page-title>.row .col.s12.m6.l3",this.$el).each(function(index,DOMElement){
			var destacadosView = new CardView({model:that.destacadosCollection1.at(index)});
			/**
			 * TODO: Agregar eventos necesarios!!
			 */
			destacadosView.on('onViewRendered',function(view){
				$(DOMElement).append(view.render().$el);
			});
		});
	},
	
	renderDestacados2 : function(){
		this.destacadosCollection2.forEach(function(destacadoModel){
			var destacadosView = new CardView({model:destacadoModel});
			var that = this;
			destacadosView.on('onViewRendered',function(view){
				$(".filtros-avanzados",that.$el).append(view.render().$el);
			});
		},this);
	},
	onModelReady : function(model){
		this.render();
		//TODO:simular retardo de petición
//		var that=this;
//		setTimeout(function(){
//			that.render();
//		},2000);
	},
	
	emptyPrevResults : function(){
		$(".filtros-avanzados .card",this.$el).remove();
		$(".page-title>.row .col.s12.m6.l3 .card",this.$el).remove();
		$('.search-suggest>ul li',this.$el).remove();
	},
	
	performSearch : function(searchText){
			this.emptyPrevResults();
			this.model = new SearchResultModel();
			this.model.on('change',this.onModelReady,this);
			this.model.fetch();
	},
	
	onViewReady : function(textTemplate){
		this.$el.append(this.template());
		this.$el.hide();
		this.trigger('onViewRendered',this);
	}	
});