var RecomendacionesCollection = Backbone.Collection.extend({
	/**
	 * TODO: Reemplazar esta URL por la URL que 
	 * proveer� las recomendaciones
	 */
	url  : 'assets/custom/test/recomendaciones.json',
	model : RecomendationModel,
	parse : function(response){
		/**
		 * TODO: Crear la l�gica de la respuesta
		 * del backend, como exlclu�r los elementos
		 * que no importan para la colecci�n
		 */
	  	return response.items;
	}
});