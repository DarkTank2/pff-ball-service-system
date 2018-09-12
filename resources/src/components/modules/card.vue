<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 * @file card.vue
 *
 * This component is used to standardize the components of the dashboard. It has a uniform component
 * header and body.

 * @author Alexander Seiler
 * @date 12.09.2018
 * 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->

<template>
<div class="" style="">
  <ul class="collection with-header rounded" style="overflow:visible;">
    <li class="collection-item">
      <componentWrapper :config="config" :displaydata="displaydata" ></componentWrapper>
    </li>
  </ul>
</div>

</template>

<script>
import componentWrapper from './componentWrapper.vue';

export default {
  name: 'card',
  props:['config', 'displaydata'],
  components: {
    componentWrapper
  }
}
</script>

<style scoped>

.card {
  background-color: transparent;
}

.collection-item {
  padding: 0px!important;
  background-color: transparent;
}

.collection-header {
  height: 68px;
  background-color: #009999 !important;
}

h5 {
  color: #FFFFFF!important;
 
  display: block;
  margin-top: 12px;
  font-family: 'siemens';
  cursor: help;
}

</style>
