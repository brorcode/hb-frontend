import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import FormText from '~/components/form/FormText.vue';
import CategoryPointerItem from '~/components/pages/category-pointers/CategoryPointerItem.vue';

describe('CategoryPointerItem', () => {
  it('can render parent category pointers and tags', async () => {
    const component = await mountSuspended(CategoryPointerItem, {
      props: {
        pointer: {
          name: 'Some name',
          is_parent: true,
          tags_array: ['tag1', 'tag2'],
        },
        prefix: 'parent',
        pointerIndex: 0,
        pending: false,
      },
    });

    expect(component.html()).toContain('Some name');
    expect(component.html()).toContain('tag1');
    expect(component.html()).toContain('tag2');
  });

  it('can render child category pointers and tags', async () => {
    const component = await mountSuspended(CategoryPointerItem, {
      props: {
        pointer: {
          name: 'Some name',
          is_parent: false,
          tags_array: ['tag1', 'tag2'],
        },
        prefix: 'parent',
        pointerIndex: 0,
        pending: false,
      },
    });

    expect(component.html()).toContain('Some name');
    expect(component.html()).toContain('tag1');
    expect(component.html()).toContain('tag2');
  });

  it('can emit event on update category pointer name', async () => {
    const component = await mountSuspended(CategoryPointerItem, {
      props: {
        pointer: {
          name: 'Some name',
          is_parent: true,
          tags_array: ['tag1', 'tag2'],
        },
        prefix: 'parent',
        pointerIndex: 0,
        pending: false,
      },
    });

    const formText = component.findAllComponents(FormText)[0];
    expect(formText.exists()).toBe(true);

    // Simulate update event
    formText.vm.$emit('update:modelValue', 'new pointer name');
    expect(component.emitted('updatePointerName')).toBeTruthy();
  });

  it('can emit event on removing category pointer tag', async () => {
    const component = await mountSuspended(CategoryPointerItem, {
      props: {
        pointer: {
          name: 'Some name',
          is_parent: true,
          tags_array: ['tag1', 'tag2'],
        },
        prefix: 'parent',
        pointerIndex: 0,
        pending: false,
      },
    });

    const removeTagButton = component.findAll('button[data-testid="remove-pointer-tag-0-button"]')[0];
    await removeTagButton.trigger('click');

    expect(component.emitted('removeTag')).toBeTruthy();
  });

  it('can emit event on adding a new category pointer tag', async () => {
    const component = await mountSuspended(CategoryPointerItem, {
      props: {
        pointer: {
          name: 'Some name',
          is_parent: true,
          tags_array: ['tag1', 'tag2'],
        },
        prefix: 'parent',
        pointerIndex: 0,
        pending: false,
      },
    });

    const removeTagButton = component.find('button[data-testid="add-category-pointer-tag-button"]');
    await removeTagButton.trigger('click');

    expect(component.emitted('addTag')).toBeTruthy();
  });
});
