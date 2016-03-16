package kr.co.mdeal.util;

import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;

import javax.imageio.ImageIO;

import org.imgscalr.Scalr;
import org.imgscalr.Scalr.Method;

public class FileUtils {
	public static void imageResize (String oriPath, String savePath, 
			String imageType, int width , int height) throws Exception {
		BufferedImage oriImg = ImageIO.read(new File(oriPath));
		BufferedImage resizeImg = Scalr.resize(oriImg,Method.BALANCED, width, height);
		ImageIO.write(resizeImg, imageType, new File(savePath));
	}
	
	public static String getExt(String fileName) {
		int extPos = fileName.lastIndexOf(".");
		String ext = "";
		if(extPos != -1) {
			ext = fileName.substring(extPos+1, fileName.length());
		}
		
		return ext.toUpperCase();
	}
}
