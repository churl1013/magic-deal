package kr.co.mdeal.domain;

public class Criteria {
	private int page;
	private int perPageNum;
	
	// 기본페이지는 1, 1페이지당 데이터 수는 10으로 지정함
	public Criteria(){
		this.page=1;
		this.perPageNum=10;		
	}
	
	public void setPage(int page){
		if ( page <=0 ){
			this.page =1;
			return;
		}
		this.page=page;
	}
	
	public void setPerPageNum(int perPageNum){
		if (perPageNum <=0 || perPageNum >100){
			this.perPageNum = 10;
			return;
		}
		this.perPageNum = perPageNum;
	}
	
	public int getPage(){
		return page;
	}
	
	// method for MyBatis SQL Mapper -
	// 10개씩 출력하고 3페이지에서 보여지는 데이터는 limit 20, 10
	// 시작데이터번호 = (페이지번호-1) * 페이지당 보여지는 개수
	public int getPageStart(){
		return ( this.page-1 ) * perPageNum;
	}
	
	// method for MyBatis SQL Mapper
	public int getPerPageNum(){
		return this.perPageNum;
	}
	
	@Override
	public String toString(){
		return "Criteria [page="+page+","
				+"perPageNum="+perPageNum+"]";
	}

}
