<template>
  <div :class="{ matched: item.match }" class="item-row">
    <h4>{{ item.name }}</h4>
    <span v-show="item.match" class="matchedText"><i>Exact match</i></span>
    <span class="number">#{{ item.id }}</span>
    <button
      v-show="item.showRemoveButton"
      @click="$emit('itemRemove', item.id)">
      Remove
    </button>
    <div class="date-div">{{ dateDistanceString(item.date) }}</div>
  </div>
</template>

<script>
import { formatDistance } from 'date-fns';
import { ListItem } from '../types';
export default {
  props: {
    item: { type: ListItem },
  },
  methods: {
    dateDistanceString(d) {
      return formatDistance(d, new Date(), { addSuffix: true });
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../sass/color';

span.matchedText {
  color: color.$matched;
}
.item-row {
  border-bottom: 1px solid color.$itemBorder;
  cursor: pointer;
  margin-bottom: 18px;
  padding: 20px;
  width: 500px;
}
@mixin theme($theme: rgba(0, 0, 0, 0.2)) {
  box-shadow: 0 3px 12px 0 $theme;
  transform: scale(1.01);
}
.item-row:hover {
  @include theme;
}
.matched:hover {
  @include theme($theme: rgba(7, 146, 18, 0.2));
  // box-shadow: 0 3px 12px 0 rgba(7, 146, 18, 0.2);
  // transform: scale(1.01);
}
span.number {
  color: color.$secondaryText;
}
.date-div {
  display: block;
  text-align: right;
  width: 100%;
}
</style>
