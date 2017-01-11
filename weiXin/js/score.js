var limitScale = function () {
    var can = parseInt(document.getElementById("detaile-klimit").innerText);
    var all = 100;
    var pt = document.getElementById("detaile-ptop");
    var pb = document.getElementById("detaile-pbottom");
    var bodyH = document.body.clientHeight;
    var screenH = window.screen.height;
    if (all >= can) {
        var angle = (can / all).toFixed(2) * 360;
		
        if (angle > 180) {
			
            pt.style.transform = "rotateZ(180deg)";
            pt.style.webkitTransform = "rotateZ(180deg)";
            angle = angle - 180;
            pb.style.transform = "rotateZ(" + angle + "deg)";
            pb.style.webkitTransform = "rotateZ(" + angle + "deg)";
        }
        else {
			
            pt.style.transform = "rotateZ(" + angle + "deg)";
            pt.style.webkitTransform = "rotateZ(" + angle + "deg)";
        }
    }
}

var setmargin = function () {
    var circle = document.getElementsByClassName("w-detaile-circle");
    var bodywidth = document.body.clientWidth;
    circle[0].style.left = (bodywidth - 200) / 2 + "px";

}
window.onload = function () {
    setmargin();
    limitScale();
}


