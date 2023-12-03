<template>
  <div>
    <b-row>
        <b-colxx xxs="12">
            <piaf-breadcrumb :heading="$t('menu.api')" />
            <div class="separator mb-5"></div>
        </b-colxx>
    </b-row>
    <b-row>
      <e-text
        label="Nama"
        type="text"
      />
        <b-colxx xxs="12">
            <p>{{$t('menu.api')}}</p>
        </b-colxx>
    </b-row>
  </div>
</template>

<script>
import Text from "@/components/Customs/Text";

export default {
  components: {
    "e-text": Text,
  },
}
</script>