<template>
  <NuxtLink
    v-if="route.name !== routeName"
    :to="url"
    class="flex space-x-1 items-center cursor-pointer"
  >
    <span class="hover:underline">{{ item.name }}</span>
    <ArrowTopRightOnSquareIcon class="h-4 w-4 text-indigo-600" />
  </NuxtLink>
  <div v-else>
    {{ item.name }}
  </div>
</template>

<script setup lang="ts">
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/solid';

defineProps<{
  item: RelationOption;
  routeName: string;
  url: string;
}>();

const route = useRoute();
</script>
