let camera, box, scene, renderer, dragControls;
let parent, controls, qs, qr, arcball;
let newParentPosition = new THREE.Vector3();
let objects = [];
let rotation = false;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2(), INTERSECTED;

init();
animate();

// class Arcball{
// 	constructor(object){
// 		this.arcball;
// 		this.object = object;
// 		this.global = false;
// 		this.active = false;

// 		this.checkGlobal();
// 		this.updatePosition();
// 		this.makeArcball();
// 	}
	
// 	checkGlobal(){
// 		if (this.object.name === "group"){
// 			this.global = true;
// 		}
// 	}
	
// 	activate(){ this.active = true; }
	
// 	deactivate(){ this.active = false; }
	
// 	updatePosition(){
// 		if (this.global){
// 			let v = new THREE.Vector3(0,0,0);
// 			let _pivot = this.object.children[0];
// 			let i = 1;

// 			for (let _object of _pivot.children){
// 				let pos = new THREE.Vector3();
// 				let quat = new THREE.Quaternion();
// 				let sc = new THREE.Vector3();

// 				console.log("Object #", i++);
// 				console.log();
// 				_object.matrix.decompose(pos, quat, sc);
// 				console.log("position matrix");
// 				console.log(pos);
// 				console.log("object's position");
// 				console.log(_object.position);
// 				_object.rotation.set(0,0,0);
// 				console.log("object's new position");				
// 				console.log(_object.position);

// 				v.add(_object.position);
// 			}

// 			v.divideScalar(_pivot.children.length);
// 			_pivot.position.copy(this.object.position);
// 			_pivot.position.multiplyScalar(-1);
// 			console.log("hey");
// 		}
// 	}

// 	makeArcball(){
// 		let radius = this.calculateRadius();	
// 		let sphere = this.createSphere(radius);
	
// 		sphere.position.copy(this.object.position);
// 		sphere.name = "arcball";
// 		this.arcball = sphere;
// 		qs.copy(this.object.quaternion);
// 	}
	
// 	createSphere(radius){
// 		let geometrySphere = new THREE.SphereGeometry(radius, 50, 50);
// 		let material = new THREE.MeshNormalMaterial();
// 		material.transparent = true;
// 		material.opacity = 0.2;

// 		return new THREE.Mesh(geometrySphere, material);
// 	}

// 	calculateRadius(){
// 		let r = 0;
		
// 		if (this.global){
// 			let _group = this.object.children[0];

// 			for (let _object of _group.children) {
// 				let box = new THREE.BoxHelper(_object);
// 				box.geometry.computeBoundingSphere();
			
// 				let radius = box.geometry.boundingSphere.radius;	
// 				let distance = this.object.position.distanceTo(_object.position);
				
// 				if (r < distance + radius) r = distance + radius;
// 			}
// 		}

// 		else{
// 			let box = new THREE.BoxHelper(this.object);
// 			box.geometry.computeBoundingSphere();
// 			r = box.geometry.boundingSphere.radius;
// 		}

// 		return r;
// 	}

// 	// calculateProjection(){
// 	// 	let radius = this.arcball.geometry.boundingSphere.radius;
// 	// 	let pos = this.arcball.position;
		
// 	// 	let mouse3 = new THREE.Vector3(mouse.x - pos.x, mouse.y - pos.y, 0);
// 	// 	mouse3.divideScalar(radius);
// 	// 	let r = mouse3.lengthSq();
		
// 	// 	if (r > 1) mouse3.normalize();
// 	// 	else mouse3.z = Math.sqrt(1 - r);

// 	// }

// 	show(){
// 		scene.add(this.arcball);
// 	}

// 	remove(){
// 		scene.remove(this.arcball);
// 	}
// }

function onDocumentMouseDown(event){
	event.preventDefault();

	if (INTERSECTED){
		console.log(parent.quaternion);
	}
}

