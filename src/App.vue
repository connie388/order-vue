<template>
  <div>
    <ErrorBoundary>
      <LayoutComponent><router-view /></LayoutComponent
    ></ErrorBoundary>
  </div>
</template>
<script>
import LayoutComponent from "./layouts/LayoutComponent.vue";
import ErrorBoundary from "./layouts/ErrorBoundary.vue";

export default {
  name: "App",
  components: {
    LayoutComponent,
    ErrorBoundary,
  },
};
</script>
