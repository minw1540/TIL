# canvas-in-angular
> angular 에서 canvas 사용하기

 - jQuery 에서는 document.getElementById(canvas); 방식으로
   canvas를 그릴수 있었지만, angular에서는 type이 맞지 않아
   해당 방식으로는 사용 할 수 가 없었다.
   

*ViewChild, ElementRef, AfterViewInit 사용하기 
--------------------------

ViewChild, ElementRef, AfterViewInit를 사용하여, component에 canvas를 선언한다.


	export class myComponent implements AfterViewInit {
	
		@ViewChild('canvas') canvas: ElementRef;
		private context: CanvasRenderingContext2D;
		
	    ngAfterViewInit() {
	        context = this.canvas.nativeElement.getContext('2d');
	        return;
	    }
	    
	    .....	
	}
	
선의 색상 변경, 선의 굵기 변경, 선 그리기 함수


    // 슬라이드 메모 포인터 위치 계산
    getMemoDrawPosition(event : any){

        let pointerX = 0;
        let pointerY = 0;

        if(typeof event.touches !== 'undefined' && event.touches.length >= 1){
            //터치 이벤트
            let touch = event.touches[0];
            pointerX = touch.clientX - this.drawCanvas.nativeElement.offsetLeft - 20;
            pointerY = touch.clientY - this.drawCanvas.nativeElement.offsetTop - 20;
        }else{
            //마우스 이벤트
            pointerX = event.offsetX - this.drawCanvas.nativeElement.offsetLeft + 10;
            pointerY = event.offsetY - this.drawCanvas.nativeElement.offsetTop + 75;
        }

        return {x: pointerX, y: pointerY};
    }

    //슬라이드 메모 선 그리기 시작
    onStartMemoDraw(event : any){

        let pointer = this.getMemoDrawPosition(event);
        this.drawCanvasContext.beginPath();
        this.drawCanvasContext.moveTo(pointer.x, pointer.y);
        this._slidepage.elem.slideModeDrawModal.isDraw = true;
        return;
    }

    //선 그리기
    onMemoDrawCanvas(event : any) {

        if(!this._slidepage.elem.slideModeDrawModal.isDraw){
            return;
        }

        let pointer = this.getMemoDrawPosition(event);
        this.drawCanvasContext.lineTo(pointer.x, pointer.y);
        this.drawCanvasContext.lineWidth = this._slidepage.elem.slideModeDrawModal.thickness;
        this.drawCanvasContext.strokeStyle = this._slidepage.elem.slideModeDrawModal.color;
        this.drawCanvasContext.stroke();
        return;
    }

    //슬라이드 메모 선 그리기 종료
    onEndMemoDraw(event : any){

        if(!this._slidepage.elem.slideModeDrawModal.isDraw){
            return;
        }

        this._slidepage.elem.slideModeDrawModal.isDraw = false;
        return;
    }

    //슬라이드 메모 선 색상 변경
    onChangeMemoDrawColor(color : string){

        if(typeof color === 'undefined'){
            return;
        }

        this._slidepage.elem.slideModeDrawModal.color = color;
        return;
    }

    //슬라이드 메모 선 굵기 변경
    onChangeMomoDrawThickness(thickness : number) {

        if(typeof thickness === 'undefined'){
            return;
        }

        this._slidepage.elem.slideModeDrawModal.thickness = thickness;
        return;
    }


html element의 마우스 이벤트 및  터치 이벤트 

    <canvas id="canvas"
        #canvas
        class="draw-modal-canvas"
        [width]="width"
        [height]="height"
        (mousedown)="onStartMemoDraw($event)"
        (mousemove)="onMemoDrawCanvas($event)"
        (mouseup)="onEndMemoDraw($event)"
        (mouseout)="onEndMemoDraw($event)"
        (touchstart)="onStartMemoDraw($event)"
        (touchmove)="onMemoDrawCanvas($event)"
        (touchend)="onEndMemoDraw($event)"
    ></canvas>