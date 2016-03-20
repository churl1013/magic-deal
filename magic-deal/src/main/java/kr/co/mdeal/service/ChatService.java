package kr.co.mdeal.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import kr.co.mdeal.domain.ChatRoom;
import kr.co.mdeal.domain.Member;

public interface ChatService {
	List<HashMap<String, Object>> getChatRoomList(Member mem);
	void registRoom(ChatRoom chat);
	int countRoom(ChatRoom chat);
	HashMap<String, Object> getChatRoom(ChatRoom chat);
	List<HashMap<String, Object>> getChatMsgList(ChatRoom chat); 
	void updateReadFlag(ChatRoom chat);
}
