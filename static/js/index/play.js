//表示页面已经打开
localStorage.isOpen = "1";
$(window).unload(function () {
    localStorage.isOpen = "";
})
//用来存储在页面中显示的内容
var music = [];
//专辑封面
var img = $(".imgbox img");
//歌曲名
var mname = $(".m_name").add(".tiao_name");
//歌手名
var artist = $(".m_artist");
//专辑名
var album = $(".m_album");
//歌曲的时间
var mtime = $(".tiao_time");
//歌曲的外盒子
var box = $(".song_box");
//歌曲的盒子
var song = $(".song");
//模拟滚动条的盒子
var bar = $(".srcoll");

//记录当前播放歌曲的下标
var state = {
    //当前播放的下标
    current: 0,
    //是否在播放状态
    play: "play",
    //音量的大小
    volume: 0.5,
    //循环的模式
    mode: "mode",
    //控制是否从第一首歌播放
    flag: true,
    //保存歌曲播放的进度
    time: 0
};
//页面刚开始的时候也需要根据点击的内容,进行一次内容的渲染
var album_id = localStorage.album_id;
$.ajax({
    url: "/music/index.php/index/getmusic/id/" + album_id,
    dataType: 'json',
    success: function (data) {
        music = data.concat(music);
        render();
    }
})
//在本页面已打开的情况下，监测用户有没有点击新的专辑
$(window).on("storage", function (e) {
    var album_id = e.originalEvent.newValue;
    $.ajax({
        url: "/music/index.php/index/getmusic/id/" + album_id,
        dataType: 'json',
        success: function (data) {
            music = data.concat(music);
            del();
            render();
        }
    })
})
//对数据的去重
function del() {
    $.each(music, function (i, v) {
        for (var j = i + 1; j < music.length; j++) {
            if (v.music_id == music[j].music_id) {
                music.splice(j, 1);
                j--;
            }
        }
    })
}
//根据数据对页面进行渲染
function render() {
    //清空内容后再添加
    $(".song_con").remove();
    $.each(music, function (i, v) {
        $(`<li class  = "song_con"  music_id = "${v.music_id}" music_src = "${v.music_src}">
            <div class = "sele"> </div>
            <div class = "id" > <span class  = "m_id">${i+1}</span>
            <i class = "img" > </i>
            </div>
            <div class = "name" >${v.music_name} <div class = "song_dis" >
            <a href = "javascript:;" class = "m_play" > </a>
            <a href = "javascript:;" class = "m_add" > </a>
            <a href = "javascript:;" class = "m_s" > </a>
            <a href = "javascript:;" class  = "m_f" > </a> </div> </div>
            <div class  = "singer" >${v.artist_name}</div>
            <div class = "time" > <span class = "m_t" >${v.music_duration}</span>
            <a href = "javascript:;" class = "m_del" > </a> </div> </li>`).
        appendTo(".song");
    })
    song.height((music.length + 1) * 52 + 1);
    scroll();
    if (state.flag) {
        state.current = 0;
    }
    crender(state);
}
//滚动条
function scroll() {
    //bar song box
    var precent = box.height() / song.height();
    if (precent < 1) {
        bar.height(precent * box.height());
        var b = new DragBar(bar);
        b.drag();
    }
}
//给box加鼠标滚轮事件
box.mousewheel(function () {
    var height = box.height() - song.height();
    if (height < 0) {
        var top = parseInt(song.css("top"));
        var newTop = (top - 52) < height ? height : (top - 52);
        song.animate({"top": newTop}, 10);
        var hh = box.height()-bar.height();
        var nbarTop = (top - 52) > -hh ? (top - 52) : -hh;
        bar.animate({"top": -nbarTop}, 10);
    }
}, function () {
    var height = box.height() - song.height();
    if (height < 0) {
        var top = parseInt(song.css("top"));
        var newTop = (top + 52) > 0 ? 0 : (top + 52);
        song.animate({"top": newTop}, 10);
        bar.animate({"top": -newTop}, 10);
    }
})
//改变页面中随着每首歌曲而不同显示的地方
function crender(state) {
    var i = state.current;
    img.attr("src", music[i].album_pic);
    mname.html(music[i].music_name);
    artist.html(music[i].artist_name);
    album.html(music[i].album_name);
    audio.src = music[i].music_src;
    mtime.html("00:00/" + music[i].music_duration);
    audio.oncanplay = function () {
        $(".play").addClass("stop");
        audio.play();
        if (!state.flag) {
            audio.currentTime = state.time;
            state.flag = true;
        }
    }
}
//时间转化
function changtime(time) {
    var fen = Math.floor(time / 60);
    time %= 60
    var miao = parseInt(time);
    if (fen < 10) {
        fen = "0" + fen;
    }
    if (miao < 10) {
        miao = "0" + miao;
    }
    var t = fen + ":" + miao;
    return t;
}
//事件委派
//每行的播放暂定按钮
$(".song").on("click", ".m_play", function () {
    var index = $(".song_con").index($(this).closest(".song_con"));
    if (index == state.current) {
        if (state.play == "play") {
            audio.pause();
            state.play = "pause";
        } else {
            audio.play();
            state.play = "play";
        }
    } else {
        state.current = index;
        state.play = "play";
        crender(state);
    }
    return false;
})
//每行的删除
$(".song").on("click", ".m_del", function () {
    var index = $(".song_con").index($(this).closest(".song_con"));
    if (index == state.current) {
        state.time = 0;
        if (state.current == music.length - 1) {
            state.current = 0;
        }
    } else {
        state.time = audio.currentTime;
        if (index < state.current) {
            state.current = state.current - 1;
        }
    }
    state.flag = false;
    $(this).closest(".song_con").remove();
    music.splice(index, 1);
    render();
    return false;
})
//选框
$(".song").on("click", ".sele", function () {
    var m = $(".sele").index($(this));
    if (m == 0) {
        //歌曲全选
        if ($(this).hasClass("active")) {
            $(".sele").removeClass("active");
        } else {
            $(".sele").addClass("active");
        }
    } else {
        //单选
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            //如果有任意一行没选中，取消全选
            $(".sele").eq(0).removeClass("active");
        } else {
            $(this).addClass("active");
            //如果全部选中，则加上全选
            if ($(".sele").slice(1).filter(".active").length == $(".sele").slice(1).length) {
                $(".sele").eq(0).addClass("active");
            }
        }
    }
})
//删除按钮的点击
$(".nav_del").click(function () {
    $(".sele").filter(".active").closest(".song_con").each(function (i, dom) {
        var i = $(".song_con").index(dom);
        $(dom).remove();
        music.splice(i, 1);
        render();
    });
})
//清空列表
$(".nav_empty").click(function () {
    $(".song_con").remove();
    music = [];
    audio.pause();
    state.play = "pause";
    localStorage.album_id = "";
})
//上一首
$(".prve").click(function () {
    var num = music.length;
    state.current = (state.current - 1 < 0) ? num - 1 : state.current - 1;
    crender(state);
    return false;
})
//下一首
$(".next").click(function () {
    var num = music.length;
    state.current = (state.current + 1 > num - 1) ? 0 : state.current + 1;
    crender(state);
    return false;
})
//停止播放按钮
var play = $(".play");
//停止播放改数据
play.click(function () {
    if (audio.paused) {
        audio.play();
        state.play = "play";
    } else {
        audio.pause();
        state.play = "pause";
    }
    return false;
})
//改页面
audio.onplay = function () {
    play.addClass("stop");
    $(".song_con").removeClass("active").eq(state.current).addClass("active");
}
audio.onpause = function () {
    play.removeClass("stop");
    $(".song_con").removeClass("active");
}
//页面的模式控制
$(".mode").click(function () {
    $(this).removeClass("list rand one");
    if (state.mode == "mode") {
        $(this).addClass("list");
        state.mode = "list";
    } else if (state.mode == "list") {
        $(this).addClass("rand");
        state.mode = "rand";
    } else if (state.mode == "rand") {
        $(this).addClass("one");
        state.mode = "one";
    } else {
        state.mode = "mode";
    }
    return false;
})
//音乐播放结束后
audio.onended = function () {
    var num = music.length;
    switch (state.mode) {
        case "mode" :
            state.current = (state.current + 1 > num - 1) ? 0 : state.current + 1;
            crender(state);
            break;
        case "list":
            if (state.current + 1 > num - 1) {
                audio.pause();
            } else {
                state.current = state.current + 1;
                crender(state);
            }
            break;
        case "rand":
            var n = music.length;
            var i = Math.floor(Math.random() * n);
            state.current = i;
            crender(state);
            break;
        case "one":
            crender(state);
    }
    return false;
}
//纯净模式
$(".cunj").click(function () {
    if ($(this).hasClass("cunjo")) {
        $(this).removeClass("cunjo");
        $(".cunmode").removeClass("active");
    } else {
        $(this).addClass("cunjo");
        $(".cunmode").addClass("active");
    }
})
//音量和播放进度的拖拽,用的面向对象的方式
var tiao = new Drag($("#tiao1 i"));
tiao.drag();
var vole = new Drag($("#vole1 i"));
vole.drag();
//播放进度的点击
var tw = $(".tiao").width();
var tiao = $("#tiao1");
$(".tiao").click(function (e) {
    if ($(e.target).is("i") || $(e.target).is("span")) {
        return;
    }
    var tleft = e.offsetX;
    audio.currentTime = tleft / tw * audio.duration;
    //tiao.width(tleft);
})
//音乐控制播放进度
audio.ontimeupdate = function () {
    var per = audio.currentTime / audio.duration;
    tiao.width(tw * per);
    mtime.html(changtime(audio.currentTime) + "/" + changtime(audio.duration));
}
//音量的点击
var vw = $(".vole").width();
var vole = $("#vole1");
var vol = $(".vol");
$(".vole").click(function (e) {
    if ($(e.target).is("i") || $(e.target).is("span")) {
        return;
    }
    var vleft = e.offsetX;
    audio.volume = (vleft / vw).toFixed(2);
    //vole.width(vleft);
})
//音量控制音量条
audio.onvolumechange = function () {
    var per = audio.volume;
    vole.width(vw * per);
    if (per == 0) {
        vol.addClass("mute");
    } else {
        vol.removeClass("mute");
        state.volume = audio.volume;
    }
}
//静音
$(".vol").click(function () {
    if ($(this).hasClass("mute")) {
        audio.volume = state.volume;
    } else {
        audio.volume = 0;
    }
})

//$(".vol").click((function(){
//	var vol = null;
//	return function(){
//		if(vol){
//			 audio.volum = vol ;
//			vol = null;
//		}else{
//			vol = audio.volum;
//		}
//	}
//})());


