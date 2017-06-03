/*var title_2 = new Vue({
	el: '#title_2',
	data:{
		title: 'This is a new one!'
	}
});*/
/*jshint multistr: true */
//TODO: change serverurl and hide it during deployment
var serverurl = "http://q.aureliano.cc:4567";

$(document).ready(function() {
    // if($.cookie("Login_Success")==null)
    //TODO:记得改回来...现在是为了方便调试.....	
    //  if($.cookie("Login_Success")!=null){
    //      $.alert('登录失效,请重新登录', '遇到问题辣%>_<%!', function () {
    //         window.location.href="Login.html";
    //     });
    // };
    if (LiveList == null || LiveList.$data.Live_Item_List.length == 0)
        $.showPreloader("请稍等一下下%>_<%\n点击可以关闭我哦");
    //alert(localStorage.uid);

});
Vue.component('live_item', {
    props: ['live'], //title,begin_time,description
    template: '                             \
	<div class="card demo-card-header-pic">\
	 <div valign="bottom" class="card-header color-white no-border no-padding">\
              <img class="card-cover" :src="live.coverpath" alt="">\
              </div>\
		<div style="background-image:url()" valign="bottom" class="card-header color-white no-border">\
			{{live.title}}\
		</div>\
		<div class="card-content">\
			<div class="card-content-inner">\
				<p class="color-gray">开始于{{live.begin_time}}</p>\
				<p>持续时间为{{live.last_time}}</p>\
				<p>{{live.description}}</p>\
			</div>\
		</div>\
		<div class="card-footer">\
		<div>\
		             <div style="display:inline-block"> \
			<a href="#" class="link" onclick="Like()">赞</a>\
			</div>\
			<div style="display:inline-block"> \
			<p>{{live.likeamount}}</p>\
			</div>\
			</div>\
			<a href="#" class="link" onclick="More()">更多</a>\
		</div>\
	</div>'
});
var likeamount_tmp;
var LiveList = new Vue({
    el: '#Live_List',
    data: {
        Live_Item_List: [],
        latest: 0,

    },
    methods: {
        OnListItemClick: function(item) {
            //alert("WTF");
            window.location.href = item.href;
        },
        Init: function() {
            $.ajax({
                type: 'GET',
                url: serverurl + "/lives?host=0&upcoming=1&from=0",
                xhrFields: {
                    withCredentials: true
                },
                datatype: "json",
                success: function(data, status) {
                    result = JSON.parse(data);
                    $.each(result.lives, function(index, item) {
                        LiveList.$data.Live_Item_List.push({
                            title: item.name,
                            begin_time: new Date(item.begin_time).toLocaleString(),
                            description: item.description,
                            last_time: formatSeconds(item.time_lasted),
                            coverpath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496073561214&di=b31cb40ac5e96a0169d6a21a86e1cd83&imgtype=0&src=http%3A%2F%2Fngnews.7xz.com%2Fuploadfile%2F2016%2F0629%2F20160629092602704.jpg",
                            //coverpath:getCover(item.cover),
                            likeamount: getlike(serverurl + "/lives/" + item.lid + "/like"),
                            href: ""
                        });
                    });
                    LiveList.$data.latest = result.lives.length;
                    $.hidePreloader();
                }
            });
        }
    },
    created: function() {
        this.Init();

    }
})

function getlike(likeurl) {
    var result = 0;
    $.ajax({
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        url: likeurl,
        success: function(data, status) {
            result = data;
        }
    });
    return result;
}
var PersonalPageLiveList = new Vue({
    el: '#PersonalPage_Live_List',
    data: {
        Live_Item_List: [],
        latest: 0,

    },
    methods: {
        OnListItemClick: function(item) {
            //alert("WTF");
            window.location.href = item.href;
        },
        Init: function() {
            $.ajax({
                type: 'GET',
                url: serverurl + "/lives?host=" + localStorage.uid + "&upcoming=0&from=0",
                xhrFields: {
                    withCredentials: true
                },
                datatype: "json",
                success: function(data, status) {
                    result = JSON.parse(data);
                    $.each(result.lives, function(index, item) {

                        PersonalPageLiveList.$data.Live_Item_List.push({
                            title: item.name,
                            begin_time: new Date(item.begin_time).toLocaleString(),
                            description: item.description,
                            last_time: formatSeconds(item.time_lasted),
                            coverpath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496073561214&di=b31cb40ac5e96a0169d6a21a86e1cd83&imgtype=0&src=http%3A%2F%2Fngnews.7xz.com%2Fuploadfile%2F2016%2F0629%2F20160629092602704.jpg",
                            //coverpath:getCover(item.cover),
                            likeamount: getlike(serverurl + "/lives/" + item.lid + "/like"),
                            href: ""
                        });
                    });
                    PersonalPageLiveList.$data.latest = result.lives.length;

                    $.hidePreloader();
                }
            });
        }
    },
    created: function() {
        this.Init();

    }
})
var SearchLiveList = new Vue({
    el: '#Search_Live_List',
    data: {
        Live_Item_List: [],
        latest: 0,

    }
})

// function Update() {
// 	LiveList.$data.Live_Item_List = [
// 		{
// 			title:"Lalala",
// 			starttime:"2017/05/11 12:00:00",
// 			content:"hh",
// 			href:"http://www.baidu.com"
// 		},
// 		{
// 			title:"MyGree",
// 			starttime:"2017/05/11 12:00:00",
// 			content:"hh",
// 			href:"http://www.bilibili.com"
// 		}
// 	];
// }
function Like() {
    //title_2.title='Thank you!';
    alert('Thank you!');
}

