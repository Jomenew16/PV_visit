

var tablero;
var fondo = {
	fondoOK: false,
	fondoURL: "Imagenes/Layout/Fondo.png"
};

var info = {
	modOK: false,
	modURL: "Imagenes/Info/Modules1.jpg"
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
	abajoURL: "Imagenes/Info/Go.png"

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
	//Ok: false
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
var Mod1Acc= new Obstaculo (130,131, 500, 289);
var Mod2 = new Obstaculo (232,262,616,207);
var Mod2Acc= new Obstaculo (162,163, 516, 307);
var Mod3 = new Obstaculo (367,397,597,189);
var Mod3Acc= new Obstaculo (397,398, 500, 289);
var Mod4 = new Obstaculo (500,533,616,207);
var Mod4Acc= new Obstaculo (533,534, 500, 307);
var Meteo = new Obstaculo (458,488,148,134);
var Linea = new Obstaculo (0,90,710,623);
var Arbol = new Obstaculo (99,163,769,711);
var Inv1 = new Obstaculo (166,190,738,684);
var Caset = new Obstaculo (279,328,829,730);
var Inv2 = new Obstaculo (435,459,763,709);
var Bordiz1 = new Obstaculo (0,600,122,0);
var Bordiz2 = new Obstaculo (0,165,150,0);
var Bordsup = new Obstaculo (-20,-10,835,0);
var Bordch = new Obstaculo (0,600,835,834);
var Bordinf = new Obstaculo (599,600,835,0);

 

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
}


	// Asigno las URL de las distintas imagenes de frente, dcha, izda t atras y pongo todos los arrays en falso
function asignar (){
	
	for (i=0; i<3; i++){
		
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

	};

//confirmo carga de imagenes
sprite.frente[0].onload=function(){	sprite.frenteOK[0]=true;dibujar();};
sprite.frente[1].onload=function(){	sprite.frenteOK[1]=true;};
sprite.frente[2].onload=function(){	sprite.frenteOK[2]=true;};

sprite.dcha[0].onload=function(){	sprite.dchaOK[0]=true;};
sprite.dcha[1].onload=function(){	sprite.dchaOK[1]=true;};
sprite.dcha[2].onload=function(){	sprite.dchaOK[2]=true;};

sprite.atras[0].onload=function(){	sprite.atrasOK[0]=true;};
sprite.atras[1].onload=function(){	sprite.atrasOK[1]=true;};
sprite.atras[2].onload=function(){	sprite.atrasOK[2]=true;};

sprite.izda[0].onload=function(){	sprite.izdaOK[0]=true;};
sprite.izda[1].onload=function(){	sprite.izdaOK[1]=true;};
sprite.izda[2].onload=function(){	sprite.izdaOK[2]=true;};

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
dibujar();
}

function confirmarinfo () {
info.ModOK=true;
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



function teclado (datos){

var codigo = datos.keyCode;
var spritedibujo= sprite.frente[0];
var posx=sprite.x;
var posy=sprite.y;



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
	if (comprobarObstaculos(posx,posy)){
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


// Vamos a desatar acciones. Este codigo funciona. Modulos 1
if (codigo==teclas.INTRO && (Mod1Acc.check(posx,posy) || Mod2Acc.check(posx,posy) || Mod3Acc.check(posx,posy) || Mod4Acc.check(posx,posy))){
	dibujarpapiro();

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

info.imagen = new Image();
info.imagen.src = info.modURL;
info.imagen.onload = confirmarinfo;

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


//asigno y cargo las imagenes
asignar();

// primer movimiento
document.addEventListener("keydown",teclado);



};

function verificarimagenes(){
	for (i=0; i<3;i++){
		if (!sprite.frenteOK[i] || !sprite.dchaOK[i] || !sprite.izdaOK[i] || !sprite.atrasOK[i]){
			sprite.OK=false;
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
};

sprite.OK=true;
		
};
// function dibujar1(){
//tablero.drawImage(sprite.frente[1],sprite.x, sprite.y); 	
 //};


//aquí dibujar a información queda preparar toda la info!!

function dibujarpapiro() {
if (fondo.fondoOK && info.ModOK){
	tablero.drawImage(fondo.imagen,0,0);
	tablero.drawImage(info.imagen,100,50);
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

	
	