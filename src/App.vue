<template>
  <div id="container">
    <div id="items">
      <InputBox
        ref="myInputBox1"
        :match-found="matchFound"
        :clear-function="clearNewItem"
        :create-new-item-function="addNewItem"
        :search-function="trySearch" />
      <Item
        v-for="item in sortedItems"
        :key="item.id"
        :item="item"
        @item-remove="onItemRemove"
        @mouseover="item.showRemoveButton = true"
        @mouseout="item.showRemoveButton = false" />
    </div>

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
import { defineComponent } from 'vue';
import Item from './components/Item.vue';
import InputBox from './components/InputBox.vue';
import { ListItem, writeListItemArray } from './types';
import { ref } from 'vue';
import { useItems } from './hooks/useItems';
import { useSortedItems } from './hooks/useSortedItems';
import _ from 'lodash';

export default defineComponent({
  name: 'App',
  components: {
    Item,
    InputBox,
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
      matchFound: false,
    };
  },
  computed: {},
  methods: {
    addNewItem(newName: string) {
      if (!this.matchFound) {
        let o = {
          id: this.items.length + 1,
          name: newName,
          date: new Date(),
          dateSpan: '',
          match: false,
          showRemoveButton: false,
        } as ListItem;

        (this.items as ListItem[]).push(o);
        writeListItemArray(this.items);
      }
    },
    clearNewItem() {
      (this.items as ListItem[]).forEach((element) => {
        element.match = false;
      });
      this.matchFound = false;
      return true;
    },
    trySearch(searchString: string) {
      if (searchString.length > 0) {
        var found = false;
        var searchStringLower = searchString.toLowerCase();
        (this.items as ListItem[]).forEach((element) => {
          element.match = element.name.toLowerCase() === searchStringLower;
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
      const typedArray = this.items as ListItem[];
      const removed = _.remove(typedArray, function (i) {
        return i.id == id;
      });
      // no gap in ids inside array
      _.forEach(removed, function (removedItem) {
        _.forEach(typedArray, function (i) {
          if (i.id > removedItem.id) {
            i.id--;
          }
        });
      });
      if (removed.length > 0) {
        writeListItemArray(this.items);
        (this.items as ListItem[]).forEach((element) => {
          element.match = false;
        });
        this.matchFound = false;
        //console.log('after match');
      }
    },
  },
});
</script>

<style lang="scss" scoped>
#container {
  margin: auto;
  width: 50%;
  align-items: center;
  display: flex;
  flex-direction: row;
}
#items {
  margin: auto;
  width: 500px;
  align-items: center;
  display: flex;
  flex-direction: column;
}
#radiobuttons {
  width: 150px;
}
</style>
