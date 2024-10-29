<template>
  <div
    :class="[
      mobile ?? 'ring-1 ring-white/10',
      'flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4',
    ]"
  >
    <AppLogo />
    <AppNavbar />
  </div>
</template>

<script setup lang="ts">
import AppLogo from '~/components/AppLogo.vue';
import AppNavbar from '~/components/AppNavbar.vue';

defineProps<{
  mobile?: boolean;
}>();
</script>
