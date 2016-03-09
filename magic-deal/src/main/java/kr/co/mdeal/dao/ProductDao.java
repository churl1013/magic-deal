package kr.co.mdeal.dao;

import java.util.List;

import kr.co.mdeal.domain.Categorie;

public interface ProductDao {
	
	List<Categorie> selectCategories(Categorie cate);
	
}
