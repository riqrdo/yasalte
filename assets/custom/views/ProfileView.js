var ProfileModel = Backbone.Model.extend({
	url : 'assets/custom/test/profile.json',
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
	
	parse : function(response){
		var that = this;
		response.favoritos.forEach(function(item){
			item.iconIndicator = that.icons[item.type];
		});
		
		response.eventos.forEach(function(item){
			item.iconIndicator = that.icons[item.type];
		});
		
		response.cupones.forEach(function(item){
			item.iconIndicator = that.icons[item.type];
		});
		
		response.recompensas.forEach(function(item){
			item.iconIndicator = that.icons[item.type];
		});
		return response;
	}
});


var FavoritesView = Backbone.View.extend({
	className: "row sortable",
	initialize : function(){
		this.template = _.template($('#template-favoritos').html(),{});
		this.$el.append(this.template({id:this.id}));
	},
	render: function(){
		this.renderList();
		return this;
	},
	
	setTitle : function(message){
		$(".tab-content-list-title span",this.$el).text(message);
	},
	
	renderList : function(){
		this.collection.forEach(function(favoriteModel){
			var favoriteCardView = new CardView({model: favoriteModel});
			var scope = this;
			//TODO: agregar eventos para la vista click, mouse over etc
			favoriteCardView.on('onViewRendered',function(view){
				var liView = $('<li class="col s6 m4 l2"></li>');
				liView.append(view.render().$el);
				$('.cards-wrapper',scope.$el).append(liView);
			},scope); 
		},this);
	},
	
	initializePlugins : function(config){
			this.setTitle(config.message);
			$('.dropdown-button',this.$el).dropdown();
			this.pluginsReady = true;
	}
	
	
});

var ProfileView = Backbone.View.extend({
	el : '.profile-view',
	
	initialize : function(){
		console.log("Se acaba de crear la vista!!");
		this.model = new ProfileModel();
		this.model.on('sync',this.onModelReady,this);
		this.model.fetch();
	},
	
	render : function(){
		this.makeFavoritesView();
		this.makeEventsView();
		this.makeCuponesView();
		this.makeRecompensasView();
		this.initializePlugins();
		return this;
	},
	onModelReady : function(){
		//TODO: Hacer la lógica para las demas colecciones de los listados
		this.render();
	},
	
	makeFavoritesView : function(){
		var scope = this;
		this.favoritesView = new FavoritesView({
			collection : new Backbone.Collection(scope.model.get('favoritos')),
			id:'favoritos',
		});
		this.$el.append(this.favoritesView.render().$el);
		this.favoritesView.initializePlugins({message:"Esta es tu lista de lugares favoritos"});
	},
	
	makeEventsView : function(){
		var scope = this;
		this.eventsView = new FavoritesView({
			collection : new Backbone.Collection(scope.model.get('eventos')),
			id:'eventos'
		});
		this.$el.append(this.eventsView.render().$el);
		this.initializePlugins();
		this.eventsView.initializePlugins({message:"Estos son todos los eventos a los que te han invitado y asistirás"});
	},
	
	
	makeCuponesView : function(){
		var scope = this;
		this.cuponesView = new FavoritesView({
			collection : new Backbone.Collection(scope.model.get('cupones')),
			id:'cupones'
		});
		this.$el.append(this.cuponesView.render().$el);
		this.initializePlugins();
		this.cuponesView.initializePlugins({message:"Estos son todos los cupones que has ganado"});
	},
	
	makeRecompensasView : function(){
		var scope = this;
		this.recompensasView = new FavoritesView({
			collection : new Backbone.Collection(scope.model.get('recompensas')),
			id:'recompensas'
		});
		this.$el.append(this.recompensasView.render().$el);
		this.initializePlugins();
		this.recompensasView.initializePlugins({message:"Estas son tus recompensas"});
	},
	
	initializePlugins : function(){
		$('ul.tabs',this.$el).tabs();
	}
});