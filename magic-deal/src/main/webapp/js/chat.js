/**
 * 채팅 관련 스크립트
 */
var chatListOpenFlag = false;
var writerInfo = {};
var rooms = {};
var currOpenChatRno = -1;

var moveMyPage = function(event, ow) {
	event.stopPropagation();
	console.log(ow);
	document.location.href = "/magic-deal/page/mypage.html?ow="+ow;
};

// 채팅버튼 클릭 이벤트
$("#loginStatusWrap").on("click", ">#chatBtn", function() {
	if(!chatListOpenFlag) {
		$.getJSON(contextPath + "/chat/auth/getRoomList.do", function(resultObj) {
			var result = resultObj.ajaxResult;
			drawChatList(result.data);
			$("#chatBtn").find(".icons>.add.icon").removeClass("red");
		});
	}else {
		$(".chat-chatListBoxWrap").css("display", "none");
		$(".chat-chatBoxWrap").css("display", "none");
	}
	chatListOpenFlag = !chatListOpenFlag;
	
});


var chatRegist = function(data ,btn) {
	$.getJSON(contextPath + "/chat/auth/registRoom.do", data, function(resultObj) {
		var result = resultObj.ajaxResult;
		if(result.msg == 'success') {
			alertMsg("채팅상대로 추가되었습니다!", "확인");
			$(btn).addClass("disabled");
		}else {
			alertMsg("이미 채팅중인 상대입니다!", "확인");
			$(btn).addClass("disabled");
		}
	});
}; 

var drawChatList = function(data) {
	$("#chatList-count").text(data.length);
	var listBox = $(".chat-chatListBox");
	listBox.empty();
	roomKeys = {};
	if(data.length == 0) {
		listBox.text("진행중인 대화가 없습니다");
	}else {
		var card = "";
		var i;
		
		for(i=0; i < data.length; i++) {
			rooms[data[i].room_no+""] = data[i];
			card = '<div class="chat-CardBox" data-rkey="'+data[i].room_no+'">';
			card += '<div class="chat-memPhoto" style="background-image:url(\'';
			card += contextPath + "/upload/profile/mp_" + data[i].m_photo;
			card += '\')"></div>';
			card += '<div class="chat-chatInfo">';
			card += '<span class="chat-proInfo">';
			card += getCategorieText(data[i].p_high_cate-1, data[i].p_low_cate-1) 
			card += ' > ' + data[i].p_keyword;
			card += '</span>';
			card += '<span class="chat-memInfo">';
			card += '<label class="ui basic label" style="cursor:pointer;" onclick="moveMyPage(event, \''+data[i].id+'\')">';
			card += data[i].nname;
			card += '</label>';
			card += '</span>';
			if(data[i].new_cnt > 999) data[i].new_cnt = 999;
			card += '<div class="chat-newCnt">'+data[i].new_cnt+'</div>';
			card += '<div class="chat-regDate">'+data[i].open_date+'</div>';
			card += '</div>';
			card += '</div>';
			$(card).appendTo(listBox);
		}
		
		$(".chat-CardBox").on("click", function() {
			$(this).find(".chat-chatInfo>.chat-newCnt").text("0");
			$(".chat-chatBoxWrap").css("display", "none");
			var rno = $(this).attr("data-rkey");
			$.getJSON(contextPath + "/chat/auth/msgList.do", {
				roomNo : rno
			}, function(resultObj) {
				outChatRoom(currOpenChatRno);
				var result = resultObj.ajaxResult;
				drawMsg(result.data);
				currOpenChatRno = rno;
				
				
				$(".chat-chatBoxWrap").css("display", "block");
				$(".chat-chatBox").scrollTop($(".chat-chatBox")[0].scrollHeight);
				
				joinChatRoom(rno);
			});
		});
	}
	
	$(".chat-chatListBoxWrap").css("display", "block");
};


var drawMsg = function(data) {
	var msgBox = $(".chat-msgWrap");
	console.dir(data);
	msgBox.parent().attr("data-ridx", data.roomInfo.room_no)
	msgBox.empty();
	if(data.msgList.length>0) {
		var i;
		var msgList = data.msgList;
		for(i=0;i<msgList.length;i++) {
			if(msgList[i].writer_no == data.currUser) {
				// 자신이 쓴 메세지
				var msg = '<div class="chat-msg ownermsg">';
					msg += msgList[i].msg;
					msg += '</div>';	
				msgBox.append(msg);
			}else {
				// 다른사람이 쓴 메세지
				var msg = '<div class="chat-msg othermsg">';
					msg += '<div class="chat-msg-userPhoto"></div>';
					msg += '<span class="chat-msg-userName">';
					msg += data.roomInfo.nname + '</span>';
					msg += msgList[i].msg;
					msg += '</div>';
				msgBox.append(msg);
			}
		}
		
		$("#chat-chatBoxNick").text(data.roomInfo.nname + "님과의 대화");
		$(".chat-msg-userPhoto").css("background-image", "url('"+
				contextPath + "/upload/profile/mp_" + data.roomInfo.m_photo+"')");
	}


};

