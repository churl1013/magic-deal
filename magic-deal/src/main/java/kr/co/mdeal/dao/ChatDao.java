package kr.co.mdeal.dao;

import java.util.HashMap;
import java.util.List;

import kr.co.mdeal.domain.ChatRoom;
import kr.co.mdeal.domain.Member;

public interface ChatDao {
	List<HashMap<String, Object>> selectChatRoomList(Member mem);
	void insertChatRoom(ChatRoom chat);
	int selectCountRoom(ChatRoom chat);
	HashMap<String, Object> selectChatRoom(ChatRoom chat);
	List<HashMap<String, Object>> selectChatMsgList(ChatRoom chat);
	void updateReadFlag(ChatRoom chat);
}
