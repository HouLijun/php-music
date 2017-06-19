var timerId = null;
$('input[name=account]').on('keyup',function(){
    var name = $.trim($(this).val());
    clearTimeout(timerId);
    var form = $(this).closest('.form-group');
    var that = this;
    timerId = setTimeout(function () {
        $.get('/music/index.php/login/checkname/name/'+name).done(function(data){
            form.removeClass("has-success has-error");
            $(that).next().remove();
            if(data.state===200){
                form.addClass("has-success");
            }else{
                form.addClass("has-error");
                $(that).after(`<span class="help-block">${data.error}</span>`);
            }
        })
    },300)
})
$('input[name=password]').on('focus',function(){
    var form = $(this).closest('.form-group');
    form.removeClass("has-success has-error");
    $(this).next().remove();
})
$('input[name=password]').on('change',function(){
    var form = $(this).closest('.form-group');
    form.removeClass("has-success has-error");
    $(this).next().remove();
    var pass = $.trim($(this).val());
    if(pass.length<6){
        form.addClass("has-error");
        $(this).after(`<span class="help-block">密码长度少于6位</span>`);
    }
})
$('input[name=check]').on('keyup',function(){
    var code = $(".code").html();
    var form = $(this).closest('.form-group');
    form.removeClass("has-success has-error");
    $(this).next().remove();
    var pass = $.trim($(this).val());
    if(code.indexOf(pass)!=0){
        form.addClass("has-error");
        $(this).after(`<span class="help-block">验证码不正确</span>`);
    }else if(code===pass){
        form.addClass("has-success");
    }
})
$('input[name=check]').on('change',function(){
    var code = $(".code").html();
    var form = $(this).closest('.form-group');
    form.removeClass("has-success has-error");
    $(this).next().remove();
    var pass = $.trim($(this).val());
    if(code===pass){
        form.addClass("has-success");
    }else{
        form.addClass("has-error");
        $(this).after(`<span class="help-block">验证码不正确</span>`);
    }
})
$(".code").on("click",function(){
    $.get("/music/index.php/login/change").done((function(val){
        $(this).text(val);
    }).bind(this))
})
var error_info = $('.error_info');
$("button[type=submit]").on("click",function(){
    var form = $(this).closest('form');
    if(!$.trim($('input[name=account]').val())){
        error_info.html('请输入用户名');
        return false;
    }
    if(form.find('.user').hasClass("has-error")){
        error_info.html('用户名不正确');
        return false;
    }
    if(!$.trim($('input[name=password]').val())){
        error_info.html('请输入密码');
        return false;
    }
    if(form.find('.pass').hasClass("has-error")){
        error_info.html('密码不正确');
        return false;
    }
    if(!$.trim($('input[name=check]').val())){
        error_info.html('请输入验证码');
        return false;
    }
    if(!form.find('.form-code').hasClass("has-success")){
        error_info.html('验证码不正确');
        return false;
    }
    var formData = new FormData(form.get(0));
    $.ajax({
        url:'/music/index.php/login/check_login',
        type:'post',
        data:formData,
        processData:false,
        contentType:false,
        success:function(data){
            if(data.state===200){
                error_info.html('');
                location.href="/music/index.php/admin";
            }else{
                error_info.html(data.error);
            }
        }
    })
    return false;
})
