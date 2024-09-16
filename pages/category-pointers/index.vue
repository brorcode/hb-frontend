<template>
  <div class="space-y-5">
    <AppCard>
      <div class="flex justify-between items-center">
        <div>Указатели Категорий</div>
        <div class="flex space-x-2 items-center">
          <div
            v-if="hasUnsavedChanges"
            class="flex space-x-2 items-center"
          >
            <div class="text-red-600">
              Сохраните изменения!
            </div>

            <button
              :disabled="pending"
              data-testid="save-category-pointers-button"
              class="inline-flex justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              @click.prevent="refreshList"
            >
              Отменить
            </button>
          </div>

          <button
            :disabled="pending"
            data-testid="save-category-pointers-button"
            class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click.prevent="savePointers"
          >
            Сохранить
          </button>
        </div>
      </div>
    </AppCard>

    <AppCard v-if="errors">
      <div
        v-for="(error, index) in errors"
        :key="`error_${index}`"
        class="text-red-600"
      >
        {{ error[0] }}
      </div>
    </AppCard>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <AppCard>
        <div class="space-y-5">
          <div class="flex justify-between items-center">
            <div>Родительские категории</div>
            <div class="flex justify-end">
              <div class="flex">
                <button
                  :disabled="pending"
                  data-testid="save-category-pointers-button"
                  class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  @click.prevent="addPointer(true)"
                >
                  Добавить
                </button>
              </div>
            </div>
          </div>

          <CategoryPointerItem
            v-for="(pointer, index) in pointers.parent"
            :key="pointer.id"
            :pointer-index="index"
            :pointer="pointer"
            :pending="pending"
            @remove-pointer="removePointer(pointers.parent, index)"
            @remove-tag="removeTag(pointer, $event)"
            @add-tag="addTag(pointer, $event)"
            @update-pointer-name="updatePointerName(pointer, $event)"
          />
        </div>
      </AppCard>

      <AppCard>
        <div class="space-y-5">
          <div class="flex justify-between items-center">
            <div>Дочерние категории</div>
            <div class="flex justify-end">
              <div class="flex">
                <button
                  :disabled="pending"
                  data-testid="save-category-pointers-button"
                  class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  @click.prevent="addPointer(false)"
                >
                  Добавить
                </button>
              </div>
            </div>
          </div>

          <CategoryPointerItem
            v-for="(pointer, index) in pointers.child"
            :key="pointer.id"
            :pointer-index="index"
            :pointer="pointer"
            :pending="pending"
            @remove-pointer="removePointer(pointers.child, index)"
            @remove-tag="removeTag(pointer, $event)"
            @add-tag="addTag(pointer, $event)"
            @update-pointer-name="updatePointerName(pointer, $event)"
          />
        </div>
      </AppCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApi } from '~/composables/useApi';
import { categoryPointerApiUrl } from '~/components/pages/category-pointers/CategoryPointerInit';
import CategoryPointerItem from '~/components/pages/category-pointers/CategoryPointerItem.vue';

const { pending, apiFetch } = useApi();
const errors = ref<ResponseErrors | null>(null);
const pointers = reactive<CategoryPointers>({
  parent: [],
  child: [],
});
const hasUnsavedChanges = ref(false);

const refreshList = async () => {
  errors.value = null;
  const response = await apiFetch<CategoryPointers>('GET', categoryPointerApiUrl);
  pointers.child = response.child;
  pointers.parent = response.parent;
  hasUnsavedChanges.value = false;
};

onMounted(async () => {
  await refreshList();
});

const removePointer = (item: CategoryPointer[], index: number) => {
  item.splice(index, 1);
  hasUnsavedChanges.value = true;
};

const removeTag = (item: CategoryPointer, index: number) => {
  item.tags_array.splice(index, 1);
  hasUnsavedChanges.value = true;
};

const updatePointerName = (item: CategoryPointer, newName: string) => {
  item.name = newName;
  hasUnsavedChanges.value = true;
};

const addTag = (pointer: CategoryPointer, tagName: string) => {
  if (!tagName) {
    return;
  }

  pointer.tags_array.push(tagName);
  hasUnsavedChanges.value = true;
};

const getEmptyPointer = (isParent: boolean): CategoryPointer[] => {
  return [{
    id: pointers.parent.length + pointers.child.length + 1,
    name: '',
    is_parent: isParent,
    tags_array: [],
  }];
};

const addPointer = (isParent: boolean) => {
  if (isParent) {
    pointers.parent = getEmptyPointer(isParent).concat(pointers.parent);
  }

  if (!isParent) {
    pointers.child = getEmptyPointer(isParent).concat(pointers.child);
  }
  hasUnsavedChanges.value = true;
};

const savePointers = async () => {
  errors.value = null;
  try {
    const response = await apiFetch<CategoryPointers>('POST', `${categoryPointerApiUrl}/save`, pointers);
    pointers.child = response.child;
    pointers.parent = response.parent;
    hasUnsavedChanges.value = false;
  }
  catch (e) {
    const response = e as ApiResponseError;
    errors.value = response.response._data?.errors;
  }
};
</script>
