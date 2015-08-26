var MainContentView = MasterView.extend({
	el : 'body',
	events: {
		'click .btn-recomendaciones' : 'showRecomendations',
		'click .login' : 'onLoginPressed',
		'focus input[name="searchInput"]' : 'onSearchFocused',
		'focusout input[name="searchInput"]' : 'onSearchFocusout',
		'click .search .mdi-action-search' : 'doSearch',
	},
	loginView  :undefined,
	userMenu : undefined,
	searchResultsView : undefined,
	
	initialize : function(){
		_.bindAll(this,'showRecomendations','onSuccessLogin',
						'onLoginPressed','onSearchFocused',
						'onSearchFocusout','doSearch');
		if(!YaGlobals.tmp.isLogged){
			this.loginView = new YaLoginView().on('onViewRendered',function(view){
				$('.sidebar-view',this.$el).append(view.$el);
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
		this.userMenu = new UserMenuView({
			model : modelUser
		});
		this.userMenu.on('onViewRendered',function(view){
			$('.sidebar-view',this.$el).replaceWith(view.$el);
		},this);
		$('.image-profile',this.$el).attr('src',modelUser.get('profileImage'));
		console.log($('#template-menu-logged').html());
		//Reemplaza el menu del usuario una vez que ya se loggeo
		$('#user-dropdown').empty().append($('#template-menu-logged').html());
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
	
	doSearch : function(event){
		this.$el.addClass('yay-hide');
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
	}
});