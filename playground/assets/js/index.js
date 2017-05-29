/*var title_2 = new Vue({
	el: '#title_2',
	data:{
		title: 'This is a new one!'
	}
});*/
/*jshint multistr: true */
var serverurl = "https://private-anon-ddbdef4939-lino2.apiary-mock.com";
$(document).ready(function ()
{
    // if($.cookie("Login_Success")==null)
    //TODO:记得改回来...现在是为了方便调试.....	
     if($.cookie("Login_Success")!=null){
         $.alert('登录失效,请重新登录', '遇到问题辣%>_<%!', function () {
            window.location.href="Login.html";
        });
    };
    $.showPreloader("请稍等一下下%>_<%\n点击可以关闭我哦");
    //alert(localStorage.uid);

});
Vue.component('live_item',{
	props:['live'],  //title,begin_time,description
	template:
	'                             \
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
             }
	);
var LiveList = new Vue(
{
    el: '#Live_List',
    data:
    {
    	Live_Item_List:[	
    	],
    	latest:0,
    	
    },
    methods:
    {
        OnListItemClick:function(item)
        {
            alert("WTF");
            window.location.href=item.href;
        },
        Init:function()
        {
        	$.getJSON(serverurl+"/lives?host=0&upcoming=1&from=0",
        		function(data,status)
        		{
        			//alert(data.lives[0].name);
        			$.each(data.lives,function(index,item)
    	                            {
    	                            	
                                        LiveList.$data.Live_Item_List.push(
    	                               {
    	                               	title:item.name,
    	                               	begin_time:new Date(item.begin_time).toLocaleString(),
    	                               	description:item.description,
    	                               	last_time:formatSeconds(item.time_lasted),
    	                               	coverpath:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496073561214&di=b31cb40ac5e96a0169d6a21a86e1cd83&imgtype=0&src=http%3A%2F%2Fngnews.7xz.com%2Fuploadfile%2F2016%2F0629%2F20160629092602704.jpg",
    	                               	//coverpath:getCover(item.cover),
    	                               	likeamount:serverurl+"/lives/"+item.lid+"/like",
    	                               	href:""
    	                               }
    	                          );
        			  });
        			LiveList.$data.latest = data.lives.length;
        			$.hidePreloader();
        		})
        }
    },
    created:function()
    {
       this.Init();

    }
})
var PersonalPageLiveList = new Vue(
{
    el: '#PersonalPage_Live_List',
    data:
    {
    	Live_Item_List:[	
    	],
    	latest:0,
    	
    },
    methods:
    {
        OnListItemClick:function(item)
        {
            alert("WTF");
            window.location.href=item.href;
        },
        Init:function()
        {
        	$.getJSON(serverurl+"/lives?host="+localStorage.uid+"&upcoming=0&from=0",
        		function(data,status)
        		{
        			//alert(data.lives[0].name);
        			$.each(data.lives,function(index,item)
    	                            {
    	                            	
                                        PersonalPageLiveList.$data.Live_Item_List.push(
    	                               {
    	                               	title:item.name,
    	                               	begin_time:new Date(item.begin_time).toLocaleString(),
    	                               	description:item.description,
    	                               	last_time:formatSeconds(item.time_lasted),
    	                               	coverpath:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496073561214&di=b31cb40ac5e96a0169d6a21a86e1cd83&imgtype=0&src=http%3A%2F%2Fngnews.7xz.com%2Fuploadfile%2F2016%2F0629%2F20160629092602704.jpg",
    	                               	//coverpath:getCover(item.cover),
    	                               	likeamount:serverurl+"/lives/"+item.lid+"/like",
    	                               	href:""
    	                               }
    	                          );
        			  });
        			PersonalPageLiveList.$data.latest = data.lives.length;
        			//$.hidePreloader();
        		})
        }
    },
    created:function()
    {
       this.Init();

    }
})

function Update() {
	LiveList.$data.Live_Item_List = [
		{
			title:"Lalala",
			starttime:"2017/05/11 12:00:00",
			content:"hh",
			href:"http://www.baidu.com"
		},
		{
			title:"MyGree",
			starttime:"2017/05/11 12:00:00",
			content:"hh",
			href:"http://www.bilibili.com"
		}
	];
}
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
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    if(theTime > 60) {
        theTime1 = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
            if(theTime1 > 60) {
            theTime2 = parseInt(theTime1/60);
            theTime1 = parseInt(theTime1%60);
            }
    }
        var result = ""+parseInt(theTime)+"秒";
        if(theTime1 > 0) {
        result = ""+parseInt(theTime1)+"分"+result;
        }
        if(theTime2 > 0) {
        result = ""+parseInt(theTime2)+"小时"+result;
        }
    return result;
}
function getCover(fid)
{
	return serverurl+"/files/"+fid;
}
var PersonalPage = new Vue
({
     el:"#PersonalPageStatus",
     data:
       {
       	focus:2,
       	fans:2,
       	LiveAmount:2,
       	nickname:"Midor"
       }
})
var openPersonalConfig = new Vue(
{
  el:"#open-personalconfig",
  methods:
  {
  	PopupPersonalConfig:function()
  	{
  		alert("Hello!");
  		$.popup('.popup-personalconfig');
  	}
  }
}
)



