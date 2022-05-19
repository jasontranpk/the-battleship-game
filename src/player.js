import gameBoard from './gameBoard';
import coordinate from './coordinate';

function player(name) {
	let turn = 0;
	const shootArr = [];
	const playerGameBoard = gameBoard();
	const changeTurn = () => {
		if (turn === 0) turn = 1;
		else turn = 0;
	};
	const checkShootArray = (coord) => {
		let flag = false;
		shootArr.forEach((val) => {
			if (val.x === coord.x && val.y === coord.y) {
				flag = true;
			}
		});
		return flag;
	};

	const randomPlays = () => {
		let x = Math.round(Math.random() * 9);
		let y = Math.round(Math.random() * 9);
		while (checkShootArray({ x, y })) {
			x = Math.round(Math.random() * 9);
			y = Math.round(Math.random() * 9);
		}
		shootArr.push({ x, y });
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
	};
}

export default player;
