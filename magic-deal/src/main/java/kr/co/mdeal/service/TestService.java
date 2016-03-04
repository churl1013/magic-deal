package kr.co.mdeal.service;

import java.util.List;

import kr.co.mdeal.domain.Test;

public interface TestService {
	void insertData(Test t);
	List<Test> selectData();
}
