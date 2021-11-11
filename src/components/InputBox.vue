<template>
  <div class="input-box">
    <input
      v-model="newItemText"
      type="text"
      placeholder="Search or Add..."
      @keyup="searchFunctionLocal"
      @keyup.esc="clearFunctionLocal"
      @keyup.enter="createNewItemFunctionLocal" />
  </div>
  <button
    class="btn btn-primary"
    :disabled="newItemText.length === 0 || matchFound"
    @click="createNewItemFunctionLocal">
    Save
  </button>
  <button
    v-show="newItemText.length > 0 && !matchFound"
    class="btn"
    :disabled="newItemText.length === 0"
    @click="clearFunctionLocal">
    Clear
  </button>
</template>

<script>
export default {
  props: {
    matchFound: Boolean,
    clearFunction: {
      type: Function,
      default() {
        return 'Default function';
      },
    },
    createNewItemFunction: {
      type: Function,
      default() {
        return 'Default function';
      },
    },
    searchFunction: {
      type: Function,
      default() {
        return 'Default function';
      },
    },
  },
  data() {
    return {
      newItemText: '',
    };
  },
  methods: {
    clearFunctionLocal() {
      const r = this.clearFunction();
      this.newItemText = '';
    },
    createNewItemFunctionLocal() {
      const r = this.createNewItemFunction(this.newItemText);
      this.newItemText = '';
    },
    searchFunctionLocal() {
      const r = this.searchFunction(this.newItemText);
    },
  },
};
</script>
