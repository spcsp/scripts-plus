<template>
  <v-app id="inspire">
    <div id="background"></div>

    <v-navigation-drawer app clipped>
      <ul>
        <li v-for="(m, i) in methods" :key="i">{{ m.name }}</li>
      </ul>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark clipped-left>
      <v-toolbar-title>StrokesPlus Docs</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout">
        <v-icon>cloud</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col :cols="leftCol">
            <v-treeview
              :items="items"
              activatable
              hoverable
              open-on-click
              dense
            ></v-treeview>
          </v-col>
          <v-col :cols="rightCol">
            <v-card
              class="mx-auto my-5"
              max-width="500"
              v-for="(m, i) in methods"
              :key="i"
            >
              <v-card-text>
                <div>
                  <span class="text--primary font-weight-black">
                    <span class="font-italic font-weight-thin">sp.</span
                    >{{ m.name }}():
                    <span class="blue--text body-2">{{ m.returnType }}</span>
                  </span>
                </div>

                <div class="text--primary">
                  <ul>
                    <li v-for="p in m.parameters" :key="p">
                      <span class="grey--text body-2">{{ p[0] }}</span
                      >&nbsp;<span class="blue--text body-2">{{ p[1] }}</span>
                    </li>
                  </ul>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer color="indigo" app>
      <span class="white--text body-2"
        >Made by
        <a href="http://kevinhill.codes" class="blue--text">Kevin Hill</a></span
      >
    </v-footer>
  </v-app>
</template>

<script>
import { methods } from "../output.json";
import help from "../help.json";

export default {
  name: "app",
  data: () => ({
    methods,
    drawer: false,
    leftCol: 4,
    rightCol: 8,
  }),
  computed: {
    items() {
      let id = 1;

      const sections = Object.entries(help).map(([key, section]) => {
        let children = [];

        if (help[key].Methods) {
          const sectionMethods = Object.keys(help[key].Methods);

          console.log(sectionMethods);
          children = sectionMethods.map(methodName => {
            return {
              id: id++,
              name: methodName,
              children: [],
            };
          });
        }

        return {
          id: id++,
          name: section.Name,
          children,
        };
      });

      console.log(sections);

      return sections;
    },
  },
};
</script>