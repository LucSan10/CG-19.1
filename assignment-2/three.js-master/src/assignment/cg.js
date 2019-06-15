let camera, box, scene, renderer, dragControls;
let center, controls, qs, qr, arcball;
let t = 0;
let objects = [];
let rotation = false;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2(), INTERSECTED;

init();
animate();

class Arcball{
	constructor(object){
		this.arcball;
		this.object = object;
		this.global = false;
		this.active = false;

		this.checkGlobal();
		this.updatePosition();
		this.makeArcball();
	}
	
	checkGlobal(){
		if (this.object.name === "group"){
			this.global = true;
		}
	}
	
	activate(){ this.active = true; }
	
	deactivate(){ this.active = false; }
	
	updatePosition(){
		if (this.global){
			let _pivot = this.object.children[0];
			
			for (let _object of _pivot.children){
				this.object.position.add(_object.position);
			}

			this.object.position.divideScalar(_pivot.children.length);
			_pivot.position.copy(this.object.position);
			_pivot.position.multiplyScalar(-1);
		}
	}

	makeArcball(){
		let radius = this.calculateRadius();	
		let sphere = this.createSphere(radius);
	
		sphere.position.copy(this.object.position);
		sphere.name = "arcball";
		this.arcball = sphere;
	}
	
	createSphere(radius){
		let geometrySphere = new THREE.SphereGeometry(radius, 50, 50);
		let material = new THREE.MeshNormalMaterial();
		material.transparent = true;
		material.opacity = 0.2;

		return new THREE.Mesh(geometrySphere, material);
	}

	calculateRadius(){
		let r = 0;
		
		if (this.global){
			let _group = this.object.children[0];

			for (let _object of _group.children) {
				let box = new THREE.BoxHelper(_object);
				box.geometry.computeBoundingSphere();
			
				let radius = box.geometry.boundingSphere.radius;	
				let distance = this.object.position.distanceTo(_object.position);
				
				if (r < distance + radius) r = distance + radius;
			}
		}

		else{
			let box = new THREE.BoxHelper(this.object);
			box.geometry.computeBoundingSphere();
			r = box.geometry.boundingSphere.radius;
		}

		return r;
	}

	// calculateProjection(){
	// 	let radius = this.arcball.geometry.boundingSphere.radius;
	// 	let pos = this.arcball.position;
		
	// 	let mouse3 = new THREE.Vector3(mouse.x - pos.x, mouse.y - pos.y, 0);
	// 	mouse3.divideScalar(radius);
	// 	let r = mouse3.lengthSq();
		
	// 	if (r > 1) mouse3.normalize();
	// 	else mouse3.z = Math.sqrt(1 - r);

	// }

	show(){
		scene.add(this.arcball);
	}

	remove(){
		scene.remove(this.arcball);
	}
}

function onDocumentMouseMove(event){
	event.preventDefault();

	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);
	let intersects = raycaster.intersectObjects(objects);
	highlightObject(intersects);
}

function onDocumentDoubleClick(event){
	event.preventDefault();

	if (!rotation){
		if (INTERSECTED) arcball = new Arcball(INTERSECTED);
		else arcball = new Arcball(center);
		arcball.show();
		dragControls.deactivate();
	}
	
	else{
		arcball.remove();

		if (INTERSECTED === null || INTERSECTED === arcball.object) dragControls.activate();
		else{
			rotation = !rotation;
			arcball = new Arcball(INTERSECTED);
			arcball.show();
		}
	}

	rotation = !rotation;
	console.log(rotation);
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
	
	scene.add( new THREE.AmbientLight( 0xffffff, 0.2 ) );
	let light = new THREE.PointLight(0xffffff, 1);
	camera.add(light);
	
	center = new THREE.Group();
	center.name = "group";
	scene.add(center);
	
	let pivot = new THREE.Group();
	center.add(pivot);
	
	let axesHelper = new THREE.AxesHelper(200);
	scene.add(axesHelper);
	
	scene.background =  new THREE.Color(0xf0f0fa);
	
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	initObjects(4, pivot);
	
	dragControls = new THREE.DragControls(objects, camera, renderer.domElement);
	
	controls = new THREE.OrthographicTrackballControls(camera, renderer.domElement);
	setControlsOptions(controls);
	
	dragControls.addEventListener('dragstart', function (){
		controls.enabled = false;
	});
	
	dragControls.addEventListener('dragend', function (){
		controls.enabled = true;
	});

	document.addEventListener('dblclick', onDocumentDoubleClick, false);

	document.addEventListener('mousemove', onDocumentMouseMove, false);
}	

function initObjects(n, pivot){
	let boxGeometry = new THREE.BoxGeometry(50, 50, 50);

	for (let i = 0; i < n; i++){
		let material = new THREE.MeshLambertMaterial({color: Math.random()*0xffffff});
		
		let mesh = new THREE.Mesh(boxGeometry, material);
		randomPosition(mesh.position);
		randomRotationObject(mesh.quaternion);
		randomScale(mesh.scale);
		
		objects.push(mesh);
		pivot.add(mesh);

		// scene.add(sphere);
	}
	
	qs = new THREE.Quaternion();
	qs.copy(center.quaternion);
	qr = new THREE.Quaternion(1, 2, 3, 4).normalize();

	// box = new THREE.BoxHelper(center);
	// box.geometry.computeBoundingBox();
	// box.geometry.computeBoundingSphere();
	
	// scene.add(box);
	// let c = box.geometry.boundingSphere.center;
	// let r = box.geometry.boundingSphere.radius;

	// scene.add(sphere);
	// scene.add(boundingBox);
	// let sphere = createBoundingSphere();

	// let [radius, pos] = calculateRadius(center);
	// center.position.copy(pos);

	// let geom = new THREE.SphereGeometry(radius, 60, 60);
	// scene.add(box);

	// center.position.copy(center);
	// center.position.multiplyScalar(-1);
	
	// sphere.position.copy(center);
	// scene.add(sphere);

	// let mat = new THREE.MeshNormalMaterial();
	// mat.transparent = true;
	// mat.opacity = 0.3;

	// let m = new THREE.Mesh(geom, mat);
	// m.position.copy(pos);
	// scene.add(m);

	// randomRotationGroup(center.quaternion);
}

function render(){
	controls.update();

	// if (controls.enabled) highlightObject(intersects);

	// center.rotation.y = (center.rotation.y + Math.PI/180)%(2*Math.PI);
	// t = t+0.01;
	// THREE.Quaternion.slerp(qs, qr, center.quaternion, t);
}

function animate(){
	requestAnimationFrame(animate);
	
	render();
	renderer.render(scene, camera);
}	