/* eslint-disable no-undef */
import gameBoard from './gameBoard';

const gameBoardPlayer1 = gameBoard();

test('add ship', () => {
	gameBoardPlayer1.addShip(3, { x: 2, y: 3 }, 'hor');
	expect(gameBoardPlayer1.shipArr[0].shipArea).toStrictEqual([
		{ x: 2, y: 3, isHit: 0 },
		{ x: 2, y: 4, isHit: 0 },
		{ x: 2, y: 5, isHit: 0 },
	]);
});
test('get hit', () => {
	gameBoardPlayer1.receiveAttack({ x: 2, y: 3 });
    expect(gameBoardPlayer1.shipArr[0].shipArea[0].isHit).toBe(1);
});
