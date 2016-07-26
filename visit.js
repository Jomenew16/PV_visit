

var tablero;
var fondo = {
	fondoOK: false,
	fondoURL: "Imagenes/Layout/Fondo.png"
};

var sprite = {
	x: 400,
	y: 500,
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
	RIGHT: 39
};

var Obstaculo = function (ymax, ymin, xmax, xmin)
{
	this.tope = ymax;
	this.culo = ymin;
	this.dcha = xmax;
	this.izda = xmin;
}

var Mod1 = new Obstaculo (103,140,598,189);
//var Mod2 = new Obstaculo (0,250,250,200);
//var Mod3 = new Obstaculo (0,250,250,200);
//var Mod4 = new Obstaculo (0,250,250,200);
//var obstaculo2 = new Obstaculo (200,250,150,0);
//var obstaculo3 = new Obstaculo (350,400,500,150);

Obstaculo.prototype.check = function (x,y)
{
if (x+43 > this.izda && x < this.dcha)
	{
		if (y < this.culo && y + 70 > this.tope)
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

//devuelve valores entre 0 y 2
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

function verificarimagenes(){
	for (i=0; i<3;i++){
		if (!sprite.frenteOK[i] || !sprite.dchaOK[i] || !sprite.izdaOK[i] || !sprite.atrasOK[i]){
			sprite.OK=false;
		};
	};
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

if (Mod1.check(posx,posy)){
sprite.x=posx;
sprite.y=posy;
dibujar(spritedibujo);

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

//asigno y cargo las imagenes
asignar();

// primer movimiento
document.addEventListener("keydown",teclado);



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

