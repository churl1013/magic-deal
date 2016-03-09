package kr.co.mdeal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import kr.co.mdeal.domain.AjaxResult;
import kr.co.mdeal.domain.Categorie;
import kr.co.mdeal.service.ProductService;

@Controller
@RequestMapping("/product/*")
public class ProductController {

	@Autowired
	private ProductService service;
	
	@RequestMapping("regist.do")
	public AjaxResult registProduct() {
		
		return null;
	}
	
	@RequestMapping(value="categorie.do", method=RequestMethod.GET)
	public AjaxResult getCategorie(Categorie cate) {
		List<Categorie> cateList = service.getCategorieKeyword(cate);
		return new AjaxResult("success", cateList);
	}
}
