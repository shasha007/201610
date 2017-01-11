var limitScale = function () {
    var can = parseInt(document.getElementById("index-klimit").innerText);
    var all = 100;
    var pt = document.getElementById("index-ptop");
    var pb = document.getElementById("index-pbottom");
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
    var circle = document.getElementsByClassName("w-index-circle");
    var bodywidth = document.body.clientWidth;
    circle[0].style.left = (bodywidth - 200) / 2 + "px";

}
window.onload = function () {
    setmargin();
    limitScale();
}


