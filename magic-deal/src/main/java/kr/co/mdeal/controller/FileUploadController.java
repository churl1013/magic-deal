package kr.co.mdeal.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.UUID;

import javax.servlet.ServletContext;

import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;

import kr.co.mdeal.domain.BoardPhoto;
import kr.co.mdeal.service.BoardService;
import kr.co.mdeal.util.MediaUtils;
import kr.co.mdeal.util.UploadFileUtils;

@Controller
public class FileUploadController {
	
	/* list
	 * uploadForm()
	 * uploadFile()
	 * uploadForm()
	 * uploadAjax()
	 * uploadAjax()
	 * displayFile() > html에 화면 표시
	 * deleteFile() > 파일 삭제 처리
	 */
	@Autowired
	private BoardService bdService;
	@Autowired
	private ServletContext servletContext;
	
//	@Resource(name="uploadPath")
	private final String uploadPath="c:\\java77\\md_project\\upload";
	private String savedName;
	
	// JSP 파일 업로드 start ---------------------------------------------------------
	@RequestMapping(value="/uploadForm", method = RequestMethod.POST)
	public String uploadForm(MultipartFile file, Model model) throws Exception {
		System.out.println("uploadForm method: POST");
		System.out.println("OriginalFileName :"+file.getOriginalFilename());
		System.out.println("fileSize :"+file.getSize());
		System.out.println("ContentType :"+file.getContentType());
		savedName = uploadFile(file.getOriginalFilename(), file.getBytes());
		model.addAttribute("savedName", savedName);
		return "uploadResult";
	}
	
	private String uploadFile(String originalName, byte[] fileData) throws Exception {
		UUID uid = UUID.randomUUID();
		savedName = uid.toString()+"_"+originalName;
		//File target = new File(uploadPath, savedName);
		File target = new File(uploadPath, savedName);
		FileCopyUtils.copy(fileData, target);
		return savedName;
	}
	
	@RequestMapping(value="/uploadForm", method = RequestMethod.GET)
	public void uploadForm(){
		System.out.println("uploadForm method: GET");
	}
	
	// JSP 파일 단일 업로드  end --------------------------
	
	/* Ajax에서 파일 업로드 호출하기 
		uploadAjax.jsp에서 .fileDrop Div 에서  drop 이벤트 발생시 호출됨
	 * 		
	 */
	@RequestMapping(value="/file/uploadAjax.do",
							method =RequestMethod.POST,
							produces = "text/plain;charset=UTF-8")
	public ResponseEntity<String> uploadAjax(MultipartFile file) throws Exception {
		
		/* 160331, 17:43 before 
		System.out.println("uploadAjax.do 호출됨");		
		System.out.println("bNo : "+bNo); // add 160329, 1723		
		
		if ( bNo ==-1){
			// 새글 입력이므로 bNo가 없다.
			// 먼저 새로운 bNo값을 가져온다
			bNo =bdService.boardbNoMax()+1;
			System.out.println("새글일때 bNo :"+bNo);
			// board랑 1:다로 연결되어 있어서 먼저 글 작성후 첨부파일이 가능함 
		}
		
		// 파일등록 정보를 테이블에 기록하기
		BoardPhoto boardPhoto = new BoardPhoto();
		boardPhoto.setbNo(bNo); // not null
		System.out.println("UploadController > uploadAjax : bNo :"+bNo);
		boardPhoto.setbPhPath(uploadPath);  // bPhPath unique속성, not null
		boardPhoto.setbPhName(file.getOriginalFilename()); // not null
		boardPhoto.setbPhThum('Y');  
		System.out.println("UploadController > uploadAjax : getOriginalFileName :"+file.getOriginalFilename());				
		bdService.boardAddAttach(boardPhoto); // add 160329, 1723
		 */
		
		System.out.println("OriginalFileName :"+file.getOriginalFilename());
		System.out.println("fileSize :"+file.getSize());
		System.out.println("ContentType :"+file.getContentType());
		
		// 실제로 파일이 등록되는 처리
		return new ResponseEntity<>(
				UploadFileUtils.uploadFile(uploadPath, 
						file.getOriginalFilename(), 
						file.getBytes()),
				HttpStatus.CREATED );
		//return new ResponseEntity<>(file.getOriginalFilename(), HttpStatus.CREATED);
	}
	
	
	// Ajax 파일 업로드 전용 테스트용 url :  http://localhost:8008/mdtest01/uploadAjax.do 로 호출
	// 실제 호출 파일 : /mdtest01/src/main/webapp/WEB-INF/views/uploadAjax.jsp
	@RequestMapping("uploadAjax.do")
	public String uploadAjax(){
		System.out.println("uploadAjax");
		return "uploadAjax";
	}
	
