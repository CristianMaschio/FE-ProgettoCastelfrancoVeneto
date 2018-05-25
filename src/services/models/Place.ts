import { format, isPast } from "date-fns";

export type Place = Readonly<{
  id?: string;
  name: string;
  title: string;
  description: string;
  image: string;
  date: string;
  isStand: Boolean;
  coordinate: Coordinate;
  details: PlaceDetail[];
}>;

export type PlaceDetail = Readonly<{
  image: string;
  description: string;
}>;

export type Coordinate = Readonly<{
  latitude: number;
  longitude: number;
}>;

export function getPlaceDate(place: Place) {
  return format(place.date, "ddd, DD MMM - HH:mm");
}

export function isPastPlace(place: Place) {
  return isPast(place.date);
}
