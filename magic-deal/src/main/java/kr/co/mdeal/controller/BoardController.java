package kr.co.mdeal.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.spi.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.mysql.fabric.xmlrpc.base.Param;

import kr.co.mdeal.domain.Board;
import kr.co.mdeal.domain.BoardComment;
import kr.co.mdeal.domain.Criteria;
import kr.co.mdeal.domain.PageMaker;
import kr.co.mdeal.service.BoardService;

@Controller
@RequestMapping("/board/ajax/*")
public class BoardController {
	
	
	@Autowired
	private BoardService boardservice;
	@Autowired
	private ServletContext servletContext;
	
	// board Regist
	@Transactional  // 2016-3-17 20:00 add
	@RequestMapping("regist.do")
	public void boardRegist(Board board) throws Exception{
		System.out.println("boardRegist in : bTitle "+board.getbTitle());
		boardservice.registBoard(board);		
		
	}

	@RequestMapping("list.do")
	public Object boardList(@RequestParam int page){
		System.out.println("paging list 0328 in > page :"+page);
		Criteria cri = new Criteria();
		cri.setPage(page);
		System.out.println("list.do > page : "+page);
		PageMaker pageMaker = new PageMaker();
		pageMaker.setCri(cri);
		System.out.println("list.do > pageMaker : "+pageMaker);
		System.out.println("board 목록에서 boardListPage 호출전");
		List<Board> boards;
		HashMap<String,Object>  resultMap = new HashMap<>();
		try {
			boards = boardservice.boardListPage(cri);
			System.out.println("board 목록에서 boardListPage 호출후");
			resultMap.put("status", "success");
			resultMap.put("data", boards);
			System.out.println("list.do : boards"+boards);
		} catch (Exception e) {			
			e.printStackTrace();
		}	
		
		int boardCount = boardservice.countAllBoard();
		System.out.println("boardList boardCount :"+boardCount);
		pageMaker.setTotalCount(boardCount);
		resultMap.put("pageMaker", pageMaker);
		
		return resultMap;		
	}
		
	@RequestMapping("detail.do")
	public Board boardDetail(int no){
		System.out.println("detail.do no :"+no);
		Board board = boardservice.selectOne(no);
		System.out.println("detail.do board :"+board);
		
		return board;
	}
	
	@RequestMapping("test.do")
	public String test() {
		System.out.println("컨트롤러");
		return "test";
	}
	
	@RequestMapping("update.do")
	public void boardUpdate(Board board){
		System.out.println("update : board.no"+board.getbNo());
		boardservice.updateBoard(board);
	}
	
	@RequestMapping("delete.do")
	public void boardDelete(int no){
		System.out.println("컨트롤러 > deleteBoard no :"+no);
		boardservice.deleteBoard(no);
	}
		
	// test용 적용 안함
	@RequestMapping(value="/all/{bNo}", method=RequestMethod.GET)
	public ResponseEntity<List<BoardComment>> cmtList(@PathVariable("bNo") int bNo){
		ResponseEntity<List<BoardComment>> entity = null;
		try{
		System.out.println("댓글 list에 넘어온 bno : "+bNo);
		entity = new ResponseEntity<>(boardservice.selectCommentList(bNo), HttpStatus.OK);

		} catch(Exception e){
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		return entity;
	}
	
	
	@RequestMapping("cmtRegist")
	public BoardComment registComment(BoardComment bcmt){
		System.out.println("controller > cmtRegist.do in > bNo :"+bcmt.getbNo());  
		return boardservice.registComment(bcmt);
	}
	
	@RequestMapping("commentDelete.do")
	public String deleteComment(int bcNo){
		System.out.println("controller cmtDelete bcNo :"+bcNo);
		boardservice.deleteComment(bcNo);
		return "success";
	}
	
	@RequestMapping("commentUpdate.do")
	public void editComment(BoardComment bcmt){
		System.out.println("controller updateComment in bcNo :"+bcmt.getBcNo());
		boardservice.updateComment(bcmt);
	}
	
	// 댓글 페이징 처리 2016-3-21 : 3/23 17:08
//	public List<BoardComment> replyListPage(int bNo, Criteria cri) throws Exception{
	// ResponseEntity 타입은 개발자가 직접 결과 데이터 + HTTP의 상태코드를 직접 제어할 수 있는 클래스
	// @PathVariable URL경로에 변수를 넣어주는 기능
	/* book example page 393
	@RequestMapping(value="cmtList.do/{bNo}/{page}")
	public ResponseEntity<Map<String, Object>> cmtListPage(
			@PathVariable("bNo") int bNo, 
			@PathVariable("page") int page) {
	 */
	@RequestMapping("cmtListPage.do")
	public ResponseEntity<Map<String, Object>> cmtListPage(Board board, @RequestParam int page) {
//		public ResponseEntity<Map<String, Object>> cmtListPage(int bNo,  int page) {
		ResponseEntity<Map<String, Object>> entity = null;
		System.out.println(" cmtListPage > bNo :"+ board.getbNo());
		System.out.println("page :"+page);
		int bNo =board.getbNo();
		
		try{			
			Criteria cri = new Criteria();
			cri.setPage(page);
			
			PageMaker pageMaker = new PageMaker();
			pageMaker.setCri(cri);
			
			Map<String, Object> map = new HashMap<String, Object>();
			System.out.println("boardservice.replyListPage 호출전 : ");
				
			List<BoardComment> cmtList = boardservice.replyListPage(bNo, cri);
			System.out.println("boardservice.replyListPage 호출후 cmtList : ");

			map.put("cmtList", cmtList);
			System.out.println("boardservice.count 호출전 : ");
			int replyCount = boardservice.count(bNo);
			System.out.println("boardservice.count 호출후 : ");
			pageMaker.setTotalCount(replyCount);
			
			map.put("pageMaker", pageMaker);			
			entity = new ResponseEntity<Map<String,Object>>(map, HttpStatus.OK);
			
		} catch(Exception e){
			e.printStackTrace();
			entity = new ResponseEntity<Map<String,Object>>(HttpStatus.BAD_REQUEST);
		}		
		return entity;
	}

}
