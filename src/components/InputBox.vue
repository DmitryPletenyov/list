<template>
  <div id="input-box-container">
    <div class="input-box">
      <input
        v-model="newItemText"
        type="text"
        placeholder="Search or Add..."
        @keyup="searchFunctionLocal"
        @keyup.esc="clearFunctionLocal"
        @keyup.enter="createNewItemFunctionLocal" />
    </div>
    <div class="buttons">
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
    </div>
  </div>
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
<style lang="scss" scoped>
#input-box-container {
  width: 500px;
  display: flex;
}
div.input-box {
}
div.input-box > input {
  width: 100%;
}
</style>
