(function ($){

	/* tabs */
	/*
		- tabsWidth | if not set it make tab width become full width to the tabs_header's width
		- tabsWidth:false | if set it make tab width auto
	*/

	$.fn.tabs = function( options ) {
		var getthisID = $(this).attr("id");
		$(this).css({"margin-right":"auto","margin-left":"auto"});
		var tablength = $("#"+getthisID+" > .tabs_header > ul > li").length;
		var tabsWidth = $("#"+getthisID+" > .tabs_header").outerWidth()/tablength;

		var slideWidth = $("#"+getthisID+" > .tabs_header").outerWidth();
		var tabbodyWrapWidth = $("#"+getthisID+" > .tabs_body_wrap").outerWidth();
		/* tab = true this function use for tab but if tab = false this function is not use for tab and tab content have only one content */
		var defaults = $.extend({tab:true,animate:true,tabBorderFix:false,tabsWidth:tabsWidth,speed:1000,tabMGT:(tabbodyWrapWidth-slideWidth)/2,fixContent:false}, options );
		if(!defaults.animate){
			$("#"+getthisID+" > .tabs_body_wrap > .tabs_body > div").css("display","none");
			$("#"+getthisID+" > .tabs_body_wrap >.tabs_body > div").eq(0).css("display","block");
		}
		/* resize screen */
		$(window).resize(function(e) {
			slideWidth = $("#"+getthisID+" > .tabs_header").outerWidth();
			tabbodyWrapWidth = $("#"+getthisID+" > .tabs_body_wrap").outerWidth();
			var checkIdexbefore = $("#"+getthisID+" > .tabs_header > ul > li.on").index();
			if(defaults.animate){
				if(defaults.fixContent==false){
					defaults = $.extend({speed:1000,tabMGT:(tabbodyWrapWidth-slideWidth)/2,fixContent:false}, options );
					$("#"+getthisID+" > .tabs_body_wrap > .tabs_body").css({"width":tabbodyInnerWith,"margin-left":-(slideWidth*checkIdexbefore)+defaults.tabMGT});
				}
			}
		});
		/* //resize screen */
		var tabbodyInnerWith = slideWidth*tablength;
		$("#"+getthisID+" > .tabs_body_wrap > .tabs_body").css({"width":tabbodyInnerWith,"margin-left":defaults.tabMGT});
		/* tab header */
		$("#"+getthisID+" > .tabs_header > ul > li").eq(0).addClass("on");
		$("#"+getthisID+" > .tabs_header > ul > li").css("width",defaults.tabsWidth);
		$("#"+getthisID+" > .tabs_header").append("<span class='tab_on_border'></span>");
		//$("#"+getthisID+" .tabs_header .tab_on_border").css("width",tabsWidth);

		var borderPosition = $("#"+getthisID+" > .tabs_header > ul").offset().left - $("#"+getthisID+" .tabs_header").offset().left;
		var borderPosition2 = $("#"+getthisID+" > .tabs_header > ul").offset().left - $("#"+getthisID+" .tabs_header").offset().left;
		$("#"+getthisID).find(".tab_on_border").animate({marginLeft:borderPosition},defaults.speed, function() {});

		$("#"+getthisID+" > .tabs_header > ul > li").click(function(e) {
			var thisIndex = $(this).index();

			//var borderPosition = tabsWidth * thisIndex;
			//alert(defaults.tabBorderFix);
			if(defaults.tabBorderFix){
					var borderPosition = $(this).offset().left - $("#"+getthisID+" > .tabs_header").offset().left;
					$("#"+getthisID+" > .tabs_header .tab_on_border").css("width",$(this).outerWidth() + borderPosition-borderPosition2);
					console.log($(this).outerWidth() + borderPosition-borderPosition2);
				}else{
					$("#"+getthisID+" > .tabs_header .tab_on_border").css("width",$(this).outerWidth());
					var borderPosition = $(this).offset().left - $("#"+getthisID+" > .tabs_header").offset().left;
					$("#"+getthisID).find(".tab_on_border").animate({marginLeft:borderPosition},defaults.speed, function() {});
			}

		});
		/* //tab header */

		/* tab body */
		$("#"+getthisID+" > .tabs_body_wrap > .tabs_body").css({"width":tabbodyInnerWith,"margin-left":defaults.tabMGT});
		if(defaults.fixContent == true){
			$("#"+getthisID+" > .tabs_body_wrap").css({"width":slideWidth});
			$("#"+getthisID+" > .tabs_body_wrap > .tabs_body").css({"margin-left":"0"});
		}
		$("#"+getthisID+" > .tabs_body_wrap > .tabs_body > div").css({"opacity":"0.2",/*"width":slideWidth*/});
		$("#"+getthisID+" > .tabs_body_wrap > .tabs_body > div").eq(0).css("opacity","1");

		$("#"+getthisID+" > .tabs_header > ul > li").click(function(e) {
			$("#"+getthisID+" > .tabs_header > ul > li").removeClass("on");
			$(this).addClass("on");
			var indexOfclik = $(this).index();
			$("#"+getthisID+" > .tabs_body_wrap > .tabs_body > div").css("opacity","0.2");
			$("#"+getthisID+" > .tabs_body_wrap > .tabs_body > div").eq(indexOfclik).css("opacity","1");

			if(defaults.animate){
				if(indexOfclik == 0){
					if(defaults.fixContent == true){
						return $("#"+getthisID).find("> .tabs_body_wrap > .tabs_body").animate({marginLeft:0},defaults.speed, function() {});
					}else{
						return $("#"+getthisID).find("> .tabs_body_wrap > .tabs_body").animate({marginLeft:defaults.tabMGT},defaults.speed, function() {});
					}
				}else{
					if(defaults.fixContent == true){
						return $("#"+getthisID).find("> .tabs_body_wrap > .tabs_body").animate({marginLeft:-((indexOfclik * slideWidth))},defaults.speed, function() {});
					}else{
						return $("#"+getthisID).find("> .tabs_body_wrap > .tabs_body").animate({marginLeft:-((indexOfclik * slideWidth) - defaults.tabMGT)},defaults.speed, function() {});
					}
				}
			}else{
				if(defaults.tab){
					$("#"+getthisID+" > .tabs_body_wrap > .tabs_body > div").css("display","none");
					$("#"+getthisID+" > .tabs_body_wrap > .tabs_body > div").eq(indexOfclik).css("display","block");
				}else{
					$("#"+getthisID+" > .tabs_body_wrap > .tabs_body > div").css("opacity","1");
				}
			}
		});
	};
	/* tabs */

	/* menu hover*/
	$.fn.menuType2Hover = function(options) {
		var defaults = $.extend({speedDown:200,speedUp:200}, options );
		$(".gsnb_wrap ul").addClass("js_animated");
		$( ".js_animated" ).wrap( "<div class='gsnb_inner'></div>" );
		//$('<div class="header_ly"></div>').appendTo('body');

		setTimeout(function(){
			$(".gnb_wrap .gnb > li").each(function(i) {
				var thisPostion = $(this).offset().left;
				//$(".gsnb_inner").eq(i).find("ul").css("margin-left",+thisPostion);
			});
		},100);
		var counter = 0;
		var myInterval =null;
		$(".gnb_wrap").mouseleave(function(e) {
			//$(".header_ly").fadeOut(defaults.speedUp);
			if(scrollTop < 1){
				setTimeout(function() {
					$(".header").removeClass("active");
				},defaults.speedDown);
			}else{
				$(".header").addClass("active");
				//console.log("add"+scrollTop);
			}
		});
		$(".gnb_wrap .gnb > li").hover(function(e){
			var thisliIndex = $(this).index();
			counter = 0;
			myInterval = setInterval(function () {
			if(counter == 3){
				//$(".header").addClass("active");
				//$(".header_ly").fadeIn(defaults.speedDown);
				$(".gnb_wrap .gnb > li").eq(thisliIndex).find(".gsnb_wrap").slideDown(defaults.speedDown);
			}
			++counter;
			},40);
		},function(e){
			clearInterval(myInterval);
			$(".gsnb_wrap").slideUp(defaults.speedUp);
			//$(".header_ly").fadeOut(defaults.speedUp);

		});
	};
	/* //menu hover*/

	/* menu click */
	$.fn.menuClick = function(options) {
		var defaults = $.extend({speedDown:200,speedUp:200}, options );
		$(".gsnb_wrap ul").addClass("js_animated");
		$( ".js_animated" ).wrap( "<div class='gsnb_inner'></div>" );
		$(".gnb_wrap .gsnb_inner ul > li a").addClass("js_click_menu");
		$(".gnb_wrap .gnb > li > a").addClass("js_click_menu");
		var i =0;
		var oldIndex=0;
		$(".gnb_wrap .gsnb_inner ul > li a").click(function(e) {
			//$(".header_ly").fadeToggle(defaults.speedDown);
			$(".gnb_wrap .gnb > li").find(".gsnb_wrap").slideUp(defaults.speedDown);
			$( ".gnb_wrap .gnb > li" ).removeClass("on");
		});

		$(".gnb_wrap .gnb > li > a").click(function(e){
			//$(".gnb_wrap .gnb > li" ).removeClass("on");
			if($(this).next().is(".gsnb_wrap")){
				var thisliIndex = $(this).parent().index();
				$( ".gnb_wrap .gnb > li" ).each(function(i) {
				if(i != thisliIndex){
						$(".gnb_wrap .gnb > li").eq(i).removeClass("on");
					}else{

						if (!$(".gnb_wrap .gnb > li").eq(i).hasClass("on")) {
							$(".gnb_wrap .gnb > li").eq(i).toggleClass("on");
						}

					}
				});
				if(oldIndex == thisliIndex){
					//$(".header_ly").fadeToggle(defaults.speedDown);
					$(".gnb_wrap .gnb > li").eq(thisliIndex).find(".gsnb_wrap").slideToggle(defaults.speedDown, function(){
					});
				}else{
					//$(".header_ly").fadeIn(defaults.speedDown);
					$(".gnb_wrap .gnb > li").eq(oldIndex).find(".gsnb_wrap").slideUp(defaults.speedDown, function(){
						$(".gnb_wrap .gnb > li").eq(thisliIndex).find(".gsnb_wrap").slideDown(defaults.speedDown);
					});
					oldIndex = thisliIndex;
				}
			}
		});

		$(document).click(function(e) {
			var getThisClass = e.target.className;
			var splitClass = getThisClass.split(' ')[0];
			if(splitClass !="js_click_menu"){
				$(".gnb_wrap .gnb > li").find(".gsnb_wrap").slideUp(defaults.speedDown);
				$( ".gnb_wrap .gnb > li" ).removeClass("on");
			}
		});
	}
	/* //menu click */

	
	
	$.fn.toggleAccordion = function(options){
		
		// how to use
		//$('.header_inner').toggleAccordion({
		//	wrapClass:".header_inner",
		//	clickClass:".js_click",
		//	showClass:".js_show",
		//	//clickclassNoHide:[".gnb_srchx"], | class of element that click not hide layer
		//	layer:true,	| true for layer | false for accordion
		//	menu:true,	| true when use ask menu
		//	multiShow:false,
		//	speed:300
		//});
		
		
		
		var defaults = {wrapClass:"x",clickClass:"x",showClass:"x",clickclassNoHide:[".x"],layer:false,menu:false,multiShow:true,speed:300};
		
		options = $.extend(defaults,options);
		var classWrap = options.wrapClass;
		if(options.menu){
			if($("#header_ly").length == 0) {
				 $('body').prepend($('<div/>', {
					id: 'header_ly' 
				}));
			}
		}
		if(options.layer){
			var attrDiv = "<div class="+classWrap.substring(1)+"_contents"+" style='display:none;margin:0;padding:0;'>"+ "</div";
		}else{
		   var attrDiv = "<div class="+classWrap.substring(1)+"_contents"+" style='display:none;margin:0;padding:0;min-height:100%;'>"+ "</div";
		}
		var clickClass = options.clickClass;
		var showClass = options.showClass;
		$(classWrap+" "+showClass).wrap(function() {
			return attrDiv;
		});
		if(options.layer){
			$(classWrap+" "+clickClass).each(function(i) {
				$(clickClass).eq(i).attr('id', i+classWrap.substring(1)+"_click");
			});
			var idclickTemp = classWrap+"_click";
			var idclick = idclickTemp.substring(1);
			$(classWrap+"_contents").css({"position":"absolute",});
			$(document).click(function(e){
					var mygetThisClassTemp = e.target.id;
					var mygetThisClassTempClass = e.target.className;
					var mygetThisClass = mygetThisClassTemp.substring(1);
					var mygetThisClassIndex = mygetThisClassTemp.substring(1,0);
					var NoHideclassLength = options.clickclassNoHide.length;
					var NoHideclass = options.clickclassNoHide;
					if(idclick != mygetThisClass){
						$.each(NoHideclass, function(i, value) { 
							if(mygetThisClassTempClass == NoHideclass[i].substring(1)) {
								return false; // breaks
							}else{
								if(i == NoHideclassLength-1){
									$(clickClass).removeClass("on");
									if(options.menu){
										$(classWrap+"_contents").slideUp(options.speed-100);
										$("#header_ly").slideUp(options.speed);
									}else{
										$(classWrap+"_contents").slideUp(options.speed);
									}
								  }
							}
						});
					}else{
						if(options.menu){
						   	var thisNextHieght = $(classWrap+"_contents").eq(mygetThisClassIndex).outerHeight();
							$(clickClass).removeClass("on");
							$(classWrap+"_contents").slideUp(options.speed-100);
							//$("#header_ly").css("height",thisNextHieght).slideUp(options.speed);							
							if($(classWrap+"_contents").eq(mygetThisClassIndex).is(":visible")){
								$("#header_ly").slideUp(options.speed, function() {
									$("#header_ly").css("height",thisNextHieght).slideUp(options.speed);
									$(classWrap+"_contents").eq(mygetThisClassIndex).slideUp(options.speed-300);
								});
							}else{
								$("#header_ly").slideUp(options.speed, function() {
									//do something special
									$("#header_ly").css("height",thisNextHieght).slideDown(options.speed-100);
									$("#"+mygetThisClassTemp).toggleClass("on");
									$(classWrap+"_contents").eq(mygetThisClassIndex).slideDown(options.speed);
								});	
							}
						 }else{
							$(clickClass).removeClass("on");
							$(classWrap+"_contents").slideUp(options.speed);
							if($(classWrap+"_contents").eq(mygetThisClassIndex).is(":visible")){
								$(classWrap+"_contents").eq(mygetThisClassIndex).slideUp(options.speed);
							}else{
								$("#"+mygetThisClassTemp).toggleClass("on");
								$(classWrap+"_contents").eq(mygetThisClassIndex).slideDown(options.speed);
							}
						 }
					}	
				});
			}else{
				$(classWrap+" "+clickClass).click(function(e){
					var thisParentIndex = $(this).parents(classWrap).index("body "+classWrap);
					var thisIndex = $(this).index(classWrap+':eq('+thisParentIndex+')'+" "+clickClass);
					if(options.multiShow){
						if($(classWrap+"_contents").eq(thisIndex).is(":visible")){
							$(this).removeClass("on");
							$(this).parent().removeClass("open");
							$(classWrap+"_contents").eq(thisIndex).slideToggle(options.speed);
						}else{
							$(this).addClass("on");
							$(this).parent().addClass("open");
							$(classWrap+"_contents").eq(thisIndex).slideToggle(options.speed);
						}
					}else{
						if($(classWrap).eq(thisParentIndex).children().find(classWrap+"_contents").eq(thisIndex).is(":visible")){
							$(classWrap+" "+clickClass).parent().removeClass("open");
							$(classWrap+" "+clickClass).removeClass("on");
							$(classWrap).eq(thisParentIndex).children().find(classWrap+"_contents").slideUp(options.speed);
						}else{
							$(classWrap+':eq('+thisParentIndex+')'+" "+clickClass).parent().removeClass("open");
							$(classWrap+':eq('+thisParentIndex+')'+" "+clickClass).removeClass("on");
							$(this).addClass("on");
							$(this).parent().addClass("open");
							$(classWrap).eq(thisParentIndex).children().find(classWrap+"_contents").slideUp(options.speed);
							$(classWrap).eq(thisParentIndex).children().find(classWrap+"_contents").eq(thisIndex).slideDown(options.speed);
						}	
					}
				});
			}
		$(classWrap+" "+clickClass+".on").each(function(i) {
			var thisParentIndexOn = $(this).parents(classWrap).index("body "+classWrap);
			$(this).next().css("display","block");
		});	
	};
}( jQuery ));

