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
	
	onClicked : function(){
		this.trigger('itemClicked',this.model);
	}
});

var FotosView = FavoritesView.extend({
	templateText : $('#template-misfotos').html(),
	initialize : function(){
		this.constructor.__super__.initialize.apply(this, []);
	},
	
	events : {
//		"click #full-photo li>a" : 'openModal'
	},
	renderList : function(){
		this.collection.forEach(function(fotosModel){
			var scope = this;
			var photoView = new FotoItemView({model:fotosModel});
			photoView.on('itemClicked',scope.onImageClicked,scope);
//			var imgElement = $('<li><a href="#full-photo"><img src="'+fotosModel.get('url')+'" /></a></li>');
//			imgElement.on('click',function(e){
//				scope.trigger('onModel')
//			});
			$('.fotos-wrapper',scope.$el).append(photoView.$el);
		},this);
	},
	
	initializePlugins : function(config){
		var scope = this;
		this.setTitle(config.message);
		$('.datepicker').pickadate();
		$('.fotos-wrapper li>a').leanModal({
			  dismissible: true, // Modal can be dismissed by clicking outside of the modal
		      opacity: .5, // Opacity of modal background
		      in_duration: 300, // Transition in duration
		      out_duration: 200, // Transition out duration
		      complete:scope.onModalClosed // Callback for Modal close
		});
	},
	
	onImageClicked : function(model){			
		
	},
	
	onModalClosed : function(e){
		console.log('SE CIERRA EL MODAL!!');
		$('#full-photo').closeModal();
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
		this.makeFotosView();
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
		/*var scope = this;
		this.fotosView = new FotosView({
			collection : new Backbone.Collection(scope.model.get('fotos')),
			id:'fotos'
		});
		this.fotosView.on('onFotoClicked',function(model){
			console.log(model.toJSON());
		},this);
		this.$el.append(this.fotosView.render().$el);
		this.initializePlugins();
		this.fotosView.initializePlugins({message:"Estas son las fotos que has tomado"});*/

		/**Testing photo swipe**/
		var pswpElement = document.querySelectorAll('.pswp')[0];

		// build items array
		var items = [
		   {

        src: 'images/misfotos1.jpg', // path to image
        w: 1024, // image width
        h: 768, // image height

        msrc: 'images/mifotos1.jpg', // small image placeholder,
                        // main (large) image loads on top of it,
                        // if you skip this parameter - grey rectangle will be displayed,
                        // try to define this property only when small image was loaded before



        title: 'Image Caption'  // used by Default PhotoSwipe UI
                                // if you skip it, there won't be any caption


        // You may add more properties here and use them.
        // For example, demo gallery uses "author" property, which is used in the caption.
        // author: 'John Doe'

    },

    // slide 2
    {
        src: 'path/to/image2.jpg', 
        w: 600, 
        h: 600

        // etc.
    }
		];

		// define options (if needed)
		var options = {
		    // optionName: 'option value'
		    // for example:
		    index: 0 // start at first slide
		};

		// Initializes and opens PhotoSwipe
		var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.init();
	},
	
	initializePlugins : function(){
		$('ul.tabs',this.$el).tabs();
	}
});