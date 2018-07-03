$(function(){
	$(".price").click(function(){
		if($(".balance").css("display") == "none"){
			$(".balance").show();
		}else{
			$(".balance").hide();
		}
	})
	$(".bgbg").click(function(){
		$(".balance").hide();
	})
	//选菜数量增加操作
            $(".menulist .add").click(function () {
                $(this).parent().find(".text_box").val(parseInt($(this).parent().find(".text_box").val()) + 1)
                if (parseInt($(this).parent().find(".text_box").val()) != 0) {
                    $('.min').attr('disabled', false);
                    $(this).parent().find('.text_box').slideDown(300);
                    $(this).parent().find('.min').slideDown(300);
                }

                //同步结算数量
                var $dd = $(this).closest('dd');
                var layer_product_name = $dd.find('#product_name').text();
                var layer_product_price = $dd.find('#product_price').text();
                var sl = $dd.find('.text_box').val();
                var id = $dd.attr('id').split('_')[1];
                var type = $dd.find(".type").attr("value");
                setBanlanceValue(layer_product_name, layer_product_price, sl, id ,type);
            });

            //选菜数量减少操作
            $(".menulist .min").click(function () {
                $(this).parent().find(".text_box").val(parseInt($(this).parent().find(".text_box").val()) - 1);
                if (parseInt($(this).parent().find(".text_box").val()) == 0) {
                    $('.min').attr('disabled', false);
                    $(this).parent().find('.text_box').slideUp(300);
                    $(this).parent().find('.min').slideUp(300);
                }

                //同步结算数量
                var $dd = $(this).closest('dd');
                var layer_product_name = $dd.find('#product_name').text();
                var layer_product_price = $dd.find('#product_price').text();
                var sl = $dd.find('.text_box').val();
                var id = $dd.attr('id').split('_')[1];
                setBanlanceValue(layer_product_name, layer_product_price, sl, id,type);
            });

            //菜品图片点击事件
            $('.menulist dl dd .imgbox').click(function () {
                if ($('.layer').css('display') == 'none') {
                    $('.layer').slideDown(0);

                    setLayerValue($(this).closest('dd'));
                } else {

                }
            });      
})

//设置弹窗的数据
function setLayerValue($dd) {
    var layer_product_name = $dd.find('#product_name').text();
    var layer_product_price = $dd.find('#product_price').text();
    var sl = $dd.find('.text_box').val();
    var imgurl = $dd.find('img').attr('src');
    var id = $dd.attr('id').split('_')[1];
    var qbh = $dd.find('#qbh').val();
    var zzylv = $dd.find('#zzylv').val();
    if (zzylv.length > 50) {
        zzylv = zzylv.substring(0, 50) + '...';
    }

    $('#layer_product_name').text(layer_product_name);
    $('#layer_product_name1').text(layer_product_name+'('+qbh+')');
    $('#layer_product_price').text(layer_product_price);
    $('#layer_id').val(id);
    $('.layer .product .msg .number .text_box').val(sl);
    $('#imgurl').attr('src', imgurl);
    $('#zzyldiv').empty();
    $('#zzyldiv').append(zzylv);

    layerShowControl();
}

