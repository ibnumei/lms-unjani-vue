<template>
    <router-view/>
</template>
<script>
export default {
  methods: {
    logout () {
      localStorage.removeItem('user')
      this.$router.push({ name: 'admin-login' })
    }
  },
  mounted () {
    this.logout()
  }
}
</script>