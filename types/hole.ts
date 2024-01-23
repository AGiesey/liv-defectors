import {Teebox} from './teebox';

export interface Hole {
    Handicap: number,
    Hole: number,
    Par: number,
    tees: {string: Teebox}
}