//设置结算数据
function setBanlanceValue(layer_product_name,layer_product_price,sl,id,type) {
    var len = $('.balance ul li').length;
    var newappend = false;
    var eachrow = '<li id="balance_' + id + '"><div class="c-left"><div class="c-t">' + layer_product_name + '</div><div class="c-b">' + type + '</div></div><h2>￥' + layer_product_price + '</h2><input type="hidden" id="balance_price" value="' + layer_product_price + '"> <div class="number"><input class="min" name="" type="button" /><input id="balance_sl" class="text_box" name="" type="text" value="' + sl + '" readonly /><input class="add" name="" type="button" /> </div> </li>';

    if (len == 0) {
        $('.balance ul').append(eachrow);
        newappend = true;
    } else {
        //先判定结算列表中是否包含这个菜品
        var isexists = false;
        var curli;
        $.each($('.balance ul li'), function (i, v) {
            var eachid = $(this).attr('id');
            if (eachid == 'balance_' + id) {
                isexists = true;
                curli = $(this);
            }
        });
        if (isexists) {
            curli.find('#balance_sl').val(sl);
        } else {
            $('.balance ul').append(eachrow);
            newappend = true;
        }
    }

    //如果是新增的话，绑定加减数量事件
    if (newappend) {
        //结算数量增加操作
        $("#balance_" + id + " .add").click(function () {
            $(this).parent().find(".text_box").val(parseInt($(this).parent().find(".text_box").val()) + 1);
            if (parseInt($(this).parent().find(".text_box").val()) != 0) {
                $('.min').attr('disabled', false);
                $(this).parent().find('.text_box').slideDown(300);
                $(this).parent().find('.min').slideDown(300);
            }

            setMenulistValue(id, parseInt($(this).parent().find(".text_box").val()));

            setTotalPrice();
        });

        //结算数量减少操作
        $("#balance_" + id + " .min").click(function () {
            $(this).parent().find(".text_box").val(parseInt($(this).parent().find(".text_box").val()) - 1);
            if (parseInt($(this).parent().find(".text_box").val()) == 0) {
                $('.min').attr('disabled', false);
                $(this).parent().find('.text_box').slideUp(300);
                $(this).parent().find('.min').slideUp(300);
                $(this).parent().parent().remove();
            }

            setMenulistValue(id, parseInt($(this).parent().find(".text_box").val()));

            setTotalPrice();
        });
    } else {
        var sl = curli.find(".text_box").val();
        if (parseInt(sl) == 0) {
            $('.min').attr('disabled', false);
            curli.find('.text_box').slideUp(300);
            curli.find('.min').slideUp(300);
            curli.remove();
        }
    }

    setTotalPrice();
}
//设置选菜数量
function setMenulistValue(id, sl) {
    $('#detail_' + id).find('.text_box').val(sl);
    if (sl == 0) {
        $('.min').attr('disabled', false);
        $('#detail_' + id).find('.text_box').slideUp(300);
        $('#detail_' + id).find('.min').slideUp(300);
    } else {
        $('.min').attr('disabled', false);
        $('#detail_' + id).find('.text_box').slideDown(300);
        $('#detail_' + id).find('.min').slideDown(300);
    }
}

function setTotalPrice() {
    var cart_num = 0;
    var totalPrice;
    totalPrice = parseFloat('0.00');
    cart_num = $('.balance ul li').length;

    $.each($('.balance ul li'), function (i, v) {
        totalPrice = (parseFloat(totalPrice) + parseFloat($(this).find('.text_box').val()) * parseFloat($(this).find('#balance_price').val())).toFixed(2);
    });

    $('.cart .icon_cart').text(cart_num);
    $('.cart #card_sum').text(totalPrice);
    $('.balance #balance_sum').val('去结算（共'+totalPrice+'元）');
    if(totalPrice > 0){
    	$(".cart").show();
    }else{
    	$(".cart").hide();
    	$(".balance").hide();
    }
}
//清空全部
function clearAll() {
    $('.balance ul li').remove();
    $('#detaillist dd').find('.text_box').val(0);
    $('.min').attr('disabled', false);
    $('#detaillist dd').find('.text_box').slideUp(300);
    $('#detaillist dd').find('.min').slideUp(300);

    $('.balance .bgbg').trigger('click');

    setTotalPrice();
}
            

//查询
function searchCp() {
    var cpmc = $('#cpmc').val();
    if (cpmc) {
        $('#detaillist dd').hide();
        $.each($('#detaillist dd'), function (i, v) {
            var product_name = $(this).find('#product_name').text();
            if (product_name.indexOf(cpmc)!=-1) {
                $(this).show();
            }
        });
        $('#cpmc').val('');
    }
}

