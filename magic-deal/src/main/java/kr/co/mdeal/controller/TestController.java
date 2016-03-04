package kr.co.mdeal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import kr.co.mdeal.domain.Test;
import kr.co.mdeal.service.TestService;

@Controller
@RequestMapping("/test/*")
public class TestController {
	
	@Autowired
	private TestService service;
	
	@RequestMapping("index.do")
	public String indexTest(Model model) {
		List<Test> testList = service.selectData();
		model.addAttribute("list", testList);
		return "index";
	}
	
	@RequestMapping(value="insert.do", method=RequestMethod.GET)
	public String getInsert() {
		return "insert";
	}
	
	@RequestMapping(value="insert.do", method=RequestMethod.POST)
	public String postInsert(Test t) {
		service.insertData(t);
		return "redirect:index.do";
	}
}
