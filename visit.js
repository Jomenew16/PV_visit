

var tablero;
var fondo = {
	fondoOK: false,
	fondoURL: "Imagenes/Layout/Fondo.png"
};

var sprite = {
	x: 400,
	y: 500,
	//Ok: false
};


// Asigno las URL de las distintas imagenes de frente, dcha, izda t atras y creo los arrays de comprobaci{on}
function asignarfrente (){
	sprite.frente =new Array(3);
	sprite.frenteOK=new Array(3);
	for (i=0; i<3; i++){
		
		sprite.frenteOK[i]=false;
		sprite.frente[i]= new Image();
		sprite.frente[i].src="Imagenes/Sprite/Frente"+i+".png";


	};
	//var cuentaimagenes=confirmar();

	
	

	
	//console.log(sprite.OK);
	//sprite.frente[2].onload=cuentaimagenes();
	//console.log(sprite.OK);
	//sprite.frente[3].onload=cuentaimagenes();
	//console.log(sprite.OK);
	//sprite.frente[1].onload=dibujar1;
	//console.log(cuentaimagenes());
// esto funciona
	//if(sprite.frenteOK[0]){
	//	tablero.drawImage(sprite.frente[0],sprite.x, sprite.y); 	
	//}
	//if(sprite.frenteOK[1]){
	//	tablero.drawImage(sprite.frente[1],sprite.x, sprite.y); 	
	//}

};

function confirmarfondo () {
fondo.fondoOK=true;
dibujar();
}

function inicio () {

var canvas = document.getElementById("campo");
// variable global
tablero = canvas.getContext("2d");
// introduzco el fondo. Es la única imagen que tratamos de esta forma. Las imagenes sprite, las trataremos de otra manera
fondo.imagen = new Image();
fondo.imagen.src = fondo.fondoURL;
fondo.imagen.onload = confirmarfondo;

asignarfrente();

//Esto funciona
//
//
sprite.frente[1].onload=function(){
		sprite.frenteOK[1]=true;
		console.log(sprite.frenteOK[1]);
	};

	sprite.frente[0].onload=function(){
		sprite.frenteOK[0]=true;
		console.log(sprite.frenteOK[0]);
	};

	console.log(sprite.frenteOK[0]);
	console.log(sprite.frenteOK[1]);



};

function dibujar () {
	if (fondo.fondoOK)
		{
			tablero.drawImage(fondo.imagen,0,0);
			
		};

		
};
// function dibujar1(){
//tablero.drawImage(sprite.frente[1],sprite.x, sprite.y); 	
 //};

