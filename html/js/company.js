$(function() {

  $(window).load(function(){
　
    var headerHight = 100;
    var adjustClass = 'fixed';

/*    $(window).on('scroll',function(){
       $('header').toggleClass('fixed', $(this).scrollTop() > 50);
    });*/

    const adjustPoint = $('.local_nav').scrollTop();
    const margin = 300
    const pos1 = $('#1').offset();
    const pos2 = $('#2').offset();
    const foot = $('footer').offset();

    $(window).scroll(function () {
      var pos_local = $('.local_nav').scrollTop();
      headerAdjust('.local_nav',adjustClass);
    });

/*    $(".local_nav ul li a").on("click", function() {
        $(this).parent().addClass('active');
    });*/

    function headerAdjust(tgt,fixclass) {
        if( getDevice != 'sp' && getDevice != 'tab'){
            var scrollTop = $(window).scrollTop();
            if(scrollTop > adjustPoint) {
              $(tgt).addClass(fixclass);
              //$(tgt).show();
            } else {
              $(tgt).removeClass(fixclass);
              //$(tgt).hide();
            }
            if (scrollTop > pos1.top - margin) {
              $('#sub_1').addClass('active');
            } else {
              $('#sub_1').removeClass('active');
            }
            if (scrollTop > pos2.top - margin) {
              $('#sub_2').addClass('active');
            } else {
              $('#sub_2').removeClass('active');
            }

            if(scrollTop > foot.top - margin) {
              $(tgt).addClass('hidden');
            } else {
              $(tgt).removeClass('hidden');
            }
        }
    }

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