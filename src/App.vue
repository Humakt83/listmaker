<template>
  <div id="app">
    <div id="wrap">
    </div>
    <div id="main">
      <router-view/>
    </div>
    <local-store-notification v-if="!isNotificationRemoved" />
  </div>
</template>

<script>
import LocalStoreNotification from './components/LocalStoreNotification'
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  components: {LocalStoreNotification},
  computed: {
    ...mapGetters(['isNotificationRemoved'])
  },
  data () {
    return {
      notificationRemoved: true
    }
  },
  async created () {
    await this.$store.dispatch('fetchNotificationAcknowledged')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#wrap {
    min-height: 100%;
}

#main {
    padding: 20px;
    overflow: auto;
}
</style>
