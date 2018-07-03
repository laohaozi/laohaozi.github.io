$(function(){
	$(".c-xuanzhuo li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		$(".c-fixed2 span").html($(this).attr("data-value"));
	});
	$('.c-xuanzhuo li').on('click', function(){
	    parent.$('.c-zhuohao .c-right').html($(this).attr("data-value"));
	    parent.layer.closeAll();
	});
	$('.c-back a').on('click', function(){
	    parent.layer.closeAll();
	});
})
