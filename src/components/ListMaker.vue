<template>
  <div>
    <input type="text" ref="itemInput" id="itemInput" placeholder="Type item name here">
    <input type="submit" id="addItemToList" value="ADD ITEM" @click="addItem()">
    <div class="content">
      <List :items="items" />
      <div id="textList"></div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mapGetters } from 'vuex'
import List from './List'

export default {
  name: 'ListMaker',
  components: {draggable, List},
  data () {
    return {
      items: []
    }
  },
  cómputed: {
    ...mapGetters(['getListItems'])
  },
  async created () {
    await this.$store.dispatch('fetchStoredList')
    this.items = this.getListItems || []
  },
  methods: {
    addItem () {
      const item = this.$refs.itemInput.value
      this.$refs.itemInput.value = ''
      this.items.push(item)
      this.$store.dispatch('updateList', this.items)
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
