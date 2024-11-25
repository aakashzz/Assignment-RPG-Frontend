import React from "react";
import Phaser from "phaser";
import Game from "../components/Game";
import Player from "../js/Player.js";

class MainScene extends Phaser.Scene {
   preload() {
      Player.preload(this);
      this.load.image("tiles","assets/images/tilesheet.png");
      this.load.tilemapTiledJSON('map',"assets/images/map.json")
   }

   create() {
      const map = this.make.tilemap({key:"map"});
      const tileset = map.addTilesetImage("tilesheet",'tiles',32,32,0,0);
      const layer1 = map.createLayer("Tile Layer 1",tileset,0,0)
      const layer2 = map.createLayer("entity",tileset,0,0)
      const layer3 = map.createLayer("Green",tileset,0,0)
      const layer4 = map.createLayer("House",tileset,0,0)
      const layer5 = map.createLayer("Object",tileset,0,0)

      layer1.setCollisionByProperty({types: ["stone", "lava", "sand" ], collides:true});
      this.matter.world.convertTilemapLayer(layer1)
      this.player = new Player({
         scene: this,
         x: 300,
         y: 300,
         textures: "male",
         frame: "townsfolk_m_idle_1",
      });
     
      this.player.inputKeys = this.input.keyboard.addKeys({
         up: Phaser.Input.Keyboard.KeyCodes.W,
         down: Phaser.Input.Keyboard.KeyCodes.S,
         left: Phaser.Input.Keyboard.KeyCodes.A,
         right: Phaser.Input.Keyboard.KeyCodes.D,
      });
   }

   update() {
      this.player.update();
   }
}

function Home() {
   const config = {
      type: Phaser.AUTO,
      parent: "phaser-container",
      width: 900,
      height: 512,
      backgroundColor: "#999999",
      scene: [MainScene],
      physics: {
         default: "matter",
         matter: {
            debug: true,
            gravity: { y: 0 },
         },
      },
   };

   return (
      <div>
         <div id="phaser-container">
            <Game config={config} />
         </div>
      </div>
   );
}

export default Home;
