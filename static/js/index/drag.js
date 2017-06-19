//面向对象的事件：鼠标点下后鼠标移动,对象随着鼠标移动,鼠标放开后,删除移动事件
//传进去一个jQuery对象

//audio元素的获取
var audio = $(".audio").get(0);

function Drag(obj){
	this.obj=obj;
	this.parent=obj.parent().parent();
	//保存离事件源的距离
	this.ox=0;
	//保存离父元素的距离
	this.cx=0;
	this.left=0;
	//获取对象的宽
	this.ow=this.obj.width();
	//获取父元素的宽
	this.cw=this.parent.width();
	//获取父元素距离屏幕的位置
	this.px=this.parent.offset().left;
}
Drag.prototype={
	//拖动事件
	drag:function(){
		this.down();
	},
	//鼠标点下事件
	down:function(){
		this.obj.mousedown((function(e){
			this.ox=e.offsetX;
			this.move();
			this.up();
		}).bind(this))
	},
	//移动事件
	move:function(){
		$(document).mousemove((function(e){
			e.preventDefault();
			this.cx=e.pageX;
			this.left=this.cx-this.ox-this.px;
			if(this.left<=0){
				this.left=0;
			}else if(this.left>=this.cw-this.ow){
				this.left=this.cw-this.ow;
			}
			if(this.parent.hasClass("tiao")){
				audio.currentTime = this.left/this.cw * audio.duration;
			}else if(this.parent.hasClass("vole")){
				audio.volume = (this.left/this.cw).toFixed(2);
			}
			this.obj.parent().width(this.left);
		}).bind(this))
	},
	//鼠标抬起事件
	up:function(){
		$(document).mouseup((function(){
			$(document).off("mousemove");
		}).bind(this))
	}
}