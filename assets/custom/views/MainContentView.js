var MainContentView = MasterView.extend({
	el : 'body',
	events: {
		'click .btn-recomendaciones' : 'showRecomendations'
	},
	sideBarView : undefined,
	initialize : function(){
		_.bindAll(this,'showRecomendations','onSuccessLogin');
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
	
	onSuccessLogin : function(){
		this.loginView.close();
	}
});