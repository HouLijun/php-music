	//获取轮播
	var items=$(".main .active");
	//点击获取内容
	var now=0;
	$(".nav").on("click",".nav_li",function(){
		var cate_id = $(this).attr("cate_id");
		if( cate_id == now ){
			return false;
		}
		now = cate_id;
		$(".nav li a").removeClass("active");
		$(this).addClass("active");
		$.ajax({
			url:"/music/index.php/index/getalbum/id/"+cate_id,
			success:function(data){
				items.empty();
				data = JSON.parse(data);
				$.each(data,function(i,v){
					$(`<li class="main_lis" album_id="${v.album_id}"> <div class="top"> <a href="">
							<img src="${v.album_pic}"/> <div class="dis"> <div class="circle"></div>
							</div> </a> </div> <div class="bottom"> <a href="" class="music">${v.album_name}</a>
							<a href="" class="siger">${v.artist_name}</a> </div>
					</li>`).appendTo(items);
				})
			}
		})
		return false;
	})
	$(".allo").click(function(){
		if(now=0){
			return false;
		}
		now = 0;
		$(".nav li a").removeClass("active");
		$(this).addClass("active");
		$.ajax({
			url:"/music/index.php/index/getall",
			success:function(data){
				items.empty();
				data = JSON.parse(data);
				$.each(data,function(i,v){
					$(`<li class="main_lis" album_id="${v.album_id}"> <div class="top"> <a href="">
							<img src="${v.album_pic}"/> <div class="dis"> <div class="circle"></div>
							</div> </a> </div> <div class="bottom"> <a href="" class="music">${v.album_name}</a>
							<a href="" class="siger">${v.artist_name}</a> </div>
							</li>`).appendTo(items);
				})
			}
		})
		return false;
	})
	//获取下标
	var lis=$(".lis li");
	//获取左右按钮
	var left=$(".left").children();
	var right=$(".right").children();
	//设置状态
	var state=0;
	//下一页
	function next(){
		state = (state+1>2) ? 0:state+1;
		lis.removeClass("active").eq(state).addClass("active");
		items.animate({left:-1200},500,function(){
			$(this).children().slice(0,4).appendTo(this);
			$(this).css("left",0);
		})
	}
	//上一页
	function prev(){
		state = (state-1<0) ? 2:state-1;
		lis.removeClass("active").eq(state).addClass("active");
		console.log(items.children().slice(-1,-5));
		items.children().slice(8).prependTo(items);
		items.css("left",-1200).animate({left:0},500);
	}
	//设置时间进程，来完成联播

	function settimes(num,fn){
		if(num==0){
			return;
		}
		var count=0;
		var t=setInterval(function(){
			count++;
			fn();
			if(count>=num){
				clearInterval(t);
			}
		},500)
	}
	left.click(prev);
	right.click(next);
	lis.click(function(){
		var index=$(this).index();
		var n=Math.abs(index-state);
		if(index>state){
			settimes(n,next);
		}else{
			settimes(n,prev);
		}
	})
	///////////////////////////////////
	//点击跳转页面
	items.on("click","li",function(){
		if(!localStorage.isOpen){
			window.open("/music/index.php/index/play");
		}
		localStorage.album_id = $(this).attr("album_id");
		return false;
	})