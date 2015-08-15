var template = YaGlobals.getTemplate(YaGlobals.LOGIN_TEMPLATE);
var initView = undefined;



if(YaGlobals.tmp.isLogged){
	console.log(logged);
}else{
	initView = new YaLoginView();
	initView.on('onLoaded',function(){
		$('.nano-content ul').first().prepend(initView.el);
	});
	
}


/*YaGlobals.on('onTemplateLoaded',function(template){
	console.log(template);
	YaGlobals.off('onTemplateLoaded');
});*/
