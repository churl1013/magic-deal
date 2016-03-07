package kr.co.mdeal.service;

import kr.co.mdeal.domain.Member;

public interface MemberService {
	int checkId(String id);
	int checkNick(String nick);
	void signUp(Member member);
	Member login(Member member);
}
