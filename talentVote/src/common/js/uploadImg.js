var upLoadData = [],
    upLoadBase = [],
    reBackUrl = [],
    domNum = 0,//根据该参数判断增加了几张图片，该值不超过3;
    upLoadType = typeof ( $(".loadBox").attr("uptype") ) == "undefined" || $(".loadBox").attr("uptype") == "" ? "form" : $(".loadBox").attr("uptype");
var _width = parseInt($(".preview >li>img:nth-child(1)").width());
var _height = parseInt($(".preview >li>img:nth-child(1)").height());
var _marginLeft = parseInt($(".preview >li>img:nth-child(1)").css("marginRight").replace("px", ""));
var _marginBottom = parseInt($(".preview >li>img:nth-child(1)").css("marginBottom").replace("px", ""));
var _border = parseInt($(".preview >li>img:nth-child(1)").css("borderWidth").replace("px", ""));
var _Left = parseInt($(".file_input").css("Left").replace("px", ""));
$(".loadBox").delegate(".file_input", "change", function () {
    var that = $(this),
        index = $(".loadBox .preview").index($(this).parent()),
        file = this.files[0];
    if (!file) {
        return;
    }
    this.value = "";
    var URL = window.URL || window.webkitURL;
    if (!URL) {
        return;
    }
    //压缩前
    var img = new Image(), width, height, bg;

    //设置img url
    img.src = URL.createObjectURL(file);

    img.onload = function () {
        var imgForm = new FormData();
        var _length = upLoadData.length;
        for (var i = 0; i < _length; i++) {
            if (upLoadData[i].name == file.name) {
                return;
            }
        }

        /*
         * 数据处理前，先对图片进行缩放
         * 原尺寸图片在进行数据转换的时候部分手机会处理不了
         * 设定了宽为800,高度等比缩放
         */
        if (this.width > 800) {
            var max = 800, w, h;
            w = this.width;
            h = this.height;
            this.width = max;
            this.height = h * max / w;
        }
        upLoadData[domNum] = file;
        amendImage(img, function (data) {
            domNum++;
            if (upLoadType == "form") {
                imgForm.append("file", file);
                upLoadAjax(imgForm, data);
            } else {
                upLoadBase[domNum] = data;
                upLoadAjax(data, data);
            }

        });
    };

    URL.revokeObjectURL(file);

});
//}

function getImgData(img) {
    var canvas, ctx;
    canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    return canvas.toDataURL('image/png', 0.7);
}


function amendImage(img, callback) {
    EXIF.getData(img, function () {
        //获取图片的相关信息
        //ps:图片会有很多基本信息，如作者，拍摄设备，这里获取拍摄设备状态
        //有些设备相关信息不标准，该处理后图片会不正常会直接调用getImageDage方法
        //ios6在处理过程中会有问题，目前不兼容
        var orientationEXIF = (EXIF.pretty(this)).match(/Orientation : (\d)/),
            orientation = orientationEXIF ? +orientationEXIF[1] : 1;

        //alert(orientation);
        var width = img.width, height = img.height, canvas, xtx;
        canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        switch (orientation) {
            case 3:
                ctx.rotate(180 * Math.PI / 180);
                ctx.drawImage(img, -width, -height, width, height);
                break;

            case 6:
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(90 * Math.PI / 180);
                ctx.drawImage(img, 0, -height, width, height);
                break;

            case 8:
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(270 * Math.PI / 180);
                ctx.drawImage(img, -width, 0, width, height);
                break;

            default:
                ctx.drawImage(img, 0, 0, width, height);
        }
        if (callback) {
            callback(canvas.toDataURL('image/png', 0.7));
        }
    });

}
//上传图片1
function upLoadAjax(imgDate, base) {
    if (imgDate == "") return;
    if (base == "") return;

    $.ajax({
        url: "common/json/qu.json",
        type: "get",
        data: imgDate,
        processData: false,  // 告诉jQuery不要去处理发送的数据
        contentType: false, // 告诉jQuery不要去设置Content-Type请求头
        beforeSend: function () {
            $(".loading").show();
        },
        success: function (data) {
            marginInput();
            $(".preview").prepend('<li><img src=' + base + '><span class=\"delete\" data-ulid=\"'+domNum+'\"></span></li>');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { //error
            console.log(XMLHttpRequest + "----" + textStatus + "---" + errorThrown);
        },
        complete: function () {
            $(".loading").hide();
        }
    });
}
//移动上传按钮
function marginInput() {
    console.log(domNum % 4);
    if (domNum % 4 == 3) {
        $(".file_input").addClass("other");
        //$(".file_input").css({"left": ((domNum % 4)*( (2 * _border) + _marginLeft + _width)+_Left) + "px"});
    }else{
        $(".file_input").removeClass("other");
    }
}
//上传图片
function uploadImage(ImageData, index, timestamp) {
    if (ImageData == "") return;
    $.ajax({
        url: "common/json/qu.json",
        type: "POST",
        dataType: "json",
        beforeSend: function () {
//                $(".loading").show();
        },
        data: {"BasePhoto": ImageData},
        success: function (data) {
        },
        error: function (e) {

        },
        complete: function () {
        }
    })
}
//删除图片
$(".loadBox").delegate(".delete", "click", function () {
    //if ($(this).hasClass("upDate")) {
    //    return;
    //}
    var index = $(".loadBox .delete").index($(this));
    console.log(index);
    upLoadData.splice(index, 1);
    console.log(upLoadData)
    $(this).parent().remove();
    //if (domNum == 4) {
    //    var timeStr = Date.parse(new Date);
    //    var str = '<div class="preview" data-time="' + timeStr + '"><input type="file" accept="image/*" class="file_input"><span class="shutbox"><span class="shut"></span></span><p class="siteCover"></p></div>'
    //    $(".loadBox").append(str);
    //} else if (domNum == 1) {
    //    $(".preview").addClass("isCover");
    //}
    //if ($(this).parent().hasClass("isCover")) {
    //    $(".preview").eq(0).addClass("isCover");
    //}
    ////if (index == 0) {
    ////    $(".preview").eq(0).addClass("isCover");
    ////}
    //console.log(reBackUrl);
    domNum--;
})