	/*
	 *  전송된 파일을 화면에 표시하기
	 *  1. 파일 이름을 가지고 화면에 태그를 생성해서 추가하는 작업
	 *  2. 컨트롤러에서 특정한 경로의 파일 데이터를 전송하는 작업
	 */
	// fileName : /년/월/일/파일명의 형태로 입력받는다.
	/* test >> http://localhost:8008/mdtest01/file/displayFile.do?
	 			fileName=2016/03/16/bd4cea35-bcde-4fd1-8752-6fe58791b7cc_1455320490964.jpeg
	 
	 */
	@RequestMapping("/file/displayFile")
	public ResponseEntity<byte[]> displayFile(String fileName) throws Exception {
		InputStream in  = null;
		ResponseEntity<byte[]> entity = null;
		System.out.println("displayFile > fileName :"+fileName);
		// ex) fileName :  /2016/03/30/s_a2d1dd84-cb47-4c24-a82b-5f9e09355ab6_6dragon03.jpg
		try{
			// 1. 확장자를 추출하고, 이미지 타입이 파일인 경우는 적절한 MIME 타입을 지정합니다
			String formatName = fileName.substring(fileName.lastIndexOf(".")+1);
			MediaType mType = MediaUtils.getMediaType(formatName);
			HttpHeaders headers = new HttpHeaders();
			in = new FileInputStream(uploadPath+fileName);
			if( mType !=null){
				headers.setContentType(mType);
			} else{
				fileName = fileName.substring(fileName.indexOf("_")+1);
				headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
				headers.add("Content-Disposition", "attachment; fileName=\""+
								new String(fileName.getBytes("UTF-8"), "ISO-8859-1")+"\"");
			}
			entity = new ResponseEntity<byte[]>(IOUtils.toByteArray(in),
					headers,
					HttpStatus.CREATED);
			
		}catch(Exception e){
			e.printStackTrace();
			entity = new ResponseEntity<byte[]>(HttpStatus.BAD_REQUEST);
		} finally {
			in.close();
		}
		return entity;		
	}
	
	// 첨부파일 삭제 처리
	
	@RequestMapping("/file/deleteFile.do")
	public ResponseEntity<String> deleteFile(String fileName, int bNo){
		System.out.println("deleteFile > fileName : "+fileName);
		// 확장자 이후로 문자를 뒤에서 짜른다. > 확장자 구하기
		System.out.println("deleteFile > bNo :"+bNo);
		if ( bNo != -1){
			//bdService.deleteBoardPhoto(bNo); // 20160330
		}
		
		String formatName = fileName.substring(fileName.lastIndexOf(".")+1);
		MediaType mType =MediaUtils.getMediaType(formatName);
		if ( mType != null){
			String front = fileName.substring(0, 12);
			String end = fileName.substring(14);
			System.out.println("delete01 : "+uploadPath +(front+end).replace('/', File.separatorChar));
			new File(uploadPath +(front+end).replace('/', File.separatorChar)).delete(); // 원복삭제
		}
		new File(uploadPath+ fileName.replace('/', File.separatorChar)).delete(); // 썸네일삭제
		System.out.println("delete02:"+uploadPath+ fileName.replace('/', File.separatorChar));
		
		return new ResponseEntity<String>("deleted", HttpStatus.OK);
	}
	

}
