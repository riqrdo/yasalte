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
	LOGIN_TEMPLATE : 'assets/custom/templates/login.html',
	RECOMENDATIONS_TEMPLATE : 'assets/custom/templates/recomendations.html',
	RECOMENDATION_ITEM : 'assets/custom/templates/recomendationItem.html',
	USER_MENU_TEMPLATE : 'assets/custom/templates/userMenu.html',
	CONFIG_MENU_TEMPLATE : 'assets/custom/templates/configuration.html',
	
	/**
	 * Objeto para control de flujo solo temporales
	 */
	tmp : {
		isLogged : false
	}
};



