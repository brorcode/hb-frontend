import { mountSuspended } from '@nuxt/test-utils/runtime';
import type { VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import FormText from '~/components/form/FormText.vue';
import TagForm from '~/components/pages/tags/TagForm.vue';
import { tagFormInit } from '~/components/pages/tags/TagInit';

let wrapper: VueWrapper;
const form = tagFormInit;
const handleFieldUpdate = vi.fn();

describe('TagForm', () => {
  beforeEach(async () => {
    wrapper = await mountSuspended(TagForm, {
      props: {
        form,
        mode: pageMode.EDIT,
        handleFieldUpdate,
      },
    });
  });

  it('renders FormText component with correct props', () => {
    const formTextName = wrapper.findComponent(FormText);
    expect(formTextName.exists()).toBe(true);
    expect(formTextName.props('label')).toBe(form.name.label);
    expect(formTextName.props('fieldKey')).toBe(form.name.key);
    expect(formTextName.props('value')).toBe(form.name.value);
    expect(formTextName.props('errors')).toBe(form.name.errors);
    expect(formTextName.props('mode')).toBe(pageMode.EDIT);

    // Simulate update event
    formTextName.vm.$emit('update:modelValue', 'Some Name');
    expect(handleFieldUpdate).toHaveBeenCalledWith('name', 'Some Name');
  });
});
