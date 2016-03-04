package kr.co.mdeal.dao;

import java.util.List;

import kr.co.mdeal.domain.Test;

public interface TestDao {
	
	List<Test> selectList();
	
	int insert(Test test);
}
