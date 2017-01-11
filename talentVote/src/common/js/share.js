function share(){
	$('.start-share').attr('src','img/shareed.png')
    try{
        Android.share("消防知识问答。 www.pocketuni.net/zhuanti/question/index.html", "消防知识问答", "www.pocketuni.net/zhuanti/question/index.html", "http://pic.pocketuni.net/data/sys_pic/invite/shareHeader.jpeg");
    }catch (e){
        alert("请在PU中打开");
    }
}