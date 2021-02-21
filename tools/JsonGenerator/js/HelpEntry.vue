<template>
  <v-card class="mb-10">
    <v-card-title>
      <p class="font-weight-black text-h5">
        <span class="font-italic font-weight-thin">sp.</span>{{ entry.Name }}()
      </p>
    </v-card-title>

    <v-card-subtitle>
      <span class="text--primary font-weight-bold"
        >Returns:<span class="blue--text font-weight-thin"
          >&nbsp;{{ entry.Returns }}</span
        >
      </span>
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div class="mb-2">
        {{ entry.Description }}
      </div>

      <template>
        <p class="text-h6 mt-8 mb-n2">Parameters</p>
        <v-sheet elevation="1" rounded class="my-2 pa-2" v-if="entry.Parameters">
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Type</th>
                  <th class="text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in entry.Parameters" :key="item.name">
                  <td>{{ item.Name }}</td>
                  <td>{{ item.Type }}</td>
                  <td>{{ item.Description }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-sheet>
      </template>

      <p class="text-h6 mt-8 mb-n2">Simple Example</p>
      <v-sheet elevation="1" rounded class="my-2 pa-2" color="grey lighten-3">
        <code class="grey lighten-3">
          <pre>{{ entry.SimpleExample }}</pre>
        </code>
      </v-sheet>

      <template v-if="entry.FullExample">
        <p class="text-h6 mt-8 mb-n2">Full Example</p>
        <v-sheet elevation="1" rounded class="my-2 pa-2" color="grey lighten-3">
          <code class="grey lighten-3">
            <pre>{{ entry.FullExample }}</pre>
          </code>
        </v-sheet>
      </template>
    </v-card-text>
  </v-card>
</template>



<script>
export default {
  name: "HelpEntry",
  props: {
    entry: Object,
  },
  methods: {
    mounted() {
      console.log(`Mounted ${this.entry.Name}`);
    },
  },
  // Parameters: {
  //   cultureName: {
  //     Name: "cultureName",
  //     InternalName: "cultureName",
  //     Description:
  //       "The name of the language culture to make the current culture. Examples: 'en-US', 'pl-PL', 'zh-CN'.",
  //     Type: "string",
  //     Order: 1,
  //   },
  // },
};
</script>

<style>
code {
  font-family: "Roboto Mono", monospace;
  padding: 0 !important;
}
</style>