<template>
  <v-app dark>
    <v-navigation-drawer
      dark
      class="drawer"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-card elevation="0" class="blue darken-1 mx-auto p-5">
        <v-container>
          <v-row>
            <v-col>
              <v-img :src="logo" width="132" class="mx-auto"></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      logo: 'https://cerensa.com/wp-content/uploads/elementor/thumbs/cerensa-logo-oqyohpfwmvu2t8o1yfvyirovn1pa5me2wa1qp8a6ck.png',
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dahsboard',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Clientes',
          to: '/clientes',
        },
      ],
      miniVariant: false,
      right: false,
      rightDrawer: false,
      title: 'Dashboard',
    }
  },
}
</script>


<style scoped>
  .drawer{
    background: #1d7cd6
  }
  .v-app-bar{
    background: linear-gradient( 45deg, #00A69C, #1d7cd6);
  }
</style>
