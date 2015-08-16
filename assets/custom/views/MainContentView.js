var MainContentView = MasterView.extend({
	el : 'body',
	events: {
//		'click .yay-toggle' : 'toggleYaySidebar'
	},
	sideBarView : undefined,
	initialize : function(){
		if(!YaGlobals.tmp.isLogged){
			this.sideBarView = new YaLoginView().on('onViewRendered',function(view){
				$('.sidebar-view',this.$el).append(view.$el);
			},this);
		}
		
		this.recomendationsView = new RecomendationsView().on('onViewRendered',function(viewRecom){
			$('.content-wrap',this.$el).append(viewRecom.$el);
		},this);
	},
	
	render : function(){
		return this;
	}
});