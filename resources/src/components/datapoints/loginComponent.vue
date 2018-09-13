<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 * @file loginComponent.vue
 * This component is the main interface for logging in to the tool
 * 
 * @author Alexander Seiler
 * @date 12.09.2018
 * 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
<template>
  <div>
    <input v-model="user" placeholder="Username for Master">
    <br>
    <input v-model="password" placeholder="Password for Master">
    <br>
    <button v-on:click="loginMaster(user, password)">Login as Master
    </button>
    <button v-on:click="loginServant()">Login as Servant
    </button>
    <button v-on:click="loginWaiter()">Login as Waiter
    </button>
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
        /**
         * loginUser
         * @author Alexander Seiler
         * this functions sets the app up based on the user logged in
         */
        loginMaster: function(username, password) {
            //alert("logged in with " + username + " and " + password);
            EventBus.$emit("loginExecuted", "master", username, password);
        },

        loginServant: function() {
            //alert("logged in as Servant");
            EventBus.$emit("loginExecuted", "servant");
        },
        
        loginWaiter: function() {
            //alert("logged in as Waiter");
            EventBus.$emit("loginExecuted", "waiter");
        }
    }
}

</script>
<style scoped>

</style>
