<template>
    <router-view/>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['setUser']),
    logout () {
      this.setUser(null)
      localStorage.removeItem('user')
      this.$router.push({ name: 'landing-page' })
    }
  },
  mounted () {
    this.logout()
  }
}
</script>