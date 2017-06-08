var serverurl = "q.aureliano.cc:4567";
var Mode = 0;
//0-all,1-hostonly
var Listcache = [];
var child2father = {};
var father2child = {};
var socket = new WebSocket('ws://' + serverurl + "/lives/" + getlid() + "/thread");
Vue.component('message_item', {
	props: ["message"],
	computed: {
		istext: function() {
			return this.message.content_type == "text";
		}
	},
	methods:
	{
                        prepareReplylist:function(mid)
                        {
                        	   replylist_provider.fillReplyList(mid);
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
Vue.component('reply_item', {
	props: ["reply"],
	computed: {
		istext: function() {
			return this.reply.content_type == "text";
		}
	},
	methods:
	{

		popupWrite_sth:function(mid) {
			
		},
		popupPost_sth:function(mid) {
			
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
              <p><a class="icon icon-edit pull-left" v-on:click="popupWrite_sth(reply.mid)">文字评论</a>\
              <a class="icon icon-picture" style="margin-left:300px"  v-on:click="popupPost_sth(reply.mid)">图片评论</a></p>\
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
		getAllList: function() {
			this.$data.message_list = [];
			additem_single({
				"mid": "0",
				"hostname": "hcj",
				"time": new Date().toLocaleString(),
				"content": "http://i4.buimg.com/595334/f50f5535224d3845.jpg",
				"avatarimg": "http://i4.buimg.com/595334/f50f5535224d3845.jpg",
				"reply_to": "",
				"content_type": "img",
				"istext": "false"

			}, this.message_list);
			additem_single({
				"mid": "1",
				"hostname": "hcj",
				"time": new Date().toLocaleString(),
				"content": "Hello World!",
				"avatarimg": "http://i4.buimg.com/595334/f50f5535224d3845.jpg",
				"reply_to": "0",
				"content_type": "text",
				"istext": "true"
			}, this.message_list);
			additem_single({
				"mid": "2",
				"hostname": "hcj",
				"time": new Date().toLocaleString(),
				"content": "Hello World2!",
				"avatarimg": "http://i4.buimg.com/595334/f50f5535224d3845.jpg",
				"reply_to": "1",
				"content_type": "text",
				"istext": "true"

			}, this.message_list);
			additem_single({
				"mid": "3",
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
		latest: 0
	},
	methods: {
		initial:function()
		{
			reply_list=[];
			latest=0;
		},
		addItem: function(items) {

			addItem_general(items, replylist_provider.$data.reply_list);

		},
                         fillReplyList:function(mid)
                         {
                                       this.initial();
                                       reply_tree_construct(mid,message_list_provider.$data.message_list);
                                      this.addItem(father2child[mid]);
                                       return replylist_provider.$data.reply_list;
                         }
	},
	created: function() {
		this.reply_list=[];

	}
})

function initConnect() {

	if (!window.WebSocket) {
		$.alert("浏览器不支持WebSocket技术,请更换浏览器!");
	} else {
		// console.log('This browser does not supports WebSocket');
	}
	socket.onopen = function(event) {

	};
	socket.onmessage = function(event) {
		Listcache = [];

	}
}

function getlid() {
	return 0;
}

function closeConnect() {

}

function getMessages() {

}

function AllMode() {
	Mode = 0;
	//$(".visible_controll").show();
}

function HostOnlyMode() {
	Mode = 1;
	//$(".visible_controll").hide();
	replylist_provider.fillReplyList(0);
}

function postRawFile() {
	//this function does an HTTP POST to the remote URL with the raw content as the body
	//file 		: 	File object, usually obtained in the way like $('#fileinput').files[0]
	//settings 	: 	jQuery XHR settings object, refer to https://api.jquery.com/jquery.ajax/#jQuery-ajax-settings for more information.
	//				Attention that this function overwrites type, contentType, data and processData in settings
	var reader = new FileReader();
	var files = $('input[name="file"]').prop('files');
	alert(files[0].name);
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
				alert(data);
				pic = JSON.parse(data);
				alert(pic.file.fid);
				var others = JSON.parse(localStorage.others)
				$.ajax({
					url: serverurl + "/users/" + localStorage.uid,
					type: 'PUT',
					data: JSON.stringify({
						"user": {
							"uid": localStorage.uid,
							"nickname": localStorage.nickname,
							"others": {
								"description": others.description,
								"sex": others.sex,
								"avatar": pic.file.fid
							}
						},
						"password": $.sha256(localStorage.email + localStorage.password + "Lino")
					}),
					xhrFields: {
						withCredentials: true
					},
					success: function(data, status) {
						$("#avatar-panel").attr('src', serverurl + "/files/" + pic.file.fid);
						$("#avatar-page").attr('src', serverurl + "/files/" + others.avatar);
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

function postImg() {
	postRawFile();
	var file = $("#dmg")
	file.after(file.clone().val(""));
	file.remove();
}
function reply_tree_construct(mid,cache)
{
          var result = [];
          child2father = {};
          if (father2child[mid]!=undefined)
          	delete father2child[mid]; 
          father2child[mid]=[];
          var p,tmp;
          cache = cache.sort(function(a,b)
          {
          	return a.time-b.time;
          });
          //tmp_cache=JSON.parse(json: string)
          if (mid==-1) return cache;
          else
          {
          	 $.each(cache,function(index,item)
          	 {
                    
          	       // alert("item:"+item);
          	       // alert("mid:"+item.mid);
          	       // alert("reply_to"+item.reply_to);
          	       // alert("check"+(item.reply_to==mid));
          	       if (item==undefined) return true;
          	       if (item.reply_to==undefined || item.reply_to==null || item.reply_to=="") return true;
          	       if (item.reply_to==mid)
          	       {
          	       	child2father[item.mid]=mid;
          	       	father2child[mid].push(item);
          	       }
          	       else
          	       {
                          if (child2father[item.reply_to]==mid)
                          {
                          	child2father[item.mid]=mid;
                          	father2child[mid].push(item);
                          }
          	       }
          	       

          	 })
          }
          result = father2child[mid];
          return result;
}