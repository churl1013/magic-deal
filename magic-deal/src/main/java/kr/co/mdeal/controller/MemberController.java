package kr.co.mdeal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.mdeal.domain.AjaxResult;
import kr.co.mdeal.domain.Member;
import kr.co.mdeal.service.MemberService;
import kr.co.mdeal.util.OneWayCipherSHA256;

@Controller
@RequestMapping("/member/*")
public class MemberController {
	
	@Autowired
	private MemberService service;
	
	@RequestMapping("checkId.do")
	public Object checkId(String id) {
		int chkCnt = service.checkId(id);
		return new AjaxResult(chkCnt+"", null);
	}
	
	@RequestMapping("checkNick.do")
	public Object checkNick(String nick) {
		int chkCnt = service.checkNick(nick);
		return new AjaxResult(chkCnt+"", null);
	}
	
	@RequestMapping("signUp.do")
	public Object checkNick(Member member) {
		member.setPassword(
				OneWayCipherSHA256.getSHA256(member.getPassword()));
		service.signUp(member);
		return new AjaxResult("success", null);
	}
}
