/**
 * Created by huqiwen on 16/4/20.
 */
//设置超时时间为25秒钟
var timeout = 25;
//当前题目编号
var number = 0;
var isover = false;
var isright = false;
var maxnum = 19;
var GetAskUrl = 'http://pocketuni.net/index.php?app=wap&mod=Asking&act=index&id=3';
var GetAnswerUrl = '/index.php?app=wap&mod=Asking&act=answer';
//function show() {
//  var showbox = $("#timer");
//  showbox.html(timeout + "&emsp13;S");
//  timeout--;
//  if (timeout < 0) {
//      showalert(2);
//  }
//  else {
//      timeoutId = setTimeout("show()", 1000);
//  }
//}

$(function () {
    getask();
    //倒计时
    showalert(3);
    setTimeout(function () {
        if(!isover){
            hidealert(3);
//                $("#loading").modal("hide");
//          show();
            setquestion(number);
        }

    }, 1500);


});
function showalert(type){
    if(type=='1'){
        $('.h-back-cover').show();
        $('.h-back-cover').css('opacity','0.2');
        $('.h-back-timeover').show();
    }else if(type=='2'){
        $('.h-back-cover').show();
        $('.h-back-cover').css('opacity','0.2');
        $('.h-back-error').show();
    }else{
        $('.h-back-cover').show();
        $('.h-back-cover').css('opacity','0.2');
        $('.h-back-loading').show();
    }
}
function hidealert(type){
    if(type=='1'){
        $('.h-back-cover').css('opacity','0');
        $('.h-back-cover').hide();
        $('.h-back-timeover').hide();
    }else if(type=='2'){
        $('.h-back-cover').css('opacity','0');
        $('.h-back-cover').hide();
        $('.h-back-error').hide();
    }else{
        $('.h-back-cover').css('opacity','0');
        $('.h-back-cover').hide();
        $('.h-back-loading').css('opacity','0');
    }
}
$('.question-p').click(function (event) {
    $('.question-a').attr("id","");
    $('.question-p').removeClass('choose-question');
    $('.question-p i').removeClass('choosed');
    $('.choose').remove();
    
    $(this).children('span').attr("id","choose");
    if($(this).children('i').find('img').length==0){
    	$(this).children('span').after('<img class="choose" src="img/choose2.png">');
    	$(this).addClass('choose-question');
    }else{
    	$(this).children('span').after('<img class="choose" src="img/choose.png">');
    }
    
    $(this).children('i').addClass('choosed');
    
    var qid = $('.question').data('question');
    var answer = $(".choosed").html();
//  clearTimeout(timeoutId);
    setTimeout(function () {
        getanswer(qid,number,answer);
        reset();
//      if(isover){
//          showalert(1);
//      }else{
//          if(isright){
                if(number < maxnum){
                    number++;
                    setquestion(number);
                }else if(number == maxnum){
                    window.location.href='result.html';
                }
//          }else{
//              showalert(2);
//          }
//      }
    }, 200);

});

function getask(){
    number = 0;
    $.ajax({
//      url:GetAskUrl,
          url: "json/test.json",
        type: 'get',
        dataType : "json",
        data: {

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        },
        success: function (data) {
            if(data.leftTimes!=0){
                test = data;
            }else{
                isover = true;
                hidealert(3);
                showalert(1);
            }
        }
    });
}
function  setquestion(number){
	$(".question-no").html("问题"+(number+1) + ".&emsp13;"+test.data.qusetion[number].title);
	
	if(test.data.qusetion[number].options[0].content==undefined){
		   $("#answer-a").html('<img class="L-icon-img" src=' +test.data.qusetion[number].options[0].url+ '/>' );
    	   $("#answer-b").html('<img class="L-icon-img" src=' +test.data.qusetion[number].options[1].url+ '/>' );
           $("#answer-c").html('<img class="L-icon-img" src=' +test.data.qusetion[number].options[2].url+ '/>' );
           $("#answer-d").html('<img class="L-icon-img" src=' +test.data.qusetion[number].options[3].url+ '/>' );	
           $('.question-article > p:nth-child(n+2)').css('width','40%');
           $('.question-article > p:nth-child(n+2)').css('background-color','#FFFFFF');
	}else if(test.data.qusetion[number].options[0].url==undefined){
		   $("#answer-a").html('<span class="L-content">'+test.data.qusetion[number].options[0].content+'</span>');
    	   $("#answer-b").html('<span class="L-content">'+test.data.qusetion[number].options[1].content+'</span>');
           $("#answer-c").html('<span class="L-content">'+test.data.qusetion[number].options[2].content+'</span>');
           $("#answer-d").html('<span class="L-content">'+test.data.qusetion[number].options[3].content+'</span>');
           //只有内容单行显示
           $('.question-article > p:nth-child(n+2)').css('width','92%');
           $('.question-article > p:nth-child(n+2)').css('background-color','#efefef');

	}else{
		   $('.question-article > p:nth-child(n+2)').css('width','40%');
		   $('.question-article > p:nth-child(n+2)').css('background-color','#FFFFFF');
		   $("#answer-a").html('<span class="L-content">'+test.data.qusetion[number].options[0].content+'</span>'+'<img class="L-icon-img" src=' +test.data.qusetion[number].options[0].url+ '/>' );
    	   $("#answer-b").html('<span class="L-content">'+test.data.qusetion[number].options[1].content+'</span>'+'<img class="L-icon-img" src=' +test.data.qusetion[number].options[1].url+ '/>' );
           $("#answer-c").html('<span class="L-content">'+test.data.qusetion[number].options[2].content+'</span>'+'<img class="L-icon-img" src=' +test.data.qusetion[number].options[2].url+ '/>' );
           $("#answer-d").html('<span class="L-content">'+test.data.qusetion[number].options[3].content+'</span>'+'<img class="L-icon-img" src=' +test.data.qusetion[number].options[3].url+ '/>' );
	}

    $(".question").data("question" ,test.data.qusetion[number].id+"");
//  timeout = 25;
//  clearTimeout(timeoutId);
//  show();
}

function getanswer(id,numbers,content){
    $.ajax({
        url:GetAnswerUrl,
        type: 'post',
        async: false,
        dataType : "json",
        data: {
            qid:id,
            number:(numbers+1),
            answer:content
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        },
        success: function (data) {
            if(data.status=="1"){
                isright = true;
            }else if(data.status=="0"){
                isright = false;
            }else {
                isover = true;
            }
        }
    });
}
function reset(){
	$('.question-p').css('background-color','#FFFFFF');
	$('.question-p').css('color','#000000');
    $('.question-a').attr("id","");
    $('.question-p i').removeClass('choosed');
    $('.choose').remove();
    $('.question-p').removeClass('choose-question');
}

