<template>
  <div>
    Waiter component loaded
</div> 
</template>
<script>
var Vue = require("vue");
import logservice from "../../services/logservice.js";
var logger = logservice.create("loginComponent"); //initialize the logger with the name of the component
import { EventBus } from "../../services/event-bus.js";
export default {
    name: "deviceInformation",
    props: ["config", "displaydata"],
    methods:{
        testFunc: function() {
            alert(JSON.stringify(this.config));
            alert(JSON.stringify(this.displaydata));
        }
    },
    created: function() {
        this.testFunc();
    }
}

</script>
<style scoped>

</style>
