$(function() {

  $(window).load(function(){
　
    var headerHight = 100;
    var adjustClass = 'fixed';

    new WOW({
        mobile: false
    }).init();
    $('#nav-open').on('click',function(event){
      if( $(this).hasClass('active') ){
        $(this).removeClass('active');
        $('.nav-wrap').addClass('close').removeClass('open');

      }else {
        $(this).addClass('active');
        $('.nav-wrap').addClass('open').removeClass('close'); 
        
      }
    });
    objectFitImages();
    var nav = $('#pc_nav');
    $('li', nav).hover(function(){
        $(this).children('.child').addClass('active');
        $('.pc_dropdown',this).stop().show();
    },
    function(){
      $(this).children('.child').removeClass('active');
        $('.pc_dropdown',this).stop().hide();
    });

    $(window).on('scroll',function(){
       $('.top__header .tagline').toggleClass('fixed', $(this).scrollTop() > 50);
       $('.second__header .tagline').toggleClass('second__fixed', $(this).scrollTop() > 100);
       let triggerClass = $('.js-trigger');       //トリガーとなるクラス
           animateClass = ('is-show');

       $(triggerClass).each(function(){
         let scroll       = $(window).scrollTop(), //スクロール位置を取得
             triggerTop   = $(this).offset().top,  //指定要素のY座標
             windowHeight = $(window).height();    //ウィンドウの高さ
         // 要素が画面中央に来た時に発火
         if (scroll > triggerTop - windowHeight / 2){
           $(this).addClass(animateClass);
         }
       });
    });
    
    var getDevice = (function(){
        var ua = navigator.userAgent;
        if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
            return 'sp';
        }else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){
            return 'tab';
        }else{
            return 'other';
        }
    })();
    })
});