<template>
  <div v-if="fetched">
    <input type="text" ref="itemInput" id="itemInput" placeholder="Type item name here">
    <input type="submit" id="addItemToList" value="ADD ITEM" @click="addItem()">
    <input type="button" @click="openPaste = true" value="PASTE LIST">
    <input type="button" :value="showTextList ? 'HIDE TEXT LIST' : 'SHOW LIST AS TEXT'" @click="toggleShowListAsText">
    <div class="content">
      <List />
      <div id="textList" v-show="showTextList">
        <p v-html="textList" />
      </div>
    </div>
    <paste-list v-if="openPaste" @cancel="openPaste = false" @addPasteList="addPasteList" />
  </div>
</template>

<script>
import List from './List'
import PasteList from './PasteList'
import {mapGetters} from 'vuex'

export default {
  name: 'ListMaker',
  components: {List, PasteList},
  data () {
    return {
      fetched: false,
      showTextList: false,
      openPaste: false
    }
  },
  computed: {
    ...mapGetters(['getListItems']),
    textList () {
      return this.getListItems.reduce((previous, current, index) => previous + `<br>${++index}. ${current}`, '')
    }
  },
  async created () {
    await this.$store.dispatch('fetchStoredList')
    this.fetched = true
  },
  methods: {
    addItem () {
      const item = this.$refs.itemInput.value
      this.$refs.itemInput.value = ''
      const items = this.getListItems
      items.push(item)
      this.$store.dispatch('updateList', items)
    },
    toggleShowListAsText () {
      this.showTextList = !this.showTextList
    },
    addPasteList (list) {
      this.$store.dispatch('updateList', this.getListItems.concat(list))
      this.openPaste = false
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
  display: inline-block;
  background-color: #eeeeee;
  width: 500px;
  margin-left: 15px;
  text-align: left;
  user-select: all;
  padding: 5px 30px;
  border-radius: 30px;
  border: 1px solid black;
}
</style>
