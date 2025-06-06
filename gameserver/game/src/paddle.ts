import { BORDER } from "./config.js";
import { canvas, ctx } from "./state.js"

export class Paddle {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public speed: number,
        public color: string
    ) {}

    moveUp(): void {
        if (this.y - this.speed >= BORDER) {
            this.y -= this.speed;
        } else {
            this.y = BORDER;
        }
    }
  
    moveDown(): void {
        if (this.y + this.height + this.speed <= canvas.height - BORDER) {
            this.y += this.speed;
        } else {
            this.y = canvas.height - this.height - BORDER;
        }
    }
  
    draw(): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
    logPosition(): void {
        console.log(`Paddle position : x = ${this.x}, y = ${this.y}`);
    }
  }
  