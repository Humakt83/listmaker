<template>
  <div id="curtain" @click="cancel()">
    <div class="content" @click.stop>
      <h4>Load List</h4>
      <select v-model="selected">
        <option disabled value="">Select list to load</option>
        <option v-for="name of getSavedListNames" :key="name">{{name}}</option>
      </select>
      <input type="button" :disabled="selected.length < 1" value="LOAD" @click="loadList">
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'LoadList',
  data() {
    return {
      selected: ''
    }
  },
  computed: {
    ...mapGetters(['getSavedListNames'])
  },
  methods: {
    cancel () {
      this.$emit('close')
    },
    loadList () {
      this.$store.dispatch('loadList', this.selected)
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