//function couterOne(counter){
//
//	$('.counter' + counter).counterUp({
//		delay: 10,
//		time: 1000,
//	});
//
//}


$(document).ready(function(){
	'use strict';

	var lastScrollTop = 0, delta = 5;
	$(window).scroll(function(e){
		e.stopPropagation();
		var scrl = $(window).scrollTop();

		if(scrl>1){
			$('.header').addClass('active');
		}else{
			$('.header').removeClass('active');
		}

		/* move fixed header */
		$('.header').css('left', -$(this).scrollLeft() + "px");

		/* go to top */
		/* -60 is first laod positon. 40 is start scroll postion. 120 is position fixed top of the footer */
		$(".btn_totop_wrap").gotoTops({bottom:$.fn.getPosition(-60,50,50)});
		/* //go to top */

		/* Function Scroll progressbar */
		//$(".progressbar").progressbar({
			//top:105, /* position top of progressbar */
			//bottom:"auto", /* position bottom of progressbar */
			//height:1,/* height of progressbar */
			//zIndex:99999,/* z-index of progressbar */
			//backgroundColor:"#2c56d0"/* background Color of progressbar */
		//});
		/* //Function Scroll progressbar */

		var nowScrollTop = $(this).scrollTop();
		if(Math.abs(lastScrollTop - nowScrollTop) >= delta){
			if (nowScrollTop > lastScrollTop){
				$(".header").css("transform","translateY(-100%)");
			} else {
				$(".header").css("transform","translateY(0px)");
			}
			lastScrollTop = nowScrollTop;
		}

		$(".js_animated2").each(function() {
			var bottom_of_object = $(this).offset().top;
			var bottom_of_window = $(window).scrollTop() + $(window).height();
			if (bottom_of_window > bottom_of_object) {
				$(this).animate({
					'opacity': '1'
				}, 2000);
				$(this).addClass("fadeInUp2");
			}
		});

	});

	//$("menu").menuClick();

	$('.btn_readMore').click(function(){
		var $js_rollUp, autoHeight, curHeight;

		$js_rollUp = $(this).parent().siblings('.js_rollUp');

		if($js_rollUp.attr("data-roll")==0){
			$js_rollUp.attr("data-roll", "1");
			$(this).text('- READ LESS');
			curHeight = $js_rollUp.height(),
			autoHeight = $js_rollUp.css('height', 'auto').height();
			$js_rollUp.height(curHeight).animate({height: autoHeight}, 200);
			$js_rollUp.addClass('on');

		}else{
			$js_rollUp.removeClass('on');
			$(this).text('+ READ MORE');
			$js_rollUp.attr("data-roll", "0");
			$js_rollUp.animate({height:218},200);

		}
	});

	//var bottom_of_window = $(window).scrollTop() + $(window).height();
	$(".js_animated2").each(function() {
			var bottom_of_object = $(this).offset().top;
			var bottom_of_window = $(window).scrollTop() + $(window).height();
		if (bottom_of_window > bottom_of_object) {
			$(this).animate({
				'opacity': '1'
			}, 2000);
			$(this).addClass("fadeInUp2");
		}
	});

	
	/* filter layer */	
	$('.gnb').toggleAccordion({
		wrapClass:".gnb",
		clickClass:".jsClick",
		showClass:".gsnb_wrap",
//		clickclassNoHide:[".mCSB_dragger_bar", ".mCSB_draggerRail"],
		layer:true,
		menu:true,
		multiShow:false,
		speed:300
	});
	/* //filter layer */
});


