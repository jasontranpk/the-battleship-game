import ship from './ship';

function gameBoard() {
	const shipArr = [];
	const missedShot = [];
	const addShip = (shipLength, coord, shipDirection) => {
		const newShip = ship(shipLength, coord, shipDirection);
		shipArr.push(newShip);
	};
	const receiveAttack = (coord) => {
		shipArr.forEach((val, index, arr) => {
			if (arr[index].checkCoord(coord)) arr[index].hit(coord);
			else missedShot.push(coord);
		});
	};
	return {
		shipArr,
        missedShot,
		addShip,
		receiveAttack,
	};
}

export default gameBoard;
