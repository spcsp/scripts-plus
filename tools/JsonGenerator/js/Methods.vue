<template>
<v-container>
  <v-card
    class="mx-auto my-5"
    max-width="500"
    v-for="(m, i) in methods"
    :key="i"
  >
    <v-card-text>
      <div>
        <span class="text--primary font-weight-black">
          <span class="font-italic font-weight-thin">sp.</span>{{ m.name }}():
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
  </v-container>
</template>

<script>
import { methods } from "../output.json";

export default {
  name: "app",
  data: () => ({
    methods,
  }),
  computed: {
  },
};
</script>