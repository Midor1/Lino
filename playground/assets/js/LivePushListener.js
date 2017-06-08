//FILL THE NEXT LINE TO USE THIS SCRIPT !!!
XHRSetting = {};

function cloneObject(obj){
	return JSON.$.parse(JSON.stringify(obj));
}

function LiveMessage(naiveMessage){
	this.mid = naiveMessage.mid;
	this.owner = naiveMessage.owner;
	this.reply_to = naiveMessage.replyto;
	this.content = naiveMessage.conent.payload;
	this.content_type = naiveMessage.content.type;
	this.time = naiveMessage.time;
}

function LivePushListener(baseurl, lid, onMessage){
	//baseurl looks like 'www.lino.com/websocket/lives' or '/websocket/lives' depending on the demend. 
	this.lid = lid;
	this.onMessage = onMessage;
	this.baseurl = baseurl;
	this.url = baseurl+'?lid='+lid;

	this.retry_time = 500;

	this.ws_onerror = function ws_onerror(){
		this.retry_time = this.retry_time * 2;
		console.error('Failed to connect to WebSocket server, retrying in '+this.retry_time/1000+' seconds');
		setTimeout(this.wsconnect, this.retry_time);
	}

	this.ws_onclose = function ws_onclose(){
		this.retry_time = this.retry_time * 2;
		console.error('Disconnected WebSocket server, retrying in '+this.retry_time/1000+' seconds');
		setTimeout(this.wsconnect, this.retry_time);
	}
	
	this.ws_onmessage = function ws_onmessage(e){
		this.onMessage(new LiveMessage(JSON.parse(e.data).));
	}

	this.ws_onopen = fucntion ws_onopen(){
		this.retry_time = 500;
	}

	this.wsconnect = fucntion wsconnect(){
		this.websocket = WebSocket(this.url);
		this.websocket.onclose = this.ws_onclose;
		this.websocket.onerror = this.ws_onerror;
		this.websocket.onmessage = this.ws_onmessage;		
	}

	this.wsconnect();

}