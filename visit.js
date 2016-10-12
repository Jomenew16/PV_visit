//var touchy = require('touchy');
//touchy.enableOn(document);

//var ele = document.querySelector('#selector');
//ele.on('tap', function (e) {
//  console.log('tap!');
//});

var tablero;
var fondo = {
	fondoOK: false,
	fondoURL: "Imagenes/Layout/Fondo.jpg"
};



var info = {
	papiroOK: false,
	papiroURL: "Imagenes/Info/Papiro.png",
	mod: new Array(8),
	modOK: new Array(8),
	inv: new Array(3),
	invOK: new Array(3),
	civ: new Array(3),
	civOK: new Array(3),
	center: new Array(2),
	centerOK: new Array(2),
	direccion: new Array(4),
	direccionOK: new Array(4),
	dirOK:false,
	meteoOK:false,
	meteoURL: "Imagenes/Info/Meteo1.png",
	lineaOK:false,
	lineaURL: "Imagenes/Info/Infraestructuras1.png",
	inicioOK: false,
	inicioURL: "Imagenes/Layout/Inicio.png",
	estrOK:false,
	estrURL: "Imagenes/Info/Structures1.png",
	contintr: 0
};

var bocadillo = {
	izdaOK: false,
	izdaURL: "Imagenes/Info/Gnome.png",
	izda2OK: false,
	izda2URL: "Imagenes/Info/Fresh.png",
	arribaOK: false,
	arribaURL: "Imagenes/Info/Future.png",
	dchaOK: false,
	dchaURL: "Imagenes/Info/Tomorrow.png",
	abajoOK: false,
	abajoURL: "Imagenes/Info/Go.png",
	civOK: false,
	civURL: "Imagenes/Info/Whats.png",
	enter0OK: false,
	enter0URL: "Imagenes/Layout/Press0.png",
	enter1OK: false,
	enter1URL: "Imagenes/Layout/Press1.png" 
}

var sprite = {
	x: 620,
	y: 400,
	velocidad: 10,
	OK: true,	
	frente : new Array(3),
	frenteOK: new Array(3),
	dcha :new Array(3),
	dchaOK:new Array(3),
	atras :new Array(3),
	atrasOK:new Array(3),
	izda :new Array(3),
	izdaOK:new Array(3),
	
};

 var teclas =
{
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39,
	INTRO: 13,
	ESC: 27,
	DEL: 8
};

var Obstaculo = function (ymax, ymin, xmax, xmin)
{
	this.tope = ymax;
	this.culo = ymin;
	this.dcha = xmax;
	this.izda = xmin;
}

var Mod1 = new Obstaculo (103,130,598,189);
var Mod1Acc= new Obstaculo (129,131, 550, 230);
var Est1Acc= new Obstaculo (90,104, 550, 230);
var Mod2 = new Obstaculo (234,262,616,207);
var Mod2Acc= new Obstaculo (261,280, 616, 207);
var Est2Acc= new Obstaculo (220,235, 616, 320);
var Mod3 = new Obstaculo (367,397,597,189);
var Mod3Acc= new Obstaculo (396,405, 500, 289);
var Est3Acc= new Obstaculo (355,367, 500, 289);
var Mod4 = new Obstaculo (500,533,616,207);
var Est4Acc = new Obstaculo (485,501,616,207);
var Meteo = new Obstaculo (458,488,148,134);
var MeteoAcc = new Obstaculo (448,498,158,124);
var Linea = new Obstaculo (0,90,710,623);
var LineaAcc = new Obstaculo (0,100,720,613);
var Arbol = new Obstaculo (99,163,769,711);
var Inv1 = new Obstaculo (166,190,738,684);
var Inv1Acc =new Obstaculo (156,200,748,674)
var Caset = new Obstaculo (279,328,829,740);
var CasetAcc = new Obstaculo (269,338,839,720);
var Inv2 = new Obstaculo (435,459,763,709);
var Inv2Acc = new Obstaculo (425,469,773,699);
var Bordiz1 = new Obstaculo (0,600,122,0);
var Bordiz2 = new Obstaculo (0,165,150,0);
var Bordsup = new Obstaculo (-20,-10,835,0);
var Bordch = new Obstaculo (0,600,835,834);
var Bordinf = new Obstaculo (599,600,835,0);
var CivAcc = new Obstaculo (200,238,314,267);

 

