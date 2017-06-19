var sidenavs = $(".sidenav a");
sidenavs.removeClass("active").eq(1).addClass("active");
var abody = $(".artist");
//增加
var addBtn = $(".addBtn");
function addArtist() {
    $.ajax({
        url: "/music/index.php/admin/add_artist",
        success: function (id) {
            if(id==0){
                alert("添加失败");
                return;
            }
            $(`
            <div class="col-sm-3" data-id="${id}">
                <div class="thumbnail">
                <form>
            <label for="file${id}" class="addavatar text-center"> 点击上传图片 </label>
                <input type="file" class="file" id="file${id}"  name="file">
                </form>
                <div class="caption">
                <h3 class="name">
                <input type="text" value="" class="form-control"  field="artist_name">
                </h3>
                <p>
                <label class="radio-inline">
                <input type="radio" name="sex${id}" id="inlineRadio1" value="1" checked  field="artist_sex"> 男
            </label>
            <label class="radio-inline">
                <input type="radio" name="sex${id}" id="inlineRadio2" value="2"  field="artist_sex"> 女
            </label>
            </p>
            <p>
            <input type="text" value="" class="form-control" field="artist_age">
                </p>
                <p class="text-right">
                <a href="javascript:void(0)" class="btn btn-danger btn-del" role="button">
                <i class="glyphicon glyphicon-remove del"></i>
                </a>
                </p>
                </div>
                </div>
                </div>
            `).insertAfter(addBtn.closest(".col-sm-12"));
        }
    })
}
addBtn.on("click", addArtist);
//删除
function delArtist() {
    var tr = $(this).closest(".col-sm-3");
    var id = tr.attr("data-id");
    var url=`/music/index.php/admin/del_artist/id/${id}`;
    $.get(url).done(function(id){
        if (id != 0) {
            tr.animate({opacity:0}).delay(400).queue(function(){
                $(this).remove().dequeue();
            });
            if(id!=1){
                alert('删除文件失败')
            }
        }else{
            alert("删除失败");
        }
    })
}
abody.on("click", ".btn-del", delArtist);
//更新
function updateArtist() {
    var tr = $(this).closest(".col-sm-3");
    var id = tr.attr("data-id");
    var type = $(this).attr("field");
    var val = $.trim($(this).val());

    $.ajax({
        url: "/music/index.php/admin/update_artist",
        type:"POST",
        data:{id:id,type:type,val:val},
        success: function (data) {
            if(data==0){
                alert("更新失败");
            }
        }
    })
}
abody.on("change", "input:radio,input:text", updateArtist);
//上传更新头像
function updateAvadar() {
    var tr = $(this).closest(".col-sm-3");
    var id = tr.attr("data-id");
    var formData = new FormData($(this).closest("form").get(0));
    formData.append("id",id);
    $.ajax({
        url: "/music/index.php/admin/upload_file",
        type:"POST",
        data:formData,
        contentType:false,
        processData:false
    }).done((function(src){
        if(src==0){
            alert("上传头像失败");
            return;
        }
        var thumbnail = $(this).closest(".thumbnail");
        $(this).closest(".thumbnail").find(".imgbox").remove();
        $(this).closest("form").remove();
        $(`
            <div class="imgbox">
                <img src="${src}" class="avatar">
                <form>
                    <label for="file${id}" class="addavatar text-center"> 点击更换图片 </label>
                    <input type="file" class="file" id="file${id}" name="file">
                </form>
            </div>
        `).prependTo(thumbnail);
    }).bind(this));
}
abody.on("change", "input:file", updateAvadar);