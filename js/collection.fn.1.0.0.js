(function ($){
	/* Develop by Mr Penh Sokra 20160618 */
	/* progressbar bar */
	$.fn.progressbar = function(options) {
		var progressbar = $(".progressbar").length;
		if(progressbar ==0){
			$("<span class='progressbar'></span>" ).prependTo("body");
		}
		var docHeight = $(document).height();
		var winHeight = $(window).height();
		var scrollTop = $(window).scrollTop();
		var scrollPercent = (scrollTop) / (docHeight - winHeight);
		var scrollPercentRounded = Math.round(scrollPercent*100);
		// This is the easiest way to have default options.
		var defaults = $.extend({position:"Fixed",top:0,left:0,bottom:0,width:scrollPercentRounded,height:1,backgroundColor:"red",zIndex:9999,transition:"width .4s ease-out",		transform:"rotateZ(0deg)"}, options );
		// progressbar the collection based on the settings variable.
		return this.css({position:defaults.position,bottom:defaults.bottom,top:defaults.top,left:defaults.left,width:defaults.width+"%",height:defaults.height,backgroundColor:defaults.backgroundColor,zIndex:defaults.zIndex,transition:defaults.transition,transform:defaults.transform});
	};
	/* //progressbar bar */

	/* scroll to top */
	$.fn.getPosition = function(a,b,c) {
		try {
			var scrollTop = $(window).scrollTop();
			var winHeight = $(window).outerHeight();
			var FooterHeightOfset = $('.footer').offset().top;
			var FooterHeight = $('.footer').outerHeight();
			var BottomPositonFixed = scrollTop-FooterHeightOfset+winHeight;
			var FixTopFooter = $(window).scrollTop()+winHeight-FooterHeight+FooterHeight;
			if(FixTopFooter >= FooterHeightOfset){
				$(".btn_totop_wrap").on('transitionend webkitTransitionEnd', function(e){
					$(this).addClass("noTransition");
				});
				return BottomPositonFixed+c;
				}else if($(window).scrollTop() >= 1){
					$(".btn_totop_wrap").removeClass("noTransition");
					return b;
				}else{
					$(".btn_totop_wrap").removeClass("noTransition");
					return a;
			}
		}catch(err) {
				console.log(err.message);
			}
	};
	/* go to top */
	$.fn.windowscrollTop = function(options) {
		var defaults = $.extend({scrollTop:0,duration:500}, options );
		return this.animate({scrollTop:defaults.scrollTop,duration:defaults.duration,});
	};
	/* //go to top */
	$.fn.gotoTops = function(options) {
		$(".btn_gotoTop").click(function(e) {
			$('html, body').windowscrollTop();
			$('html, body').stop(stopAll,goToEnd);
		});
		var bottom=$.fn.getPosition();
		var defaults = $.extend({bottom:bottom},options);
		return this.css({bottom:defaults.bottom});
	};
	/* //scroll to top */

}( jQuery ));