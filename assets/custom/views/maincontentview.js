var MainContentView = MasterView.extend({
	el : 'body',
	events: {
		'click .btn-recomendaciones' : 'showRecomendations',
		'click .login' : 'onLoginPressed',
		'focus input[name="searchInput"]' : 'onSearchFocused',
		'keyup input[name="searchInput"]' : 'onSearchKeyUp',
		'focusout input[name="searchInput"]' : 'onSearchFocusout',
		'click .search .mdi-action-search' : 'doSearch',
		'click .btnOpenProfile' : 'opeProfile',
		'click .static-sidebar .mdi-editor-insert-invitation' : 'openEventsInProfile',
	},
	
	loginView  :undefined,
	userMenu : undefined,
	searchResultsView : undefined,
	profileView :undefined,
	notificationsView : undefined,
	
	initialize : function(){
		_.bindAll(this,'showRecomendations','onSuccessLogin',
						'onLoginPressed','onSearchFocused',
						'onSearchFocusout','doSearch',
						'openProfile','onSearchKeyUp','openEventsInProfile');
		if(!YaGlobals.tmp.isLogged){
			this.loginView = new YaLoginView().on('onViewRendered',function(view){
				$('.sidebar-view',this.$el).append(view.$el);
				$('aside.yaybar').addClass('login');
			},this);
			this.loginView.on('loginSuccess',this.onSuccessLogin);
		}
		
		this.recomendationsView = new RecomendationsView().on('onViewRendered',function(viewRecom){
			$('.content-wrap',this.$el).append(viewRecom.$el);
		},this);
		this.notificationsView = new NotificationsView();
		
	},
	
	
	render : function(){
		return this;
	},
	
	showRecomendations : function(event){
		this.recomendationsView.show();
	},
	
	onSuccessLogin : function(modelUser){
		this.loginView.close();
		$('aside.yaybar').removeClass('login');
		this.userMenu = new UserMenuView({
			model : modelUser
		});
		this.userMenu.on('onProfileClicked',function(){
			this.openProfile();
		},this);
		this.userMenu.on('onViewRendered',function(view){
			$('.sidebar-view',this.$el).replaceWith(view.$el);
			$('aside.yaybar').addClass('usermenu');
		},this);
		$('.image-profile',this.$el).attr('src',modelUser.get('profileImage'));
		//Reemplaza el menu del usuario una vez que ya se loggeo
		$('#user-dropdown').empty().append($('#template-menu-logged').html());
		$('.btnOpenProfile',this.$el).on('click',this.openProfile);
		$('.notify-button',this.$el).addClass('chat-toggle');
		this.logged = true;
	},
	
	onLoginPressed : function(event){
		this.$el.removeClass('yay-hide');
	},
	
	onSearchFocused : function(event){
		console.log("ENTRA A FOCUS IN!");
		this.$el.addClass('yay-hide');
		if(this.searchSuggestView){
				this.searchSuggestView.show('slideInDown');
				this.hiddeCurrentViewInFront();
		}else{
			this.searchSuggestView = new SearchSuggestView();
			this.searchSuggestView.on('onViewRendered',function(view){
				$('.content-wrap',this.$el).prepend(view.$el);
				this.searchSuggestView.show('slideInDown');
				this.hiddeCurrentViewInFront();
			},this);
		}
	},
	
	onSearchFocusout : function(event){
		console.log("entra a focusout");
		this.searchSuggestView.hide('slideOutUp');
		if(this.currentViewInFront){
			this.currentViewInFront.show('slideInUp');
		}
	},
	
	
	hiddeCurrentViewInFront : function(){
		if(this.currentViewInFront){
			this.currentViewInFront.hide('slideOutDown');
		}
	},
	
	onSearchKeyUp : function(event){
		if(event.keyCode == 13){
			this.hideAllViews();
			this.doSearch();
			$('input[name="searchInput"]',this.$el).blur();
		}
		
	},
	
	hideAllViews : function(){
		this.$el.addClass('yay-hide');
		if(typeof this.currentViewInFront !== "undefined"){
			this.currentViewInFront.hide();
		}
		
	},
	
	doSearch : function(event){
		this.hideAllViews();
		if(this.searchResultsView){
			if(!this.searchResultsView.isVisible){
				this.searchResultsView.show();
				this.searchResultsView.performSearch();
				this.currentViewInFront = this.searchResultsView;
			}
		}else{
			this.searchResultsView = new SearchResultsView();
			this.searchResultsView.on("onViewRendered",function(view){
				$('.content-wrap',this.$el).append(view.$el);
				this.searchResultsView.show();
				$('form.search i').removeClass('active');
				this.searchResultsView.performSearch();
				this.currentViewInFront = this.searchResultsView;
			},this);
		}		
	},
	
	openProfile : function(){
		this.hideAllViews();
		if(this.profileView){
			if(!this.profileView.isVisible){
				this.profileView.show();
				this.currentViewInFront = this.profileView;
			}
		}else{
			this.profileView = new ProfileView();
			this.profileView.on("onViewRendered",function(view){
				$('.content-wrap',this.$el).append(view.$el);
				this.profileView.show();
				view.initializePlugins();
				this.currentViewInFront = this.profileView;
			},this);
		}	
	},
	
	openEventsInProfile : function(){
		if(YaGlobals.tmp.isLogged){
			this.openProfile();
			this.profileView.switchToTab('eventos');
		}else{
			console.log("Arroja el dialogo de 'para ver esto necesitas loggearte");
		}
	},
});