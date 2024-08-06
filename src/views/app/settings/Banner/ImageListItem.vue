<template>
  <b-card :class="{'active' : true }" no-body>
    {{data.img}}
      <div class="position-relative">
          <div class="w-sm-100">
              <img :src="data.img" class="card-img-top" :alt="data.title" />
          </div>
      </div>
      <b-card-body>
          <b-row>
              <b-colxx xxs="12">
                  <h6 class="card-subtitle">{{data.title}}</h6>
              </b-colxx>
              <b-colxx xxs="12">
                  <b-button
                    size="xs"
                    variant="outline-primary"
                    @click="upload"
                  >
                    <em class="simple-icon-cloud-upload"></em> Ubah Gambar
                  </b-button>
              </b-colxx>
          </b-row>
      </b-card-body>
  </b-card>
</template>

<script>
export default {
    props: ['data'],
    methods: {
      upload () {
        this.$emit('upload', { data: this.data })
      }
    }
}
</script>
