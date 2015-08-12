/**
 * Objeto Global que almacena funciones, variables y constantes Globales.
 * Cualquier configuraci&oacute;n para que backbone funcione
 * adecuadamente
 * @author: jperez
 * @copyright: YaSalte.com
 * dependencias: Backbone, Underscore y jQuery.
 */
var YaGlobals = {
	/**
	 * URL'S para cargar los templates
	 */
	LOGIN_TEMPLATE : 'assets/backbone/templates/login.html',
	
	getTemplate : function(templateURL){
		 $.get(templateURL, function (data) {
		        YaGlobals.trigger('onTemplateLoaded',data);
		    }, 'html');
	},
	
	/**
	 * Objeto para control de flujo solo temporales
	 */
	tmp : {
		isLogged : false
	}
};

_.extend(YaGlobals, Backbone.Events);