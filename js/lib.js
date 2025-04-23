/*功能性执行代码*/

$(function () {
  //AOS 渐入动画

  // AOS.init({
  // 	disable: window.innerWidth < 1200
  // });

  //owl插件调用

  // .owl-carousel
  // $('.index_11').owlCarousel({
  // 	loop:false,
  // 	margin:64,
  // 	nav:true,
  // 	dots:true,
  // 	smartSpeed:500,
  // 	mouseDrag:false,
  // 	autoplay:true,
  // 	autoplayTimeout:4000,
  // 	autoplayHoverPause:true,
  //	slideBy: 1,		走一个
  //	slideBy: "page",		走一页
  // 	responsive:{
  // 		0:{
  // 			items:1
  // 		},
  // 		768:{
  // 			items:2
  // 		},
  // 		992:{
  // 			items:3
  // 		},
  // 		1200:{
  // 			items:4
  // 		}
  // 	}
  // })

  // owl 鼠标滚轮参与
  // var mswel1 = $('.owl-carousel.index_11')
  // mswel1.on('mousewheel', '.owl-stage', function (e) {
  //     if (e.deltaY>0) {
  //        mswel1.trigger('prev.owl');
  //     } else {
  //        mswel1.trigger('next.owl');
  //     }
  //     e.preventDefault();
  // });

  // 滚动监听
  // $(window).scroll(function () {
  //    ST = $(window).scrollTop();
  //    if (ST >300) {
  //        $("#totop").addClass("cur")
  //    } else {

  //        $("#totop").removeClass("cur")

  //    }
  //  });

  //banner轮播调用

  // $(".flexslider").flexslider({
  // 	animation : "fade",
  // 	slideshowSpeed: 4000, //展示时间间隔ms
  // 	animationSpeed:500, //滚动时间ms
  // 	slideshow: true,// 载入页面时，是否自动播放
  // 	controlNav: true,  //指示器
  // 	directionNav: true //方向键
  // });

  //连续滚动调用函数

  // $(".you-list").liMarquee({
  // 	drag: false,
  // 	scrollamount: 20,
  // 	direction: 'right',
  // 	runshort: false
  // });

 

  $(".foo3-span").click(function () {
    if ($(this).hasClass("cur")) {
      $(this).removeClass("cur");
      $(".foo3-ul").stop().slideUp();
    } else {
      $(".foo3-span").removeClass("cur");
      $(this).addClass("cur");
      $(".foo3-ul").stop().slideUp();
      $(this).next(".foo3-ul").stop().slideDown();
    }
  });

  $(".foo3-ul").mouseleave(function () {
    $(".foo3-span").removeClass("cur");
    $(".foo3-ul").stop().slideUp();
  });

  // $(".main2-list").owlCarousel({
  //   margin: 0,
  //   nav: false,
  //   dots: false,
  //   smartSpeed: 500,
  //   mouseDrag: false,
  //   autoplay: true,
  //   autoplayTimeout: 6000,
  //   // autoplayHoverPause:true,
  //   loop: false,
  //   rewind: true,
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     992: {
  //       items: 2,
  //     },
  //     1200: {
  //       items: 3,
  //     },
  //     1500: {
  //       items: 3,
  //       margin: 10,
  //     },
  //   },
  // });
}); /*function结束括号，JS代码请放此上！！！*/

/*功能性执行代码*/
