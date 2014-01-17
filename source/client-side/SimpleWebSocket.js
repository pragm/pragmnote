/******************************************************************************************
#
#       Copyright 2014 Dustin Robert Hoffner
#
#       Licensed under the Apache License, Version 2.0 (the "License");
#       you may not use this file except in compliance with the License.
#       You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#       Unless required by applicable law or agreed to in writing, software
#       distributed under the License is distributed on an "AS IS" BASIS,
#       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#       See the License for the specific language governing permissions and
#       limitations under the License.
#       
#       Projectname...................: pragm
#
#       Developer/Date................: Dustin Robert Hoffner, 16.01.2014
#       Filename......................: SimpleWebSocket.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/

var SimplebSocket = function(url)
{
	var callbacks = {};
	var conn;

	this.bind = function(eventName, callback){
		callbacks[eventName] = callbacks[eventName] || [];
		callbacks[eventName].push(callback);
		return this;
	};

	this.send = function(event_name, event_data){
		this.conn.send( event_data );
		return this;
	};

	this.connect = function() {
		if ( typeof(MozWebSocket) == 'function' )
			this.conn = new MozWebSocket(url);
		else
			this.conn = new WebSocket(url);
		this.conn.onmessage = function(evt){
			dispatch('message', evt.data);
		};
		this.conn.onclose = function(){dispatch('close',null)}
		this.conn.onopen = function(){dispatch('open',null)}
	};

	this.disconnect = function() {
		this.conn.close();
	};

	var dispatch = function(eventName, message){
		var chain = callbacks[eventName];
		if(typeof chain == 'undefined') return;
		for(var i = 0; i < chain.length; i++){
			chain[i]( message )
		}
	}
};