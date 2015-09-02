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
	
	actionIcons : {
		favorito : "mdi-action-favorite",
		evento : "mdi-action-perm-contact-cal",
		recompensa : "mdi-av-new-releases",
		rate : "ya-rate",
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
		
		response.timeline.forEach(function(item){
			item.iconIndicator = that.actionIcons[item.type];
		});
		return response;
	}
});

var FavoritesView = Backbone.View.extend({
	className: "row sortable",
	templateText : $('#template-favoritos').html(),
	initialize : function(){
		this.template = _.template(this.templateText,{});
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

var FotoItemView = Backbone.View.extend({
	tagName : 'li',
	htmlText : '<a href="#full-photo"><img src="<%=url%>" /></a>',
	events : {
		'click' : 'onClicked'
	},
	initialize  : function(){
		this.template = _.template(this.htmlText,{});
		this.render();
	},
	
	render : function(){
		this.$el.append(this.template(this.model.toJSON()));
		return this;
	},
	
	onClicked : function(event){
		this.trigger('itemClicked',this.model);
		event.stopPropagation();
		event.preventDefault();
	}
});

var FotosView = FavoritesView.extend({
	templateText : $('#template-misfotos').html(),
	initialize : function(){
		this.constructor.__super__.initialize.apply(this, []);
	},
	photoSwipeItems : [],
	renderList : function(){
		this.collection.forEach(function(fotosModel){
			var scope = this;
			var photoSwipeItem = {
				src : fotosModel.get('url'),
				w : 600,
				h : 600,
				//msrc : fotosModel.get('thumbUrl'),
				title : '<span class="descripcion">'+fotosModel.get('descripcion')+'</span>'+
						'<span class="ubicacion"><i class="mdi-action-room"></i>'+fotosModel.get('ubicacion')+'</span>'+
						'<span class="fecha">'+fotosModel.get('fecha')+'</i>'
			};
			
			this.photoSwipeItems.push(photoSwipeItem);
			var photoView = new FotoItemView({model:fotosModel});
			photoView.on('itemClicked',scope.onImageClicked,scope);
			$('.fotos-wrapper',scope.$el).append(photoView.$el);
		},this);
	},
	
	initializePlugins : function(config){
		var scope = this;
		this.setTitle(config.message);
		$('.datepicker').pickadate();
	},
	
	showPhotoSwipe : function(model){
		var modelIndex = this.collection.indexOf(model);
		var options = {
				index : modelIndex
		};
		var gallery = new PhotoSwipe( $('.pswp')[0], PhotoSwipeUI_Default, this.photoSwipeItems,options);
		gallery.init();
	},
	
	onImageClicked : function(model){			
		this.showPhotoSwipe(model);
	},
});

var TimeLineItemView = FotoItemView.extend({
	tagName : 'div',
	className : 'timeline-block',
	htmlText : $('#timeline-item-template').html(),
	initialize : function(){
		this.constructor.__super__.initialize.apply(this, []);
	},
	initializePlugins : function(config){
		this.setTitle(config.message);
	}
});

var TimelineView = FavoritesView.extend({
	templateText : $('#timeline-template').html(),
	initialize : function(){
		this.constructor.__super__.initialize.apply(this, []);
	},
	
	renderList : function(){
		var scope = this;
		this.collection.forEach(function(timelineModel){
			var view = new TimeLineItemView({model:timelineModel});
			$('.timeline-wrapper',scope.$el).append(view.$el);
		},this);
	}
});

var MyProfileView = FavoritesView.extend({
	/**
	 * TODO: Implementar la lógica de lectura dinamica aqui!!
	 * */
	templateText : $('#profile-view-template').html(),
	initialize : function(){
		this.constructor.__super__.initialize.apply(this, []);
	},
	
	renderList : function(){
//		var scope = this;
//		this.collection.forEach(function(timelineModel){
//			var view = new TimeLineItemView({model:timelineModel});
//			$('.timeline-wrapper',scope.$el).append(view.$el);
//		},this);
	},
	initializePlugins : function(){
		 $('.datepicker').pickadate();
	}
});

var ProfileView = Backbone.View.extend({
	el : '.profile-view',
	events : {
		'click .btn-edit-profile' : 'toggleEditProfile'
	},
	isEditing: false,
	initialize : function(){
		_.bindAll(this,"toggleEditProfile");
		this.model = new ProfileModel();
		this.model.on('sync',this.onModelReady,this);
		this.model.fetch();
	},
	
	toggleEditProfile : function(){
		if(!this.isEditing){
			$('input[name="nombre"]',this.$el).removeAttr('disabled');
			$('input[name="telefono"]',this.$el).removeAttr('disabled');
			$('input[name="email"]',this.$el).removeAttr('disabled');
			$('input[name="birthday"]',this.$el).removeAttr('disabled');
			this.isEditing = true;
			$('.btn-edit-profile i').removeClass().addClass('ya-lock');
		}else{
			$('input[name="nombre"]',this.$el).attr('disabled','disabled');
			$('input[name="telefono"]',this.$el).attr('disabled','disabled');
			$('input[name="email"]',this.$el).attr('disabled','disabled');
			$('input[name="birthday"]',this.$el).attr('disabled','disabled');
			this.isEditing = false;
			$('.btn-edit-profile i').removeClass().addClass('mdi-content-create');
		}
	},
	
	
	render : function(){
		this.makeFavoritesView();
		this.makeEventsView();
		this.makeCuponesView();
		this.makeRecompensasView();
		this.makeFotosView();
		this.makeTimelineView();
		this.makeProfileView();
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
	
	makeFotosView : function(){
		var scope = this;
		this.fotosView = new FotosView({
			collection : new Backbone.Collection(scope.model.get('fotos')),
			id:'fotos'
		});
		this.fotosView.on('onFotoClicked',function(model){
			console.log(model.toJSON());
		},this);
		this.$el.append(this.fotosView.render().$el);
		this.initializePlugins();
		this.fotosView.initializePlugins({message:"Estas son las fotos que has tomado"});
	},
	
	makeTimelineView : function(){
		var scope = this;
		this.timelineView = new TimelineView({
			collection : new Backbone.Collection(scope.model.get('timeline')),
			id:'timeline'
		});
		this.fotosView.on('onFotoClicked',function(model){
			console.log(model.toJSON());
		},this);
		this.$el.append(this.timelineView.render().$el);
		this.initializePlugins();
		this.timelineView.initializePlugins({message:"Esta es tu actividad en YaSalte!"});
	},
	
	makeProfileView : function(){
		/**
		 * TODO:Implementar la lectura dinamica en esta vista!
		 */
		this.profileView = new MyProfileView({
			id:'profile'
		});
		this.$el.append(this.profileView.render().$el);
		this.profileView.initializePlugins();
	},
	
	initializePlugins : function(){
		$('ul.tabs',this.$el).tabs();
	}
});