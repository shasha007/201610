var page=1;
var loadingStr = '<div class="spinner"><div class="spinner-container container1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div>';
var noneStr = '<div class="nonestr">没有记录</div>';
var loadingShow = false;
var puj_type = '0';
var html = $(".L-fqsc ul").html();
$(function () {
	$(".L-test li").click(function () {
		$(".L-test li").siblings().removeClass("L-test-on");
		$(this).addClass("L-test-on");
		$(".L-fqsc ul").html('');
		puj_type = $(this).data("ptype");
		getdata();
	});
});

function getdata(){
	if (!loadingShow) {
		$(".L-fqsc ul").append(loadingStr);
		loadingShow = true;
		getAjaxNews();
	}

}


$(window).scroll(function(){
	var document = window.document;
	var top = document.body.scrollTop || document.documentElement.scrollTop
			|| 0;
	top += document.documentElement.clientHeight;
	var height = document.documentElement.scrollHeight;
	if (height - top < 1000) {
		if (!loadingShow) {
			$(".L-fqsc ul").append(loadingStr);
			loadingShow = true;
			getAjaxNews();
		}
	}
});

function getAjaxNews() {
		$.ajax({
			url: "#",
			//type: 'get',
			data: {
				page: page ,
				type:puj_type
			},
			error: function () {
			},
			success: function (data) {
				//if (data!='0') {
					$(".spinner").hide();
				    $(".L-fqsc ul").append(html);
				//	$(".square_comment_list").append(data);
					$(".spinner").remove();
					page++;
					loadingShow = false;
				//	//处理图片
				//	dopicerror();
				//} else {
				//	$(".spinner").hide();
				//	$(".square_comment_list").append(noneStr);
				//	$(".spinner").remove();
				//}
			}
		});
}
