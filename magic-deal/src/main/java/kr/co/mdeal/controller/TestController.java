package kr.co.mdeal.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/test/*")
public class TestController {
	
	@RequestMapping("index.do")
	public String indexTest() {
		return "index";
	}
}
