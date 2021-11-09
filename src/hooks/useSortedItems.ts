import { ListItem } from 'types';
import { computed, ref } from 'vue';

export function useSortedItems(items: { value: ListItem[] }) {
  const selectedSort = ref(2);
  const sortedItems = computed(() => {
    let sortedItems = [...items.value] as ListItem[];
    //let st = selectedSort.value as number;
    if (selectedSort.value == 2) {
      /* by value */
      sortedItems = sortedItems.sort((a, b) => {
        return b.date.getTime() - a.date.getTime();
      });
    }
    if (selectedSort.value == 1) {
      /* by date */
      sortedItems = sortedItems.sort((a, b) => {
        const na = a.name.toLowerCase(),
          nb = b.name.toLowerCase();
        if (na < nb) {
          return -1;
        }
        if (na > nb) {
          return 1;
        }
        return 0;
      });
    }
    return sortedItems;
  });

  return {
    selectedSort,
    sortedItems,
  };
}
