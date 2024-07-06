<template>
  <div class="space-y-5">
    <AppCard><slot name="header" /></AppCard>

    <AppCard><slot name="filters" /></AppCard>

    <AppCard><slot /></AppCard>
  </div>
</template>
<script setup lang="ts"></script>
