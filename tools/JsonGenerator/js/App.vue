<template>
  <v-app id="inspire">
    <div id="background"></div>
    
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>sp.GetMethods()</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-expansion-panels>
          <v-expansion-panel
            v-for="(m, i) in methods"
            :key="i"
          >
            <v-expansion-panel-header>
              {{ m.name }}(): {{ m.returnType }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <ul>
                <li v-for="p in m.parameters">
                  {{ Object.keys(p).pop() }} {{ value }}
                </li>
              </ul>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </v-main>
    <v-footer color="indigo" app>
      <span class="white--text body-2">Made by <a href="http://kevinhill.codes" class="cyan-text lighten-4">Kevin Hill</a></span>
    </v-footer>
  </v-app>
</template>

<script>
import { methods } from "../output.json";

export default {
  name: 'app',
  data: () => ({
    methods,
    drawer: false,
    items: [
      {
        icon: 'mdi-view-dashboard',
        title: 'Home',
        path: ''
      }
    ]
  })
};
</script>