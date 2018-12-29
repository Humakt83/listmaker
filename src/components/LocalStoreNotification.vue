<template>
  <div>
    <span>Please note that this site utilizes your browser's localstorage to store the list you have entered so it remains here on your next visit as well.</span>
    <div class="removeFooter" @click="removeFooter()" title="Remove">Remove this</div>
  </div>
</template>

<script>

export default {
  name: 'LocalStoreNotification',
  methods: {
    removeFooter () {
      this.$store.dispatch('removeNotification')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.removeFooter {
    float: none;
    margin-left: 5px;
    display: inline-block;
    font-weight: bold;
    font-style: normal;
    cursor: pointer;
    color: rgb(235, 110, 110);
}
</style>
