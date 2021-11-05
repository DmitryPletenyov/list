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
      <input id="byValue" v-model="sortingType" type="radio" value="1" />
      <label for="one">Sort By Value</label>
      <br />
      <input id="byAddedDate" v-model="sortingType" type="radio" value="2" />
      <label for="two">Sort By Added Date</label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Item from './components/Item.vue';
import {
  ListItem,
  SortingType,
  readListItemArray,
  writeListItemArray,
} from './types';
import { formatDistance } from 'date-fns';

export default defineComponent({
  name: 'App',
  components: {
    Item,
  },
  emits: ['itemRemove'],
  data() {
    return {
      newItemText: '',
      items: readListItemArray(),
      nextItemId: 1,
      matchFound: false,
      sortingType: SortingType.DateAdded,
    };
  },
  computed: {
    sortedItems() {
      let sortedItems = this.items as ListItem[];
      let st = this.sortingType as number;
      if (st == 2) {
        /* by value */
        sortedItems = sortedItems.sort((a, b) => {
          return b.date.getTime() - a.date.getTime();
        });
      }
      if (st == 1) {
        /* by date */
        sortedItems = sortedItems.sort((a, b) => {
          let na = a.name.toLowerCase(),
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
    },
  },
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

        this.items.push(o);
        this.newItemText = '';
        this.items.forEach((element) => {
          element.dateSpan = formatDistance(element.date, new Date(), {
            addSuffix: true,
          });
        });
        writeListItemArray(this.items);
      }
    },
    clearNewItem() {
      this.newItemText = '';
      this.items.forEach((element) => {
        element.match = false;
      });
      this.matchFound = false;
    },
    trySearch() {
      if (this.newItemText.length > 0) {
        var found = false;
        var searchString = this.newItemText.toLowerCase();
        this.items.forEach((element) => {
          element.match = element.name.toLowerCase() === searchString;
          found = found || element.match;
        });
        this.matchFound = found;
      } else {
        this.items.forEach((element) => {
          element.match = false;
        });
        this.matchFound = false;
      }
    },
    onItemRemove(id: number) {
      const index = this.items.findIndex((x) => x.id == id);
      if (index > -1) {
        this.items.splice(index, 1);
        // no gap in ids inside array
        this.items.forEach(function (i) {
          if (i.id > index) {
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
