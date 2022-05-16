import gameBoard from './gameBoard';
import coordinate from './coordinate';

function player(name) {
	let turn = 0;
	const playerGameBoard = gameBoard();
	const changeTurn = () => {
		if (turn === 0) turn = 1;
		else turn = 0;
	};
	const randomPlays = () => {
		const x = Math.round(Math.random() * 20);
		const y = Math.round(Math.random() * 20);
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
