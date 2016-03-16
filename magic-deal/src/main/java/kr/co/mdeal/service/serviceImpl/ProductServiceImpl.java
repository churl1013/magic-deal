package kr.co.mdeal.service.serviceImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.mdeal.dao.ProductDao;
import kr.co.mdeal.domain.Categorie;
import kr.co.mdeal.domain.Product;
import kr.co.mdeal.domain.ProductComment;
import kr.co.mdeal.domain.ProductPhoto;
import kr.co.mdeal.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService{
	
	@Autowired
	private ProductDao dao;
	
	@Override
	public List<Categorie> getCategorieKeyword(Categorie cate) {
		// TODO Auto-generated method stub
		return dao.selectCategories(cate);
	}
	
	@Override
	public void registProduct(Product product, Categorie cate, ArrayList<ProductPhoto> photoList) {
		// TODO Auto-generated method stub
		// 카테고리 번호가 존재하는지 확인
		// 카테고리 번호가 없는 카테고리면 카테고리 먼저 입력
		// 카테고리 번호가 이미 존재한다면 바로 상품 입력
		// 상품 입력 후 파일 입력

		if(cate.getpCategorieNo() == -1) {
			dao.insertCategorie(cate);
		}
		
		product.setpCategorieNo(cate.getpCategorieNo());
		dao.insertProduct(product);
		
		for(ProductPhoto pp : photoList) {
			pp.setpNo(product.getpNo());
			dao.insertProductPhoto(pp);
		}
	}
	
	@Override
	public List<HashMap<String, Integer>> getCategorieVolume() {
		// TODO Auto-generated method stub
		return dao.selectHighCateCount();
	}
	
	@Override
	public List<HashMap<String, String>> getCategoriesPhoto() {
		// TODO Auto-generated method stub
		return dao.selectCategoriesPhoto();
	}
	
	@Override
	public ProductPhoto getCategoriePhoto(Categorie cate) {
		// TODO Auto-generated method stub
		return dao.selectCategoriePhoto(cate);
	}
	
	@Override
	public List<HashMap<String, Object>> getProductList(Categorie cate) {
		// TODO Auto-generated method stub
		return dao.selectProductList(cate);
	}
	
	@Override
	public HashMap<String, Object> getProductDetail(Product pro) {
		// TODO Auto-generated method stub
		HashMap<String, Object> result = dao.selectProductDetail(pro);
		List<ProductPhoto> photoList = dao.selectProductPhoto(pro);
		List<ProductComment> commentList = dao.selectProductCommentInit(pro);
		result.put("photoList", photoList);
		result.put("commentList", commentList);
		return result;
	}
	
	@Override
	public void registProductComment(ProductComment comment) {
		// TODO Auto-generated method stub
		dao.insertProductComment(comment);
	}
}
