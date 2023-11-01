<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.master-member')"/>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <e-paging-server
      ref="tblPaging"
      title="List Member Data" class="mt-2"
      picker="pagingPendingTaskMaintenance"
      :perPage=25
      search=""
      sortDesc
    ></e-paging-server>
  </div>
</template>
<script>
import pagingServer from '@/components/Customs/PagingServer'
export default {
  components: {
    'e-paging-server': pagingServer
  }
}

</script>