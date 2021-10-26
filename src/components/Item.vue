<template>
  <div class="item-row">
    <h4>{{ item.name }}</h4>
    <span v-show="item.match" style="color: green"><i>Exact match</i></span>
    <span>#{{ item.id }}</span>
    <div class="date-div">{{ item.dateSpan }}</div>
  </div>
</template>

<script>
import { formatDistance } from 'date-fns';
import { ListItem } from '../types';
export default {
  props: {
    item: Object,
  },
};
</script>

<style scoped>
.item-row {
  border-bottom: 1px solid lightgray;
  /*background-color: lightgray;*/
  cursor: pointer;
  margin-bottom: 18px;
  padding: 20px;
  width: 500px;
}
.item-row:hover {
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  transform: scale(1.01);
}
.item-row span {
  color: darkgrey;
}
.date-div {
  display: block;
  text-align: right;
  width: 100%;
}
</style>
