var serverurl = "http://q.aureliano.cc:4567";
var Mode = 0;
//0-all,1-hostonly
var Listcache = [];
var child2father = {};
var father2child = {};
//var socket = new WebSocket('ws://' + serverurl + "/lives/" + getlid() + "/thread");
var uid = localStorage.uid;
var hostid = 0;
var targetid = 0; //随点击事件而更新，指定新消息的reply_to
var temptargetid = 0;
//考虑用户打开评论区后，评论完别的，还想针对这条主线消息评论，
//为了防止该条主线消息mid丢失必须得到这个
//关于上面两个id的测试我已经做过了
var livepushlistener;

document.ready = function() {

};

window.onload = init();

function init() {
	$.ajax({
		type: "GET",
		xhrFields: {
			withCredentials: true
		},
		url: serverurl + "/lives/" + getlid(),
		success: function(data, status) {
			tmp = JSON.parse(data);
			hostid = tmp.owner;
			localStorage.hostid = hostid;
		}
	});
}

Vue.component('message_item', {
	props: ["message"],
	computed: {
		istext: function() {
			return this.message.content_type == "text";
		}
	},
	methods: {
		prepareReplylist: function(mid) {
			replylist_provider.fillReplyList(mid);
			temptargetid = mid;
		}
	},
	template: '\
     <div class="card facebook-card host-card">\
          <div class="card-header no-border">\
            <div class="facebook-avatar"><img :src="message.avatarimg" width="34" height="34"></div>\
            <div class="facebook-name">{{message.hostname}}</div>\
            <div class="facebook-date">{{message.time}}</div>\
          </div>\
          <div class="card-content">\
            <div class="card-content-inner" v-if="istext">{{message.content}}</div>\
              <div class = "card-content-inner" v-else><img :src="message.content"></img></div>\
          </div>\
          <div class="card-footer no-border visible_controll">\
            <a href="#" class="open-popup open-reply " data-popup="#reply" v-on:click="prepareReplylist(message.mid)">评论<bdo>&nbsp;{{message.likeamount}}</bdo></a>\
          </div>\
        </div>\
\
\
     '
});
Vue.component('message_item2', {
	props: ["message"],
	computed: {
		istext: function() {
			return this.message.content_type == "text";
		}
	},
	methods: {
		prepareReplylist: function(mid) {
			replylist_provider.fillReplyList(mid);
			temptargetid = mid;
		},
		popupWrite_sth: function(mid) {
			$.popup("#write_sth");
			targetid = mid;

		},
		popupPost_sth: function(mid) {
			$.popup("#post_img");
			targetid = mid;
		},
		prepareedit:function(mid)
		{
            targetid = mid;
		}
	},
	template: '\
     <div class="card facebook-card host-card open-popover" data-popover=".my-popover" v-on:click="prepareedit(message.mid)">\
          <div class="card-header no-border">\
            <div class="facebook-avatar"><img :src="message.avatarimg" width="34" height="34"></div>\
            <div class="facebook-name">{{message.hostname}}</div>\
            <div class="facebook-date">{{message.time}}</div>\
          </div>\
          <div class="card-content">\
            <div class="card-content-inner" v-if="istext">{{message.content}}</div>\
              <div class = "card-content-inner" v-else><img :src="message.content"></img></div>\
          </div>\
        </div>\
     '
});
Vue.component('reply_item', {
	props: ["reply"],
	computed: {
		istext: function() {
			return this.reply.content_type == "text";
		}
	},
	methods: {

		popupWrite_sth: function(mid) {
			$.popup("#write_sth");
			targetid = mid;

		},
		popupPost_sth: function(mid) {
			$.popup("#post_img");
			targetid = mid;
		}
	},
	template: '        <li>\
          <div class="item-content">\
            <div >\
            <div >\
            <img :src="reply.avatarimg" width="44">\
            </div>\
             <p >\
                {{reply.nickname}}\
              </p>\
              </div>\
            <div class="item-inner" style="margin-left:30px">\
             \
              <div class="item-text" v-if="istext">{{reply.content}}</div>\
              <div  v-else><img :src="reply.content"></img></div>\
              <p><a class="icon icon-edit pull-left " v-on:click="popupWrite_sth(reply.mid)">文字评论</a>\
              <a class="icon icon-picture " style="margin-left:300px"  v-on:click="popupPost_sth(reply.mid)">图片评论</a></p>\
            </div>\
            \
          </div>\
          \
        </li>'
});

