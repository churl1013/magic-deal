package kr.co.mdeal.controller;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

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
	
	@RequestMapping("login.do")
	public Object login(Member member, HttpSession session) {
		member.setPassword(
				OneWayCipherSHA256.getSHA256(member.getPassword()));
		Member login = service.login(member);
		if(login != null) {
			// 로그인 성공 (세션에 로그인 정보 등록 및 로그인 객체 반환)
			session.setAttribute("userLoginInfo", login);
			return new AjaxResult("success", login);
		}else {
			// 로그인 실패 (로그인 실패 메세지 반환)
			return new AjaxResult("fail", null);
		}
	}
	
	@RequestMapping("loginCheck.do")
	public Object loginCheck(HttpSession session) {
		Member login = (Member)session.getAttribute("userLoginInfo");
		if(login != null) {
			// 로그인 성공 (세션에 로그인 정보 등록 및 로그인 객체 반환)
			return new AjaxResult("success", login);
		} else {
			// 로그인 실패 (로그인 실패 메세지 반환)
			return new AjaxResult("fail", null);
		}
	}
	
	@RequestMapping("logout.do")
	public Object logout(HttpSession session) {
		session.setAttribute("userLoginInfo", null);
		return new AjaxResult("success", null);
	}
}
