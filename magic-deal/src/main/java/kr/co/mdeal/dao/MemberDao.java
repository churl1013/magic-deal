package kr.co.mdeal.dao;

import kr.co.mdeal.domain.Member;

public interface MemberDao {
	int selectIdCount(String id);
	int selectNickCount(String nick);
	int insertMember(Member member);
	Member selectMemberByIdAndPass(Member member);
	Member selectMemberById(Member member);
	void updateMemberPhoto(Member member);
	void updateMemberInfo(Member member);
}