Obstaculo.prototype.check = function (x,y)
{
if (x+32 > this.izda && x+12 < this.dcha)
	{
		if (y < this.culo && y + 65 > this.tope)
		{
			return false
		}
		else
		{
			return true
		}
	}
else
{
	return true
}

};


function comprobarObstaculos (x,y){
	var check= Mod1.check(x,y) * Mod2.check(x,y)* Mod3.check(x,y)* Mod4.check(x,y)* Meteo.check(x,y)*Linea.check(x,y)*Arbol.check(x,y)*Inv1.check(x,y)*Caset.check(x,y)*Inv2.check(x,y)*Bordiz1.check(x,y)*Bordiz2.check(x,y)*Bordsup.check(x,y)*Bordch.check(x,y)*Bordinf.check(x,y);
	
	return check;
};

function comprobarAccion (x,y){
	var check= Mod1Acc.check(x,y) * Mod2Acc.check(x,y)* Mod3Acc.check(x,y)* MeteoAcc.check(x,y)*LineaAcc.check(x,y)*Inv1Acc.check(x,y)*CasetAcc.check(x,y)*Inv2Acc.check(x,y)*CivAcc.check(x,y);
	
	return check;
};




	// Asigno las URL de las distintas imagenes de frente, dcha, izda t atras y pongo todos los arrays en falso
function asignar (){
	
	// asignamos URL a los sprites
	for (i=0; i<3; i++){
		var m = i+1;
		sprite.frenteOK[i]=false;
		sprite.frente[i]= new Image();
		sprite.frente[i].src="Imagenes/Sprite/Frente"+i+".png";

		sprite.dchaOK[i]=false;
		sprite.dcha[i]= new Image();
		sprite.dcha[i].src="Imagenes/Sprite/Dcha"+i+".png";

		sprite.atrasOK[i]=false;
		sprite.atras[i]= new Image();
		sprite.atras[i].src="Imagenes/Sprite/Atras"+i+".png";

		sprite.izdaOK[i]=false;
		sprite.izda[i]= new Image();
		sprite.izda[i].src="Imagenes/Sprite/Izda"+i+".png";

		info.civOK[m]=false;
		info.civ[m]=new Image();
		info.civ[m].src="Imagenes/Info/CWorkst"+m+".png";

	};

	//asignamos URL a la info de los modulos
	for (k=1; k<9; k++){
		info.modOK[k]=false;
		info.mod[k]=new Image();
		info.mod[k].src= "Imagenes/Info/Modulest"+k+".png";

	};

	//asignamos URL a la info de los inversores
	 for (h=1; h<4; h++){
	 	info.invOK[h]=false;
	 	info.inv[h]= new Image();
	 	info.inv[h].src= "Imagenes/Info/Inverterst"+h+".png";
	 	
	 };

	 //asignamos URL a la info de la caseta
	 for (j=1; j<3; j++){
	 	info.centerOK[j]=false;
	 	info.center[j]= new Image();
	 	info.center[j].src= "Imagenes/Info/CCenter"+j+".png";
	 	
	 };

	 for (n=1; n<5; n++){
	 	info.direccionOK[n]=false;
	 	info.direccion[n]= new Image();
	 	info.direccion[n].src= "Imagenes/Layout/Arrow"+n+".png";
	 	
	 };

//confirmo carga de imagenes
sprite.frente[0].onload=function(){	sprite.frenteOK[0]=true;dibujarportada();};
sprite.frente[1].onload=function(){	sprite.frenteOK[1]=true;dibujarportada();};
sprite.frente[2].onload=function(){	sprite.frenteOK[2]=true;dibujarportada();};

sprite.dcha[0].onload=function(){	sprite.dchaOK[0]=true;dibujarportada();};
sprite.dcha[1].onload=function(){	sprite.dchaOK[1]=true;dibujarportada();};
sprite.dcha[2].onload=function(){	sprite.dchaOK[2]=true;dibujarportada();};

sprite.atras[0].onload=function(){	sprite.atrasOK[0]=true;dibujarportada();};
sprite.atras[1].onload=function(){	sprite.atrasOK[1]=true;dibujarportada();};
sprite.atras[2].onload=function(){	sprite.atrasOK[2]=true;dibujarportada();};

sprite.izda[0].onload=function(){	sprite.izdaOK[0]=true;dibujarportada();};
sprite.izda[1].onload=function(){	sprite.izdaOK[1]=true;dibujarportada();};
sprite.izda[2].onload=function(){	sprite.izdaOK[2]=true;dibujarportada();};

info.mod[1].onload= function(){ info.modOK[1]=true;};
info.mod[2].onload= function(){ info.modOK[2]=true;};
info.mod[3].onload= function(){ info.modOK[3]=true;};
info.mod[4].onload= function(){ info.modOK[4]=true;};
info.mod[5].onload= function(){ info.modOK[5]=true;};
info.mod[6].onload= function(){ info.modOK[6]=true;};
info.mod[7].onload= function(){ info.modOK[7]=true;};
info.mod[8].onload= function(){ info.modOK[8]=true;};

info.inv[1].onload= function(){ info.invOK[1]=true;};
info.inv[2].onload= function(){ info.invOK[2]=true;};
info.inv[3].onload= function(){ info.invOK[3]=true;};

info.civ[1].onload= function(){ info.civOK[1]=true;};
info.civ[2].onload= function(){ info.civOK[2]=true;};
info.civ[3].onload= function(){ info.civOK[3]=true;};

info.center[1].onload= function(){ info.centerOK[1]=true;};
info.center[2].onload= function(){ info.centerOK[2]=true;};

info.direccion[1].onload= function(){ info.direccionOK[1]=true;dibujarportada();};
info.direccion[2].onload= function(){ info.direccionOK[2]=true;dibujarportada();};
info.direccion[3].onload= function(){ info.direccionOK[3]=true;dibujarportada();};
info.direccion[4].onload= function(){ info.direccionOK[4]=true;dibujarportada();};


};