$(".chat-chatListCloseBtn").on("click", function() {
	$(".chat-chatListBoxWrap").css("display", "none");
	$(".chat-chatBoxWrap").css("display", "none");
	chatListOpenFlag = !chatListOpenFlag;
});

$(".chat-chatBoxCloseBtn").on("click", function() {
	outChatRoom(currOpenChatRno);
	$(".chat-chatBoxWrap").css("display", "none");	
});



/**
*
*	소켓 서버 관련
*
*/
var chatSocket;

var chatConnect = function(data) {
	chatSocket = io.connect(ip+":"+port);
	console.dir(data);
	
	writerInfo.id = data.id;
	writerInfo.mPhoto = data.mPhoto;
	writerInfo.nickName = data.nickName;
	writerInfo.mNo = data.mNo;
	
	chatSocket.emit("login_member", data);
	
	chatSocket.on("recive_msg", function(data) {
		console.dir(data);
		var msgBox = $(".chat-msgWrap");
		// 자신이 쓴 메세지
		var box = '<div class="chat-msg othermsg">';
			box += '<div class="chat-msg-userPhoto"></div>';
			box += '<span class="chat-msg-userName">';
			box += data.writer.nickName + '</span>';
			box += data.msg;
			box += '</div>';
		msgBox.append(box);
		
		$(".chat-msg-userPhoto").css("background-image", "url('"+
				contextPath + "/upload/profile/mp_" + data.writer.mPhoto+"')");
		
		$(".chat-chatBox").scrollTop($(".chat-chatBox")[0].scrollHeight);
	});
	
	chatSocket.on("notice_msg", function(data){
		console.dir(data);
		var cloneBox = $(".chat-chatNoticeBox").clone();
		cloneBox.find(".chat-chatNoticePhoto>img").attr("src", contextPath+"/upload/profile/mp_"+data.photo);
		cloneBox.find(".chat-chatNoticeInfo").text(data.nick + "님에게 메세지가 도착하였습니다.");
		
		cloneBox.appendTo("body").css("display", "block").animate({
			opacity : 1
		}, 500, function() {
			
			$(this).animate({
				opacity : 0
			}, 500, function() {
				$(this).remove();
			});
		}).delay(600);
		
		
		if(chatListOpenFlag) {
			var rIdx = data.roomNo;
			var chatBoxs = $(".chat-CardBox");
			var i;
			for(i=0;i<chatBoxs.length;i++) {
				var cardRoomNo = $(chatBoxs[i]).attr("data-rkey");
				if(cardRoomNo == rIdx) {
					var curr = parseInt($(chatBoxs[i]).find(".chat-chatInfo>.chat-newCnt").text());
					$(chatBoxs[i]).find(".chat-chatInfo>.chat-newCnt").text(++curr);
					break;
				}
			}
		}
	});
};


var chatDisConnect = function() {
	chatSocket.emit("logout_member");
};

var joinChatRoom = function(rno) {
	var rkey = rooms[rno].room_key;
	console.log(rkey);
	chatSocket.emit("join_room", rkey);
};

var outChatRoom = function(rno) {
	if(rno != -1) {
		var rkey = rooms[rno].room_key;
		chatSocket.emit("out_room", rkey);
	}
};

var sendMsg = function() {
	var textBox = $("#chat-inputText");
	var msg = textBox.val();
	var rdata = rooms[currOpenChatRno];
	textBox.val("");
	textBox.focus();
	if(msg.trim().length > 0) {
		chatSocket.emit("send_msg", {
			room : rdata,
			msg : msg,
			writer : writerInfo
		});
		
		var msgBox = $(".chat-msgWrap");
		// 자신이 쓴 메세지
		var box = '<div class="chat-msg ownermsg">';
			box += msg;
			box += '</div>';	
		msgBox.append(box);
		
		$(".chat-chatBox").scrollTop($(".chat-chatBox")[0].scrollHeight);
	}
};


$("#chat-inputText").on("keyup", function() {
	if(event.keyCode == 13) {
		$(".chat-sendBtn").trigger("click");
	}
});

$(".chat-sendBtn").on("click", sendMsg);