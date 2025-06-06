import { canvas, ctx, scoreGoal } from "./state.js";

export class Ball {
    constructor(
        public x: number,
        public y: number,
        public radius: number,
        public dx: number,
        public dy: number,
        public speed: number,
        public color: string
    ) {}

    move(): void {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
        
        if (this.x - this.radius < 0)
            scoreGoal(1);
        if (this.x + this.radius > canvas.width)
            scoreGoal(0);
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0)
            this.dy = -this.dy;
    }

    draw(): void {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    logPosition(): void {
        console.log(`Position de la balle : x = ${this.x}, y = ${this.y}`);
    }
}
