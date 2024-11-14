<template>
  <TransitionRoot
    as="template"
    :show="modal.open"
  >
    <Dialog
      class="relative z-50 overflow-visible"
      @close="modal.hideModal"
    >
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 50 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel class="relative transform overflow-visible rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div
                v-if="!modal.pending"
                class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block"
              >
                <button
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                  @click="modal.hideModal"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon
                    class="h-6 w-6"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div>
                <div
                  :class="[
                    'mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100',
                    colorIconBgVariants[modal.type ?? 'info'],
                  ]"
                >
                  <ArrowPathIcon
                    v-if="modal.pending"
                    :class="[
                      'h-6 w-6 animate-spin',
                      colorIconVariants[modal.type ?? 'info'],
                    ]"
                    aria-hidden="true"
                  />
                  <component
                    :is="modal.icon"
                    v-else
                    :class="[
                      'h-6 w-6',
                      colorIconVariants[modal.type ?? 'info'],
                    ]"
                    aria-hidden="true"
                  />
                </div>
                <div class="mt-3 sm:mt-5">
                  <DialogTitle
                    as="h3"
                    class="text-center text-base font-semibold leading-6 text-gray-900"
                  >
                    {{ modal.title }}
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-center text-sm text-gray-500">
                      {{ modal.text }}
                    </p>

                    <div
                      v-if="modal.extraComponent"
                      class="mt-4"
                    >
                      <component :is="modal.extraComponent" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  :disabled="modal.pending"
                  type="button"
                  :class="[
                    'inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:col-start-2 disabled:cursor-not-allowed',
                    colorButtonVariants[modal.type ?? 'info'],
                  ]"
                  @click="modal.action"
                >
                  {{ modal.actionText }}
                </button>
                <button
                  ref="cancelButtonRef"
                  :disabled="modal.pending"
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
                  @click="modal.hideModal"
                >
                  Отмена
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { ArrowPathIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import type { ModalType } from '~/stores/modal';
import { useModalStore } from '~/stores/modal';

const modal = useModalStore();

const colorIconBgVariants: Record<ModalType, string> = {
  info: 'bg-indigo-100',
  danger: 'bg-red-100',
  warning: 'bg-yellow-100',
};

const colorIconVariants: Record<ModalType, string> = {
  info: 'text-indigo-600',
  danger: 'text-red-600',
  warning: 'text-yellow-600',
};

const colorButtonVariants: Record<ModalType, string> = {
  info: 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600 disabled:bg-indigo-300',
  danger: 'bg-red-600 hover:bg-red-500 focus-visible:outline-red-600 disabled:bg-red-300',
  warning: 'bg-yellow-600 hover:bg-yellow-500 focus-visible:outline-yellow-600 disabled:bg-yellow-300',
};
</script>
