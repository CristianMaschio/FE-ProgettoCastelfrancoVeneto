import { callAPI } from './callAPI';
import { Place } from '../models/Place';

export function getPlaces(): Promise<Place[]> {
  return callAPI<Place[]>('places');
}

export function getPlace(placeId: string) {
  return callAPI<Place>(`${placeId}`);
}
