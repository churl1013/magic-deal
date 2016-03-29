package kr.co.mdeal.dao;

import kr.co.mdeal.domain.LikeCheck;
import kr.co.mdeal.domain.Member;

public interface MemberDao {
	int selectIdCount(String id);
	int selectNickCount(String nick);
	int insertMember(Member member);
	Member selectMemberByIdAndPass(Member member);
	Member selectMemberById(Member member);
	void updateMemberPhoto(Member member);
	void updateMemberInfo(Member member);
	void updateMemberProfile(Member member);
	void insertMemberCount(LikeCheck lc);
	void updateCount(LikeCheck lc);
	void deleteMemberCount(LikeCheck lc);
	void deleteCount(LikeCheck lc);
}
