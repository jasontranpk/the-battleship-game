/* eslint-disable no-undef */
import ship from './ship';

let myHorizonShip;

beforeEach(() => {
	myHorizonShip = ship(3, { x: 2, y: 1 }, 'hor');
});

test('is sunk after taking all hit?', () => {
	myHorizonShip.shipArea.forEach((val, index) => {
		myHorizonShip.shipArea[index].isHit = 1;
	});
	expect(myHorizonShip.isSunk()).toBe(true);
});
test('is hit(2, 3)?', () => {
	myHorizonShip.hit({ x: 2, y: 3 });
	expect(myHorizonShip.shipArea[2].isHit).toBe(1);
});
test('is hit (2,4 )? missed', () => {
	myHorizonShip.hit({ x: 2, y: 4 });
	expect(myHorizonShip.shipArea[2].isHit).toBe(0);
});
test('check coordinate', () => {
	expect(myHorizonShip.checkCoord({x:2, y:2})).toBe(true);
});
