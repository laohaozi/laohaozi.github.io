/*!
 * NavScroll.js
 * Version: 1.2.0
 * Author: Jeroen Hammann
 *
 * Copyright (c) 2014 Jeroen Hammann
 * Released under the MIT license
*/

;(function ($, window, document, undefined) {
  'use strict';

  var pluginName = 'navScroll',
      defaults = {
        // The time it takes to scroll to the element (set this to 0 so it obviously won't show an animation).
        scrollTime: 500,
        // The class of the items which invokes the scroll animation. All anchor tags inside the element are clickable when the value is empty.
        navItemClassName: '',
        // Set the height of the navigation (to use as offset). 'auto' let's the plugin determine the height automatically, a number determines the height in px.
        navHeight: 'auto',
        // If your navigation hides and is used as a dropdown on small screens setting this to true hides the dropdown after a click.
        mobileDropdown: false,
        // Additionaly you can insert the mobile nav's classname here, when left empty the plugin searches for a <ul> in the same parent element.
        mobileDropdownClassName: '',
        // The window width, which functions as a breakpoint between desktop and mobile.
        mobileBreakpoint: 1024,
        // Set to 'true' if you want to enable scrollspy.
        scrollSpy: false
      };

  function NavScroll(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  NavScroll.prototype = {
    init: function() {
      var self, options, element, navItem, rightItem, navOffset, scrollTime;
      self = this;
      options = self.options;
      element = self.element;

      if (options.navItemClassName === '') {
        navItem = $(element).find('a');
      } else {
        navItem = $(element).find('.' + options.navItemClassName);
      }
    
     

      if (options.navHeight === 'auto') {
        navOffset = $(element).height();
      } else if (isNaN(options.navHeight)) {
        throw new Error ('\'navHeight\' only accepts \'auto\' or a number as value.');
      } else {
        navOffset = options.navHeight;
      }

      navItem.on('click', function(e){
        var url, parts, target, targetOffset, targetTop;

        url = this.href;
        parts = url.split('#');
        target = parts[1];

        if (target !== undefined) {
          e.preventDefault();
          targetOffset = $('#' + target).offset();
          targetTop = targetOffset.top;
        }

        if ($(this).data('scrolltime') !== undefined) {
          scrollTime = $(this).data('scrolltime');
        } else {
          scrollTime = options.scrollTime;
        }

        if (options.mobileDropdown && $(window).width() >= 0 && $(window).width() <= options.mobileBreakpoint) {
          if (options.mobileDropdownClassName === '') {
//          $(element).find('ul').slideUp('fast');
          } else {
            $('.' + options.mobileDropdownClassName).slideUp('fast');
          }
        }

        $('html, body').stop().animate({
          scrollTop: targetTop - navOffset
        }, scrollTime);
      });

      if (options.scrollSpy) {
        var scrollItems;
        scrollItems = [];

        navItem.each(function() {
          var scrollItemId = $(this).attr('href');
          scrollItems.push($(scrollItemId));
        });

        $(window).on('scroll', function () {
          self.scrollspy(navItem, scrollItems);
        });
        self.scrollspy(navItem, scrollItems);
      }
    },

    scrollspy: function(navItem, scrollItems) {
      var scrollPos, changeBounds, i, l;
      scrollPos = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
//  changeBounds = window.innerHeight / 2 || document.documentElement.clientHeight / 2;
      l = navItem.length;

      for (i = 0; l > i; i++) {
        var item = scrollItems[i];
         
        if (scrollPos > (item.offset().top-60)) {
          
          navItem.removeClass('active');
          $(navItem[i]).addClass('active');

        }
      }
    }
  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName,
        new NavScroll(this, options));
      }
    });
  };

})(jQuery, window, document);
$(function(){
        //鍐呭淇℃伅瀵艰埅鍚搁《
            $(document).ready(function(){ 
            var navHeight= $("#navHeight").offset().top; 
            var navFix=$("#nav-box"); 
            $(window).scroll(function(){ 
                if($(this).scrollTop()>navHeight){ 
                    navFix.addClass("navFix"); 
                } 
                else{ 
                    navFix.removeClass("navFix"); 
                } 
                }) 
            });
        //鍐呭淇℃伅瀵艰埅閿氱偣
           $('.nav-box').navScroll({
              mobileDropdown: true,
              mobileBreakpoint: 768,
              scrollSpy: true
            });
        
            $('.click-me').navScroll({
              navHeight: 0
            });
        

        // 鍙充晶hover
            $('#iebug a').hover(function(){
              $(this).parent().find(".text").css('display','block');
            },function(){
               $(this).parent().find(".text").css('display','none');
            });

 //鏍规嵁绐楀彛澶у皬妤煎眰鏁板瓧鏄剧ず鍒版纭綅缃�
    var brwidth = $(window).width();
    var xCabtn = (brwidth - 1200) / 2 + 1205;
    var xScorbtn = (brwidth - 1200) / 2 + 1202;

    $(".category-btn").css({ left: xCabtn });
    $("#goTopBtn").css({ left: xScorbtn });

    //鑾峰彇閲嶇疆
    $(window).resize(function () {
        var brwidth = $(window).width();
        //      alert(brwidth);
        var xCabtn = (brwidth - 1200) / 2 +1205;
        var xScorbtn = (brwidth - 1200) / 2 + 1202;

        $(".category-btn").css({ left: xCabtn });
        $("#goTopBtn").css({ left: xScorbtn });
    });
    //鍙充晶鐐瑰嚮瀹氫綅
        var newArray2=new Array();
        newArray2[0]="1";
        newArray2[1]="2";
        newArray2[2]="3";
        newArray2[3]="4";
        newArray2[4]="5";
       var newArray=new Array();
        newArray[0]="section1";
        newArray[1]="section2";
        newArray[2]="section3";
        newArray[3]="section4";
        newArray[4]="section5";
  for(var j=0;j<5;j++){
      (function(j){
        $("#"+newArray2[j]).click(function (){
            // $('.category-btn a').css("color","#fff");
            // $(this).css("color","#666");
            $("html, body").animate({
              scrollTop:$("#"+newArray[j]).offset().top-50+"px" }, {duration: 500,easing: "swing"});
          return false;
         
            });
      })(j);
      
    };

    
  $("#goTopBtn").click(function(){
     var sc=$(window).scrollTop();
     $('body,html').animate({scrollTop:0},500);
  });


  // 
       var oNav = $('#list');//瀵艰埅澹�
       var aNav = oNav.find('li');//瀵艰埅
       var aNav1 = oNav.find('li.1');//瀵艰埅

       var aDiv = $('.xsj');//妤煎眰
       var aDiv1 = $('.xsj1');//妤煎眰
    //鍥炲埌椤堕儴
      $(window).scroll(function(){
         var winH = $(window).height();//鍙绐楀彛楂樺害
         var iTop = $(window).scrollTop();//榧犳爣婊氬姩鐨勮窛绂�
         
       
         //榧犳爣婊戝姩寮忔敼鍙� 鍙充晶妤煎眰 
        aDiv.each(function(){
           var scrollPos1;
           scrollPos1 = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
            // console.log(scrollPos);
           
          if(scrollPos1> ($(this).offset().top-60+$(this).height())){
            // alert($(this).offset().top);
             // console.log($(this).offset().top-60);
            aNav.removeClass('active');
            aNav1.removeClass('active');
            aNav.eq($(this).index()).addClass('active');
            console.log($(this).index());
          }
         });
         aDiv1.each(function(){
           var scrollPos2;
           scrollPos2 = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
            
           
          if(scrollPos2> ($(this).offset().top-60)&&scrollPos2<$(this).offset().top-60+$(this).height()){
            // alert($(this).offset().top);
      
            aNav1.removeClass('active');
             aNav.removeClass('active');
            aNav1.eq($(this).index()-1).addClass('active');
            // console.log($(this).index());
            
          }
         })
        
      })

})