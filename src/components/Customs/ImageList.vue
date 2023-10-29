<template>
  <!-- <b-card @click.prevent="toggleItem($event,data.id)" :class="{'active' : selectedItems.includes(data.id)}" no-body>
    <div class="">
        <router-link :to="`?p=${data.id}`" class="w-40 position-relative">
            <img :src="data.img" class="card-img-top" :alt="data.title" />
        </router-link>
    </div>
    <b-card-body>
        <b-row>
            <b-colxx xxs="2">
                <b-form-checkbox :checked="selectedItems.includes(data.id)" class="itemCheck mb-0" />
            </b-colxx>
            <b-colxx xxs="10" class="mb-3">
                <h6 class="mb-4 card-subtitle">{{data.title}}</h6>
                <p class="text-muted text-small mb-0 font-weight-light card-text">{{data.date}}</p>
            </b-colxx>
        </b-row>
    </b-card-body>
</b-card> -->
  <div>
    <div class="glide" ref="carouselImages">
      <div data-glide-el="track" class="glide__track">
        <div class="glide__slides">
          <div
              class="card"
            >
              <b-card class="flex-row" no-body>
                <div class="w-100 position-relative">
                  <img
                    class="card-img"
                    style="max-height: 210px"
                    :src="data.img"
                    alt="Card cap"
                  />
                </div>
              </b-card>
            </div>
            <!-- <img :src="data.img" class="card-img-top" :alt="data.title" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "selectedItems"],
  methods: {
    toggleItem(event, itemId) {
      this.$emit("toggle-item", event, itemId);
    },
  },
};
</script>
