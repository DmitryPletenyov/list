<template>
  <div class="items">
    <input
      v-model="newItemText"
      type="text"
      placeholder="Search or Add..."
      @keyup.enter="filter" />
    <button v-show="isFiltering" class="btn" @click="stopFilter">
      Stop filtering
    </button>
    <button
      v-show="!isFiltering"
      class="btn btn-primary"
      :disabled="newItemText.length === 0"
      @click="addNewItem">
      Save
    </button>
    {{ sortingType }} , {{ printValue }}
    <Item v-for="item in sortedItems" :key="item.id" :item="item" />

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
import { ListItem, SortingType } from './types';
import { formatDistance, subDays, subMinutes } from 'date-fns';

export default defineComponent({
  name: 'App',
  components: {
    Item,
  },
  data() {
    return {
      newItemText: '',
      items: [] as ListItem[],
      nextItemId: 1,
      isFiltering: false,
      sortingType: SortingType.DateAdded,
    };
  },
  computed: {
    printValue() {
      let t = this.sortingType as number;
      return t == 2;
    },
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
      //return this.items.sort((a, b) => new Date(a.created) - new Date(b.created));
    },
  },
  methods: {
    addNewItem() {
      this.items.push({
        id: this.items.length + 1,
        name: this.newItemText,
        date: new Date(),
        dateSpan: '',
        match: false,
      });
      this.newItemText = '';
      this.items.forEach((element) => {
        element.dateSpan = formatDistance(element.date, new Date(), {
          addSuffix: true,
        });
      });
    },
    filter() {
      this.isFiltering = true;
      this.items.forEach((element) => {
        element.match = element.name === this.newItemText;
      });
    },
    stopFilter() {
      this.isFiltering = false;
      this.newItemText = '';
      this.items.forEach((element) => {
        element.match = false;
      });
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