//devuelve valores entre 0 y 2- Closure
function caminar(){
var paso=0;

	function unpaso (){
		if (paso==2){
			paso=0;
		}
		else {
			paso = paso + 1;
			
		}
		//alert("llevo"+" "+paso);
		return paso;
	}

	return unpaso;
};
var pasos = caminar();
// tengo que hacer la asignación en global. Si no, no funciona. ¿Qué gracia entonces??

function confirmarfondo () {
fondo.fondoOK=true;
//dibujar();
}

function confirmarmeteo () {
info.meteoOK=true;
};

function confirmarlinea () {
info.lineaOK=true;
};
//function confirmarinfo2 () {
//info.Mod2OK=true;
//};

function confirmarpapiro () {
info.papiroOK=true;
};

function confirmarbociz1 () {
bocadillo.izdaOK=true;
};

function confirmarbociz2 () {
bocadillo.izda2OK=true;
};

function confirmarbocarrib () {
bocadillo.arribaOK=true;
};

function confirmarbocdch () {
bocadillo.dchaOK=true;
};

function confirmarbocab () {
bocadillo.abajoOK=true;
};

function confirmarbocciv () {
bocadillo.civOK=true;
};

function confirmarstr () {
info.estrOK=true;
};

function confirmarinicio () {
info.inicioOK=true;
};

function confirmarenter0 () {
bocadillo.enter0OK=true;
};

function confirmarenter1 () {
bocadillo.enter1OK=true;
};



