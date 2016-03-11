package kr.co.mdeal.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;

import org.aspectj.util.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import kr.co.mdeal.domain.AjaxResult;
import kr.co.mdeal.domain.Categorie;
import kr.co.mdeal.domain.Member;
import kr.co.mdeal.domain.Product;
import kr.co.mdeal.domain.ProductPhoto;
import kr.co.mdeal.service.ProductService;
import kr.co.mdeal.util.FileUtils;

@Controller
@RequestMapping("/product/*")
public class ProductController {

	@Autowired
	private ProductService service;
	
	@Autowired
	private ServletContext servletContext;
	
	@RequestMapping(value="regist.do", method=RequestMethod.POST)
	public AjaxResult registProduct(MultipartHttpServletRequest mReq, HttpSession session) throws Exception{
		
		Member login = (Member)session.getAttribute("userLoginInfo");
		if(login!=null) {
			int userNo = login.getmNo();
			
			Product product = new Product();
			Categorie cate = new Categorie();
			ArrayList<ProductPhoto> pphotoList = new ArrayList<>();
			
			String dealType = mReq.getParameter("dealType");
			String content = mReq.getParameter("content");
			String addr = mReq.getParameter("addr");
			Double lat = Double.parseDouble(mReq.getParameter("lat"));
			Double lon = Double.parseDouble(mReq.getParameter("lon"));
			int cateKey = Integer.parseInt(mReq.getParameter("keyNum"));
			
			product.setmNo(userNo);
			product.setDealType(dealType.charAt(0));
			product.setpContent(content);
			product.setpAddr(addr);
			product.setpLat(lat);
			product.setpLon(lon);
			product.setpCategorieNo(cateKey);
			
			cate.setpCategorieNo(cateKey);
			
			if(cateKey == -1) {
				// 새로운 카테고리
				int hCate = Integer.parseInt(mReq.getParameter("hCate"));
				int lCate = Integer.parseInt(mReq.getParameter("lCate"));
				String keyword = mReq.getParameter("keyword");
				
				cate.setpHighCate(hCate);
				cate.setpLowCate(lCate);
				cate.setpKeyword(keyword);
			}
			if(dealType.equals("b")) {
				// 삽니다의 경우
			}else {
				// 팝니다의 경우
				int price = Integer.parseInt(mReq.getParameter("price").replaceAll(",", ""));
				String quality = mReq.getParameter("quality");
				
				product.setPrice(price);
				product.setQuality(quality.charAt(0));
				
				// 경로 설정
				String realPath = servletContext.getRealPath("/upload/product/");
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
				String datePath = sdf.format(new Date());
				
				realPath += datePath;
				File pathFile = new File(realPath);
				
				pathFile.mkdirs();
				
				// 사진
				Iterator<String> fileNames = mReq.getFileNames();
				
				boolean thumbnail = true;
				
				while(fileNames.hasNext()) {
					String fileName = fileNames.next();
					MultipartFile file = mReq.getFile(fileName);
					if(file!=null && !fileName.equals("")) {
						ProductPhoto pp = new ProductPhoto();
						String oriFileName = file.getOriginalFilename();
						String filePath = datePath;
						String ext = FileUtils.getExt(oriFileName);
						String realFileName = UUID.randomUUID().toString()+"."+ext;
						File saveFile = new File(realPath+"/"+realFileName);
						file.transferTo(saveFile);
						
						pp.setpPhotoName(realFileName);
						pp.setpPhotoPath(filePath);
						
						if(thumbnail) {
							FileUtils.imageResize(realPath+"/"+realFileName, 
									realPath+"/thum_"+realFileName, ext, 250, 250);
							pp.setpPhotoThum('y');
							thumbnail = false;
						}
						
						FileUtils.imageResize(realPath+"/"+realFileName, 
								realPath+"/"+realFileName, ext, 500, 500);
						
						pphotoList.add(pp);
					}
				}
			}
			
			
			service.registProduct(product, cate, pphotoList);
		}else {
			throw new ServletException("비정상적인 접근");
		}
		
		
		return new AjaxResult("success", login.getId());
	}
	
	@RequestMapping(value="categorie.do", method=RequestMethod.GET)
	public AjaxResult getCategorie(Categorie cate) {
		List<Categorie> cateList = service.getCategorieKeyword(cate);
		return new AjaxResult("success", cateList);
	}
	
	@RequestMapping("categorieVolume.do")
	public AjaxResult getCategorieVolume() {
		List<HashMap<String, Integer>> cateVolList = service.getCategorieVolume();
		return new AjaxResult("success", cateVolList);
	}
	
	@RequestMapping("allCateImg.do")
	public AjaxResult getCategorieImages() {
		List<HashMap<String, String>> catePhotoList = service.getCategoriesPhoto();
		return new AjaxResult("success", catePhotoList);
	}
	
	@RequestMapping("cateImg.do")
	public AjaxResult getCategorieImage(Categorie cate) {
		ProductPhoto photo = service.getCategoriePhoto(cate);
		return new AjaxResult("success", photo);
	}
	
	
}