function onDocumentMouseUp(event){
	event.preventDefault();

	box.update();

	console.log("previous parent position");
	console.log(parent.position);

	let newParentPosition = box.geometry.boundingSphere.center.clone();
	console.log("new parent position");
	console.log(newParentPosition);

	let radius = box.geometry.boundingSphere.radius;
	console.log("new radius");
	console.log(radius);
	
	let translation = newParentPosition.clone();
	translation.sub(parent.position);
	console.log("translation");
	console.log(translation);

	console.log("object translation");
	console.log(translation);
	
	invQuat = parent.quaternion.clone();
	invQuat.inverse();
	
	translation.applyQuaternion(invQuat);
	console.log("object local translation");
	console.log(translation);

	let i = 1;
	for(object of parent.children){
		console.log("object #", i++, " position");
		console.log(object.position);
		object.position.sub(translation);
	}
	
	translation.applyQuaternion(parent.quaternion);
	parent.position.add(translation);
	console.log("parent position");
	console.log(parent.position);

	let sphere = scene.getObjectByName("sphere");
	scene.remove(sphere);
	
	let mat = createSeeThroughMaterial(0.2);
	
	let sphereGeometry = new THREE.SphereGeometry(radius, 50, 50);
	sphere = new THREE.Mesh(sphereGeometry, mat);
	sphere.position.copy(newParentPosition);
	sphere.name = "sphere";
	scene.add(sphere);
}


function onDocumentMouseMove(event){
	event.preventDefault();

	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);
	let intersects = raycaster.intersectObjects(objects);
	highlightObject(intersects);

	console.log(INTERSECTED.position);
}

function onDocumentDoubleClick(event){
	event.preventDefault();

	parent.rotation.z += Math.PI/2;
	box.update();

	// if (!rotation){
	// 	if (INTERSECTED) arcball = new Arcball(INTERSECTED);
	// 	else arcball = new Arcball(parent);
	// 	// arcball.show();
	// 	dragControls.deactivate();
	// }
	
	// else{
	// 	// arcball.remove();
	// 	t = 0;
	// 	if (INTERSECTED === null || INTERSECTED === arcball.object) dragControls.activate();
	// 	else{
	// 		rotation = !rotation;
	// 		arcball = new Arcball(INTERSECTED);
	// 		// arcball.show();
	// 	}
	// }

	// rotation = !rotation;
	// console.log(rotation);
}

// class Objeto {
// 	constructor(mesh){
// 		this.mesh = mesh;
// 		this.arcball;
// 		this.selected = false;
// 		this.makeArcball();
// 	}

// 	makeArcball(){
// 		this.mesh.geometry.computeBoundingSphere();
// 		this.arcball = this.mesh.geometry.boundingSphere;
// 	}
// }

function setControlsOptions(controls){
	controls.zoomSpeed = -1.2;
	controls.noZoom = false;
	controls.noPan = true;
	controls.noRotate = true;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;
}

function highlightObject(intersects){
	if (intersects.length > 0) {
		if (INTERSECTED != intersects[0].object) INTERSECTED = intersects[0].object;
	}
	
	else INTERSECTED = null;
}

function init(){
	initSceneAndCamera()
	
	parent = new THREE.Group();
	parent.name = "group";
	scene.add(parent);
	
	let axesHelper = new THREE.AxesHelper(200);
	scene.add(axesHelper);
	
	initObjects(4, parent);
	
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	initEvents()
}

function initSceneAndCamera(){
	let frustumSize = 1000;
	let aspect = window.innerWidth / window.innerHeight;
	
	scene = new THREE.Scene();

	let left = frustumSize * aspect / - 2;
	let right = frustumSize * aspect / 2;
	let top = frustumSize / 2;
	let bottom = frustumSize / -2;
	
	// camera = new THREE.PerspectiveCamera(70, aspect, 1, 10000);
	camera = new THREE.OrthographicCamera(left, right, top, bottom, 1, 10000);
	camera.position.z = 1000;
	scene.add(camera);

	scene.background =  new THREE.Color(0xf0f0fa);	

	scene.add( new THREE.AmbientLight( 0xffffff, 0.2 ) );
	let light = new THREE.PointLight(0xffffff, 1);
	camera.add(light);
}

