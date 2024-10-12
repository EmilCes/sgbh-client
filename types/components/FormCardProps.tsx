export interface FormCardProps<T> {
    onClose: () => void;
    onItemAdded: () => void;
    item: T | null;
    isEditing: boolean;
  }