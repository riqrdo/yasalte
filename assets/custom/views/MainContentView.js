var MainContentView = MasterView.extend({
	el : 'body',
	events: {
		'click .btn-recomendaciones' : 'showRecomendations',
		'click .login' : 'onLoginPressed',
		'focus input[name="searchInput"]' : 'onSearchFocused',
		'keyup input[name="searchInput"]' : 'onSearchKeyUp',
		'focusout input[name="searchInput"]' : 'onSearchFocusout',
		'click .search .mdi-action-search' : 'doSearch',
		'click .btnOpenProfile' : 'opeProfile'
	},
	
	loginView  :undefined,
	userMenu : undefined,
	searchResultsView : undefined,
	profileView :undefined,
	
	initialize : function(){
		_.bindAll(this,'showRecomendations','onSuccessLogin',
						'onLoginPressed','onSearchFocused',
						'onSearchFocusout','doSearch',
						'openProfile','onSearchKeyUp');
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
	},
	
	onLoginPressed : function(event){
		this.$el.removeClass('yay-hide');
	},
	
	onSearchFocused : function(event){
		this.$el.addClass('yay-hide');
		if(this.searchSuggestView){
			if(!this.searchSuggestView.isVisible)
				this.searchSuggestView.show();
		}else{
			this.searchSuggestView = new SearchSuggestView();
			this.searchSuggestView.on('onViewRendered',function(view){
				$('.content-wrap',this.$el).append(view.$el);
				this.searchSuggestView.show();
			},this);
		}
	},
	
	onSearchFocusout : function(event){
		this.searchSuggestView.hide();
	},
	
	onSearchKeyUp : function(event){
		if(event.keyCode == 13){
			this.doSearch();
		}
	},
	
	hideAllViews : function(){
		this.$el.addClass('yay-hide');
		if(this.searchResultsView){
			this.searchResultsView.hide('slideOutRight');
		}
		if(this.searchSuggestView){
			this.searchSuggestView.hide('slideOutRight');
		}
		if(this.profileView){
			this.profileView.hide('slideOutRight');
		}
	},
	
	doSearch : function(event){
		this.hideAllViews();
		if(this.searchResultsView){
			if(!this.searchResultsView.isVisible){
				this.searchResultsView.show('slideInLeft');
				this.searchResultsView.performSearch();
			}
		}else{
			this.searchResultsView = new SearchResultsView();
			this.searchResultsView.on("onViewRendered",function(view){
				$('.content-wrap',this.$el).append(view.$el);
				this.searchResultsView.show('slideInLeft');
				this.searchResultsView.performSearch();
				$('.combo-filters select',view.$el).material_select();
			},this);
		}		
	},
	
	openProfile : function(){
		this.hideAllViews();
		if(this.profileView){
			if(!this.profileView.isVisible){
				this.profileView.show('slideInLeft');
			}
		}else{
			this.profileView = new ProfileView();
			this.profileView.on("onViewRendered",function(view){
				$('.content-wrap',this.$el).append(view.$el);
				this.profileView.show('slideInLeft');
				view.initializePlugins();
			},this);
		}	
	}
});