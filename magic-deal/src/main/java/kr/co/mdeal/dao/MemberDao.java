package kr.co.mdeal.dao;

import kr.co.mdeal.domain.Member;

public interface MemberDao {
	int selectIdCount(String id);
	int selectNickCount(String nick);
	int insertMember(Member member);
}
