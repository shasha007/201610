

var GetAskUrl = 'http://pocketuni.net/index.php?app=wap&mod=Asking&act=index&id=3';


$(function () {
    geContent();
});

function geContent(){

    $.ajax({
//      url:GetAskUrl,
          url: "json/index.json",
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
                test = data;
           $(".L-test-index-content h3").html(test.data.title);
    	   $("#L-test-title1").html(test.data.content[0].title);
           $("#L-test-title2").html(test.data.content[1].title);
           $("#L-test-content1").html(test.data.content[0].options);
           $("#L-test-content2").html(test.data.content[1].options);

        }
    });
}
// 标题文字过多时字体缩小
// var title = $('.L-index-title')[0].innerText;
// if(title.length >= 12){
//     $('.L-index-title').css('fontSize','25px')
// }


