<template>
  <div id="curtain" @click="cancel()">
    <div class="pasteContent" @click.stop>
      <p>List items are separated by line break</p>
      <textarea id="pasteArea" v-model="pastedList"></textarea>
      <input type="button" @click="addPasteList()" value="ADD LIST AS IS">
      <input type="button" @click="addPasteList(true)" value="ADD LIST WITHOUT ORDER NUMBERS">
    </div>
  </div>
</template>

<script>
export default {
  name: 'PasteList',
  data () {
    return {
      pastedList: ''
    }
  },
  methods: {
    cancel (index) {
      this.$emit('cancel')
    },
    addPasteList (stripNumbers) {
      const listContent = this.pastedList
      const list = listContent.split('\n')
      const listItems = []
      for (let item of list) {
        if (stripNumbers && item.includes('.')) {
          item = item.split('.').reduce((previous, current, index) => index <= 1 ? current : previous + '.' + current)
        }
        if (item.trim().length > 0) {
          listItems.push(item)
        }
      }
      this.$emit('addPasteList', listItems)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#curtain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 500;
  text-align: center;
}

.pasteContent {
    margin-top: 100px;
    position: fixed;
    left: 50%;
    width: 700px;
    margin-left: -350px;
    background-color: white;
    border: 2px solid rgb(200, 200, 200);
    color: black;
    padding-left: 10px;
    padding-bottom: 5px;
}

#pasteArea {
    display: block;
    width: 675px;
    height: 300px;
}
</style>
