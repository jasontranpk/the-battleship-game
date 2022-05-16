import './assets/css/style.css';
import ship from './ship';

const myShip = ship(6, { x: 2, y: 3 });
myShip.hit(0);
myShip.hit(1);
myShip.hit(2);
myShip.hit(3);
myShip.hit(4);
console.log(myShip);
