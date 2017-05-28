/*var title_2 = new Vue({
	el: '#title_2',
	data:{
		title: 'This is a new one!'
	}
});*/
/*jshint multistr: true */
Vue.component('live_item',{
	props:['live'],  //title,starttime,content
	template:
	' <div class="card">\
		<div style="background-image:url()" valign="bottom" class="card-header color-white no-border">\
			{{live.title}}\
		</div>\
		<div class="card-content">\
			<div class="card-content-inner">\
				<p class="color-gray">开始于{{live.starttime}}</p>\
				<p>{{live.content}}</p>\
			</div>\
		</div>\
		<div class="card-footer">\
			<a href="#" class="link" onclick="Like()">赞</a>\
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
		{
			title:"FirstBlood!",
			starttime:"2017/05/11 12:00:00",
			content:"hh",
			href:"http://www.baidu.com"
		},
		{
			title:"SecondBlood!",
			starttime:"2017/05/12 14:00:00",
			content:"233",
			href:""
		},
    	{
    		title:"Hello world!",
            starttime:new Date().toUTCString(),
            content:"hhh",
            href:""
    	},
    	{
    		title:"Hello world2.0!",
            starttime:new Date().toUTCString(),
            content:"hhh",
            href:""
    	}
    	]
    },
    methods:
    {
        OnListItemClick:function(index)
        {
            alert("WTF");
            window.location.href=this.Live_Item_List[index].href;
        }
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
