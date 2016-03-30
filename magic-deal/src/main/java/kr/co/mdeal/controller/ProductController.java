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
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.aspectj.util.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import kr.co.mdeal.domain.AjaxResult;
import kr.co.mdeal.domain.Categorie;
import kr.co.mdeal.domain.Member;
import kr.co.mdeal.domain.Product;
import kr.co.mdeal.domain.ProductComment;
import kr.co.mdeal.domain.ProductPhoto;
import kr.co.mdeal.service.ProductService;
import kr.co.mdeal.util.ContentProcess;
import kr.co.mdeal.util.FileUtils;

@Controller
@RequestMapping("/product/*")
public class ProductController {
	
	@Autowired
	private ProductService service;
	
	@Autowired
	private ServletContext servletContext;
	
	@RequestMapping(value="auth/regist.do", method=RequestMethod.POST)
	public AjaxResult registProduct(MultipartHttpServletRequest mReq) throws Exception{
		
		Member login = (Member)mReq.getAttribute("auth");
		if(login!=null) {
			int userNo = login.getmNo();
			
			Product product = new Product();
			Categorie cate = new Categorie();
			ArrayList<ProductPhoto> pphotoList = new ArrayList<>();
			
			String dealType = mReq.getParameter("dealType");
			String dealOpt = mReq.getParameter("opt");
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
			product.setDealOpt(dealOpt.charAt(0));
			
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
			if(dealType.equals("s")) {
				// 팝니다의 경우
				int price = Integer.parseInt(mReq.getParameter("price").replaceAll(",", ""));
				String quality = mReq.getParameter("quality");
				product.setPrice(price);
				product.setQuality(quality.charAt(0));
			}else {				
				product.setPrice(0);
				product.setQuality('z');
			}
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
								realPath+"/thum_"+realFileName, ext, 350, 350);
						pp.setpPhotoThum('y');
						thumbnail = false;
					}
					
					FileUtils.imageResize(realPath+"/"+realFileName, 
							realPath+"/"+realFileName, ext, 800, 800);
					
