<template>
  <div class="items">
    <input
      v-model="newItemText"
      type="text"
      placeholder="Search or Add..."
      @keyup="trySearch"
      @keyup.enter="addNewItem"
      @keyup.esc="clearNewItem" />
    <button
      class="btn btn-primary"
      :disabled="newItemText.length === 0 || matchFound"
      @click="addNewItem">
      Save
    </button>
    <button
      v-show="!matchFound && newItemText.length > 0"
      class="btn"
      :disabled="newItemText.length === 0"
      @click="clearNewItem">
      Clear
    </button>
    <Item
      v-for="item in sortedItems"
      :key="item.id"
      :item="item"
      @item-remove="onItemRemove"
      @mouseover="item.showRemoveButton = true"
      @mouseout="item.showRemoveButton = false" />

    <div id="radiobuttons">
      <input id="byValue" v-model="selectedSort" type="radio" value="1" />
      <label for="one">Sort By Value</label>
      <br />
      <input id="byAddedDate" v-model="selectedSort" type="radio" value="2" />
      <label for="two">Sort By Added Date</label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType } from 'vue';
import Item from './components/Item.vue';
import { ListItem, writeListItemArray } from './types';
import { formatDistance } from 'date-fns';
import { ref } from 'vue';
import { useItems } from './hooks/useItems';
import { useSortedItems } from './hooks/useSortedItems';

export default defineComponent({
  name: 'App',
  components: {
    Item,
  },
  props: {
    //test: string,
  },
  emits: ['itemRemove'],
  setup(props) {
    const { items } = useItems();
    const nextItemId = ref(items.value.length + 1);
    const { sortedItems, selectedSort } = useSortedItems(items);

    return {
      items,
      nextItemId,
      sortedItems,
      selectedSort,
    };
  },
  data() {
    return {
      newItemText: '',
      //items: readListItemArray(),
      //nextItemId: 1,
      matchFound: false,
      //selectedSort: SortingType.DateAdded as number,
    };
  },
  computed: {},
  methods: {
    addNewItem() {
      if (!this.matchFound) {
        let o = {
          id: this.items.length + 1,
          name: this.newItemText,
          date: new Date(),
          dateSpan: '',
          match: false,
          showRemoveButton: false,
        } as ListItem;

        (this.items as ListItem[]).push(o);
        this.newItemText = '';
        (this.items as ListItem[]).forEach((element) => {
          element.dateSpan = formatDistance(element.date, new Date(), {
            addSuffix: true,
          });
        });
        writeListItemArray(this.items);
      }
    },
    clearNewItem() {
      this.newItemText = '';
      (this.items as ListItem[]).forEach((element) => {
        element.match = false;
      });
      this.matchFound = false;
    },
    trySearch() {
      if (this.newItemText.length > 0) {
        var found = false;
        var searchString = this.newItemText.toLowerCase();
        (this.items as ListItem[]).forEach((element) => {
          element.match = element.name.toLowerCase() === searchString;
          found = found || element.match;
        });
        this.matchFound = found;
      } else {
        (this.items as ListItem[]).forEach((element) => {
          element.match = false;
        });
        this.matchFound = false;
      }
    },
    onItemRemove(id: number) {
      const index = (this.items as ListItem[]).findIndex((x) => x.id == id);
      if (index > -1) {
        this.items.splice(index, 1);
        // no gap in ids inside array
        (this.items as ListItem[]).forEach(function (i) {
          if (i.id > id) {
            i.id--;
          }
        });
        this.trySearch();
        writeListItemArray(this.items);
      }
    },
  },
});
</script>

<style lang="scss" module>
.items {
  align-items: center;
  display: flex;
  flex-direction: column;
}
</style>
