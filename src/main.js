const config = {
  width: 1024,
  height: 768,
  renderer: Phaser.CANVAS,
  parent: 'game-container',
  state: {
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

let player1, player2;

function create() {
  game.stage.backgroundColor = '#1e272c';

  // 1. Línea divisoria central punteada
  const graphics = game.add.graphics(0, 0);
  graphics.lineStyle(4, 0xffffff, 0.8);
  for (let y = 0; y < 768; y += 30) {
    graphics.moveTo(512, y);
    graphics.lineTo(512, y + 15);
  }

  // 2. ZONAS COMPARTIDAS (Arriba y Abajo en la línea central)
  // - Órdenes (Arriba Centro)
  createStation(412, 20, 200, 60, 0x34495e, 'ÓRDENES');
  
  // - Ventanilla de Entrega (Abajo Centro)
  createStation(412, 680, 200, 68, 0x27ae60, 'VENTANILLA');

  // 3. LADO IZQUIERDO (Jugador 1)
  // - Ingredientes Izquierda: Tomates (T) y Papas (Pp)
  createStation(30, 20, 70, 70, 0xe74c3c, 'T\n(Tomate)');
  createStation(120, 20, 70, 70, 0x7f8c8d, 'Pp\n(Papas)');
  
  // - Plancha (Lateral Izquierdo)
  createStation(30, 110, 70, 320, 0xc0392b, 'P L A N C H A');

  // - Lechuga (L) (Abajo de la plancha)
  createStation(30, 440, 70, 70, 0x2ecc71, 'L\n(Lechuga)');

  // - Freidora (Abajo Izquierda)
  createStation(110, 680, 180, 68, 0xd35400, 'FREIDORA');

  // 4. LADO DERECHO (Jugador 2)
  // - Ingredientes Derecha: Queso (Q) y Pan (P)
  createStation(834, 20, 70, 70, 0xf1c40f, 'Q\n(Queso)');
  createStation(924, 20, 70, 70, 0xe67e22, 'P\n(Pan)');

  // - Mesa de Trabajo / Picar (Lateral Derecho)
  createStation(924, 110, 70, 320, 0x8e44ad, 'M E S A');

  // - Hamburguesas (H) (Abajo de la mesa)
  createStation(924, 440, 70, 70, 0x34495e, 'H\n(Hamburguesa)');

  // 5. JUGADORES
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Jugador 1 (Azul - Izquierda)
  player1 = game.add.graphics(300, 384);
  player1.beginFill(0x3498db);
  player1.drawCircle(0, 0, 36);
  player1.endFill();
  game.physics.arcade.enable(player1);

  // Jugador 2 (Verde - Derecha)
  player2 = game.add.graphics(724, 384);
  player2.beginFill(0x2ecc71);
  player2.drawCircle(0, 0, 36);
  player2.endFill();
  game.physics.arcade.enable(player2);
}

function createStation(x, y, w, h, color, text) {
  const station = game.add.graphics(x, y);
  station.beginFill(color);
  station.drawRect(0, 0, w, h);
  station.endFill();

  const style = { font: '12px Arial', fill: '#ffffff', align: 'center', fontWeight: 'bold' };
  const txt = game.add.text(x + w / 2, y + h / 2, text, style);
  txt.anchor.setTo(0.5, 0.5);
}

function update() {
  if (player1 && player1.x > 480) player1.x = 480;
  if (player2 && player2.x < 544) player2.x = 544;
}