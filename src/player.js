import gameBoard from './gameBoard';
import coordinate from './coordinate';

function player(name) {
	let turn = 0;
	const playerGameBoard = gameBoard();
	const changeTurn = () => {
		if (turn === 0) turn = 1;
		else turn = 0;
	};
	const checkShipCoord = (coord) => {
		let flag = false;
		playerGameBoard.shipArr.forEach((ship) => {
			ship.shipArea.forEach((shipCoord) => {
				if (shipCoord.x === coord.x && shipCoord.y === coord.y) {
					flag = true;
				}
			});
		});
		return flag;
	};
	const checkMissedCoord = (coord) => {
		let flag = false;
		playerGameBoard.missedShot.forEach((missedCoord) => {
			if (missedCoord.x === coord.x && missedCoord.y === coord.y) {
				flag = true;
			}
		});
		return flag;
	};
	const randomPlays = () => {
		let x = Math.round(Math.random() * 9);
		let y = Math.round(Math.random() * 9);
		while (checkShipCoord({ x, y }) || checkMissedCoord({ x, y })) {
			x = Math.round(Math.random() * 9);
			y = Math.round(Math.random() * 9);
		}
		console.log(`${x} - ${y}`);
		return coordinate(x, y);
	};

	return {
		name,
		get turn() {
			return turn;
		},
		playerGameBoard,
		changeTurn,
		randomPlays,
		checkShipCoord,
	};
}

export default player;
