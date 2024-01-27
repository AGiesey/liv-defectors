import {Hole} from './hole';
import {Teebox} from './teebox';

/**
 * This is the root data model I get from Golf Course API. 
 * https://rapidapi.com/foshesco-65zCww9c1y0/api/golf-course-api/
 */
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
    teeBoxes: Teebox[],
    updatedAt: string,
    website: string,
    zip: string,
    _id: string,
}