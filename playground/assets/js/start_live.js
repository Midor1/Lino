/**
 * Created by Midor on 2017/5/31.
 */
var cover = 1;
var serverurl = "http://q.aureliano.cc:4567";

function createLive() {
    $.showPreloader("正在创建..");

    var name=$("#name").val();
    var type=$("#type").val();
    var time=$("#datetime-picker").val().replace(new RegExp("-","gm"),"/");
    var millisecond=(new Date(time)).getTime();
    var description=$("#description").val();
    $.ajax({
        type:"POST",
        url:serverurl +"/lives",
        data:JSON.stringify({"live":
            {
                "name":name,
                "type":type,
                "begin_time":millisecond,
                "duration":36000,
                "description":description, //Other properties will be added soon.
                "cover":cover
            }
        }),
        xhrFields: {
            withCredentials: true
        },

        success:function (data, status) {
            if (status === 'success') {
                tmp = JSON.parse(data);
                localStorage.lid = tmp.lid;
                window.location.href="lives/live.html?lid=" + tmp.lid;
                $.hidePreloader();
            }
        }
    })
}

function postRawFile() {
    //this function does an HTTP POST to the remote URL with the raw content as the body
    //file      :   File object, usually obtained in the way like $('#fileinput').files[0]
    //settings  :   jQuery XHR settings object, refer to https://api.jquery.com/jquery.ajax/#jQuery-ajax-settings for more information.
    //              Attention that this function overwrites type, contentType, data and processData in settings
    var reader = new FileReader();
    var files = $('input[name="file"]').prop('files');
    reader.onload = function(){
        $.ajax({
            type:'POST',
            xhrFields:
                {
                    withCredentials: true
                },
            contentType:'application/octet-stream',
            processData:false,
            url: serverurl+"/files",
            data:new Uint8Array(this.result),
            success: function (data,status) {
                pic = JSON.parse(data);
                cover = pic.file.fid;
                $.toast('上传完毕');
            },
            error: function (data,status) {
                $.toast('发生了' + data.status +'错误');
            }
        });
    };
    reader.readAsArrayBuffer(files[0]);
}
