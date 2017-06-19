var sidenavs = $(".sidenav a");
sidenavs.removeClass("active").eq(2).addClass("active");
var abody = $(".albums");
//增加
var addBtn = $(".add_album");
var cates = [];
//获取cates
$.get("/music/index.php/admin/getcates").done(function(data){
    cates = data;
})
function addAlbum() {
    $.ajax({
        url: "/music/index.php/admin/add_album",
        success: function (id) {
            if(id===0){
                alert("添加失败");
                return;
            }
            var el = $(`
            <div class="col-sm-12 album" data-id="${id}">
                <div class="media">
                <a class="media-left album-img-box" href="javascript:void(0)">
            <form>
            <label class="addpic" for="file${id}">点击上传照片</label>
                <input type="file" class="file file_album" id="file${id}" name="file">
            </form>
            </a>
            <div class="media-body album_formData">
                <dl class="dl-horizontal album_dir">
                <dt>专辑名</dt>
                <dd>
                <input type="text" class="form-control input-sm" value="">
                </dd>
                <dt>歌手</dt>
                <dd class="artist_box">
                <input type="text" class="form-control input-sm" value="">
                <div class="artist_name"></div>
                </dd>
                <dt>分类</dt>
                <dd>
                <select class="form-control input-sm">
                </select>
                </dd>
                <dt>简介</dt>
                <dd></dd>
                </dl>
            </div>
            <div data-id="${id}">
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary btn-md btn-music" data-toggle="modal" data-target="#myModal">
            查看歌曲
            </button>
            <button type="button" class="btn btn-success addhot">点击推荐</button>
            <a href="javascript:void(0)" class="btn btn-danger btn-del" role="button">
                <i class="glyphicon glyphicon-remove del"></i>
                </a>
            </div>
            </div>
            `);
            $.each(cates,function(i,v){
                $(`<option class="input-sm" value="${v.cate_id}"
                ${ i==0?"selected":"" }>
                ${v.cate_name}
                </option>`).appendTo(el.find("select"))
            })
            addBtn.after(el);
            return false;
        }
    })
}
addBtn.on("click", addAlbum);
//更新
function updateAlbum() {
    var tr = $(this).closest(".album");
    var id = tr.attr("data-id");
    var type = $(this).attr("field");
    var val = $.trim($(this).val());

    $.ajax({
        url: "/music/index.php/admin/update_album",
        type:"POST",
        data:{id:id,type:type,val:val},
        success: function (data) {
            if(data == 0){
                alert("更新失败");
            }
        }
    })
}
abody.on("change", ".change", updateAlbum);
//更新歌手
function updateArtist() {
    var val = $.trim($(this).val());
    var div = $(this).next();
    if(!val){
        div.empty();
        return;
    }
    $.ajax({
        url: "/music/index.php/admin/get_artist_id",
        type:"POST",
        data:{val:val},
        success: function (data) {
            div.empty();
            $.each(data,function(i,v){
                $(`
                    <label class="a_name" data-aid="${v.artist_id}">${v.artist_name}</label>
                `).appendTo(div);
            })
        }
    })
}
abody.on("click",".a_name",function(){
    var tr = $(this).closest(".album");
    var id = tr.attr("data-id");
    var aid = $(this).attr("data-aid");
    var that = this;
    $.ajax({
        url: "/music/index.php/admin/update_artist_id",
        type:"POST",
        data:{id:id,aid:aid},
        success: function (data) {
            if(data==0){
                alert("更新失败");
                return;
            }
            $(that).parent().prev().val($(that).text());
            $(that).parent().empty();
        }
    })
})
abody.on("keyup", "[field=artist_name]", updateArtist);

//上传更新头像
function updatePic() {
    var tr = $(this).closest(".album");
    var id = tr.attr("data-id");
    var formData = new FormData($(this).closest("form").get(0));
    formData.append("id",id);
    $.ajax({
        url: "/music/index.php/admin/upload_file_pic",
        type:"POST",
        data:formData,
        contentType:false,
        processData:false
    }).done((function(src){
        if(src == 0){
            alert("更新失败");
            return;
        }
        var album_img = $(this).closest(".album-img-box");
        album_img.empty();
        $(`
            <img src="${src}" alt="..." class="album-img">
            <form class="album_form">
                <label class="addpic" for="file${id}">点击更换照片</label>
                <input type="file" class="file file_album" id="file${id}" name="file">
            </form>
        `).prependTo(album_img);
    }).bind(this));
}
abody.on("change", ".file_album", updatePic);

