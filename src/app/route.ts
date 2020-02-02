import { Planet } from './planet';

export class Route {
    id: number;
    from: Planet;
    to: Planet;
    distance: number;
}