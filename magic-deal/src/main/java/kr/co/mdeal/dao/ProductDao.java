package kr.co.mdeal.dao;

import java.util.HashMap;
import java.util.List;

import kr.co.mdeal.domain.Categorie;
import kr.co.mdeal.domain.Product;
import kr.co.mdeal.domain.ProductComment;
import kr.co.mdeal.domain.ProductPhoto;

public interface ProductDao {
	
	List<Categorie> selectCategories(Categorie cate);
	void insertCategorie(Categorie cate);
	void insertProduct(Product product);
	void insertProductPhoto(ProductPhoto photo);
	List<HashMap<String, Integer>> selectHighCateCount();
	List<HashMap<String, String>> selectCategoriesPhoto();
	ProductPhoto selectCategoriePhoto(Categorie cate);
	List<HashMap<String, Object>> selectProductList(Categorie cate);
	HashMap<String, Object> selectProductDetail(Product pro);
	List<ProductPhoto> selectProductPhoto(Product pro);
	List<ProductComment> selectProductComment(HashMap<String, Object> option);
	void insertProductComment(ProductComment comment);
	int selectProductCommentCount(int pNo);
	void deleteProductComment(ProductComment comment);
	List<HashMap<String, Object>> selectAreaProduct(HashMap<String, Object> option);
}