function More() {
    alert('敬请期待');
}

function Contact() {
    window.open('tencent://message/?uin=419811184');
    window.open('mqqwpa://im/chat?chat_type=wpa&uin=419811184&version=1');
    window.open('mqq://im/chat?chat_type=wpa&uin=419811184&version=1&src_type=web');
}

function formatSeconds(value) {
    var theTime = parseInt(value); // 秒
    var theTime1 = 0; // 分
    var theTime2 = 0; // 小时
    if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
        }
    }
    var result = "" + parseInt(theTime) + "秒";
    if (theTime1 > 0) {
        result = "" + parseInt(theTime1) + "分" + result;
    }
    if (theTime2 > 0) {
        result = "" + parseInt(theTime2) + "小时" + result;
    }
    return result;
}

function getCover(fid) {
    return serverurl + "/files/" + fid;
}
var PersonalPage = new Vue({
    el: "#PersonalPageStatus",
    data: {
        //TODO : databind（wait for backend interface）
        focus: 2,
        fans: 2,
        LiveAmount: 2,
        nickname: "",
        personalDescription: "",
        sex: ""
    },
    methods: {

    },
    created: function() {
        $.ajax({
            type: "GET",
            xhrFields: {
                withCredentials: true
            },
            datatype: "json",
            url: serverurl + "/users/me",
            success: function(data, status) {
                //alert(data.user.uid);
                list = JSON.parse(data);
                if (status = 200) {
                    localStorage.uid = list.user.uid;
                    localStorage.nickname = list.user.nickname;
                    PersonalPage.$data.nickname = list.user.nickname;
                    // alert(list.user.others);
                    // alert(JSON.stringify(list.user.others));
                    // alert(JSON.parse(list.user.others).sex);
                    others = list.user.others;

                    PersonalPage.$data.personalDescription = others.description;
                    PersonalPage.$data.sex = others.sex;
                } else
                    $.alert("登录失败！");
            }

        });
    }
})

var PersonalConfig = new Vue({
    el: "#popup-personalconfig",
    data: {
        nickname: localStorage.nickname,
        password: localStorage.password,
        password_again: localStorage.password,
        description: PersonalPage.$data.personalDescription,
        sex: PersonalPage.$data.sex,
    },
    created: function() {
        // PersonalConfig.$data.nickname="123";
        //$("#newnickname").val(nickname);
        // alert(localStorage.nickname);
        // alert(localStorage.password);

        // $("#newnickname").val(localStorage.nickname);
        // $("#newpassword").val(localStorage.password);
        //  $("#newpassword_again").val(localStorage.password);
        //  $("#newsex_selection").val(PersonalPage.$data.sex);
        //  $("#newdescription").val(PersonalPage.$data.personalDescription);
    },
    updated: function() {
        // PersonalConfig.$data.nickname="123";
        // $("#newnickname").val(localStorage.nickname);
        //                 $("#newpassword").val(localStorage.password);
        //                  $("#newpassword_again").val(localStorage.password);
        //                  $("#newsex_selection").val(PersonalPage.$data.sex);
        //                  $("#newdescription").val(PersonalPage.$data.personalDescription);
    },
    mounted: function() {
        // PersonalConfig.$data.nickname="123";
    }

})

function submitPersonalInfoChange() {
    newnickname = $("#newnickname").val();
    description = $("#newdescription").val();
    password = $("#newpassword").val();
    password_again = $("#newpassword_again").val();
    sex = $("#newsex_selection").val();

    if (password != password_again) {
        $.alert("两次输入的密码不一致！");
        return;
    } else {
        alert(password);
        // alert(password);
        PersonalPage.$data.nickname = newnickname;
        PersonalPage.$data.personalDescription = description;

        $.ajax({
            url: serverurl + "/users/" + localStorage.uid,
            type: 'PUT',
            data: JSON.stringify({
                "user": {
                    "uid": localStorage.uid,
                    "nickname": newnickname,
                    "others": {
                        "description": description,
                        "sex": sex
                    }
                },
                "password": $.sha256(localStorage.email + password + "Lino")
            }),
            xhrFields: {
                withCredentials: true
            },
            success: function(data, status) {
                $.alert("修改成功");
                localStorage.password = password;
                localStorage.nickname = nickname;
            }
        });
    }

}

function startSearch() {
    uid = $("#search").val();
    $.ajax({
        url: serverurl + "/lives?host=" + uid + "&upcoming=0&from=0",
        type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        success: function(data, status) {
            a = JSON.parse(data);
            list = a.lives;
            result = JSON.parse(data);
            $.each(result.lives, function(index, item) {

                SearchLiveList.$data.Live_Item_List.push({
                    title: item.name,
                    begin_time: new Date(item.begin_time).toLocaleString(),
                    description: item.description,
                    last_time: formatSeconds(item.time_lasted),
                    coverpath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496073561214&di=b31cb40ac5e96a0169d6a21a86e1cd83&imgtype=0&src=http%3A%2F%2Fngnews.7xz.com%2Fuploadfile%2F2016%2F0629%2F20160629092602704.jpg",
                    //coverpath:getCover(item.cover),
                    likeamount: serverurl + "/lives/" + item.lid + "/like",
                    href: ""
                });
            });
            SearchLiveList.$data.latest = result.lives.length;

        }
    });
}