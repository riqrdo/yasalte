var MainContentView = MasterView.extend({
	el : 'body',
	sideBarView : undefined,
	initialize : function(){
		if(!YaGlobals.tmp.isLogged){
			this.sideBarView = new YaLoginView().on('onViewRendered',function(){
				$('.sidebar-view',this.$el).append(this.sideBarView.$el);
			},this);
		}
	},
	
	render : function(){
		return this;
	}
	
});