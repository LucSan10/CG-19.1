let camera, scene, renderer;
let geometry, material, mesh;
let theta = 0;
let qs, qr;
let t = 0;
let objects = [];

class Objeto {
	constructor(object){
		this.object = object;
	}
}

function init() {
	let frustumSize = 1000;
	let aspect = window.innerWidth / window.innerHeight;
	// camera = new THREE.PerspectiveCamera( 70, aspect, 1, 10000 );
	camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 10000 );

	scene = new THREE.Scene();
	scene.background =  new THREE.Color( 0xf0f0f0 );

	geometry = new THREE.BoxGeometry( 20,20,20 );
	let geom = new THREE.BoxGeometry( 200, 200, 200 );
    material = new THREE.MeshNormalMaterial();
	mesh = new THREE.Mesh( geom, material ); 
	qs = new THREE.Quaternion();
	qs.copy(mesh.quaternion);
	qr = new THREE.Quaternion(1,1,1,1).normalize();

	scene.add(mesh);
	console.log(mesh.quaternion);

	for (let i = 0; i < 200; i++){
		let object = new THREE.Mesh( geometry, material );
		object.position.x = Math.random() * 800 - 400;
		object.position.y = Math.random() * 600 - 300;
		object.position.z = Math.random() * 400 - 200;
		

		let endQuaternion = new THREE.Quaternion(20 * Math.random(),
								  20 * Math.random(),
								  20 * Math.random(),
								  20 * Math.random()).normalize();

		object.quaternion.slerp(endQuaternion, 0.5);
		
		object.scale.x = Math.random() + 0.5;
		object.scale.y = Math.random() + 0.5;
		object.scale.z = Math.random() + 0.5;

		objects.push(object);
		scene.add( object );
	}
	
	

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
}	

function animate() {
	requestAnimationFrame( animate );
	
	render();
	renderer.render( scene, camera );
}	

function render() {
	theta += 0.5;
	camera.position.x = 6000 * Math.cos( THREE.Math.degToRad( theta ) );
	camera.position.y = 600 * Math.cos( THREE.Math.degToRad( theta ) );
	camera.position.z = 600 * Math.sin( THREE.Math.degToRad( theta ) );
	camera.lookAt( scene.position );
	t = (t+0.01) % 2;
	THREE.Quaternion.slerp(qs, qr, mesh.quaternion, t);
	console.log(t);
}

init();
animate();