function teclado (datos){

var codigo = datos.keyCode;
var spritedibujo= sprite.frente[0];
var posx=sprite.x;
var posy=sprite.y;

clearInterval(intervalo);

//dibujar(spritedibujo);

	if (codigo==teclas.UP){
		spritedibujo = sprite.atras[pasos()];
		
		//spritedibujo=sprite.atras[0];
		posy-=sprite.velocidad;
	};

	if (codigo==teclas.DOWN){
		spritedibujo=sprite.frente[pasos()];
		posy+=sprite.velocidad;
	};
	if (codigo == teclas.LEFT){
		posx -= sprite.velocidad
		spritedibujo=sprite.izda[pasos()];
	};
	if (codigo == teclas.RIGHT){
		posx += sprite.velocidad;
		spritedibujo=sprite.dcha[pasos()];
};



//comprobar obstaculos es la función que me devuelve falso si estamos dentro de algún obstaculo
	if (comprobarObstaculos(posx,posy) && (codigo!=teclas.INTRO)){
	info.contintr=0;
	sprite.x=posx;
	sprite.y=posy;
	dibujar(spritedibujo);

	}
	else if (!Bordiz1.check(posx,posy)){
	dibujarlimizdo1(spritedibujo);
	}
	else if (!Bordiz2.check(posx,posy)){
	dibujarlimizdo2(spritedibujo);
	}
	else if (!Bordsup.check(posx,posy)){
	dibujarlimsup(spritedibujo);
	}
	else if (!Bordch.check(posx,posy)){
	dibujarlimdch(spritedibujo);
	}
	else if (!Bordinf.check(posx,posy)){
	dibujarliminf(spritedibujo);
	};


// Vamos a desatar acciones. 
if (codigo==teclas.INTRO && (!Mod1Acc.check(posx,posy) || !Mod2Acc.check(posx,posy) || !Mod3Acc.check(posx,posy))){
	info.contintr =info.contintr+1;
	infomodulo(info.contintr);
	//console.log(info.contintr);
};

if (codigo==teclas.INTRO && (!Inv1Acc.check(posx,posy) || !Inv2Acc.check(posx,posy))){
	info.contintr =info.contintr+1;
	infoinverter(info.contintr);
	//console.log(info.contintr);
};

if (codigo==teclas.INTRO && (!CasetAcc.check(posx,posy))){
	info.contintr =info.contintr+1;
	infocenter(info.contintr);
	//infoinverter(info.contintr);
	
};

if (codigo==teclas.INTRO && (!MeteoAcc.check(posx,posy))){
	info.contintr =info.contintr+1;
	infometeo(info.contintr);
	//infocenter(info.contintr);
	//infoinverter(info.contintr);
};

if (codigo==teclas.INTRO && (!LineaAcc.check(posx,posy))){
	info.contintr =info.contintr+1;
	infolinea(info.contintr);
	//infocenter(info.contintr);
	//infoinverter(info.contintr);
};

if (codigo==teclas.INTRO && (!CivAcc.check(posx,posy))){
	info.contintr =info.contintr+1;
	infocivi(info.contintr);
	//infocenter(info.contintr);
	//infoinverter(info.contintr);
};

if (codigo==teclas.INTRO && (!Est1Acc.check(posx,posy) || !Est2Acc.check(posx,posy) || !Est3Acc.check(posx,posy) || !Est4Acc.check(posx,posy))){
	info.contintr =info.contintr+1;
	infostr(info.contintr);
	//infocenter(info.contintr);
	//infoinverter(info.contintr);
};



};

function inicio () {

var canvas = document.getElementById("campo");
// variable global
tablero = canvas.getContext("2d");
// introduzco el fondo. Es la única imagen que tratamos de esta forma. Las imagenes sprite, las trataremos de otra manera
fondo.imagen = new Image();
fondo.imagen.src = fondo.fondoURL;
fondo.imagen.onload = confirmarfondo;

info.meteo = new Image();
info.meteo.src = info.meteoURL;
info.meteo.onload = confirmarmeteo;

info.linea = new Image();
info.linea.src = info.lineaURL;
info.linea.onload = confirmarlinea;

info.estr= new Image();
info.estr.src = info.estrURL;
info.estr.onload = confirmarstr;

info.inicio= new Image();
info.inicio.src = info.inicioURL;
info.inicio.onload = confirmarinicio;
//info.mod2 = new Image();
//info.mod2.src = info.mod2URL;
//info.mod2.onload = confirmarinfo2;

info.papiro = new Image();
info.papiro.src = info.papiroURL;
info.papiro.onload = confirmarpapiro;

bocadillo.izda = new Image();
bocadillo.izda.src = bocadillo.izdaURL;
bocadillo.izda.onload = confirmarbociz1;

bocadillo.izda2 = new Image();
bocadillo.izda2.src = bocadillo.izda2URL;
bocadillo.izda2.onload = confirmarbociz2;

bocadillo.arriba = new Image();
bocadillo.arriba.src = bocadillo.arribaURL;
bocadillo.arriba.onload = confirmarbocarrib;

bocadillo.dcha = new Image();
bocadillo.dcha.src = bocadillo.dchaURL;
bocadillo.dcha.onload = confirmarbocdch;

bocadillo.abajo= new Image();
bocadillo.abajo.src = bocadillo.abajoURL;
bocadillo.abajo.onload = confirmarbocab;

bocadillo.civ= new Image();
bocadillo.civ.src = bocadillo.civURL;
bocadillo.civ.onload = confirmarbocciv;

bocadillo.enter0= new Image();
bocadillo.enter0.src = bocadillo.enter0URL;
bocadillo.enter0.onload= confirmarenter0; 

bocadillo.enter1= new Image();
bocadillo.enter1.src = bocadillo.enter1URL;
bocadillo.enter1.onload= confirmarenter1; 
	

	



//asigno y cargo las imagenes
asignar();

dibujarportada();
// primer movimiento
document.addEventListener("keydown",teclado);



};

