type CategoryPointer = {
  id: number;
  name: string;
  is_parent: boolean;
  tags_array: string[];
};

type CategoryPointers = {
  parent: CategoryPointer[];
  child: CategoryPointer[];
};
