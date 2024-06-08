<template>
  <div>
    <e-loading ref="loading" />
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.bebas-pustaka')" />
        <div class="separator mb-5"></div>
      </b-colxx>
      <b-colxx xxs="12">
        <b-card>
          <b-form>
            <b-row>
              <b-colxx sm="6">
                <b-form-group label="Member Name">
                  <b-form-input v-model="filters[0].value" />
                </b-form-group>
              </b-colxx>

              <b-colxx sm="6">
                <b-form-group label="Status Perpustakaan">
                  <b-form-select
                    v-model="filters[1].value"
                    :options="optionsStatus"
                  ></b-form-select>
                </b-form-group>
              </b-colxx>
            </b-row>
          </b-form>
          <div class="d-flex justify-content-end align-items-center">
            <b-button
              @click="onReset"
              variant="primary default"
              size="sm"
              id="uiBtnBebasPustakaReset"
              class="mt-2 btn-shadow mr-2"
            >
              <em class="simple-icon-reload" />Reset
            </b-button>
            <b-button
              @click="searchData"
              variant="success default"
              size="sm"
              id="uiBtnBebasPustakaCari"
              class="mt-2 btn-shadow"
            >
              <em class="simple-icon-magnifier" />Cari
            </b-button>
          </div>
        </b-card>
      </b-colxx>
    </b-row>
    <e-paging-server
      ref="tblPagingMember"
      title="List Bebas Pustaka"
      class="mt-2"
      picker="pagingBebasPustaka"
      :perPage="25"
      search=""
      sortDesc
      :filters="filters"
      :show-checkbox="true"
      :selected-flag="'bebas_pustaka'"
      @process-data="proccessPerMember"
      @cetak-data="printCard"
      :disabledButton="disabledButton"
      :renderButton="renderButton"
      :showCustomPerPage="true"
    ></e-paging-server>
    <e-bebas-pustaka v-show="false" :memberInfo="memberInfo"/>
  </div>
</template>
  <script>
import axios from "axios";
import pagingServer from "@/components/Customs/PagingServer";
import FormTool from "@/components/Customs/FormTool";
import { apiBackend } from "@/constants/config";
import Loading from "@/components/Customs/Loading";
import KartuBebasPustaka from '@/views/dashboard/Components/KartuBebasPustaka';

export default {
  components: {
    "e-paging-server": pagingServer,
    "e-loading": Loading,
    "e-bebas-pustaka": KartuBebasPustaka
  },
  data() {
    return {
      filters: [
        { id: "member_name", value: "", opr: "LIKE", type: "STRING" },
        { id: "bebas_pustaka", value: "", opr: "EQUAL", type: "STRING" },
      ],
      optionsStatus: [
        { value: 0, text: "Ada Peminjaman" },
        { value: 1, text: "Tidak ada Peminjaman" },
      ],
      memberInfo: {
        member_name: '',
        member_id: '',
        pin: ''
      }
    };
  },
  methods: {
    searchData() {
      this.$refs.tblPagingMember.refresh("");
    },
    onReset() {
      this.filters[0].value = "";
      this.filters[1].value = "";
      this.$refs.tblPagingMember.refresh("");
    },
    async printCard({ bean }) {
      this.memberInfo = bean
      setTimeout( async () => {
        await this.$htmlToPaper('printableContent');
      }, 10);
    },
    async proccessPerMember({ bean }) {
      const responseConfirm = await FormTool.confirmWarning(
        this,
        "Peringatan!",
        "Apakah anda yakin akan merubah status user menjadi bebas pustaka?",
        "Ya",
        "Tidak"
      );
      if (!responseConfirm.value) {
        return;
      }
      this.$refs.loading.show();
      const data = { ...bean };
      const payload = [];
      payload.push(data);
      const headers = {
        token: _.get(this.currentUser, "token"),
      };
      try {
        await axios.post(`${apiBackend}/user/set-bebas-pustaka`, payload);
        this.$refs.tblPagingMember.fetchData();
        this.$refs.loading.hide();
        FormTool.popupSuccess(
          this,
          "Success",
          "Berhasil Merubah Status Menjadi Bebas Pustaka"
        );
      } catch (e) {
        this.$refs.loading.hide();
        FormTool.popupError(this, "Error", `Gagal merubah data ${e}`);
      }
    },
    disabledButton(type, { item }) {
      return false;
    },
    renderButton(type, row) {
      console.log(row)
      if (type === 'Cetak') {
        return _.get(row, 'item.status') !== 'Ada Peminjaman'
      }
      return true
    },
  },
};
</script>