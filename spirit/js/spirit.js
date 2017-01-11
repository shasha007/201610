function  GoDraw(){
    if( typeof(Android)!=="undefined"){
        window.location.href='detaile.html';
    }else{
        setTimeout(function () {
            if(typeof(Android)!=="undefined"){
                window.location.href='detaile.html';
            }else{
                alert("请在PU中打开");
            }
        }, 200);
    }
}