//给jQuery对象添加一个方法，回到顶部，传入的参数为某个jquery对象，点击对象回到顶部
jQuery.extend({
	backTop:function(obj,time){
		time=time||500;
		obj.click(function(){
			var top=$(window).scrollTop();
		    var val={aa:top};
		    $(val).animate({aa:0},{
		    	//持续时间
			    duration:time,
			    //步骤
			    step:function(){
				    $(window).scrollTop(val.aa);
			    }
		    })
		})
	}
})
//给jQuery的原型对象添加方法，鼠标滚轮事件mousewheel，offsetLeft：原生的offsetLeft，offsetTop：原生的offsetTop
jQuery.fn.extend({
	mousewheel:function(down,up){
		this.each(function(index,obj){
			if(obj.attachEvent){
				//ie
				obj.attachEvent("onmousewheel",fun);
			}else{
				//谷歌
				obj.addEventListener("mousewheel",fun,false);
				//火狐
				obj.addEventListener("DOMMouseScroll",fun,false);
			}
			function fun(e){
				e=e||window.event;
				//阻止浏览器默认行为
				if(e.preventDefault){
					e.preventDefault();
				}else{
					e.returnValue=false;
				}
				var num=e.detail||e.wheelDelta;
				//判断滚轮滑动方向
		        //往下
		        if(num==-120||num==3){
			        //改变this指针,指向obj
			        down.call(obj);
		        }
		        //往上
		        if(num==120||num==-3){
			        //改变this指针,指向obj
			        up.call(obj);
		        }
			}
		})
	},
	offsetLeft:function(){
		return this[0].offsetLeft;
	},
	offsetTop:function(){
		return this[0].offsetTop;
	}
})
