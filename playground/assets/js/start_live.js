/**
 * Created by Midor on 2017/5/31.
 */
function createLive() {
    $.showPreloader("正在创建..");
    var url = "https://private-anon-eceb4b93ab-lino2.apiary-mock.com";
    var name=$("#name").val();
    var type=$("#type").val();
    var time=$("#datetime-picker").val().replace(new RegExp("-","gm"),"/");
    var millisecond=(new Date(time)).getTime();
    var description=$("#description").val();
    $.post(url +"/lives",{"live":
        {
            "name":name,
            "type":type,
            "begin_time":millisecond,
            "duration":36000,
            "description":description //Other properties will be added soon.
        }
    }, function (data, status) {
        if (status === 'success') {
            localStorage.lid = data.lid;
            window.location.href="index.html";//Will be replaced with concrete url.
            $.hidePreloader();
        }
    })
}