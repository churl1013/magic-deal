package kr.co.mdeal.service.serviceImpl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.mdeal.dao.ChatDao;
import kr.co.mdeal.domain.ChatRoom;
import kr.co.mdeal.domain.Member;
import kr.co.mdeal.service.ChatService;

@Service
public class ChatServiceImpl implements ChatService {
	
	@Autowired
	private ChatDao dao;
	
	@Override
	public List<HashMap<String, Object>> getChatRoomList(Member mem) {
		// TODO Auto-generated method stub
		return dao.selectChatRoomList(mem);
	}
	
	@Override
	public void registRoom(ChatRoom chat) {
		// TODO Auto-generated method stub
		dao.insertChatRoom(chat);
	}
	
	@Override
	public int countRoom(ChatRoom chat) {
		// TODO Auto-generated method stub
		return dao.selectCountRoom(chat);
	}
	
	@Override
	public HashMap<String, Object> getChatRoom(ChatRoom chat) {
		// TODO Auto-generated method stub
		return dao.selectChatRoom(chat);
	}
	
	@Override
	public List<HashMap<String, Object>> getChatMsgList(ChatRoom chat) {
		// TODO Auto-generated method stub
		return dao.selectChatMsgList(chat);
	}
	
	@Override
	public void updateReadFlag(ChatRoom chat) {
		// TODO Auto-generated method stub
		// 채팅방을 읽어올때 읽지 않은 글을 모두 읽은글로 표시함
		dao.updateReadFlag(chat);
	}
}
