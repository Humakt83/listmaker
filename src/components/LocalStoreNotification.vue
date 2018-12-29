<template>
  <div id="footer">
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
#footer {
    position: fixed;
    bottom: 0;
    margin-top: -20px;
    height: 20px;
    clear: both;
    width: 100%;
    background: linear-gradient(to bottom, rgba(100, 100, 100, 0.5), rgba(200, 200, 200, 0.5), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1));
}

#footer > span {
    font-style: italic;
    display: inline-block;
    padding-left: 15px;
    padding-top: 3px;
}
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
