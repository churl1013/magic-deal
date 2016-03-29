package kr.co.mdeal.service;

import kr.co.mdeal.domain.LikeCheck;
import kr.co.mdeal.domain.Member;

public interface MemberService {
	int getCheckId(String id);
	int getCheckNick(String nick);
	void signUp(Member member);
	Member selectLogin(Member member);
	Member getMemberInfo(Member member);
	void updateProfilePhoto(Member member);
	void updateMemberInfo(Member member);
	void updateMemberProfile(Member member);
	void insertMemberCount(LikeCheck lc);
	void deleteMemberCount(LikeCheck lc);
}
