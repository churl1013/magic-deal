package kr.co.mdeal.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import kr.co.mdeal.domain.Categorie;
import kr.co.mdeal.domain.Member;
import kr.co.mdeal.domain.Product;
import kr.co.mdeal.domain.ProductComment;
import kr.co.mdeal.domain.ProductPhoto;

public interface ProductService {
	List<Categorie> getCategorieKeyword(Categorie cate);
	void registProduct(Product product, Categorie cate, ArrayList<ProductPhoto> photoList);
	void updateProduct(Product product, Categorie cate, ArrayList<ProductPhoto> photoList, ArrayList<ProductPhoto> newPhotoList);
	List<HashMap<String, Integer>> getCategorieVolume();
	List<HashMap<String, String>> getCategoriesPhoto();
	ProductPhoto getCategoriePhoto(Categorie cate);
	List<HashMap<String, Object>> getProductList(Categorie cate);
	HashMap<String, Object> getProductDetail(Product pro);
	void registProductComment(ProductComment comment);
	HashMap<String, Object> getProductComment(HashMap<String, Object> option); 
	void deleteProductComment(ProductComment comment);
	List<HashMap<String, Object>> getAreaProduct(Member mem, Categorie cate);
	HashMap<String, Object> getProductMyList(HashMap<String, Object> option);
	void deleteProductDelete(Product pro);
	void updateDealStep(Product pro);
}
