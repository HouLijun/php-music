//对ajax的监测
var bar=$(".progress .active");
$(document).ajaxStart(function(){
    bar.show().animate({"width":"30%"});
});
$(document).ajaxSend(function(){
    bar.stop().animate({"width":"80%"});
});
$(document).ajaxSuccess(function(){
    bar.stop().animate({"width":"100%"});
});
$(document).ajaxComplete(function(){
    bar.delay(500).queue(function(){
        $(this).hide().width("0%").dequeue();
    })
});