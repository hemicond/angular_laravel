const name: string = 'manuel';

let points: number /* | 'SoloEstaPalabra' */ = 321;

/* puntos = 'SoloEstaPalabra'; */
const inscription: boolean = false;

console.log({ name, points, inscription });

/* --------------------------2--------------------------------*/

const skills: string[] = ['bash', 'counter', 'Healing'];
const skillspoints: number[] = [1, 4, 2, 3, 6, 4, 77, 99, 44.3];
const other: any[] = ['barun', 1, true, ['description']];

/* NO PODEMOS TIPAR EN EL ARREGLO POR ELLO LAS INTERFACES*/

interface Character {
  name: string;
  hp: number;
  skills: string[];
  hometown?: string /*valor opcional*/;
}
const strider: Character = {
  name: 'strider',
  hp: 100,
  skills: ['bash', 'counter'],
};

strider.hometown = 'Rivendell';

console.table(strider);

/* --------------------------3--------------------------------*/

function addNumbers(a: any, b: any) {
  return a + b;
}

addNumbers(1, 2);
const result: number = addNumbers(1, 4);

console.log(result);
export {};
