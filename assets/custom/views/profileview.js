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

var FavoritesView = MasterView.extend({
//	className: "row sortable",
	templateURL : YaGlobals.FAVORITES_VIEW,
	initialize : function(options){
		this.options = options;
		this.constructor.__super__.initialize.apply(this, []);
	},
	render: function(){
		this.renderList();
		return this;
	},
	
	setTitle : function(message){
		$(".row .title span",this.$el).text(message);
	},
	
	setPlaceHolderText : function(){
		$(".place-holder.empty-section h2",this.$el).text(this.options.placeHolderText);
		$(".place-holder.empty-section",this.$el).show();
	},
	
	renderList : function(){
		if(this.collection.size() == 0){
			console.log(this.placeHolderText);
			this.setPlaceHolderText();
		}else{
			this.collection.forEach(function(favoriteModel){
				var favoriteCardView = new CardView({model: favoriteModel});
				var scope = this;
				//TODO: agregar eventos para la vista click, mouse over etc
				favoriteCardView.on('onViewRendered',function(view){
					var liView = $('<li class=""></li>');
					liView.append(view.render().$el);
					$('.cards-wrapper',scope.$el).append(liView);
				},scope); 
			},this);
		}
		
	},
	
	initializePlugins : function(config){
		this.setTitle(config.message);
		$('.dropdown-button',this.$el).dropdown();
		this.pluginsReady = true;
	},
	
	onViewReady : function(){
		this.$el.append(this.template({id:this.id}));
		this.trigger('viewRendered',this);
	}
});

