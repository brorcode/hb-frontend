<template>
  <div
    aria-live="assertive"
    class="z-50 pointer-events-none fixed inset-0 flex flex-col items-end px-4 py-6 sm:items-start sm:p-6"
  >
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <div
        v-for="notification in store.notifications"
        v-show="notification.show"
        :key="notification.id"
        class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
      >
        <div
          :class="[
            notification.success ? 'bg-green-50' : 'bg-red-50',
            'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'
          ]"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <CheckCircleIcon
                  v-if="notification.success"
                  class="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
                <XCircleIcon v-else class="h-6 w-6 text-red-600" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p
                  :class="[
                    notification.success ? 'text-green-800' : 'text-red-800',
                    'text-sm font-medium'
                  ]"
                >
                  {{ notification.title }}
                </p>
                <p
                  :class="[
                    notification.success ? 'text-green-600' : 'text-red-600',
                    'text-sm font-text-sm'
                  ]"
                >
                  {{ notification.message }}
                </p>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  :class="[
                    notification.success
                      ? 'text-green-600 hover:text-green-800'
                      : 'text-red-600 hover:text-red-800',
                    'inline-flex rounded-md focus:outline-none'
                  ]"
                  @click="store.removeNotification(notification.id)"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline';
import { XMarkIcon } from '@heroicons/vue/24/solid';

const store = useNotificationsStore();
</script>
