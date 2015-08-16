var RecomendacionesCollection = Backbone.Collection.extend({
	/**
	 * TODO: Reemplazar esta URL por la URL que 
	 * proveerá las recomendaciones
	 */
	url  : 'assets/custom/test/recomendaciones.json',
	model : RecomendationModel,
	parse : function(response){
		/**
		 * TODO: Crear la lógica de la respuesta
		 * del backend, como exlcluír los elementos
		 * que no importan para la colección
		 */
	  	return response.items;
	}
});