package kr.co.mdeal.service;

import java.util.List;

import kr.co.mdeal.domain.Categorie;

public interface ProductService {
	List<Categorie> getCategorieKeyword(Categorie cate);
}
