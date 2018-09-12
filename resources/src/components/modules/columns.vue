<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 * @file column.vue
 * This component sets the scale of each component
 * 
 * @author Alexander Seiler
 * @date 12.09.2018
 * 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
<template>
  <div>
    <div class="col s12 m12 l12 xl12">
      <div v-if="config.title != undefined" class="color-column-title">
        <h2 class="valign-wrapper ">{{config.title}}</h2>
      </div>
      <div class="col s12 m12 l12 xl12">
        <card :config="this.config" :displaydata="displaydata"></card>
      </div>
      
    </div>
  </div>
</template>

<script>
import card from "./card.vue";
import logservice from "../../services/logservice.js";
var logger = logservice.create("Columns");
export default {
  name: "columns",
  props: [
    "config",
    "displaydata",
  ],
  components: {
    card
  }
};
</script>

<style scoped>
</style>