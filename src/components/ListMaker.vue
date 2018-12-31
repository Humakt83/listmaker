<template>
  <div v-if="fetched">
    <input type="text" ref="itemInput" id="itemInput" placeholder="Type item name here">
    <input type="submit" id="addItemToList" value="ADD ITEM" @click="addItem()">
    <input type="button" @click="openPaste = true" value="PASTE LIST">
    <input type="button" :value="showTextList ? 'HIDE TEXT LIST' : 'SHOW LIST AS TEXT'" @click="toggleShowListAsText">
    <input type="button" value="SAVE LIST" @click="openSave = true">
    <input type="button" value="CLEAR LIST" @click="clearList">
    <div class="content">
      <List />
      <div id="textList" v-show="showTextList">
        <p v-html="textList" />
      </div>
    </div>
    <paste-list v-if="openPaste" @cancel="openPaste = false" @addPasteList="addPasteList" />
    <save-list v-if="openSave" @close="openSave = false" :listItems="getList.items" />
  </div>
</template>

<script>
import List from './List'
import PasteList from './PasteList'
import SaveList from './SaveList'
import {mapGetters} from 'vuex'

export default {
  name: 'ListMaker',
  components: {List, PasteList, SaveList},
  data () {
    return {
      fetched: false,
      showTextList: false,
      openPaste: false,
      openSave: false,
    }
  },
  computed: {
    ...mapGetters(['getList']),
    textList () {
      return !this.getList || !this.getList.items ? []
        : this.getList.items.reduce((previous, current, index) => previous + `<br>${++index}. ${current}`, '')
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
      const usedList = this.getList
      usedList.items.push(item)
      this.$store.dispatch('updateList', usedList)
    },
    toggleShowListAsText () {
      this.showTextList = !this.showTextList
    },
    addPasteList (list) {
      const usedList = this.getList
      usedList.items = usedList.items.concat(list)
      this.$store.dispatch('updateList', usedList)
      this.openPaste = false
    },
    clearList () {
      const usedList = this.getList
      usedList.items = []
      this.$store.dispatch('updateList', usedList)
    },
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