function createSeeThroughMaterial(opacity){
	let mat = new THREE.MeshNormalMaterial();
	mat.transparent = true;
	mat.opacity = opacity;
	return mat;
}

function initObjects(n, parent){
	let boxGeometry = new THREE.BoxGeometry(50, 50, 50);
	
	for (let i = 0; i < n; i++){
		let material = new THREE.MeshLambertMaterial({color: Math.random()*0xffffff});
		
		let mesh = new THREE.Mesh(boxGeometry, material);
		randomPosition(mesh.position);
		randomRotationObject(mesh.quaternion);
		randomScale(mesh.scale);
		
		objects.push(mesh);
		parent.add(mesh);
		// scene.add(sphere);
	}
	
	box = new THREE.BoxHelper(parent);
	scene.add(box);

	let v = box.geometry.boundingSphere.center.clone();
	parent.position.copy(v);
	let radius = box.geometry.boundingSphere.radius;

	let mat = createSeeThroughMaterial(0.2);

	let sphereGeometry = new THREE.SphereGeometry(radius, 50, 50);
	let sphere = new THREE.Mesh(sphereGeometry, mat);
	sphere.position.copy(v);
	sphere.name = "sphere";
	scene.add(sphere);

	v.multiplyScalar(-1);

	// parent.updateMatrixWorld();
	// let m = new THREE.Matrix4().getInverse(parent.matrixWorld);

	for (object of parent.children){
		// object.applyMatrix(m);
		object.position.add(v);
		// object.applyMatrix(parent.matrixWorld);
	}

	console.log(parent.position);
	
	qs = new THREE.Quaternion();
	qr = new THREE.Quaternion(1, 2, 3, 4).normalize();

	// box.geometry.computeBoundingBox();
	// box.geometry.computeBoundingSphere();
	
	// scene.add(box);
	// let c = box.geometry.boundingSphere.center;
	// let r = box.geometry.boundingSphere.radius;
	
	// scene.add(sphere);
	// scene.add(boundingBox);
	// let sphere = createBoundingSphere();
	
	// let [radius, pos] = calculateRadius(parent);
	// parent.position.copy(pos);

	// let geom = new THREE.SphereGeometry(radius, 60, 60);
	// scene.add(box);
	
	// parent.position.copy(parent);
	// parent.position.multiplyScalar(-1);
	
	// sphere.position.copy(parent);
	// scene.add(sphere);
	
	// let m = new THREE.Mesh(geom, mat);
	// m.position.copy(pos);
	// scene.add(m);
	
	// randomRotationGroup(parent.quaternion);
}

function initEvents(){
	dragControls = new THREE.DragControls(objects, camera, renderer.domElement);

	controls = new THREE.OrthographicTrackballControls(camera, renderer.domElement);
	setControlsOptions(controls);
	
	document.addEventListener('mousedown', onDocumentMouseDown, false);

	document.addEventListener('mouseup', onDocumentMouseUp, false);

	dragControls.addEventListener('dragstart', function (){
		controls.enabled = false;
	});
	
	dragControls.addEventListener('dragend', function (){
		controls.enabled = true;
	});

	document.addEventListener('dblclick', onDocumentDoubleClick, false);

	document.addEventListener('mousemove', onDocumentMouseMove, false);
}

function render(){
	controls.update();
	parent.updateMatrix();

	// if (controls.enabled) highlightObject(intersects);

	// parent.rotation.y = (parent.rotation.y + Math.PI/180)%(2*Math.PI);
	// if (rotation){
	// 	t = t+0.01;
	// 	THREE.Quaternion.slerp(qs, qr, arcball.object.quaternion, t);
	// }
}

function animate(){
	requestAnimationFrame(animate);
	
	render();
	renderer.render(scene, camera);
}	