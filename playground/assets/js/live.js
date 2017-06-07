var serverurl = "q.aureliano.cc:4567";
var Mode = 0;
//0-all,1-hostonly
var Listcache = [];
var child2father = {};
var father2child = {};
var socket = new WebSocket('ws://' + serverurl + "/lives/" + getlid() + "/thread");
Vue.component('message_item', {
	props: ["message"],
             computed:
             {
                     istext:function()
                     {
                     	return this.message.content_type=="text";
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
            <a href="#" class="open-popup open-reply " data-popup="#reply">评论<bdo>&nbsp;{{message.likeamount}}</bdo></a>\
          </div>\
        </div>\
\
\
     '
});
Vue.component('reply_item', {
	props: ["reply"],
	computed:
             {
                     istext:function()
                     {
                     	return this.reply.content_type=="text";
                     }
             },
	template: '        <li>\
          <div class="item-content">\
            <div class="item-media"><img :src="reply.avatarimg" width="44"></div>\
            <div class="item-inner">\
              <div class="item-title-row">\
                <div class="item-title">{{reply.nickname}}</div>\
              </div>\
              <div class="item-text" v-if="istext">{{reply.content}}</div>\
              <div  v-else><img :src="reply.content"></img></div>\
            </div>\
          </div>\
        </li>'
});
function additem_single(item,list)
{
	try {
             	jsonItem=JSON.parse(item);
             } catch(e) {
             	jsonItem=item;
             } 
	list.push(item);
}
function addItem_general(items, list) {
	if (items.length == undefined) {
		additem_single(items,list)
	} else {
		$.each(items, function(index, item) {
			//TODO:Time sequence problems of network
			additem_single(items,list)
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
				"hostname": "hcj",
				"time": new Date().toLocaleString(),
				"content": "http://i4.buimg.com/595334/f50f5535224d3845.jpg",
                                                   "avatarimg":"http://i4.buimg.com/595334/f50f5535224d3845.jpg",
                                                   "reply_to":"",
                                                   "content_type":"img",
                                                   "istext":"false"
                                                  
			},this.message_list);
			additem_single({
				"hostname": "hcj",
				"time": new Date().toLocaleString(),
				"content": "Hello World!",
                                                   "avatarimg":"http://i4.buimg.com/595334/f50f5535224d3845.jpg",
                                                   "reply_to":"",
                                                   "content_type":"text",
                                                  "istext":"true"
			},this.message_list);
			additem_single({
				"hostname": "hcj",
				"time": new Date().toLocaleString(),
				"content": "Hello World!",
                                                   "avatarimg":"http://i4.buimg.com/595334/f50f5535224d3845.jpg",
                                                   "reply_to":"",
                                                   "content_type":"text",
                                                  "istext":"true"
                                                  
			},this.message_list);

			
		},
		getHostOnlyList: function() {
			this.$data.message_list = [];
		},
		addItem: function(items) {
                                addItem_general(items,message_list_provider.$data.message_list);
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
		getReplyList: function(lid) {
			this.reply_list = [];
			
			additem_single({
				"avatarimg": "https://imgsa.baidu.com/forum/w%3D580%3B/sign=b1b9b348f7faaf5184e381b7bc6f95ee/4034970a304e251fea68ff96ad86c9177e3e53c4.jpg",
				"nickname": "hhh",
				"content": "Hello World!",
				"content_type":"text",

			},this.reply_list);
			additem_single({
				"avatarimg": "https://imgsa.baidu.com/forum/w%3D580%3B/sign=b1b9b348f7faaf5184e381b7bc6f95ee/4034970a304e251fea68ff96ad86c9177e3e53c4.jpg",
				"nickname": "hhh",
				"content": "https://imgsa.baidu.com/forum/w%3D580%3B/sign=b1b9b348f7faaf5184e381b7bc6f95ee/4034970a304e251fea68ff96ad86c9177e3e53c4.jpg",
				"content_type":"img",
				
			},this.reply_list);
		},
		addItem: function(items) {
			
                                addItem_general(items,replylist_provider.$data.reply_list);
		
		}
	},
	created: function() {
		this.getReplyList(0);
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
		Listcache=[];

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
   $(".visible_controll").show();
}

function HostOnlyMode() {
   Mode = 1;
   $(".visible_controll").hide();
}
function postRawFile() {
    //this function does an HTTP POST to the remote URL with the raw content as the body
    //file 		: 	File object, usually obtained in the way like $('#fileinput').files[0]
    //settings 	: 	jQuery XHR settings object, refer to https://api.jquery.com/jquery.ajax/#jQuery-ajax-settings for more information.
    //				Attention that this function overwrites type, contentType, data and processData in settings
    var reader = new FileReader();
    var files = $('input[name="file"]').prop('files');
    alert(files[0].name);
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
                alert(data);
                pic = JSON.parse(data);
                alert(pic.file.fid);
                var others=JSON.parse(localStorage.others)
                $.ajax({
                    url: serverurl + "/users/" + localStorage.uid,
                    type: 'PUT',
                    data: JSON.stringify({
                        "user": {
                            "uid": localStorage.uid,
                            "nickname" :localStorage.nickname,
                            "others": {
                                "description" : others.description,
                                "sex" : others.sex,
                                "avatar": pic.file.fid
                            }
                        },
                        "password": $.sha256(localStorage.email + localStorage.password + "Lino")
                    }),
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data, status) {
                        $("#avatar-panel").attr('src',serverurl + "/files/" + pic.file.fid);
                        $("#avatar-page").attr('src',serverurl + "/files/" + others.avatar);
                    },
                    error: function(data, status) {
                        $.toast('发生了' + data.status +'错误');
                    }
                });
            },
            error: function (data,status) {
                $.toast('发生了' + data.status +'错误');
            }
        });
    };
    reader.readAsArrayBuffer(files[0]);
}
function postImg()
{
	postRawFile();
	var file = $("#dmg") 
	file.after(file.clone().val("")); 
	file.remove(); 
}