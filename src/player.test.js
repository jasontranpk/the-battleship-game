/* eslint-disable no-undef */
import player from './player';

const player1 = player('player1');
player1.playerGameBoard.addShip(3, { x: 2, y: 3 }, 'hor');

test('change turn', () => {
	player1.changeTurn();
	expect(player1.turn).toBe(1);
});

test('name', () => {
	expect(player1.name).toBe('player1');
});
