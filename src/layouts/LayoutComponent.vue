<template>
  <div class="flex flex-col min-h-screen">
    <NavigationBar />
    <main class="container flex-1 px-4 mx-auto my-12">
      <slot />
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "./FooterComponent.vue";
import NavigationBar from "./NavigationBar.vue";
export default {
  components: {
    FooterComponent,
    NavigationBar,
  },
};
</script>
