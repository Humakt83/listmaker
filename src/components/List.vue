<template>
  <div id="listItems">
    <draggable v-model="items" @start="drag=true" @end="drag=false">
      <div class="listItem" v-for="(item, index) of items" :key="index">
        {{`${index + 1}. ${item}`}}
        <div class="deleteItem" @click="deleteItem(index)" title="Remove">x</div>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'List',
  components: {draggable},
  props: {
    listItems: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      items: [].concat(this.listItems)
    }
  },
  methods: {
    deleteItem (index) {
      this.items.splice(index, 1)
      this.$store.dispatch('updateList', this.items)
    }
  },
  watch: {
    items: function (val) {
      this.$store.dispatch('updateList', val)
    },
    listItems: function (val) {
      this.items = [].concat(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#listItems {
  display: inline-block;
}
.listItem {
  border-radius: 3px;
  border: 1px solid rgb(200, 200, 200);
  background-color: rgb(250, 250, 250);
  padding-left: 3px;
  margin-top: 4px;
  width: 500px;
  cursor: grab;
  height: 25px;
  font-size: 17px;
  text-align: left;
}

.editItem,
.deleteItem {
    float: right;
    color: rgb(225, 170, 170);
    font-weight: 900;
    margin-right: 5px;
    border: 1px solid rgb(200, 200, 200);
    border-radius: 55px;
    cursor: pointer;
    padding-left: 3px;
    padding-right: 3px;
    margin-top: 1px;
    font-size: 10px;
    height: 23px;
    width: 23px;
    text-align: center;
    font-size: 18px;
}

.deleteItem:hover {
    background-color: rgb(200, 200, 200);
}
</style>
