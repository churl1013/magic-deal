package kr.co.mdeal.controller;

import java.io.File;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import kr.co.mdeal.domain.AjaxResult;
import kr.co.mdeal.domain.Member;
import kr.co.mdeal.service.MemberService;
import kr.co.mdeal.util.ContentProcess;
import kr.co.mdeal.util.FileUtils;
import kr.co.mdeal.util.OneWayCipherSHA256;

@Controller
@RequestMapping("/member/*")
public class MemberController {
	
	static Logger logger = Logger.getLogger(MemberController.class);
	
	public static final String SAVED_DIR = "/upload";
	@Autowired
	private MemberService service;
	@Autowired
	private ServletContext servletContext;
	
	@RequestMapping("signUp.do")
	public AjaxResult signUp(Member member) {
		member.setPassword(
				OneWayCipherSHA256.getSHA256(member.getPassword()));
		member.setmPhoto("default.svg");
		service.signUp(member);
		return new AjaxResult("success", null);
	}
	
	@RequestMapping("login.do")
	public AjaxResult login(Member member, HttpSession session) {
		member.setPassword(
				OneWayCipherSHA256.getSHA256(member.getPassword()));
		Member login = service.selectLogin(member);
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
	public AjaxResult loginCheck(HttpSession session) {
		Member login = (Member)session.getAttribute("userLoginInfo");
		if(login != null) {
			login.setmInfo(ContentProcess.enterChange(login.getmInfo()));
			// 로그인 성공 (세션에 로그인 정보 등록 및 로그인 객체 반환)
			return new AjaxResult("success", login);
		} else {
			// 로그인 실패 (로그인 실패 메세지 반환)
			return new AjaxResult("fail", null);
		}
	}
	
	@RequestMapping("auth/logout.do")
	public AjaxResult logout(HttpSession session) {
		session.setAttribute("userLoginInfo", null);
		return new AjaxResult("success", null);
	}
	
	// 마이페이지 주인 정보 가져옴
	@RequestMapping("ownerinfo.do")
	public AjaxResult ownerInfo(Member member) {
		member = service.getMemberInfo(member);
		if(member != null)
			return new AjaxResult("success", member);
		else
			return new AjaxResult("fail", null);
	}
	
	
	// 자기소개 수정
	@RequestMapping(value="auth/infoupdate.do", method=RequestMethod.POST)
	public AjaxResult infoUpdate(Member member, HttpServletRequest req) {
		Member login = (Member)req.getAttribute("auth");
		member.setId(login.getId());
		
		service.updateMemberInfo(member);
		login.setmInfo(member.getmInfo());
		return new AjaxResult("success", member.getmInfo());
	}
	
	// 개인정보 수정
	@RequestMapping(value="auth/profileUpdate.do", method=RequestMethod.POST)
	public AjaxResult profileUpdate(Member member, HttpServletRequest req) {
		Member login = (Member)req.getAttribute("auth");
		member.setId(login.getId());
		member.setPassword(
				OneWayCipherSHA256.getSHA256(member.getPassword()));
		login.setNickName(member.getNickName());
		login.setmAddr(member.getmAddr());
		login.setmLat(member.getmLat());
		login.setmLon(member.getmLon());
		service.updateMemberProfile(member);
		return new AjaxResult("success", null);
	}
	
	// 프로필 사진을 업로드하고 Member의 mPhoto에 경로 삽입
	@RequestMapping(value="auth/profilephoto.do", method=RequestMethod.POST)
	public AjaxResult profilePhotoChange(HttpServletRequest req,
		      @RequestParam("file") MultipartFile file) throws Exception {
		Member login = (Member)req.getAttribute("auth");
		String realPath = servletContext.getRealPath("/upload/");
		String oriFileName = file.getOriginalFilename();
		String ext = FileUtils.getExt(oriFileName);
		
		String fileName = login.getId()+"."+ext;
		String filePath = realPath + "profile/";
		
		login.setmPhoto(fileName);
		File oriFile = new File(filePath + fileName);
		file.transferTo(oriFile);
		
		FileUtils.imageResize(filePath+fileName, filePath+"mp_"+fileName, ext, 250, 200);
		FileUtils.imageResize(filePath+fileName, filePath+"log_"+fileName, ext, 30, 30);
		
		oriFile.delete();
		
		// update 진행
		service.updateProfilePhoto(login);
		
		logger.debug("Profile Photo Change : USER ID = " + login.getId());
		
		return new AjaxResult("success", null);
	}
}
