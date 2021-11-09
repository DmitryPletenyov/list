import { formatDistance } from 'date-fns';
import { ListItem, ListItemSerializable, localStorageKey } from 'types';
import { onMounted, ref } from 'vue';

export function useItems() {
  const items = ref([]);
  const fetching = async () => {
    try {
      let r = new Array<ListItemSerializable>();
      const jsonString = localStorage.getItem(localStorageKey);
      if (jsonString !== null) {
        r = JSON.parse(jsonString);
      }
      const items = r.map((i) => {
        const o = {} as ListItem;
        o.id = i.id;
        o.name = i.name;
        o.date = new Date(i.date);
        o.dateSpan = formatDistance(o.date, new Date(), { addSuffix: true });
        return o;
      });
      return items;
    } catch (e) {
      alert('Error');
    }
  };

  onMounted(fetching);

  return {
    items,
  };
}
