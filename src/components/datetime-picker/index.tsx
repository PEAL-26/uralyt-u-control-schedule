import DateTimePickerModal from "react-native-modal-datetime-picker";

interface Props {
  value?: Date;
  onChange?(date: Date | null): void;
  onClose?(): void;
  open: boolean;
  mode: "date" | "time" | "datetime";
}

export function DatetimePicker(props: Props) {
  const { value, open, onClose, onChange, mode = "date" } = props;

  const handleConfirm = (date: Date) => {
    onChange?.(date);
    onClose?.();
  };

  const handleCancel = () => {
    onClose?.();
  };

  return (
    <DateTimePickerModal
      isVisible={open}
      mode={mode}
      date={open ? value : undefined}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
}