function additem_single(item, list) {
	try {
		jsonItem = JSON.parse(item);
	} catch (e) {
		jsonItem = item;
	}
	list.push(item);
}

function addItem_general(items, list) {
	if (items.length == undefined) {
		additem_single(items, list)
	} else {
		$.each(items, function(index, item) {
			//TODO:Time sequence problems of network
			additem_single(item, list)
		})
	}
}

var message_list_provider = new Vue({
	el: "#messagebox",
	data: {
		message_list: [],
		latest: 0
	},
	methods: {
		initial: function() {
			//reply_list.splice(0,reply_list.length);
			message_list_provider.$data.message_list = [];

		},
		getAllList: function() {
			this.$data.message_list = [];
			additem_single({
				"mid": "1",
				"hostname": "hcj",
				"time": new Date().toLocaleString(),
				"content": "http://i4.buimg.com/595334/f50f5535224d3845.jpg",
				"avatarimg": "http://i4.buimg.com/595334/f50f5535224d3845.jpg",
				"reply_to": "0",
				"content_type": "img",
				"istext": "false"

			}, this.message_list);
			additem_single({
				"mid": "2",
				"hostname": "hcj",
				"time": new Date().toLocaleString(),
				"content": "Hello World!",
				"avatarimg": "http://i4.buimg.com/595334/f50f5535224d3845.jpg",
				"reply_to": "1",
				"content_type": "text",
				"istext": "true"
			}, this.message_list);
			additem_single({
				"mid": "3",
				"hostname": "hcj",
				"time": new Date().toLocaleString(),
				"content": "Hello World2!",
				"avatarimg": "http://i4.buimg.com/595334/f50f5535224d3845.jpg",
				"reply_to": "2",
				"content_type": "text",
				"istext": "true"

			}, this.message_list);
			additem_single({
				"mid": "4",
				"hostname": "hcj",
				"time": new Date().toLocaleString(),
				"content": "Hello World3!",
				"avatarimg": "http://i4.buimg.com/595334/f50f5535224d3845.jpg",
				"reply_to": "",
				"content_type": "text",
				"istext": "true"

			}, this.message_list);


		},
		getHostOnlyList: function() {
			this.$data.message_list = [];
		},
		addItem: function(items) {
			addItem_general(items, message_list_provider.$data.message_list);
		},
		fillMessageList: function(mid) {
			this.initial();
			reply_tree_construct(mid, message_list_provider.$data.message_list);
			this.addItem(father2child[mid]);
		}
	},
	created: function() {
		this.getAllList();
	}

});
var replylist_provider = new Vue({
	el: "#reply",
	data: {
		reply_list: [],
		latest: 0,

	},
	methods: {
		initial: function() {
			//reply_list.splice(0,reply_list.length);
			replylist_provider.$data.reply_list = [];


		},
		addItem: function(items) {

			addItem_general(items, replylist_provider.$data.reply_list);

		},
		fillReplyList: function(mid) {
			this.initial();
			//alert(replylist_provider.$data.reply_list.length);
			reply_tree_construct(mid, message_list_provider.$data.message_list);

			this.addItem(father2child[mid]);
			//alert(replylist_provider.$data.reply_list.length);
			//return replylist_provider.$data.reply_list;
		}
	},
	created: function() {
		//reply_list.splice(0,reply_list.length);

	}
})



function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
	var context = "";
	if (r != null)
		context = r[2];
	reg = null;
	r = null;
	return context == null || context == "" || context == "undefined" ? "" : context;
}

function getlid() {
	return GetQueryString("lid");
}

function closeConnect() {

}

function getMessages() {

}



