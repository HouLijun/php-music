var sidenavs = $(".sidenav a");
sidenavs.removeClass("active").eq(0).addClass("active");
var tbody = $("tbody");
//增加
function addCate() {
    $.ajax({
        url: "/music/index.php/admin/add_cate",
        success: function (id) {
            if(id==0){
                alert("添加失败");
                return;
            }
            $(`<tr data-id = "${id}">
                <td>${id}</td>
                <td>
                <input type = "text" value = "" class="form-control">
                </td>
                <td>
                <i class="glyphicon glyphicon-remove del"></i>
                </td>
                </tr>
            `).
            appendTo(tbody);
        }
    })
}
$(".add").on("click", addCate);
//删除
function delCate() {
    var tr = $(this).closest("tr");
    var id = tr.attr("data-id");
    $.ajax({
        url:`/music/index.php/admin/del_cate/id/${id}`,
    success:function (id) {
        if (id === 1) {
            tr.remove();
        }else {
            alert("删除失败");
        }
    }
})
}
tbody.on("click", ".del", delCate);
//更新
function updateCate() {
    var tr = $(this).closest("tr");
    var id = tr.attr("data-id");
    var val = $.trim($(this).val());
    $.ajax({
        url: "/music/index.php/admin/update_cate",
        type:"POST",
        data:{id:id,val:val},
        success: function (id) {
            if(id==0){
                alert("更新失败");
            }
        }
    })
}
tbody.on("change", "input", updateCate);