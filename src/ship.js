import coordinate from "./coordinate";

function ship(shipLength, coord, shipDirection) {
	const shipArea = [];
	if (shipDirection == 'hor') {
		for (let i = 0; i < shipLength; i++) {
			shipArea[i] = coordinate(coord.x, coord.y + i);
		}
	} else {
		for (let i = 0; i < shipLength; i++) {
			shipArea[i] = coordinate(coord.x + i, coord.y);
		}
	}
	const hit = ({ x, y }) => {
		shipArea.forEach((value, index, arr) => {
			if (arr[index].x === x && arr[index].y === y) {
				arr[index].isHit = 1;
			}
		});
	};
	const checkCoord = ({ x, y }) => {
		let check = false;
		shipArea.forEach((value, index, arr) => {
			if (arr[index].x === x && arr[index].y === y) {
				check = true;
			}
		});
		return check;
	};
	const isSunk = () => {
		let count = 0;
		for (let i = 0; i < shipLength; i++) {
			if (shipArea[i].isHit === 1) count++;
		}
		if (count === shipLength) return true;
		return false;
	};
	return {
		shipLength,
		shipArea,
		isSunk,
		hit,
		checkCoord,
	};
}

export default ship;
