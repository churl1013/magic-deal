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
	public int getCheckId(String id) {
		// TODO Auto-generated method stub
		return dao.selectIdCount(id);
	}
	
	@Override
	public int getCheckNick(String nick) {
		// TODO Auto-generated method stub
		return dao.selectNickCount(nick);
	}
	
	@Override
	public void signUp(Member member) {
		// TODO Auto-generated method stub
		dao.insertMember(member);
	}
	
	@Override
	public Member selectLogin(Member member) {
		// TODO Auto-generated method stub
		return dao.selectMemberByIdAndPass(member);
	}
	
	@Override
	public Member getMemberInfo(Member member) {
		// TODO Auto-generated method stub
		member = dao.selectMemberById(member);
		return member;
	}
	
	@Override
	public void updateProfilePhoto(Member member) {
		// TODO Auto-generated method stub
		dao.updateMemberPhoto(member);
	}
	
	@Override
	public void updateMemberInfo(Member member) {
		// TODO Auto-generated method stub
		dao.updateMemberInfo(member);
	}
}
