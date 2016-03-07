package kr.co.mdeal.service.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.mdeal.dao.MemberDao;
import kr.co.mdeal.domain.Member;
import kr.co.mdeal.service.MemberService;

@Service
public class MemberServiceImpl implements MemberService{
	
	@Autowired
	private MemberDao dao;
	
	@Override
	public int checkId(String id) {
		// TODO Auto-generated method stub
		return dao.selectIdCount(id);
	}
	
	@Override
	public int checkNick(String nick) {
		// TODO Auto-generated method stub
		return dao.selectNickCount(nick);
	}
	
	@Override
	public void signUp(Member member) {
		// TODO Auto-generated method stub
		dao.insertMember(member);
	}
	
	@Override
	public Member login(Member member) {
		// TODO Auto-generated method stub
		return dao.selectMember(member);
	}
}