//这里的alert和头像设置的部分我就注释掉了...确认一下，pic.file.fid就是fid吧？
//另外那个错误代码....能不能转成对应的错误信息？
//注意：这里有所改动，因为需要发送图片，content的形式：{type:img,payload:url}
function postRawFile(ReplytoMid) {
	//this function does an HTTP POST to the remote URL with the raw content as the body
	//file 		: 	File object, usually obtained in the way like $('#fileinput').files[0]
	//settings 	: 	jQuery XHR settings object, refer to https://api.jquery.com/jquery.ajax/#jQuery-ajax-settings for more information.
	//				Attention that this function overwrites type, contentType, data and processData in settings
	var reader = new FileReader();
	var files = $('input[name="file"]').prop('files');
	//alert(files[0].name);
	reader.onload = function() {
		$.ajax({
			type: 'POST',
			xhrFields: {
				withCredentials: true
			},
			contentType: 'application/octet-stream',
			processData: false,
			url: serverurl + "/files",
			data: new Uint8Array(this.result),
			success: function(data, status) {
				//alert(data);
				pic = JSON.parse(data);
				$.ajax({
					url: serverurl + "/lives/" + getlid() + "/thread",
					type: 'POST',
					data: JSON.stringify({
						"message": {
							"replyto": ReplyToMid,
							"lid": getlid(),
							"content": JSON.stringify({
								"type": "img",
								"payload": serverurl + "/files/" + pic.file.fid
							})
						}

					}),
					xhrFields: {
						withCredentials: true
					},
					success: function(data, status) {
						//$("#avatar-panel").attr('src', serverurl + "/files/" + pic.file.fid);
						//$("#avatar-page").attr('src', serverurl + "/files/" + others.avatar);
					},
					error: function(data, status) {
						$.toast('发生了' + data.status + '错误');
					}
				});
			},
			error: function(data, status) {
				$.toast('发生了' + data.status + '错误');
			}
		});
	};
	reader.readAsArrayBuffer(files[0]);
}
//只要postRawFile没错就没错
function postImg() {
	alert(temptargetid);
	alert(targetid);
	postRawFile(targetid);
	var file = $("#dmg")
	file.after(file.clone().val(""));
	file.remove();
}

function posttext() {
	alert(temptargetid);
	alert(targetid);
	createMessage(targetid);
}
//已经测试
function reply_tree_construct(mid, cache) {
	var result = [];
	child2father = {};
	if (father2child[mid] != undefined)
		delete father2child[mid];
	father2child[mid] = [];
	var p, tmp;
	cache = cache.sort(function(a, b) {
		return a.time - b.time;
	});
	//tmp_cache=JSON.parse(json: string)
	if (mid == 0) return cache;
	else {
		$.each(cache, function(index, item) {

			// alert("item:"+item);
			// alert("mid:"+item.mid);
			// alert("reply_to"+item.reply_to);
			// alert("check"+(item.reply_to==mid));
			if (item == undefined) return true;
			if (item.reply_to == undefined || item.reply_to == null || item.reply_to == "" || item.reply_to == "0") return true;
			if (item.reply_to == mid) {
				child2father[item.mid] = mid;
				father2child[mid].push(item);
			} else {
				if (child2father[item.reply_to] == mid) {
					child2father[item.mid] = mid;
					father2child[mid].push(item);
				}
			}


		})
	}
	result = father2child[mid];
	return result; //就是把某个mid的子孙message全部收集起来，
	//函数返回的是整理好的array，嗯嗯就这样
}
//未测试，发送文字消息
function createMessage(ReplyToMid) {
	var message = $("#write_comment_content").val();
	$.ajax({
		url: serverurl + "/lives/" + getlid() + "/thread",
		xhrFields: {
			withCredentials: true
		},
		type: "POST",
		data: JSON.stringify({
			"content": JSON.stringify({
				"type": "text",
				"payload": message
			}),
			"replyto": ReplyToMid,
			"lid": getlid()


		})
	})
}

function setReplyMid_outer() //targetid设为temptargetid
{
	targetid = temptargetid;
}

if(localStorage.hostid !== localStorage.uid)
    $("#hostbar").remove();