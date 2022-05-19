/* eslint-disable no-undef */
import gameBoard from './gameBoard';

const gameBoardPlayer1 = gameBoard();
gameBoardPlayer1.addShip(3, { x: 2, y: 3 }, 'hor');
gameBoardPlayer1.addShip(2, { x: 4, y: 1 }, 'hor');

const mockSinkAllShip = (gb) => {
	gb.shipArr.forEach((e) => {
		e.shipArea.forEach(c => c.isHit = 1);
	});
}

test('add ship', () => {
	gameBoardPlayer1.addShip(1, { x: 5, y: 5 }, 'hor');
	expect(gameBoardPlayer1.shipArr[2].shipArea).toStrictEqual([
		{ x: 5, y: 5, isHit: 0 },
	]);
});
test('get hit', () => {
	gameBoardPlayer1.receiveAttack({ x: 2, y: 3 });
    expect(gameBoardPlayer1.shipArr[0].shipArea[0].isHit).toBe(1);
});
test('all ships are sunk', () => {
	mockSinkAllShip(gameBoardPlayer1);
	expect(gameBoardPlayer1.checkAllShipSunk()).toBe(true);
});