var intervalo;
var cont=0;
var posicion=1;


//Animación de la introducción
function muestraintrod(){

var spriteport= new Array (3);


if (posicion==1){
	spriteport=sprite.frente;
}
else if (posicion==2){
	spriteport=sprite.dcha;
}
else if (posicion==3){
	spriteport=sprite.atras;
}
else if (posicion==4){
	spriteport=sprite.izda;
}

	
		if (cont<=10){
			tablero.drawImage(info.inicio, 0,0);
			tablero.drawImage(info.direccion[posicion], 170,230);
			tablero.drawImage(spriteport[pasos()],540, 325);
			cont = cont+1;
			}
			else if (posicion<4){
				cont=0;
				posicion=posicion+1;
			}
			else if (posicion==4){
				cont=0;
				posicion=1;
			};
			
};



function dibujarportada(){
//verifica que el sprite y las direcciones están cargadas y devuelve imagenesOK y SpriteOK
verificarimagenes();

//si las imagenes estan cargadas, hago que se dibujen en intervalos de 200 milisegundos
if (sprite.OK && info.dirOK && info.inicioOK){
			
	intervalo=setInterval(function(){muestraintrod()},200);

};

}

function verificarimagenes(){
	sprite.OK=true;
	info.dirOK=true;
	for (i=0; i<3;i++){
		if (!sprite.frenteOK[i] || !sprite.dchaOK[i] || !sprite.izdaOK[i] || !sprite.atrasOK[i]){
			sprite.OK=false;
		};
	};

	for (j=1; j<5;j++){
		if (!info.direccionOK[j]){
			info.dirOK=false;
		};
	};



};

function dibujar (personaje) {
	if (fondo.fondoOK && sprite.frenteOK[0])
		{
			tablero.drawImage(fondo.imagen,0,0);		
			tablero.drawImage(sprite.frente[0],sprite.x,sprite.y);
			
		};

verificarimagenes();



if (sprite.OK == true) {
	tablero.drawImage(fondo.imagen,0,0);
	tablero.drawImage(personaje, sprite.x, sprite.y);
	if (!CivAcc.check(sprite.x,sprite.y)) {
		tablero.drawImage(bocadillo.civ,sprite.x + 5,sprite.y -170);
	};
	if (!comprobarAccion(sprite.x,sprite.y)){
		tablero.drawImage(bocadillo.enter0, 600, 100);
		console.log(!comprobarAccion(sprite.x,sprite.y));
	};
};

sprite.OK=true;
		
};
// function dibujar1(){
//tablero.drawImage(sprite.frente[1],sprite.x, sprite.y); 	
 //};


//aquí dibujar a información queda preparar toda la info!!

function infomodulo(c) {

if (fondo.fondoOK && info.modOK[1] && info.modOK[2] && info.modOK[3] && info.modOK[4] && info.modOK[5] && info.modOK[6] && info.modOK[7] && info.modOK[8] && info.papiroOK){
	tablero.drawImage(fondo.imagen,0,0);
	tablero.drawImage(info.papiro,100,50);
	tablero.drawImage(info.mod[c],100,50);	
	if (c==8){
	info.contintr=7;		
	};	
};

};


