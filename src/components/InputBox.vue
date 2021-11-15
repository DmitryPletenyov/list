<template>
  <div id="input-box-container">
    <input
      v-model="newItemText"
      type="text"
      placeholder="Search or Add..."
      @keyup="searchFunctionLocal"
      @keyup.esc="clearFunctionLocal"
      @keyup.enter="createNewItemFunctionLocal" />
    <div class="buttons">
      <input
        v-show="newItemText.length > 0"
        id="btn-save"
        type="image"
        :src="require('../assets/add.svg')"
        class="btn"
        :class="
          newItemText.length === 0 || matchFound
            ? 'btn-disabled'
            : 'btn-primary'
        "
        alt="Save"
        :disabled="newItemText.length === 0 || matchFound"
        @click="createNewItemFunctionLocal" />
      <input
        v-show="newItemText.length > 0"
        id="btn-cancel"
        :src="require('../assets/cancel.svg')"
        type="image"
        class="btn btn-red"
        :disabled="newItemText.length === 0"
        alt="Clear"
        @click="clearFunctionLocal" />
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
@use '../sass/color';
.btn {
  height: 20px;
}
.btn-primary {
  /*#00bb88 */
  filter: invert(57%) sepia(22%) saturate(5638%) hue-rotate(126deg)
    brightness(92%) contrast(102%);
}
.btn-disabled {
  filter: invert(48%) sepia(20%) saturate(11%) hue-rotate(315deg)
    brightness(92%) contrast(89%);
}
.btn-red {
  /*#dd0000 */
  filter: invert(12%) sepia(74%) saturate(5595%) hue-rotate(357deg)
    brightness(102%) contrast(118%);
}
#btn-save {
  margin-top: 0.5em;
  margin-left: -25px;
}
#btn-cancel {
  margin-top: 0.5em;
  margin-left: -50px;
}
#input-box-container {
  width: 500px;
  display: flex;
}
#input-box-container > input {
  width: 100%;
  height: 2.5em;
  border: none;
  background-color: color.$lightLightGray;
}
</style>
