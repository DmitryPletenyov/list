export interface ListItem {
  id: number;
  name: string;
  date: Date;
  dateSpan: string;
  match: boolean;
}
export enum SortingType {
  Value = 1,
  DateAdded = 2,
}