//对查看歌曲的点击
var music_box=$(".modal");
var music_tbody=$(".music_tbody");
function getMusic(){
    var parent = $(this).parent();
    var id =parent.attr("data-id");
    $.get(`/music/index.php/admin/get_music/id/${id}`).done(function(data){
        music_box.attr("data-id",id);
        if(!data){
            music_tbody.html("专辑没有歌曲");
            return;
        }
        music_tbody.empty();
        $.each(data,function(i,v){
            var src ;
            if(v.music_src){
                src = `<audio src="${v.music_src}" controls></audio>
                    <label for="audio${v.music_id}" class="upload_music">点击更换歌曲</label>
                    <form><input type="file" id="audio${v.music_id}" class="file file_music"  name="file"></form>`;
            }else{
                src = `<label for="audio${v.music_id}">点击上传歌曲</label>
                    <form><input type="file" id="audio${v.music_id}"  class="file file_music"   name="file"></form>`;
            }
            $(`
                <tr music-id="${v.music_id}">
                <td>${v.music_id}</td>
                <td>${v.music_name}</td>
                <td class="music_src">${src}</td>
                <td>${v.music_duration}</td>
                <td>
                <i class="glyphicon glyphicon-remove del delmusic"></i>
                </td>
                </tr>
            `).appendTo(music_tbody);
        })
    });
}
abody.on("click", ".btn-music", getMusic);
//关闭按钮的点击
abody.on("click",".sr-only,.m_close,[data-dismiss]",function(){
    $("audio").each(function(){
        this.pause();
    });
    music_box.removeAttr("data-id");
})
//添加歌曲
function addMusic(){
    var id = music_box.attr("data-id");
    $.get(`/music/index.php/admin/add_music/id/${id}`).done(function(data){
        if(data==0){
            alert("添加失败");
            return;
        }
        $(`
        <tr music-id="${data}">
            <td>${data}</td>
            <td></td>
            <td class="music_src">
            <label for="audio${data}">点击上传歌曲</label>
            <form>
            <input type="file" id="audio${data}"  class="file file_music"  name="file">
            </form>
            </td>
            <td></td>
            <td>
            <i class="glyphicon glyphicon-remove del delmusic"></i>
            </td>
        </tr>
        `).appendTo(music_tbody);
    })
}
abody.on("click",".add",addMusic);

//上传更新歌曲
function uploadMusic(){
    var tr = $(this).closest("tr");
    var id = tr.attr("music-id");
    var formData = new FormData($(this).parent().get(0));
    formData.append("id",id);
    $.ajax({
        url: "/music/index.php/admin/upload_music",
        type:"post",
        data:formData,
        contentType:false,
        processData:false
    }).done((function(data){
        if(data == 0){
         alert("更新失败");
         return;
         }
         var td = $(this).closest("td");
         td.empty();
         $(`
         <audio src="${data.src}" controls></audio>
         <label for="audio${id}" class="upload_music">点击更换歌曲</label>
         <form><input type="file" id="audio${id}" name="file" class="file file_music"></form>
         `).prependTo(td);
        td.next().html(data.duration);
        td.prev().html(data.name);
    }).bind(this));
}
abody.on("change",".file_music",uploadMusic);
//删除歌曲
function delMusic(){
    var tr = $(this).closest("tr");
    var id = tr.attr("music-id");
    $.get(`/music/index.php/admin/del_music/id/${id}`).done(function(data){
        if(data==0){
            alert("删除失败");
            return;
        }else if(data==1){
            tr.remove();
        }else{
            alert(data);
        }
    })
}
abody.on("click",".delmusic",delMusic);
//添加推荐
function addHot(){
    var parent = $(this).parent();
    var id =parent.attr("data-id");
    $.get(`/music/index.php/admin/add_hot/id/${id}`).done((function(data){
        if(data==0){
            alert("推荐失败");
            return;
        }
        $(`<button type="button" class="btn btn-warning delhot" hot-id="${data}">取消推荐</button>`).insertAfter($(this));
        $(this).remove();
    }).bind(this))
}
abody.on("click",".addhot",addHot);
//取消推荐
function delHot(){
    var id =$(this).attr("hot-id");
    $.get(`/music/index.php/admin/del_hot/id/${id}`).done((function(data){
        if(data==0){
            alert("取消推荐失败");
            return;
        }
        $(`<button type="button" class="btn btn-success addhot">点击推荐</button>`).insertAfter($(this));
        $(this).remove();
    }).bind(this))
}
abody.on("click",".delhot",delHot);
//删除
function delAlbum(){
    var flag=confirm("确定删除专辑和专辑所包含的歌曲吗？");
    if(flag==false){
        return;
    }
    var parent = $(this).closest(".album");
    var id = parent.attr("data-id");
    $.get(`/music/index.php/admin/del_album/id/${id}`).done((function(data){
        if(data==0){
            alert("删除失败");
            return;
        }else if(data==1){
            parent.remove();
        }else{
            alert("删除文件失败");
        }
    }).bind(this))
}
abody.on("click",".btn-del",delAlbum);

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