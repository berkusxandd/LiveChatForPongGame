export class Match {
    winner?: string;
    score: number[] = [0, 0];
    played: boolean = false;

    constructor(
        public player1: string,
        public player2: string
    ) {}

    setWinner() {
        this.winner = this.score[0] > this.score[1] ? this.player1 : this.player2;
        this.played = true;
        console.log(`DB player ${this.winner} win, score ${this.score}`);
    }
}