<template>
  <div :class="{ matched: item.match }" class="item-row">
    <div v-show="item.match" class="check">
      <img :src="require('../assets/check.svg')" alt="check" />
    </div>
    <div class="item-text">
      <strong>{{ item.name }}</strong
      ><br />
      <span v-show="item.match" class="matchedText"><i>Exact match</i></span>
      <span class="number">#{{ item.id }}</span>
    </div>
    <div class="date-div">
      <span>{{ dateDistanceString(item.date) }}</span>
      <div class="row-buttons">
        <input
          v-show="item.showRemoveButton"
          type="image"
          :src="require('../assets/trash.svg')"
          alt="Remove"
          class="btn btn-red"
          @click="$emit('itemRemove', item.id)" />
      </div>
    </div>
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
  display: flex;
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
}
span.number {
  color: color.$secondaryText;
}
.date-div {
  margin-left: 130px;
  width: 230px;
  height: 20px;
  display: flex;
}
.date-div > span {
  margin-left: auto;
  margin-right: 0;
}
.btn {
  height: 20px;
  width: 20px;
  margin-left: 0.5em;
}
.btn-red {
  /*#dd0000 */
  filter: invert(12%) sepia(74%) saturate(5595%) hue-rotate(357deg)
    brightness(102%) contrast(118%);
}
.check > img {
  /*#00bb88 */
  filter: invert(57%) sepia(22%) saturate(5638%) hue-rotate(126deg)
    brightness(92%) contrast(102%);
}
.check {
  margin-right: auto;
  margin-left: 0;
  height: 2em;
  width: 60px;
}
.check > img {
  margin-top: 10px;
}
.item-text {
  width: 200px;
}
</style>