var FotoItemView = Backbone.View.extend({
	tagName : 'li',
	className : 'col s4 m2 l1 item',
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

var FotosView = MasterView.extend({
	templateURL : YaGlobals.MIS_FOTOS_TEMPLATE, 
	className: "row sortable",
//	templateText : $('#template-misfotos').html(),
	initialize : function(){
		this.constructor.__super__.initialize.apply(this, []);
	},
	
	setTitle : function(message){
		$(".tab-content-list-title span",this.$el).text(message);
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
	
	render: function(){
		this.renderList();
		return this;
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
	
	onViewReady : function(){
		this.$el.append(this.template({id:this.id}));
		this.trigger('viewRendered',this);
	}
});

var TimeLineItemView = MasterView.extend({
	tagName : 'div',
	className : 'timeline-block',
	templateURL : YaGlobals.TIMELINE_ITEM_VIEW,
//	htmlText : $('#timeline-item-template').html(),
	initialize : function(){
		this.constructor.__super__.initialize.apply(this, []);
	},
	
//	initializePlugins : function(config){
//		this.setTitle(config.message);
//	},
	
	render : function(){
		this.$el.append(this.template(this.model.toJSON()));
		this.trigger('viewRendered',this);
		return this;
	},
	
	onViewReady : function(){
		this.render();
	}
});

var TimelineView = MasterView.extend({
	templateURL : YaGlobals.TIMELINE_TEMPLATE,
	initialize : function(){
		this.constructor.__super__.initialize.apply(this, []);
	},
	render : function(){
		this.renderList();
		return this;
	},
	
	setTitle : function(message){
			$(".tab-content-list-title span",this.$el).text(message);
	},
	renderList : function(){
		var scope = this;
		this.collection.forEach(function(timelineModel){
			var view = new TimeLineItemView({model:timelineModel});
			view.on('viewRendered',function(view){
				$('.timeline-wrapper',scope.$el).append(view.$el);
//				view.initializePlugins({message: 'Esta es tu actividad en YaSalte'});
			},scope);
		},this);
	},
	initializePlugins : function(config){
		this.setTitle(config.message);
//		$('.dropdown-button',this.$el).dropdown();
//		this.pluginsReady = true;
	},
	onViewReady : function(){
		this.$el.append(this.template({id:this.id}));
		this.trigger('viewRendered',this);
	}
});


var MyProfileView = MasterView.extend({
	/**
	 * TODO: Implementar la lógica de lectura dinamica aqui!!
	 * */
	templateURL : YaGlobals.MY_PROFILE_VIEW,
	initialize : function(){
		this.constructor.__super__.initialize.apply(this, []);
	},
	
	render : function(){
		this.$el.append(this.template({id:this.id}));
		this.trigger('viewRendered',this);
		return this;
	},
	
	renderList : function(){
//		var scope = this;
//		this.collection.forEach(function(timelineModel){
//			var view = new TimeLineItemView({model:timelineModel});
//			$('.timeline-wrapper',scope.$el).append(view.$el);
//		},this);
	},
	initializePlugins : function(){
//		 $('.datepicker').pickadate();
		  $('.collapsible').collapsible();
		  $('.pikaday').pikaday({i18n :{
			  	previousMonth : 'Mes Anterior',
			    nextMonth     : 'Mes siguiente',
			    months        : ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
			    weekdays      : ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
			    weekdaysShort : ['Dom','Lun','Mar','Mie','Jue','Vie','Sab']
		  }});
	},
	
	onViewReady : function(){
		this.render();
	}
});

var ProfileView = MasterView.extend({
	isVisible : false,
	templateURL : YaGlobals.PROFILE_TABS_VIEW,
	className : 'profile-view animated',
	events : {
		'click .btn-edit-profile' : 'toggleEditProfile'
	},
	isEditing: false,
	initialize : function(){
		_.bindAll(this,"toggleEditProfile");
		this.model = new ProfileModel();
		this.model.on('sync',this.onModelReady,this);
		this.constructor.__super__.initialize.apply(this, []);
	},
	
	switchToTab : function(idTab){
		$('ul.tabs').tabs('select_tab', idTab);
	},
	
	toggleEditProfile : function(){
		$('ul.tabs').tabs('select_tab', 'profile');
		if(!this.isEditing){
			$('input[name="nombre"]',this.$el).removeAttr('disabled');
			$('input[name="telefono"]',this.$el).removeAttr('disabled');
			$('input[name="email"]',this.$el).removeAttr('disabled');
			$('input[name="birthday"]',this.$el).removeAttr('disabled');
			this.isEditing = true;
			$('.btn-edit-profile i').removeClass().addClass('ya-lock');
			$('input[name="nombre"]',this.$el).focus();
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
			placeHolderText : 'Aún no has agregado favoritos, comienza Ya!'
		});
		/**
		 * TODO : AGREGAR EVENTOS DE LA VISTA ANTERIOR 
		 */
		this.favoritesView.on('viewRendered',function(view){
			scope.$el.append(view.render().$el);
			view.initializePlugins({message:"Esta es tu lista de lugares favoritos"});
			scope.initializePlugins();
		},scope);
	},
	
	makeEventsView : function(){
		var scope = this;
		this.eventsView = new FavoritesView({
			collection : new Backbone.Collection(scope.model.get('eventos')),
			id:'eventos',
			placeHolderText : 'Aún no has agregado eventos, comienza Ya!'
		});
		/**
		 * TODO : AGREGAR EVENTOS DE LA VISTA ANTERIOR 
		 */
		this.eventsView.on('viewRendered',function(view){
			scope.$el.append(view.render().$el);
			view.initializePlugins({message:"Estos son los eventos a los que te han invitado y asistirás"});
			scope.initializePlugins();
		},scope);
	},
	
	
	makeCuponesView : function(){
		var scope = this;
		this.cuponesView = new FavoritesView({
			collection : new Backbone.Collection(scope.model.get('cupones')),
			id:'cupones',
			placeHolderText : 'Aún no tienes cupones, sigue asistiendo a eventos para obtenerlos!'
		});
		/**
		 * TODO : AGREGAR EVENTOS DE LA VISTA ANTERIOR 
		 */
		this.cuponesView.on('viewRendered',function(view){
			scope.$el.append(view.render().$el);
			view.initializePlugins({message:"Estos son tus cupones"});
			scope.initializePlugins();
		},scope);
	},
	
	makeRecompensasView : function(){
		var scope = this;
		this.recompensasView = new FavoritesView({
			collection : new Backbone.Collection(scope.model.get('recompensas')),
			id:'recompensas',
			placeHolderText : 'Aún no tienes recompenzas, podrás irlas adquiriendo mientras mas compartas!'
		});
		/**
		 * TODO : AGREGAR EVENTOS DE LA VISTA ANTERIOR 
		 */
		this.recompensasView.on('viewRendered',function(view){
			scope.$el.append(view.render().$el);
			view.initializePlugins({message:"Estas son tus recompensas"});
			scope.initializePlugins();
		},scope);
	},
	
	makeFotosView : function(){
		var scope = this;
		this.fotosView = new FotosView({
			collection : new Backbone.Collection(scope.model.get('fotos')),
			id:'fotos'
		});
//		this.fotosView.on('onFotoClicked',function(model){
//		},this);
		
		
		this.fotosView.on('viewRendered',function(view){
			scope.$el.append(view.render().$el);
			scope.initializePlugins();
			view.initializePlugins({message:"Estas son las fotos que has tomado"});
		},scope);
		
//		this.$el.append(this.fotosView.render().$el);
//		this.initializePlugins();
//		this.fotosView.initializePlugins({message:"Estas son las fotos que has tomado"});
	},
	
	makeTimelineView : function(){
		var scope = this;
		this.timelineView = new TimelineView({
			collection : new Backbone.Collection(scope.model.get('timeline')),
			id:'timeline'
		});
		this.timelineView.on('viewRendered',function(view){
			scope.$el.append(this.timelineView.render().$el);
			scope.initializePlugins();
			view.initializePlugins({message:"Esta es tu actividad en YaSalte!"});
		},scope);
		
		
		
	},
	
	makeProfileView : function(){
		var scope = this;
		/**
		 * TODO:Implementar la lectura dinamica en esta vista!
		 */
		this.profileView = new MyProfileView({
			id:'profile'
		});
		this.profileView.on('viewRendered',function(view){
			scope.$el.append(view.$el);
			view.initializePlugins();
			scope.initializePlugins();
		},scope);
	},
	
	initializePlugins : function(){
		$('ul.tabs',this.$el).tabs();
	},
	
	onViewReady : function(textTemplate){
		this.model.fetch();
		this.$el.append(this.template());
		this.$el.hide();
		this.trigger('onViewRendered',this);
	}
});