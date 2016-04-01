/**
 * fileupload
 * checkImageType : 파일이름을 받아서 이미지인지 체크하여 어떤 이미지인지 리턴한다..

 // 20160321, 1728 add
 /* getFileInfo
	* >> fullName을 파라미터로 받아서 아래 4개의 변수를 호출한 쪽으로 리턴한다.
	*
	* fileName : ex) woman02.jpg
	* imgsrc : "/resources/dist/img/file.png"
	* getLink : /mdtest01/file/displayFile?fileName=/2016/03/22/cbfc73a2-45ad-48ad-b137-2840732a66c4_woman02.jpg
	* fullName : /2016/03/17/s_895cd4d4-bcae-476b-8176-aa779ea322f0_woman03.jpg
	*
	*/


function checkImageType(fileName){
		var pattern = /jpg|gif|png|jpeg/i;
		console.log("checkImageType pattern :"+pattern);
		// /jpg|gif|png|jpeg/i
		// ["jpg", index: 59, input: "/2016/03/28/s_01f58cf1-f063-458e-8997-d8d58b1d7566_woman03.jpg"]
		return fileName.match(pattern);
}



	function getFileInfo(fullName){
		var fileName, imgsrc, getLink;
		var fileLink;
		if( checkImageType(fullName)){
			console.log("upload.js in > fn > getFileInfo if > in");
			console.log("fullName : "+fullName);
			// fullName :  /2016/03/28/s_01f58cf1-f063-458e-8997-d8d58b1d7566_woman03.jpg
			imgsrc ="/mdtest01/file/displayFile.do?fileName="+fullName;
			console.log("imgsrc :"+imgsrc);
			fileLink = fullName.substr(14); // // fieLink >> cbfc73a2-45ad-48ad-b137-2840732a66c4_woman02.jpg
			console.log("fileLink : "+fileLink);

			var front = fullName.substr(0, 12);   // >> front >>  /2016/03/22/
			console.log("front : "+front);
			var end = fullName.substr(14);  // >> end >> cbfc73a2-45ad-48ad-b137-2840732a66c4_woman02.jpg
			console.log("end :"+end);

			getLink ="/mdtest01/file/displayFile.do?fileName="+front+end;
			// getLink >> /mdtest01/file/displayFile?fileName=/2016/03/22/cbfc73a2-45ad-48ad-b137-2840732a66c4_woman02.jpg
			console.log("getLink :"+getLink);

		} else {
			imgsrc = "/resources/dist/img/file.png";
			console.log("fn > getFileInfo else > in")
			fileLink = fullName.substr(12);
			console.log("fileLink : "+fileLink);
			getLink = "/mdtest01/file/displayFile.do?fileName="+fullName;
			console.log("getLink :"+getLink);			
		}
		fileName = fileLink.substr(fileLink.indexOf("_")+1);  // fileName >> woman02.jpg
		console.log("fileName :"+fileName);
		return { fileName:fileName, imgsrc:imgsrc, getLink:getLink, fullName:fullName };
	}
