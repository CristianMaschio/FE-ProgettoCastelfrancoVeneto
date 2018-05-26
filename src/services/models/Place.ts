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
  tags: Tags[];
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

export function getPlaceDate(date: string) {
  return format(date, "DD/MM - HH:mm");
}

export function isPastPlace(place: Place) {
  return isPast(place.endDate);
}
