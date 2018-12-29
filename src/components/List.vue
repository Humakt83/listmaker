<template>
  <div id="listItems">
    <draggable v-model="items" @start="drag=true" @end="drag=false">
      <div class="listItem" v-for="(item, index) of items" :key="index">
        {{`${index + 1}. ${item}`}}
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
    addItem () {
      const item = this.$refs.itemInput.value
      this.$refs.itemInput.value = ''
      this.items.push(item)
      this.$store.dispatch('updateList', this.items)
    }
  },
  watch: {
    items: function (val) {
      this.$store.dispatch('updateList', val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
