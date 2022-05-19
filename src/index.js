import './assets/css/style.css';
import player from './player';

const gameLoop = (() => {
	const player1 = player('player1');
	const computer = player('computer');
	player1.changeTurn();
	player1.playerGameBoard.addShip(2, { x: 0, y: 0 }, 'ver');
	player1.playerGameBoard.addShip(3, { x: 4, y: 1 }, 'hor');
	player1.playerGameBoard.addShip(4, { x: 1, y: 5 }, 'ver');
	computer.playerGameBoard.addShip(2, { x: 2, y: 2 }, 'ver');
	computer.playerGameBoard.addShip(3, { x: 3, y: 5 }, 'hor');
	computer.playerGameBoard.addShip(4, { x: 4, y: 6 }, 'hor');
	const renderShip = () => {
		player1.playerGameBoard.shipArr.forEach((val, index) => {
			val.shipArea.forEach((ship, index) => {
				const tempCell = document.getElementById(
					`l${ship.x}-${ship.y}`
				);
				if (ship.isHit === 1) {
					tempCell.style.backgroundColor = 'black';
					tempCell.style.pointerEvents = 'none';
				} else tempCell.style.backgroundColor = 'blue';
			});
		});
		computer.playerGameBoard.shipArr.forEach((val) => {
			val.shipArea.forEach((ship) => {
				const tempCell = document.getElementById(
					`r${ship.x}-${ship.y}`
				);
				if (ship.isHit === 1) {
					tempCell.style.backgroundColor = 'black';
					tempCell.style.pointerEvents = 'none';
				} else tempCell.style.backgroundColor = 'yellow';
			});
		});
	};
	const renderMissedShot = () => {
		player1.playerGameBoard.missedShot.forEach((val) => {
			const tempCell = document.getElementById(`l${val.x}-${val.y}`);
			tempCell.style.backgroundColor = 'red';
			tempCell.style.pointerEvents = 'none';
		});
		computer.playerGameBoard.missedShot.forEach((val) => {
			const tempCell = document.getElementById(`r${val.x}-${val.y}`);
			tempCell.style.backgroundColor = 'red';
			tempCell.style.pointerEvents = 'none';
		});
	};
	const loop = () => {
		const rightGameBoardNode =
			document.querySelectorAll('.right.gameBoard');
		const rightGameBoardArr = Array.from(rightGameBoardNode);
		const rightGameBoard = rightGameBoardArr[0];
		const leftGameBoardNode = document.querySelectorAll('.left.gameBoard');
		const leftGameBoardArr = Array.from(leftGameBoardNode);
		const leftGameBoard = leftGameBoardArr[0];
		if (player1.turn === 1) {
			rightGameBoard.style.pointerEvents = 'auto';
		} else {
			rightGameBoard.style.pointerEvents = 'none';
		}
		if (
			player1.playerGameBoard.checkAllShipSunk() ||
			computer.playerGameBoard.checkAllShipSunk()
		) {
			alert('winner is already choosen');
			leftGameBoard.style.pointerEvents = 'none';
			rightGameBoard.style.pointerEvents = 'none';
		}
	};
	const eventReceiveHit = (cell, pl) => {
		const hitObj = cell.target.id.substring(1).split('-');
		const coord = {
			x: parseInt(hitObj[0], 10),
			y: parseInt(hitObj[1], 10),
		};
		pl.playerGameBoard.receiveAttack(coord);
		renderMissedShot();
		renderShip();
		player1.changeTurn();
		// computer counter attack
		const computerHit = computer.randomPlays();
		player1.playerGameBoard.receiveAttack(computerHit);
		player1.changeTurn();
		renderMissedShot();
		renderShip();
		loop();
	};
	const render = () => {
		const leftGameBoardNode = document.querySelectorAll('.left.gameBoard');
		const leftGameBoardArr = Array.from(leftGameBoardNode);
		const leftGameBoard = leftGameBoardArr[0];
		const rightGameBoardNode =
			document.querySelectorAll('.right.gameBoard');
		const rightGameBoardArr = Array.from(rightGameBoardNode);
		const rightGameBoard = rightGameBoardArr[0];
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				const cell = document.createElement('div');
				cell.classList.add('cell');
				cell.id = `l${i}-${j}`;
				// cell.addEventListener('click', (e) => {
				// 	eventReceiveHit(e, player1);
				// });
				leftGameBoard.appendChild(cell);
				const rightCell = document.createElement('div');
				rightCell.classList.add('cell');
				rightCell.id = `r${i}-${j}`;
				// rightCell.textContent = `${i} - ${j}`;
				rightCell.addEventListener('click', (e) => {
					eventReceiveHit(e, computer);
				});
				rightGameBoard.appendChild(rightCell);
			}
		}
		renderShip();
		loop();
	};

	return { render };
})();

gameLoop.render();
