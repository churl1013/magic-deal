package kr.co.mdeal.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.mdeal.domain.AjaxResult;
import kr.co.mdeal.domain.ChatRoom;
import kr.co.mdeal.domain.Member;
import kr.co.mdeal.service.ChatService;
import kr.co.mdeal.util.OneWayCipherSHA256;

@Controller
@RequestMapping("/chat/*")
public class ChatController {
	
	@Autowired
	private ChatService service;
	
	@RequestMapping("/auth/getRoomList.do")
	public AjaxResult getRoomList(HttpServletRequest req) {
		Member login = (Member)req.getAttribute("auth");
		List<HashMap<String, Object>> roomList = service.getChatRoomList(login);
		return new AjaxResult("success", roomList);
	}
	
	@RequestMapping("/auth/registRoom.do")
	public AjaxResult registRoom(ChatRoom chat, HttpServletRequest req) {
		// 로그인 정보를 받아옴
		Member login = (Member)req.getAttribute("auth");
		
		// 신청자는 로그인한 멤버
		chat.setSubNo(login.getmNo());
		
		String roomStr = chat.getpNo() + "" + chat.getOwnerNo() + "" + chat.getSubNo();
		System.out.println(roomStr);
		// roomKey 발급
		chat.setRoomKey(OneWayCipherSHA256.getSHA256(roomStr));
		
		int existRoom = service.countRoom(chat); 
		if(existRoom==0) {
			service.registRoom(chat);
			return new AjaxResult("success", chat);
		}else {
			return new AjaxResult("fail", null);
		}
	}
	
	
	@RequestMapping("/auth/msgList.do")
	public AjaxResult msgList(ChatRoom chat, HttpServletRequest req) {
		// 로그인 정보를 받아옴
		Member login = (Member)req.getAttribute("auth");
		chat.setOwnerNo(login.getmNo());
		HashMap<String, Object> result = new HashMap<>();
		result.put("currUser", login.getmNo());
		result.put("currUserPhoto", login.getmPhoto());
		result.put("currUserNick", login.getNickName());
		
		HashMap<String, Object> roomInfo = service.getChatRoom(chat);
		List<HashMap<String, Object>> msgList = service.getChatMsgList(chat);
		
		result.put("roomInfo", roomInfo);
		result.put("msgList", msgList);
		
		service.updateReadFlag(chat);
		
		return new AjaxResult("success", result);
	}
}
