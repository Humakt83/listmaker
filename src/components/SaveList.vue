<template>
  <div id="curtain" @click="cancel()">
    <div class="content" @click.stop>
      <h4>Save List</h4>
      <form @submit="saveList" class="editForm">
        <input type="text" v-model="listName">
        <input type="submit" value="SUBMIT">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SaveList',
  props: {
    items: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      listName: ''
    }
  },
  methods: {
    cancel () {
      this.$emit('close')
    },
    saveList () {
      this.$store.dispatch('updateList', {name: this.listName, items: this.items} )
      this.$emit('close')
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

.content {
  background-color: white;
  border-radius: 30px;
  padding: 20px;
  margin: 200px auto;
  width: fit-content;
}
</style>
