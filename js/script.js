"use strict";

let p1Bar=document.querySelector(`.p1Bar`),p2Bar=document.querySelector(`.p2Bar`),
	ball=document.querySelector('.ball'), button=document.querySelector(`.start`), 
	p1Score=document.querySelector(`.p1Score`),	p2Score=document.querySelector(`.p2Score`), 
	restart=document.querySelector(`.restart`), gameSpaceInner=document.querySelector(`.gameSpaceInner`),
	keyRepeatDelay=0, keyRepeatInterval=10, keyDownTimer=null, startAngle=5, angle, speed, x, stopIt=0, pc,
	y, score=[0,0], stoped=1, p2BarCord, p1BarCord, p1BarPos, p2BarPos, body=document.querySelector(`body`),
	handleKeyDown, handleKeyUp, repeatKey

document.addEventListener('contextmenu',function(event){event.preventDefault();});

toNull()

restart.addEventListener(`click`,shure)
document.addEventListener(`keydown`,function(event){if(event.code==`KeyR`){shure()}})

function shure(){if(confirm(`Restart?`)){location.reload()}}

button.addEventListener(`mousedown`,startClick)
document.addEventListener(`keydown`,startEnter)

function startEnter(){if(event.code==`Enter`){startClick()}}
function stopEnter(){if(event.code==`Enter`){stopClick()}}

function startClick(){
	stoped=0;button.innerHTML=`Stop`; stopIt=0
	button.removeEventListener('mousedown',startClick)
	document.removeEventListener(`keydown`, startEnter)
	button.addEventListener('mousedown',stopClick)
	document.addEventListener(`keydown`, stopEnter)

	if(pc){
		document.addEventListener('keydown',handleKeyDown);
		document.addEventListener('keyup',handleKeyUp);}

	colision()
	body.insertAdjacentHTML(`afterbegin`,`<audio loop src="audio/cyberFlute.mp3" autoplay></audio>`)
}	

function stopClick(){
	stoped=1;button.innerHTML=`Start`; stopIt=1
	button.removeEventListener('mousedown',stopClick)
	document.removeEventListener(`keydown`, stopEnter)
	button.addEventListener('mousedown',startClick)
	document.addEventListener(`keydown`, startEnter)

	if(pc){
		document.removeEventListener('keydown',handleKeyDown);
		document.removeEventListener('keyup',handleKeyUp);
		handleKeyUp()}

	body.removeChild(document.querySelector(`audio`))
}
function toNull(){
	x=375; y=325; speed=5; p1BarCord=340; p2BarCord=340;
	p1Bar.style.bottom=p1BarCord+`px`
	p2Bar.style.bottom=p2BarCord+`px`
	ball.style.transform=`translate(${x}px,${y}px)`;
	
}
function colision(){
	if(startAngle>=360){startAngle-=360}

	if((startAngle==90||startAngle==270||startAngle==-90||startAngle==-270)&&(y<=0||y>=650)){
		if(x==724){x++}if(x==26){x--}}

	x+=Math.cos(startAngle*Math.PI/180)*speed;
	y+=Math.sin(startAngle*Math.PI/180)*speed;

 	if(y+30>=680){startAngle=360-startAngle; y=650}
 	if(y<=0){startAngle=360-startAngle; y=0}

	if(x<=0){score[1]+=1;p1Score.textContent=score[1];toNull();stopClick();startAngle=5}
	if(x>=750){score[0]+=1;p2Score.textContent=score[0];toNull();stopClick();startAngle=175}

  	p1BarPos=Math.abs(p1BarCord-600)+65
  	p2BarPos=Math.abs(p2BarCord-600)+65

	if(x>=725&&p2BarPos+90>y&&p2BarPos-90<y){
		startAngle=180-startAngle;x=724
		if(p2BarPos-74>=y){startAngle+=45
		}else if(p2BarPos+74<=y){startAngle-=45
		}else if(p2BarPos-59>=y){startAngle+=35
		}else if(p2BarPos+59<=y){startAngle-=35
		}else if(p2BarPos-44>=y){startAngle+=25
		}else if(p2BarPos+44<=y){startAngle-=25
		}else if(p2BarPos-29>=y){startAngle+=15
		}else if(p2BarPos+29<=y){startAngle-=15
		}else if(p2BarPos-14>=y){startAngle+=5
		}else if(p2BarPos+14<=y){startAngle-=5
		}if(speed<=25){speed+=speed/30}}

	if(x<=25&&p1BarPos+90>y&&p1BarPos-90<y){
		startAngle=180-startAngle;x=26
		if(p1BarPos-74>=y){startAngle-=45
		}else if(p1BarPos+74<=y){startAngle+=45
		}else if(p1BarPos-59>=y){startAngle-=35
		}else if(p1BarPos+59<=y){startAngle+=35
		}else if(p1BarPos-44>=y){startAngle-=25
		}else if(p1BarPos+44<=y){startAngle+=25
		}else if(p1BarPos-29>=y){startAngle-=15
		}else if(p1BarPos+29<=y){startAngle+=15
		}else if(p1BarPos-14>=y){startAngle-=5
		}else if(p1BarPos+14<=y){startAngle+=5
		}if(speed<=25){speed+=speed/30}}

	if(stoped){return}else{ball.style.transform=`translate(${x}px,${y}px)`;requestAnimationFrame(colision)}
}

