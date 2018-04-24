# multiline text ellipsis
> 텍스트 여러줄로 자르고 ... 표기 넣기

- CSS 를 사용 한 방식 
-----
	.ellipsis {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    word-break: break-all;
	    display: -webkit-box;
	    -webkit-line-clamp: 12;
	    -webkit-box-orient: vertical;
	}

해당 방식은 Chrome과 같은 웹킷 계열의 브라우저에서 사용 가능하다.


- JS 를 사용한 방식
-----
ES6 * TypeScript * jQuery 가 사용된 방식 

	export const elipsis = (contents : string, elem : any, lineNum : number = undefined ) => {

	    if(typeof contents === 'undefined'){
	        return;
	    }
	
	    if(typeof elem === 'undefined'){
	        return contents;
	    }
	
	    let targetElem = $(elem);
	    let targetLineNum = 0;
	    let targetWidthNum = 0;
	    let ellipsisText = '...';
	    let maxTextSize = 0;
	    let text = contents.trim();
	
	    if(typeof targetElem.css('max-height') === 'undefined'){
	        return text;
	    }
	
	    if(typeof targetElem.css('font-size') === 'undefined'){
	        return text;
	    }
	
	    //get font-size
	    let fontSize = targetElem.css('font-size').replace( /px/gi, '');
	    fontSize = Math.round(Number(fontSize));
	
	    if(typeof lineNum === 'undefined'){
	        //get max-height
	        let height = targetElem.css('max-height').replace( /px/gi, '');
	        height = Math.round(Number(height));
	
	        //set text line num
	        targetLineNum = Math.round(height/fontSize);
	    }else{
	        targetLineNum = lineNum;
	    }
	
	    //get width
	    let width = Math.round(Number(targetElem.width()));
	
	    //get text width num
	    targetWidthNum = Math.round(width/fontSize);
	
	    //set max text size
	    maxTextSize = Math.round(targetLineNum * targetWidthNum);
	
	    if(text.length > maxTextSize){
	
	        let cutNum = maxTextSize - ellipsisText.length;
	
	        text = text.substring(0, cutNum);
	        text = text + ellipsisText;
	    }
	
	    return text;
	}

