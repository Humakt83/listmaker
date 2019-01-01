<template>
  <div v-if="fetched">
    <form @submit="addItem()">
      <input type="text" ref="itemInput" id="itemInput" placeholder="Type item name here">
      <input type="submit" id="addItemToList" value="ADD ITEM">
    </form>
    <input type="button" @click="openPaste = true" value="PASTE LIST">
    <input type="button" :value="showTextList ? 'HIDE TEXT LIST' : 'SHOW LIST AS TEXT'" @click="toggleShowListAsText">
    <input type="button" value="SAVE LIST" @click="openSave = true">
    <input type="button" value="LOAD LIST" @click="openLoad = true" :disabled="getSavedListNames.length < 1">
    <input type="button" :value="`${getList.name === 'default' ? 'CLEAR':'DELETE'} LIST`" @click="clearList">
    <div class="content">
      <List />
      <div id="textList" v-show="showTextList">
        <p v-html="textList" />
      </div>
    </div>
    <paste-list v-if="openPaste" @cancel="openPaste = false" @addPasteList="addPasteList" />
    <save-list v-if="openSave" @close="openSave = false" :items="getList.items" />
    <load-list v-if="openLoad" @close="openLoad = false" />
    <a v-if="whatsAppMessage.length > 0" :href="`https://wa.me/?text=${whatsAppMessage}`">Share on WhatsApp</a>
  </div>
</template>

<script>
import List from './List'
import PasteList from './PasteList'
import SaveList from './SaveList'
import LoadList from './LoadList'
import {mapGetters} from 'vuex'

export default {
  name: 'ListMaker',
  components: {List, PasteList, SaveList, LoadList},
  data () {
    return {
      fetched: false,
      showTextList: false,
      openPaste: false,
      openSave: false,
      openLoad: false
    }
  },
  computed: {
    ...mapGetters(['getList', 'getSavedListNames']),
    textList () {
      return !this.getList || !this.getList.items ? ''
        : this.getList.items.reduce((previous, current, index) => previous + `<br>${++index}. ${current}`, '')
    },
    whatsAppMessage () {
      const message = this.textList.replace(/<br>/g, '\r\n')
      return message.length > 0 ? window.encodeURIComponent(message) : ''
    }
  },
  async created () {
    await this.$store.dispatch('fetchSavedLists')
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
      this.$store.dispatch('clearOrDeleteList', usedList)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
  display: inline-block;
}

input[type=button],
input[type=submit] {
  background-color: rgb(165, 165, 165);
  background: linear-gradient(to bottom left, rgb(105, 105, 105), rgb(165, 165, 165) 15%);
  color: white;
  font-weight: bold;
  padding: 1px 3px 1px 3px;
}

input[type=button]:disabled {
  color: rgb(210, 210, 210)
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
