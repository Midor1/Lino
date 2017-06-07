var serverurl = "q.aureliano.cc:4567";
var Mode = 0;
//0-all,1-hostonly
var Listcache = [];

var socket = new WebSocket('ws://' + serverurl + "/lives/" + getlid() + "/thread");
Vue.component('message_item', {
	props: ["message"],
	template: '\
     <div class="card facebook-card host-card">\
          <div class="card-header no-border">\
            <div class="facebook-avatar"><img src="http://i4.buimg.com/595334/f50f5535224d3845.jpg" width="34" height="34"></div>\
            <div class="facebook-name">{{message.hostname}}</div>\
            <div class="facebook-date">{{message.time}}</div>\
          </div>\
          <div class="card-content">\
            <div class="card-content-inner">{{message.content}}</div>\
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
	template: '        <li>\
          <div class="item-content">\
            <div class="item-media"><img :src="reply.avatarimg" width="44"></div>\
            <div class="item-inner">\
              <div class="item-title-row">\
                <div class="item-title">{{reply.nickname}}</div>\
              </div>\
              <div class="item-text">{{reply.content}}</div>\
            </div>\
          </div>\
        </li>'
});

function addItem_general(items, list) {
	if (items.length == undefined) {
		list.push(items);
	} else {
		$.each(items, function(index, item) {
			//TODO:Time sequence problems of network
			list.push(item);
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
			this.message_list.push({
				hostname: "hcj",
				time: new Date().toLocaleString(),
				content: "Hello World!"

			})
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
			this.reply_list.push({
				"avatarimg": "https://imgsa.baidu.com/forum/w%3D580%3B/sign=b1b9b348f7faaf5184e381b7bc6f95ee/4034970a304e251fea68ff96ad86c9177e3e53c4.jpg",
				"nickname": "hhh",
				"content": "Hello World!"
			})
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