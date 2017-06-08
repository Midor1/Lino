/**
 * Created by Midor on 2017/5/31.
 */
function createLive() {
    $.showPreloader("正在创建..");
    var url = "http://q.aureliano.cc:4567";
    var name=$("#name").val();
    var type=$("#type").val();
    var time=$("#datetime-picker").val().replace(new RegExp("-","gm"),"/");
    var millisecond=(new Date(time)).getTime();
    var description=$("#description").val();
    $.ajax({
        type:"POST",
        url:url +"/lives",
        data:JSON.stringify({"live":
            {
                "name":name,
                "type":type,
                "begin_time":millisecond,
                "duration":36000,
                "description":description //Other properties will be added soon.
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