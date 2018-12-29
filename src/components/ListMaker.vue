<template>
  <div v-if="fetched">
    <input type="text" ref="itemInput" id="itemInput" placeholder="Type item name here">
    <input type="submit" id="addItemToList" value="ADD ITEM" @click="addItem()">
    <div class="content">
      <List :listItems="items" />
      <div id="textList"></div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import List from './List'

export default {
  name: 'ListMaker',
  components: {draggable, List},
  data () {
    return {
      fetched: false,
      items: []
    }
  },
  async created () {
    await this.$store.dispatch('fetchStoredList')
    this.items = this.$store.getters.getListItems
    this.fetched = true
  },
  methods: {
    addItem () {
      const item = this.$refs.itemInput.value
      this.$refs.itemInput.value = ''
      this.items.push(item)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type=button],
input[type=submit] {
  background-color: rgb(165, 165, 165);
  background: linear-gradient(to bottom left, rgb(105, 105, 105), rgb(165, 165, 165) 15%);
  color: white;
  font-weight: bold;
  padding: 1px 3px 1px 3px;
}

#textList {
  background-color: white;
  width: 500px;
  margin-left: 15px;
  padding-left: 10px;
}
</style>
