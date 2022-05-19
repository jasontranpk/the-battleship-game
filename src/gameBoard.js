import ship from './ship';
import coordinate from './coordinate';

function gameBoard() {
	const shipArr = [];
	const missedShot = [];
	const addShip = (shipLength, coord, shipDirection) => {
		const newShip = ship(shipLength, coord, shipDirection);
		shipArr.push(newShip);
	};
	const isOwnedByOtherShip = (area) => {
		// check if coordinator is owned by another ship
		let flag = false;
		shipArr.forEach((ship) => {
			if (
				ship.shipArea.some((c) =>
					area.some((e) => e.x === c.x && e.y === c.y)
				)
			) {
				flag = true;
			}
		});
		return flag;
	};
	const createRandomShip = (shipLength) => {
		const randomDirection = Math.round(Math.random() * 10);
		let shipDirection;
		let xLimit;
		let yLimit;
		if (randomDirection >= 5) shipDirection = 'ver';
		else shipDirection = 'hor';
		if (shipDirection === 'ver') {
			xLimit = 9 - shipLength;
			yLimit = 9;
		} else {
			xLimit = 9;
			yLimit = 9 - shipLength;
		}
		let x = Math.round(Math.random() * xLimit);
		let y = Math.round(Math.random() * yLimit);
		let tempArr = [];
		if (shipDirection === 'hor') {
			for (let i = 0; i < shipLength; i++) {
				tempArr[i] = coordinate(x, y + i);
			}
		} else {
			for (let i = 0; i < shipLength; i++) {
				tempArr[i] = coordinate(x + i, y);
			}
		}

		while (isOwnedByOtherShip(tempArr)) {
			x = Math.round(Math.random() * xLimit);
			y = Math.round(Math.random() * yLimit);
			tempArr = [];
			if (shipDirection === 'hor') {
				for (let i = 0; i < shipLength; i++) {
					tempArr[i] = coordinate(x, y + i);
				}
			} else {
				for (let i = 0; i < shipLength; i++) {
					tempArr[i] = coordinate(x + i, y);
				}
			}
		}
		//console.log(`${x} - ${y}`);
		const newShip = ship(shipLength, { x, y }, shipDirection);
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
		if (checkMissed === true) {
			missedShot.push(coord);
		}
		return checkMissed;
	};
	const checkAllShipSunk = () => {
		let check = true;
		shipArr.forEach((ship) => {
			if (!ship.isSunk()) check = false;
		});
		return check;
	};
	return {
		shipArr,
		missedShot,
		addShip,
		receiveAttack,
		checkAllShipSunk,
		createRandomShip,
		isOwnedByOtherShip,
	};
}

export default gameBoard;
