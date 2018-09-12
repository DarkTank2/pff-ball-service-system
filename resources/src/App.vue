<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 * @file App.vue
 * This file is the highest parent of our vue-application - the first component that gets loaded
 * in the 'app'- hook.
 *
 * @author Alexander Seiler
 * @date 12.09.2018
 * 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
<template>
  <div :class="this.standalone">
    <nav class="transparent">
      <div class="nav-wrapper">
        <div class="brand-logo center hide-on-med-and-down">
          <img id="company-logo" :src="this.currentConfig.assetpicture" />
        </div>
        <div class="left hide-on-med-and-down" style="line-height:80px; height: 80px;">
          <font id="headline">{{this.currentConfig.title}}</font>
        </div>
      </div>
    </nav>
    <h2 v-if="this.currentConfig.viewTitle != undefined">{{this.currentConfig.viewTitle}}</h2>
    <div v-if="this.configsFetched === true">
      <div class="row">
        <template v-for="(component) in currentConfig.components">
          <div class="row">
            <div v-if="component.type !== 'billComponent'">
              <columns :config="component" :displaydata="displaydata"></columns>
            </div>
            <div v-else-if="component.chosenBill !== null">
              <columns :config="component" :displaydata="displaydata"></columns>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div v-else>
      <p>Configs not fetched yet</p>
    </div>
  </div>
</template>

<script>
import columns from "./components/modules/columns.vue";
import logservice from "./services/logservice.js";
import getDataHelper from "./utility/getDataHelper.js";
import { EventBus } from "./services/event-bus.js";

require("babel-polyfill");
var Vue = require("vue");
Vue.use(require("vue-resource"));

var logger = logservice.create("App"); //initialize the logger with the name of the component

export default {
  name: "app",
  data() {
    return {
      
      serverConfigData: {}, // Data object to hold all the Configurations
      currentConfig: {}, // This contains the currently displayed configuration
      displaydata: {}, // Actuall data that gets displayed according to the currentConfig
      configsFetched: false, 
      items: {},
      configTitle: "default", // Change config via "configTitle" parameter provided by backend service
      userID: "",
      userRole: "waiter"
    };
  },
  methods: {
    /**
     * fetchConfig
     * @author Alexander Seiler
     * @date 12.09.2018
     * This function is basically a copy of the routine that @created, but since at that point in the lifecycle
     * there are no methods set up yet (@created-hook methods first get set up), we need to have a pseudo duplicate that
     * can be called during runtime.
     */
    fetchConfig: function() {
      logger.info("fetchConfig()");
      //Getting Promise of HTTP get from getDataHelper.js
      var configPath = "./api/config";
      getDataHelper.getData(configPath).then(function(data) {
            logger.debug("fetchConfig(" + configPath + ") successful");
            let fetchedConfig = data.body;
            Vue.set(this, "serverConfigData", fetchedConfig);

            Vue.set(this, "configsFetched", true);
          
            Vue.set(this, "configTitle", "configLogin");
            
            this.changeConfig();
          }.bind(this)
          ).catch(function(err) {
          logger.error("fetchConfig(" + configPath + ") " + err);
        });
    },

    /**
     * changeConfig
     * @author Alexander Seiler
     * @date 12.09.2018
     * This is used to replace fetchConfig where no complete Config Reload is needed. the whole config is saved @serverConfigData
     * and since configs tend to not change every 2 minutes it is not neccessary to reload them on every view change.
     * @param chosenConfig - is the class you parse to tell the system which config you want to be loaded.
     *                    IDs are automatically parsed from the config provided by the server.
     */
    changeConfig: function(chosenConfig) {
      logger.debug(
        "changeConfig1: (" + JSON.stringify(this.configTitle) + ") "
      );
      if (chosenConfig != undefined) {
        this.configTitle = chosenConfig; //This removes the necessacity to always provide an configTitle parameter.
      }
      logger.debug(
        "changeConfig2: (" + JSON.stringify(this.configTitle) + ") "
      );
      
      for (var config of this.serverConfigData.configurations) {
        if (config.configTitle == this.configTitle) {
          Vue.set(this, "currentConfig", config);
          break;
        }
      }
      
    },

    fetchItems: function() {
      logger.info("fetchItems()");
      var itemsPath = "/Items";
      getDataHelper.getData(itemsPath).then(function(data) {
            logger.debug("fetchItems(" + itemsPath + ") successful");
            let fetchedItems = data.body;
            Vue.set(this, "items", fetchedItems);
          }.bind(this)
          ).catch(function(err) {
          logger.error("fetchItems(" + itemsPath + ") " + err);
        });
    },
    
  },
  /**
   * created
   * @author Alexander Seiler
   * This is the vue.js created hook, used to initialize the serverConfigData and call fetchData() for the first time,
   * as well as adding a call for fetchData to 'this'.
   * It gets called before Vue initializes methods/computed/... For more information look up the vue.js-lifecycle
   */
  created: function() {
    logger.info("created()");
    
    this.fetchConfig();
    this.fetchItems();
    
    //add eventbus hooks here
    EventBus.$on("changeConfig", this.changeConfig);
    
  },
  
  components: {
    columns
  }
};
</script>

<style scoped>
nav {
  height: 80px;
  line-height: 80px;
}

#menu-button {
  margin-right: 50px;
  margin-left: 0px;
}

#headline {
  padding-left: 50px;
  font-family: 'siemens';
  font-size: 32px;
}
</style>
