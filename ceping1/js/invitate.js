//选择邀请好友
function chooseFriend(){
	
	var li=document.getElementsByClassName('L-friend');

	for(var i=0;i<li.length;i++){
		li[i].addEventListener("click",function(){
			if(this.getElementsByClassName("L-choose")[0].getAttribute("src")=="img/sel01.png"){
				this.getElementsByClassName("L-choose")[0].setAttribute("src","img/sel1.png");
			}
			else{
				this.getElementsByClassName("L-choose")[0].setAttribute("src","img/sel01.png");
			}
		});
	}
}
window.onload=function(){
	chooseFriend();
}