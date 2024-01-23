import {Hole} from './hole';
import {Teebox} from './teebox';

export interface Course {
    address: string,
    city: string,
    coordinates: string,
    country: string,
    createdAt: string,
    fairwayGrass: string,
    greenGrass: string,
    holes: string,
    lengthFormat: string,
    likes: any[], //TODO: add "like" when I stumble on a course that has one
    name: string,
    phone: string,
    scorecard: Hole[],
    state: string,
    teeboxes: Teebox[],
    updatedAt: string,
    website: string,
    zip: string,
    _id: string,
}