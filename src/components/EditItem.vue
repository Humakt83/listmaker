<template>
  <div id="curtain" @click="cancel()">
    <div class="content" @click.stop>
      <h4>Change value</h4>
      <form @submit="changeItem" class="editForm">
        <input type="text" v-model="editedValue">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditItem',
  props: {
    item: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      editedValue: ''.concat(this.item)
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    changeItem () {
      this.$emit('changeItem', this.editedValue)
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
