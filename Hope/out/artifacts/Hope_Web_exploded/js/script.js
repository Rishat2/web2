(function($){

    $.session = {

        _id: null,

        _cookieCache: undefined,

        _init: function()
        {
            if (!window.name) {
                window.name = Math.random();
            }
            this._id = window.name;
            this._initCache();

            // See if we've changed protcols

            var matches = (new RegExp(this._generatePrefix() + "=([^;]+);")).exec(document.cookie);
            if (matches && document.location.protocol !== matches[1]) {
                this._clearSession();
                for (var key in this._cookieCache) {
                    try {
                        window.sessionStorage.setItem(key, this._cookieCache[key]);
                    } catch (e) {};
                }
            }

            document.cookie = this._generatePrefix() + "=" + document.location.protocol + ';path=/;expires=' + (new Date((new Date).getTime() + 120000)).toUTCString();

        },

        _generatePrefix: function()
        {
            return '__session:' + this._id + ':';
        },

        _initCache: function()
        {
            var cookies = document.cookie.split(';');
            this._cookieCache = {};
            for (var i in cookies) {
                var kv = cookies[i].split('=');
                if ((new RegExp(this._generatePrefix() + '.+')).test(kv[0]) && kv[1]) {
                    this._cookieCache[kv[0].split(':', 3)[2]] = kv[1];
                }
            }
        },

        _setFallback: function(key, value, onceOnly)
        {
            var cookie = this._generatePrefix() + key + "=" + value + "; path=/";
            if (onceOnly) {
                cookie += "; expires=" + (new Date(Date.now() + 120000)).toUTCString();
            }
            document.cookie = cookie;
            this._cookieCache[key] = value;
            return this;
        },

        _getFallback: function(key)
        {
            if (!this._cookieCache) {
                this._initCache();
            }
            return this._cookieCache[key];
        },

        _clearFallback: function()
        {
            for (var i in this._cookieCache) {
                document.cookie = this._generatePrefix() + i + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            }
            this._cookieCache = {};
        },

        _deleteFallback: function(key)
        {
            document.cookie = this._generatePrefix() + key + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            delete this._cookieCache[key];
        },

        get: function(key)
        {
            return window.sessionStorage.getItem(key) || this._getFallback(key);
        },

        set: function(key, value, onceOnly)
        {
            try {
                window.sessionStorage.setItem(key, value);
            } catch (e) {}
            this._setFallback(key, value, onceOnly || false);
            return this;
        },

        'delete': function(key){
            return this.remove(key);
        },

        remove: function(key)
        {
            try {
                window.sessionStorage.removeItem(key);
            } catch (e) {};
            this._deleteFallback(key);
            return this;
        },

        _clearSession: function()
        {
            try {
                window.sessionStorage.clear();
            } catch (e) {
                for (var i in window.sessionStorage) {
                    window.sessionStorage.removeItem(i);
                }
            }
        },

        clear: function()
        {
            this._clearSession();
            this._clearFallback();
            return this;
        }

    };

    $.session._init();

})(jQuery);

let canvas = document.getElementById('c1');
let ctx=canvas.getContext('2d');
let  pi = Math.PI;

ctx.fillStyle='blue';
ctx.fillRect(35,145, 110, 110);
ctx.beginPath();
ctx.lineWidth = "1";
ctx.strokeStyle = "blue";
ctx.fillStyle = "blue";
ctx.arc(145, 145, 110, -pi/2, -pi, true);
ctx.moveTo(35, 145);
ctx.lineTo(145, 145);
ctx.lineTo(145, 35);
ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.moveTo(145, 90);
ctx.lineTo(145, 145);
ctx.lineTo(200, 145);
ctx.lineTo(145, 90);
ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.lineWidth="2";
ctx.strokeStyle = "black";
ctx.moveTo(5, 145);
ctx.lineTo(285, 145);
ctx.lineTo(275, 150);
ctx.moveTo(285, 145);
ctx.lineTo(275, 140);
ctx.moveTo(145, 285);
ctx.lineTo(145, 5);
ctx.lineTo(140, 15);
ctx.moveTo(145, 5);
ctx.lineTo(150, 15);
ctx.lineCap = "round";
ctx.stroke();

