package kr.co.mdeal.util;

import java.awt.image.BufferedImage;
import java.io.File;
import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.imgscalr.Scalr;
import org.springframework.util.FileCopyUtils;

public class UploadFileUtils {
	
		// 파라미터 >>>  uploadPath : 파일의 저장경로 // 원본파일의 이름 // 파일 데이터
		public static String uploadFile(String uploadPath, String originalName, byte[] fileData) throws Exception{
			// 1. UUID를 이용한 고유한 값 생성 : 550쪽
			UUID uid = UUID.randomUUID();
			// 2. UUID와 결합한 업로드 파일 이름 생성
			String savedName = uid.toString()+"_"+originalName;
			System.out.println("uploadFile in > savedName :"+savedName);
			// ex) 결과 값 : 01f58cf1-f063-458e-8997-d8d58b1d7566_woman03.jpg
			// 3. 파일이 저장될 년/월/일 정보생성
			String savedPath = calcPath(uploadPath); // 파일 저장경로의 날짜 폴더를 만들고 최종 폴더명을 리턴한다.
			// 4. 업로드 기본 정보(uploadPath)와 년/월/일 폴더 생성			
			File target = new File(uploadPath+savedPath, savedName);
			// 5. 기본 경로 + 폴더 경로 + 파일 이름으로 파일 저장
			FileCopyUtils.copy(fileData, target);  // 원본파일저장 : 원본파일을 타겟위치에 저장이름으로 저장한다.
			
			String formatName = originalName.substring(originalName.lastIndexOf(".")+1);
			String uploadedFileName = null;
			if ( MediaUtils.getMediaType(formatName) != null ){
				uploadedFileName = makeThumbnail(uploadPath, savedPath, savedName);
			} else{
				uploadedFileName = makeIcon(uploadPath, savedPath, savedName);
			}
			return uploadedFileName;
		}
				
		private static String makeIcon(String uploadPath, String path, String fileName) throws Exception {
			String iconName = uploadPath + path + File.separator+fileName;
			System.out.println("makeIcon in > iconName :"+iconName);
			return iconName.substring(uploadPath.length()).replace(File.separatorChar, '/');
		}

		// 파일의 지정경로를 날짜로 만드는 준비
		private static String calcPath(String uploadPath){
			Calendar cal = Calendar.getInstance();
			String yearPath = File.separator+cal.get(Calendar.YEAR);  // File.separator 파일구분자  \\ // 대용
			System.out.println("calcPath in > yearPath :"+yearPath);
			String monthPath = yearPath + File.separator+new DecimalFormat("00").format(cal.get(Calendar.MONTH)+1);
			System.out.println("calcPath in > monthPath :"+monthPath);
			String datePath = monthPath + File.separator + new DecimalFormat("00").format(cal.get(Calendar.DATE));
			System.out.println("calcPath in > datePath :"+datePath);
			makeDir(uploadPath, yearPath, monthPath, datePath);
			return datePath;
		}
		
		private static void makeDir(String uploadPath, String...paths){
			if ( new File(paths[paths.length-1]).exists()){
				return;
			}
			for ( String path : paths){
				File dirPath = new File(uploadPath + path);
				if( !dirPath.exists() ){
					dirPath.mkdirs();
					System.out.println("UploadFileUtils > makeDir 폴더만들기!");				
				}
			}
		}
		
		// 썸네일 만들기
		private static String makeThumbnail(String uploadPath, String path, String fileName) throws Exception {
			// BufferedImage : 메모리상의 이미지
			BufferedImage sourceImg = ImageIO.read(new File(uploadPath + path, fileName));
			// 파일의 높이를 100px로 만듦 FIT_TO_HEIGHT
			BufferedImage destImg = Scalr.resize(sourceImg, Scalr.Method.AUTOMATIC, Scalr.Mode.FIT_TO_HEIGHT,100);
			
			String thumbnailName = uploadPath + path + File.separator +"s_"+fileName;
			File newFile = new File(thumbnailName);
			String formatName = fileName.substring(fileName.lastIndexOf(".")+1);
			
			ImageIO.write(destImg, formatName.toUpperCase(), newFile);
			System.out.println("makeThmbnail ending position :");
			return thumbnailName.substring(uploadPath.length()).replace(File.separatorChar, '/');
		}
		
		
		// file upload util end---------------------------------------------------------------------------------------------------------
		

}
