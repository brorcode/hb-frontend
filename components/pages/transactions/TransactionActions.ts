import { SquaresPlusIcon, TrashIcon } from '@heroicons/vue/20/solid';

export const transactionActions: TableAction[] = [
  {
    action: (selectedItems: number[]) => console.log('addTag', selectedItems),
    icon: SquaresPlusIcon,
    title: 'Добавить тег',
  },
  {
    action: (selectedItems: number[]) => console.log('delete', selectedItems),
    icon: TrashIcon,
    title: 'Удалить',
    color: 'red',
  },
];
