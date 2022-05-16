/* eslint-disable no-undef */
import player from './player';

const player1 = player('player1');

test('change turn', () => {
	console.log(player1.turn);
	player1.changeTurn();
	expect(player1.turn).toBe(1);
});

test('name', () => {
	expect(player1.name).toBe('player1');
});