ctx.beginPath();
ctx.font = '20px Arial';
ctx.fillStyle = "black";
ctx.fillText("-R",27, 135);
ctx.fillText("-R/2", 82, 135);
ctx.fillText("R/2", 192, 135);
ctx.fillText("R", 247, 135);
ctx.fillText("R", 155, 45);
ctx.fillText("R/2",155, 100);
ctx.fillText("-R/2", 155, 210);
ctx.fillText("-R", 155, 265);
ctx.font = '15px Arial';
ctx.fillText("y", 155, 10);
ctx.fillText("x",280, 135);

ctx.beginPath();
ctx.moveTo(35, 140);
ctx.lineTo(35, 150);
ctx.moveTo(90, 140);
ctx.lineTo(90, 150);
ctx.moveTo(200, 140);
ctx.lineTo(200, 150);
ctx.moveTo(255, 140);
ctx.lineTo(255, 150);

ctx.moveTo(140, 35);
ctx.lineTo(150, 35);
ctx.moveTo(140, 90);
ctx.lineTo(150, 90);
ctx.moveTo(140, 200);
ctx.lineTo(150, 200);
ctx.moveTo(140, 255);
ctx.lineTo(150, 255);
ctx.stroke();

function writeToColumn(array){
    let arr = array.split(',');
    $('#attempts').append("<td width='9.1%'>"+arr[0]+"<br>"+arr[1]+"<br>"+arr[2]+"<br>"+arr[3]+"</td>");
}
function writeToTable(count){
    for(let i=1; i<=count; i++){
        writeToColumn($.session.get(i));
    }
}
writeToTable($.session.get('count'));
let count = 0;
if ($.isNumeric($.session.get('count'))){
    count = $.session.get('count');
}
alert("hello");
$("#clear").on("click", function(){
    $('#attempts').html('<td width="10%">X<br>Y<br>R<br>True</td>');
    count = 0;
    $.session.clear;
});
$("#check").on("click", function() {
    alert("click");
    var x = $("#x").val().trim();
    var y = $("#y").val().trim();
    var r = $("#r").val();

    if(r==""){
        $("#errorMess").text("Выберите r");
        return false;
    }
    if(x=="") {
        $("#errorMess").text("Введите х");
        return false;
    }
    if(!$.isNumeric(x)){
        $("#errorMess").text("х должен быть числом");
        return false;
    }
    if(x.includes('.')){
        $("#errorMess").text("х должен быть целым числом");
        return false;
    }
    if(parseInt(x)<-3 || parseInt(x)>5){
        $("#errorMess").text("х должен быть -3 до 5");
        return false;
    }
    if(y=="") {
        $("#errorMess").text("Введите y");
        return false;
    }
    if(!$.isNumeric(y)){
        $("#errorMess").text("y должен быть числом");
        return false;
    }
    if(y.includes('.')){
        $("#errorMess").text("y должен быть целым числом");
        return false;
    }
    if(parseInt(y)<-3 || parseInt(y)>5){
        $("#errorMess").text("y должен быть -3 до 5");
        return false;
    }

    $("#errorMess").text("");

    $.ajax({
        url: '/',
        type: 'POST',
        cache: false,
        data: {'x': x, 'y': y, 'r': r},
        dataType: 'html',
        beforeSend: function () {
            $("#check").prop("disabled", true);
        },
        success: function(data) {
            alert(data);
            $("#check").prop("disabled", false);
            if (count == 10){
                $('#attempts').html('<td width="10%">X<br>Y<br>R<br>True</td>');
                count = 0;
                $.session.clear;
            }
            count++;
            $.session.set('count', count);
            let t=data[0];
            let arr=[x, y, r, t];
            $('#attempts').append("<td width='9.1%'>"+x+"<br>"+y+"<br>"+r+"<br>"+t+"</td>");
            $.session.set(`${count}`,arr);
        }
    })
});