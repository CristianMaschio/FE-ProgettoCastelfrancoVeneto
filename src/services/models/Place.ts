import { format, isPast } from "date-fns";

export type Place = Readonly<{
  id?: string;
  name: string;
  description: string;
  image: string;
  rate: number;
  startDate: string;
  endDate: string;
  isStand: Boolean;
  coordinate: Coordinate;
  details: PlaceDetail[];
}>;

export type PlaceDetail = Readonly<{
  image: string;
  description: string;
  tags: Tags[];
}>;

export type Coordinate = Readonly<{
  latitude: number;
  longitude: number;
}>;

export type Tags = Readonly<{
  value: string;
  title: string;
}>;

export function getPlaceDate(place: Place) {
  return format(place.startDate, "ddd, DD MMM - HH:mm");
}

export function isPastPlace(place: Place) {
  return isPast(place.endDate);
}
