var RecomendationModel = Backbone.Model.extend({
	  initialize: function(obj) {
		  /**
		   * TODO: para produccion reemplazar la propiedad type
		   * por la que el feed indique el tipo de lugar a recomendar
		   * y la equivalencia
		   */
		   if(obj.type == 'restaurant'){
			   this.set({className : "restaurant",
				   		 iconClass : "ya-food"});
		   }else if(obj.type == 'bar'){
			   this.set({className : "bar",
			   		 iconClass : "mdi-maps-local-bar"});
		   }else if(obj.type == 'cafe'){
			   this.set({className : "cafe",
			   		 iconClass : "mdi-maps-local-cafe"});
		   }
	  }
});