function infoinverter(c) {

if (fondo.fondoOK && info.invOK[1] && info.invOK[2] && info.invOK[3] && info.papiroOK){
	tablero.drawImage(fondo.imagen,0,0);
	tablero.drawImage(info.papiro,100,50);
	tablero.drawImage(info.inv[c],100,50);	
	if (c==3){
	info.contintr=2;		
	};	
};

};

function infocenter(c) {

if (fondo.fondoOK && info.centerOK[1] && info.centerOK[2] && info.papiroOK){
	tablero.drawImage(fondo.imagen,0,0);
	tablero.drawImage(info.papiro,100,50);
	tablero.drawImage(info.center[c],100,50);	
	if (c==2){
	info.contintr=1;		
	};	
};

};


function infometeo(c) {

if (fondo.fondoOK && info.meteoOK && info.papiroOK){
	tablero.drawImage(fondo.imagen,0,0);
	tablero.drawImage(info.papiro,100,50);
	tablero.drawImage(info.meteo,100,50);	
	info.contintr=0;		
		
};

};

function infolinea(c) {

if (fondo.fondoOK && info.lineaOK && info.papiroOK){
	tablero.drawImage(fondo.imagen,0,0);
	tablero.drawImage(info.papiro,100,50);
	tablero.drawImage(info.linea,100,50);	
	info.contintr=0;		
		
};

};

function infostr(c) {

if (fondo.fondoOK && info.estrOK && info.papiroOK){
	tablero.drawImage(fondo.imagen,0,0);
	tablero.drawImage(info.papiro,100,50);
	tablero.drawImage(info.estr,100,50);	
	info.contintr=0;		
		
};

};




function infocivi(c) {

if (fondo.fondoOK && info.civOK && info.papiroOK){
	tablero.drawImage(fondo.imagen,0,0);
	tablero.drawImage(info.papiro,100,50);
	tablero.drawImage(info.civ[c],100,50);	
	if (c==3){
	info.contintr=2;		
	};			
		
};

};


// abajo se dibujan todos los comentarios de los límites
function dibujarlimizdo1(personaje) {

if (fondo.fondoOK && bocadillo.izdaOK){
	tablero.drawImage(fondo.imagen,0,0);
	tablero.drawImage(personaje, sprite.x, sprite.y);
	tablero.drawImage(bocadillo.izda,sprite.x + 10,sprite.y - 170);
	};

};

function dibujarlimizdo2(personaje) {

if (fondo.fondoOK && bocadillo.izda2OK){
	tablero.drawImage(fondo.imagen,0,0);
	tablero.drawImage(personaje, sprite.x, sprite.y);
	tablero.drawImage(bocadillo.izda,sprite.x + 15,sprite.y);
	};

};

function dibujarlimizdo2(personaje) {

if (fondo.fondoOK && bocadillo.izda2OK){
	tablero.drawImage(fondo.imagen,0,0);
	tablero.drawImage(personaje, sprite.x, sprite.y);
	tablero.drawImage(bocadillo.izda2,sprite.x + 20,sprite.y);
	};

};


function dibujarlimsup(personaje) {

if (fondo.fondoOK && bocadillo.arribaOK){
	tablero.drawImage(fondo.imagen,0,0);
	tablero.drawImage(personaje, sprite.x, sprite.y);
	tablero.drawImage(bocadillo.arriba,sprite.x -210,sprite.y);
	};

};

function dibujarlimdch(personaje) {

if (fondo.fondoOK && bocadillo.dchaOK){
	tablero.drawImage(fondo.imagen,0,0);
	tablero.drawImage(personaje, sprite.x, sprite.y);
	tablero.drawImage(bocadillo.dcha,sprite.x -110,sprite.y-130);
	};

};

function dibujarliminf(personaje) {

if (fondo.fondoOK && bocadillo.abajoOK){
	tablero.drawImage(fondo.imagen,0,0);
	tablero.drawImage(personaje, sprite.x, sprite.y);
	tablero.drawImage(bocadillo.abajo,sprite.x-90,sprite.y-150);
	};

};

	
	