function initNum(no, targetDiv, atOnce, sp, dur,height,comma) {
	sp = typeof sp !== 'undefined' ? sp : 150;
	dur = typeof dur !== 'undefined' ? dur : 250;
	$("#" + targetDiv).empty();
	if(comma == "no"){
		no = no.toString();
	}else{
		no = no.toLocaleString() + '';
	}

	for (var i = 0; i < no.length; i++) {
		if (no[i] == ',') {
			var _class = 'comma';
		} else {
			_class = 'digit' + ' ' + targetDiv + '_' + i;
		}
		var digitSpan = "<span class='" + _class + "' title='" + no[i] + "'></span>"

		$("#" + targetDiv).append(digitSpan);
		if (atOnce) {
			if (no[i] != ',') {
				var $digit = $("." + targetDiv + '_' + i);
				var finalY = (-1 * no[i] * height);
				var initY = finalY - sp;
				$digit.css('background-position-y', initY + 'px');
				$digit.animate({'background-position-y': finalY + 'px'}, dur, 'linear');
			}
		}
	}

	if (!atOnce) {
		rollDigit($("." + targetDiv + '_' + (no.length - 1)), sp, dur,height);
	}
}
function rollDigit($digit, sp, dur,height) {
	var finalY = (-1 * $digit[0].title * height);
	var initY = finalY - sp;
	$digit.css('background-position-y', initY + 'px');
	$digit.animate({'background-position-y': finalY + 'px'}, dur, 'linear', function () {
		var prev = $(this).prev();
		if (prev[0]) {
			rollDigit(prev, sp, dur,height);
		}
	});
}

function countNumber(mynumber,id,atOnce,sp,dur,height,click,comma){
	var first = 0;
	var offcounter1 = $("#"+id).offset().top;
	var windowHieght = $(window).outerHeight();
	if(click == "true"){
		initNum(mynumber,id,atOnce,sp,dur,height,comma);
	}else{
		if(offcounter1 <= windowHieght){
			initNum(mynumber,id,atOnce,sp,dur,height,comma);
			first =1;
		}

		$(window).scroll(function(){
			var scrl = $(window).scrollTop();
			if(scrl+windowHieght >= offcounter1){
				if(first == 0){
					initNum(mynumber,id,atOnce,sp,dur,height,comma);
					first =1;
				}
			}
		});
	}

}