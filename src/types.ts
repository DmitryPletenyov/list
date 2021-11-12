export interface ListItem {
  id: number;
  name: string;
  date: Date;
  match: boolean;
  showRemoveButton: boolean;
}
export interface ListItemSerializable {
  id: number;
  name: string;
  date: string; // UTC date
}
export enum SortingType {
  Value = 1,
  DateAdded = 2,
}
// work with localstorage
export const localStorageKey = 'listItems';
export function readListItemArray(): [] {
  let r = new Array<ListItemSerializable>();
  const jsonString = localStorage.getItem(localStorageKey);
  if (jsonString !== null) {
    r = JSON.parse(jsonString);
  }

  const items =
    r.length > 0
      ? r.map((i) => {
          const o = {} as ListItem;
          o.id = i.id;
          o.name = i.name;
          o.date = new Date(i.date);
          return o;
        })
      : [];
  return items as [];
}
export function writeListItemArray(items: ListItem[]): void {
  const r = items.map((i) => {
    const o = {} as ListItemSerializable;
    o.id = i.id;
    o.name = i.name;
    o.date = i.date.toISOString();
    return o;
  });
  localStorage.removeItem(localStorageKey);
  localStorage.setItem(localStorageKey, JSON.stringify(r));
}
