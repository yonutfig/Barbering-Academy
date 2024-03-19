const loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
  const textGeometry = new THREE.TextGeometry('Gabriel Firea', {
    font: font,
    size: 0.5,
    height: 0.1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelSegments: 5,
  });

  const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  textMesh.position.x = -2;
  scene.add(textMesh);

  const animate = function () {
    requestAnimationFrame(animate);

    textMesh.rotation.x += 0.005;
    textMesh.rotation.y += 0.005;

    renderer.render(scene, camera);
  };

  animate();
});
