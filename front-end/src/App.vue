<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      flat
      dark
    >
      <v-app-bar-nav-icon>
        <v-icon>mdi-comment</v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title>Mini Chat</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
