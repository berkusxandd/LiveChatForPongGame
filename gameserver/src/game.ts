import { gameStates, keys, match } from "./state.js";
import { updateGame } from "./update.js";
import { renderGame, renderPauseMenu, renderEndMenu } from "./render.js";
import { gameStart } from "./bince/gameStart.js";
import socket from "./socket.js";

function togglePause() {
    gameStates.isRunning = !gameStates.isRunning;
    gameStates.isRunning ? requestAnimationFrame(gameLoop) : renderPauseMenu();
}

function restartGame() {
    window.location.reload();
}

function quitGame() {
    window.location.reload();
}
// if (gameStates.isRemote) {
//     window.addEventListener("keydown", (event) => {
//         fetch(`http://localhost:3000/update/`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ action: "keydown", key: event, player:"left" })
//         });
//     });

//     window.addEventListener("keyup", (event) => {
//         fetch(`http://localhost:3000/update/`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ action: "keyup", key: event, player: "left" })
//         });
//     });
// } else {

//bince changed this
window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") quitGame();
    if (!gameStates.isEnd && event.key === "p") togglePause();
    if (event.key === "r") restartGame();
    if (gameStates.isRunning) {
               if (event.key === "w"){
         socket.emit("key-w", true)   
        }
        if (event.key === "s"){
         socket.emit("key-s", true)   
        }
        if (gameStates.playerIndex && event.key === "ArrowUp"){
         socket.emit("key-up", true)   
        }
        if (gameStates.playerIndex && event.key === "ArrowDown"){
         socket.emit("key-down", true)   

        }
    }
});
//bince changed this
window.addEventListener("keyup", (event) => {
    if (gameStates.isRunning) {
        if (event.key === "w"){
         socket.emit("key-w", false)   
        }
        if (event.key === "s"){
         socket.emit("key-s", false)   
        }
        if (gameStates.playerIndex && event.key === "ArrowUp"){
         socket.emit("key-up", false)   
        }
        if (gameStates.playerIndex && event.key === "ArrowDown"){
         socket.emit("key-down", false)   

        }
    }
});


function gameLoop() {
    if (gameStates.isEnd) {
        gameStates.isRunning = false;
        renderEndMenu();
        match.setWinner();
    }
    if (!gameStates.isRunning) return;
    renderGame();
    requestAnimationFrame(gameLoop);
}

await gameStart()
gameLoop()