<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 * @file componentWrapper.vue
 *
 * This component wraps each individual component. It has each component listed and loads it if it
 * is in the config 

 * @author Alexander Seiler
 * @date 12.09.2018
 *
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->

<template>
  <component class="color-item component" :class="config.header ? 'rounded-item-with-header' : 'rounded-item-without-header'" :is="config.type" :config="config" :displaydata="displaydata"></component>
</template>

<script>
import loginComponent from '../datapoints/loginComponent.vue';
import waiterComponent from '../datapoints/waiterComponent.vue';

import logservice from "../../services/logservice.js";
var logger = logservice.create("componentWrapper"); //initialize the logger with the name of the component

export default {
  name:'componentWrapper',
  props:['config', 'displaydata'],
  data() {
    return {
      components: {       
        "loginComponent": loginComponent,
        "waiterComponent": waiterComponent
      }
    }
  },
  computed: {
   
  },
  methods: {
    
  },
  components: {
    loginComponent,
    waiterComponent
  }
  
}

</script>

<style scoped>
h5 {
  color: #ebfaff!important;
  margin: 0 auto;
}

.component {
  padding: 10px;
}

</style>
