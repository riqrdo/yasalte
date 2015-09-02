/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'Yasalte\'">' + entity + '</span>' + html;
	}
	var icons = {
		'ya-alert': '&#xe600;',
		'ya-ami': '&#xe601;',
		'ya-app': '&#xe602;',
		'ya-arq': '&#xe603;',
		'ya-asist': '&#xe604;',
		'ya-baile': '&#xe605;',
		'ya-banq': '&#xe606;',
		'ya-bar': '&#xe607;',
		'ya-biblio': '&#xe608;',
		'ya-build': '&#xe609;',
		'ya-c1': '&#xe60a;',
		'ya-c2': '&#xe60b;',
		'ya-c3': '&#xe60c;',
		'ya-c4': '&#xe60d;',
		'ya-cafe': '&#xe60e;',
		'ya-calendar': '&#xe60f;',
		'ya-calendar-plus': '&#xe610;',
		'ya-cards': '&#xe611;',
		'ya-carta': '&#xe612;',
		'ya-check': '&#xe613;',
		'ya-cine': '&#xe614;',
		'ya-city': '&#xe615;',
		'ya-clock-c': '&#xe616;',
		'ya-clock-o': '&#xe617;',
		'ya-clock-tc': '&#xe618;',
		'ya-close': '&#xe619;',
		'ya-cog': '&#xe61a;',
		'ya-cult': '&#xe61b;',
		'ya-depo': '&#xe61c;',
		'ya-diver': '&#xe61d;',
		'ya-domi': '&#xe61e;',
		'ya-down': '&#xe61f;',
		'ya-edit': '&#xe620;',
		'ya-exp': '&#xe621;',
		'ya-fav': '&#xe622;',
		'ya-fb': '&#xe623;',
		'ya-filter': '&#xe624;',
		'ya-food': '&#xe625;',
		'ya-foro': '&#xe626;',
		'ya-foto': '&#xe627;',
		'ya-free': '&#xe628;',
		'ya-fumar': '&#xe629;',
		'ya-games': '&#xe62a;',
		'ya-h': '&#xe62b;',
		'ya-handy': '&#xe62c;',
		'ya-help': '&#xe62d;',
		'ya-home': '&#xe62e;',
		'ya-info': '&#xe62f;',
		'ya-insta': '&#xe630;',
		'ya-jardin': '&#xe631;',
		'ya-kara': '&#xe632;',
		'ya-kids': '&#xe633;',
		'ya-left': '&#xe634;',
		'ya-local': '&#xe635;',
		'ya-lock': '&#xe636;',
		'ya-m': '&#xe637;',
		'ya-mail': '&#xe638;',
		'ya-mark': '&#xe639;',
		'ya-menu': '&#xe63a;',
		'ya-menu-alt': '&#xe63b;',
		'ya-menu-inf': '&#xe63c;',
		'ya-menu-more': '&#xe63d;',
		'ya-mon': '&#xe63e;',
		'ya-museo': '&#xe63f;',
		'ya-musica': '&#xe640;',
		'ya-new': '&#xe641;',
		'ya-nigth': '&#xe642;',
		'ya-noche': '&#xe643;',
		'ya-noti': '&#xe644;',
		'ya-parking': '&#xe645;',
		'ya-pet': '&#xe646;',
		'ya-photo-plus': '&#xe647;',
		'ya-play': '&#xe648;',
		'ya-plaza': '&#xe649;',
		'ya-plus': '&#xe64a;',
		'ya-promo': '&#xe64b;',
		'ya-puntos': '&#xe64c;',
		'ya-rate': '&#xe64d;',
		'ya-rate-out': '&#xe64e;',
		'ya-rec': '&#xe64f;',
		'ya-report': '&#xe650;',
		'ya-reward': '&#xe651;',
		'ya-right': '&#xe652;',
		'ya-search': '&#xe653;',
		'ya-search-plus': '&#xe654;',
		'ya-send': '&#xe655;',
		'ya-share': '&#xe656;',
		'ya-shop': '&#xe657;',
		'ya-sky': '&#xe658;',
		'ya-sug': '&#xe659;',
		'ya-target': '&#xe65a;',
		'ya-teatro': '&#xe65b;',
		'ya-tel': '&#xe65c;',
		'ya-tips': '&#xe65d;',
		'ya-trendy': '&#xe65e;',
		'ya-tt': '&#xe65f;',
		'ya-tv': '&#xe660;',
		'ya-unlock': '&#xe661;',
		'ya-up': '&#xe662;',
		'ya-user': '&#xe663;',
		'ya-valet': '&#xe664;',
		'ya-vip': '&#xe665;',
		'ya-web': '&#xe666;',
		'ya-wifi': '&#xe667;',
		'ya-ya': '&#xe668;',
		'ya-ya-salte': '&#xe669;',
		'ya-you': '&#xe66a;',
		'ya-zoo': '&#xe66b;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/ya-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
