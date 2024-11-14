import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import FormFileCSV from '~/components/form/FormFileCSV.vue';

describe('FormFileCSV', () => {
  it('can mount the component', async () => {
    const component = await mountSuspended(FormFileCSV, {
      props: {
        label: 'File upload label',
        fieldKey: 'file',
        errors: [],
      },
    });

    expect(component.html()).toContain('Загрузить файл');
  });

  it('can emit the correct event when the file uploaded', async () => {
    const component = await mountSuspended(FormFileCSV, {
      props: {
        label: 'File upload label',
        fieldKey: 'file',
        errors: [],
      },
    });

    const file = new File(['file content'], 'file.csv', { type: 'text/csv' });

    const wrapper = component.vm as unknown as {
      fileName: { value: string };
      updateValue: (value: { target: { files: File[] } }) => void;
    };
    wrapper.updateValue({ target: { files: [file] } });

    expect(wrapper.fileName.value).toBe('file.csv');
    expect(component.emitted('update:modelValue')).toBeTruthy();
  });

  it('can emit the correct event when the uploaded file is removed', async () => {
    const component = await mountSuspended(FormFileCSV, {
      props: {
        label: 'File upload label',
        fieldKey: 'file',
        errors: [],
      },
    });

    const file = new File(['file content'], 'file.csv', { type: 'text/csv' });

    const wrapper = component.vm as unknown as {
      fileName: { value: string };
      fileInput: { value: { value: string } };
      removeFile: () => void;
      updateValue: (value: { target: { files: File[] } }) => void;
    };
    wrapper.updateValue({ target: { files: [file] } });
    expect(wrapper.fileName.value).toBe('file.csv');
    expect(component.emitted('update:modelValue')).toBeTruthy();
    expect(component.emitted('update:modelValue')).toHaveLength(1);

    wrapper.removeFile();

    expect(wrapper.fileName.value).toBe('');
    expect((component.emitted('update:modelValue') as Array<[string]>)[1]).toEqual([
      null,
    ]);
    expect(component.emitted('update:modelValue')).toHaveLength(2);
  });

  it('can display errors', async () => {
    const component = await mountSuspended(FormFileCSV, {
      props: {
        label: 'File upload label',
        fieldKey: 'file',
        errors: ['File is required'],
      },
    });

    expect(component.html()).toContain('File is required');
  });
});