let isMobile=/mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()),
	isTablet=/tablet|ipad|android|kindle/i.test(navigator.userAgent.toLowerCase()),
	isDesktop=!isMobile&&!isTablet,
	mediaQueryList=window.matchMedia("(max-width: 767px)")

if(isMobile||window.innerWith<768||mediaQueryList.matches){
	let wrapper=document.querySelector(`.wrapper`),
		buttons=document.querySelectorAll(`.button`), 
		butt=document.querySelectorAll(`.butt`),
		p1Up=document.querySelector(`.p1Up`),
		p1Down=document.querySelector(`.p1Down`),
		p2Up=document.querySelector(`.p2Up`),
		p2Down=document.querySelector(`.p2Down`)

	p1Up.addEventListener(`pointerdown`,function(){stopIt=0; p1UpFunc()})
	p1Up.addEventListener(`pointerup`,function(){stopIt=1})

	function p1UpFunc(){if(stoped==0&&p1BarCord<=595){if(stopIt==0){
		p1Bar.style.bottom=`${p1BarCord+=7.4286}px`;requestAnimationFrame(p1UpFunc)}}}

	p1Down.addEventListener(`pointerdown`,function(){stopIt=0;p1DownFunc()})
	p1Down.addEventListener(`pointerup`,function(){stopIt=1})

	function p1DownFunc(){if(stoped==0&&p1BarCord>=85){if(stopIt==0)
		{p1Bar.style.bottom=`${p1BarCord-=7.4286}px`;requestAnimationFrame(p1DownFunc)}}}	

	p2Up.addEventListener(`pointerdown`,function(){stopIt=0; p2UpFunc()})
	p2Up.addEventListener(`pointerup`,function(){stopIt=1})

	function p2UpFunc(){if(stoped==0&&p2BarCord<=595){if(stopIt==0)
		{p2Bar.style.bottom=`${p2BarCord+=7.4286}px`;requestAnimationFrame(p2UpFunc)}}}	

	p2Down.addEventListener(`pointerdown`,function(){stopIt=0; p2DownFunc()})
	p2Down.addEventListener(`pointerup`,function(){stopIt=1})

	function p2DownFunc(){if(stoped==0&&p2BarCord>=85){if(stopIt==0)
		{p2Bar.style.bottom=`${p2BarCord-=7.4286}px`;requestAnimationFrame(p2DownFunc)}}}

	wrapper.style.transform=`translate(-50%, -50%) scale(0.5,0.5)`

	for(let pos of butt){pos.style.display=`block`}
	for(let pos of buttons){pos.style.cssText=`width:300px ;height:50px; border-radius:25px; font-size:38px;`}	

}else{
	pc=1
	handleKeyDown=function handleKeyDown(event){if(keyDownTimer===null){keyDownTimer=setTimeout(repeatKey,keyRepeatDelay,event)}}
	handleKeyUp=function handleKeyUp(event){if(keyDownTimer!==null){clearTimeout(keyDownTimer);keyDownTimer=null}}
	repeatKey=function repeatKey(event){
		event.preventDefault()
		if(event.code=='KeyW'&&p1BarCord<=595){p1Bar.style.bottom=`${p1BarCord+=5}px`}
		if(event.code=='KeyS'&&p1BarCord>=85){p1Bar.style.bottom=`${p1BarCord-=5}px`}
		if(event.code=='ArrowUp'&&p2BarCord<=595){p2Bar.style.bottom=`${p2BarCord+=5}px`}
		if(event.code=='ArrowDown'&&p2BarCord>=85){p2Bar.style.bottom=`${p2BarCord-=5}px`}
		keyDownTimer=setTimeout(repeatKey,keyRepeatInterval,event)
	}
}
