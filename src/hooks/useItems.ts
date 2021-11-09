import { readListItemArray } from 'types';
import { onMounted, ref } from 'vue';

export function useItems() {
  const items = ref([]);
  const fetching = async () => {
    items.value = readListItemArray();
  };

  onMounted(fetching);

  return { items };
}
