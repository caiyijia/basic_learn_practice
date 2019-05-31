// 兼容的事件绑定
function addEvent(elem, type, handle) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handle, false);
    } else if (elem.attachEvent) {
        elem.attachEvent('on' + type, function () {
            // 此方法下this指向window
            handle.call(elem);
        })
    } else {
        elem['on' + type] = handle;
    }
}

 // 阻止默认事件的函数
 function cancelHandler(event) {
    if(event.preventDefault) {
        event.preventDefault();
    }else {
        event.returnValue = false;
    }
}

//鼠标拖动事件
