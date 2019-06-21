function calculateRadius(_group) {
	let r = 0;

    for (let object of _group.children) {
		let box = new THREE.BoxHelper(object);
		box.geometry.computeBoundingSphere();

		let distance = _group.position.distanceTo(object.position);
		let radius = box.geometry.boundingSphere.radius;

		if (r < distance + radius) r = distance + radius;
	}
    return r;
}

function createBoundingSphere(_object){
	let box = new THREE.BoxHelper(_object);
	box.geometry.computeBoundingSphere();
	let radius = box.geometry.boundingSphere.radius;

    let sphere = createSphere(radius);
    sphere.position.copy(_object.position); 
	sphere.name = "arcball";
	return sphere;
}

function createSphere(radius){
    let geometrySphere = new THREE.SphereGeometry(radius, 50, 50);
	let material = new THREE.MeshNormalMaterial();
	material.transparent = true;
	material.opacity = 0.2;

    return new THREE.Mesh(geometrySphere, material);
}

function createGlobalBoundingSphere(pivot){
	let r = calculateRadius(pivot);	
    let sphere = createSphere(r);

	sphere.position.copy(center.position);
	sphere.name = "arcball";
	return sphere;
}

function randomPosition(position){
	position.x = Math.random() * 600 - 300;
	position.y = Math.random() * 400 - 200;
	position.z = Math.random() * 200 - 100;
}

function randomRotationObject(quaternion){
	let endQuaternion = new THREE.Quaternion(
		10 * Math.random(), 10 * Math.random(),
		10 * Math.random(), 10 * Math.random())
		.normalize();
	
	quaternion.slerp(endQuaternion, Math.random()*2 - 1);	
}

function randomRotationGroup(quaternion){
	let endQuaternion = new THREE.Quaternion(
		10 * Math.random(), 10 * Math.random(),
		10 * Math.random(), 10 * Math.random())
		.normalize();
	
	quaternion.slerp(endQuaternion, Math.random()*2 - 1);	
}

function randomScale(scale){
	scale.x = 2*Math.random() + 1;
	scale.y = 2*Math.random() + 1;
	scale.z = 2*Math.random() + 1;
}

function centerPosition(x, y, z){
	center.position.set(x, y, z);
}

function incrementCenterRotation(x, y, z){
	center.rotation.add(new THREE.Vector3(x, y, z));
}