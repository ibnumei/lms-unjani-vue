<template>
  <div>
    <loading ref="loading" />
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.scheduler')" />
        <div class="separator mb-5" />
      </b-colxx>
    </b-row>

    <b-colxx xxs="12">
      <b-card class="mb-4">
        <div class="d-flex justify-content-end align-items-center">
          <b-button
            @click="onRefresh"
            variant="primary default"
            size="sm"
            id="uiBtnRefreshListScheduler"
            class="mt-2 btn-shadow mr-2"
          >
            <em class="simple-icon-reload" /> Refresh
          </b-button>
        </div>

        <paging-server-vue
          ref="tblPagingScheduler"
          title="List Scheduler"
          class="mt-2"
          picker="pagingListScheduler"
          :per-page="10"
          search=""
          :filters="filters"
          @retry-data="retryScheduler"
          :disabled-button="disabledButton"
        />
      </b-card>
    </b-colxx>
  </div>
</template>

<script>
import Loading from "@/components/Customs/Loading.vue";
import formTool from "@/components/Customs/FormTool";
import PagingServerVue from "@/components/Customs/PagingServer.vue";

export default {
  components: {
    PagingServerVue,
    Loading,
  },
  data() {
    return {
      filters: [{ id: "type", value: "MEMBER", opr: "EQUAL", type: "STRING" }],
    };
  },
  methods: {
    disabledButton(type, { item }) {
      if (type === "retry") {
        return item.status === "Inprogress";
      }
      return false;
    },
    onRefresh() {
      this.$refs.tblPagingScheduler.refresh("");
    },
    async retryScheduler({ bean }) {
      this.$refs.loading.show();
      try {
        const result = await formTool.get(`/sync/${bean.type.toLowerCase()}`);
        if (!result.success) {
          throw Error();
        }
      } catch (error) {
        console.error(error);
        formTool.popupError(
          this,
          "Error",
          `Gagal mengulang proses sinkronisasi ${bean.typeDesc}`
        );
      } finally {
        this.$refs.loading.hide();
        return this.onRefresh();
      }
    },
  },
};
</script>
