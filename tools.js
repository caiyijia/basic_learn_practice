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
function drag(elem) {
    var disX,
        disY;
    addEvent(elem, 'mousedown', function(e) {
        var event = e || window.event;
        disX = event.clientX - parseInt(getStyle(elem, 'left'));
        disY = event.clientY - parseInt(getStyle(elem, 'top'));
        addEvent (document, 'mousemove', mouseMove);
        addEvent(document, 'mouseup', mouseUp);
        stopBubble(event);
        cancelHandler(event);
    });

    function mouseMove(e) {
        var event = e || window.event;
        elem.style.left = event.clientX - disX + 'px';
        elem.style.left = event.clientY - disY + 'px';
    }

    function mouseUp(e) {
        var event = e || window.event;
        removeEvent(document, 'mousemove', mouseMove);
        removeEvent(document, 'mouseup', mouseUp);
    }
}