import { check } from 'prettier';
import ship from './ship';

function gameBoard() {
	const shipArr = [];
	const missedShot = [];
	const addShip = (shipLength, coord, shipDirection) => {
		const newShip = ship(shipLength, coord, shipDirection);
		shipArr.push(newShip);
	};
	const receiveAttack = (coord) => {
		let checkMissed = true;
		shipArr.forEach((val) => {
			if (val.checkCoord(coord)) {
				val.hit(coord);
				checkMissed = false;
			}
		});
		if (checkMissed === true){
			missedShot.push(coord);
		}
	};
	const checkAllShipSunk = () => {
		let check = true;
		shipArr.forEach((ship) => {
			if(!ship.isSunk())
				check = false;
		})
		return check;
	}
	return {
		shipArr,
        missedShot,
		addShip,
		receiveAttack,
		checkAllShipSunk,
	};
}

export default gameBoard;
