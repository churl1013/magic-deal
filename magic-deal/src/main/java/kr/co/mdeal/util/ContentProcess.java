/**
 * 넘어온 내용의 엔터문자 처리 등 특정 컨텐츠 전처리
 * 
 */

package kr.co.mdeal.util;

public class ContentProcess {
	public static String enterChange(String content) {
		if(content!=null) {
			content = content.replaceAll("\n", "<br/>");
		}
		return content;
	}
}
