package kr.co.mdeal.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import kr.co.mdeal.domain.Member;

public class AuthInterceptor implements HandlerInterceptor{

	@Override
	public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		// TODO Auto-generated method stub
	}

	@Override
	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
			throws Exception {
		// TODO Auto-generated method stub
	}

	@Override
	public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object bean) throws Exception {
		// TODO Auto-generated method stub
		HttpSession session = req.getSession();
		Member login = (Member)session.getAttribute("userLoginInfo");
		
		if(login != null) {			
			req.setAttribute("auth", login);
			//System.out.println("로그인한 상태");
			return true;
		}else {
			System.out.println("비 로그인 상태 - 올바르지 않은 접근");
			return false;
		}		
	}
	
}
