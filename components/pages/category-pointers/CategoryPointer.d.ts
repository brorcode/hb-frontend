type CategoryPointer = {
  name: string;
  is_parent: boolean;
  tags_array: string[];
};

type CategoryPointers = {
  parent: CategoryPointer[];
  child: CategoryPointer[];
};