					pphotoList.add(pp);
				}
			}
			
			service.registProduct(product, cate, pphotoList);
		}else {
			throw new ServletException("비정상적인 접근");
		}
		
		
		return new AjaxResult("success", login.getId());
	}
	
	
	@RequestMapping(value="auth/update.do", method=RequestMethod.POST)
	public AjaxResult updateProduct(MultipartHttpServletRequest mReq) throws Exception{
		Member login = (Member)mReq.getAttribute("auth");
		
		if(login!=null) {
			int userNo = login.getmNo();
			
			Product product = new Product();
			Categorie cate = new Categorie();
			ArrayList<ProductPhoto> pphotoList = new ArrayList<>();
			ArrayList<ProductPhoto> pNewPhotoList = new ArrayList<>();
			
			int pNo = Integer.parseInt(mReq.getParameter("pNo"));
			String dealType = mReq.getParameter("dealType");
			String dealOpt = mReq.getParameter("opt");
			String content = mReq.getParameter("content");
			String addr = mReq.getParameter("addr");
			Double lat = Double.parseDouble(mReq.getParameter("lat"));
			Double lon = Double.parseDouble(mReq.getParameter("lon"));
			int cateKey = Integer.parseInt(mReq.getParameter("keyNum"));
			
			product.setpNo(pNo);
			product.setmNo(userNo);
			product.setDealType(dealType.charAt(0));
			product.setpContent(content);
			product.setpAddr(addr);
			product.setpLat(lat);
			product.setpLon(lon);
			product.setpCategorieNo(cateKey);
			product.setDealOpt(dealOpt.charAt(0));
			
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
			if(dealType.equals("s")) {
				// 팝니다의 경우
				int price = Integer.parseInt(mReq.getParameter("price").replaceAll(",", ""));
				String quality = mReq.getParameter("quality");
				product.setPrice(price);
				product.setQuality(quality.charAt(0));
			}else {				
				product.setPrice(0);
				product.setQuality('z');
			}
			
			// 경로 설정
			String realPath = servletContext.getRealPath("/upload/product/");
			String datePath = mReq.getParameter("photoPath");
			realPath += datePath;
			File pathFile = new File(realPath);
			
			pathFile.mkdirs();
			
			// 사진
			Iterator<String> fileNames = mReq.getFileNames();
			
			boolean thumbnail = false;
			boolean appendPhoto = false;
			
			while(fileNames.hasNext()) {
				String fileName = fileNames.next();
				String[] photoInfo = fileName.split("-");
				int pPhotoNo = -1;
				System.out.println(fileName);
				if(photoInfo.length>2) {
					//thumbnail
					if(photoInfo[1].equals("t")) {
						thumbnail = true;
						pPhotoNo = Integer.parseInt(photoInfo[2]);
					}else {
						appendPhoto = true;
					}
				}else {
					pPhotoNo = Integer.parseInt(photoInfo[1]);
				}
				MultipartFile file = mReq.getFile(fileName);
				if(file!=null && !fileName.equals("")) {
					ProductPhoto pp = new ProductPhoto();
					pp.setpPhotoThum('n');
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
								realPath+"/thum_"+realFileName, ext, 350, 350);
						pp.setpPhotoThum('y');
						thumbnail = false;
					}
					
					FileUtils.imageResize(realPath+"/"+realFileName, 
							realPath+"/"+realFileName, ext, 800, 800);
					
					if(!appendPhoto) {
						pp.setpPhotoNo(pPhotoNo);
						pphotoList.add(pp);
					}else {
						pNewPhotoList.add(pp);
						appendPhoto = false;
					}
				}
			}
			
			service.updateProduct(product, cate, pphotoList, pNewPhotoList);
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
	
	@RequestMapping("list.do")
	public AjaxResult getProductList(Categorie cate) {
		List<HashMap<String, Object>> productList = service.getProductList(cate);
		return new AjaxResult("success", productList);
	}

	@RequestMapping("detail.do")
	public AjaxResult getProductDetail(Product pro, HttpSession session) {
		Member login = (Member)session.getAttribute("userLoginInfo");
		String lId = "";
		if(login!=null) {
			lId = login.getId();
		}
		HashMap<String, Object> productDetail = service.getProductDetail(pro);
		productDetail.put("pContent", ContentProcess.enterChange(productDetail.get("pContent").toString()));
		productDetail.put("lId", lId);
		return new AjaxResult("success", productDetail);
	}

	@RequestMapping("auth/commentRegist.do")
	public AjaxResult commentRegist(ProductComment comment, HttpServletRequest req) {
		Member login = (Member)req.getAttribute("auth");
		int mNo = login.getmNo();
		comment.setmNo(mNo);
		service.registProductComment(comment);
		
		return new AjaxResult("success", null);
	}
	
	@RequestMapping("auth/commentDelete.do")
	public AjaxResult commentDelete(ProductComment comment, HttpServletRequest req) {
		Member login = (Member)req.getAttribute("auth");
		int mNo = login.getmNo();
		comment.setmNo(mNo);

		service.deleteProductComment(comment);
		return new AjaxResult("success", null);
	}
	
	@RequestMapping("productDelete.do")
	public AjaxResult productDelete(Product pro) {
		int pNo = pro.getpNo();
		pro.setpNo(pNo);
		
		service.deleteProductDelete(pro);
		return new AjaxResult("success", null);
	}
	
	@RequestMapping("dealStepChange.do")
	public AjaxResult dealStepChange(Product pro) {
		int pNo = pro.getpNo();
		pro.setpNo(pNo);
		
		service.updateDealStep(pro);
		return new AjaxResult("success", null);
	}
	
	@RequestMapping("commentList.do")
	public AjaxResult commentList(Product product, @RequestParam(defaultValue="1")int page, HttpSession session) {
		HashMap<String, Object> option = new HashMap<>();
		option.put("pNo", product.getpNo());
		option.put("start", (page-1)*8);
		
		Member login = (Member)session.getAttribute("userLoginInfo");
		String lId = "";
		if(login!=null) {
			lId = login.getId();
		}
		
		HashMap<String, Object> result = service.getProductComment(option);
		result.put("lId", lId);
		
		return new AjaxResult("success", result);
	}
	
	
	@RequestMapping("areaSearch.do")
	public AjaxResult areaSearch(Member mem, Categorie cate) {
		List<HashMap<String, Object>> result = service.getAreaProduct(mem, cate);
		return new AjaxResult("success", result);
	}
	
	
	@RequestMapping("myList.do")
	public AjaxResult getProductMyListtList(Member mem, @RequestParam(defaultValue="1")int page, HttpSession session, Product pro,@RequestParam(defaultValue="") String key) {
		HashMap<String, Object> option = new HashMap<>();
		option.put("mNo", mem.getmNo());
		option.put("start", (page-1)*6);
		option.put("dealType", pro.getDealType());
		if(key.length()>0) 
			option.put("keyword", key);
		Member login = (Member)session.getAttribute("userLoginInfo");
		String lId = "";
		if(login!=null) {
			lId = login.getId();
		}
		
		HashMap<String, Object> productResult = service.getProductMyList(option);
		
		HashMap<String,Object> result = new HashMap<>();
		result.put("lId", lId);
		result.put("resultList", productResult);
		
		return new AjaxResult("success", result);
	}
	
	@RequestMapping("share.do")
	public String redirectSharePage(@RequestParam int n, Model model) {
		Product pro = new Product();
		pro.setpNo(n);
		HashMap<String, Object> productDetail = service.getProductDetail(pro);
		productDetail.put("pContent", ContentProcess.enterChange(productDetail.get("pContent").toString()));
		
		model.addAttribute("productDetail",productDetail);
		
		return "detail";
	}
}
