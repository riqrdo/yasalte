/**
 * 
 */
var SearchSuggestView = MasterView.extend({
	templateURL : YaGlobals.SEARCH_SUGGEST_TEMPLATE,
	className : 'search-suggest-view animated',
	initialize : function(){
		this.constructor.__super__.initialize.apply(this, []);
	},
	
	render : function(){
		this.$el.append(this.template());
		this.$el.hide();
		this.trigger('onViewRendered',this);
		return this;
	},
	
	onViewReady : function(textTemplate){
		this.render();
	},
	
});