import { useState } from "react";
import { Props } from "./add-edit-modal";
import * as scheduleSchema from "@/database/schemas/schedule-schema";
import { useDatabase } from "@/hooks/use-database";

type DataType = {
  date: Date;
  spoons: number;
  pH: number;
};

export function useAddEditModal(props: Props) {
  const { id, onClose } = props;
  const phs = [5.6, 5.9, 6.2, 6.5, 6.8, 7.0, 7.2, 7.4, 7.7, 8];

  const database = useDatabase(scheduleSchema);

  const [data, setData] = useState<DataType>({} as DataType);
  const [openDatetimePicker, setOpenDatetimePicker] = useState(false);
  const [mode, setMode] = useState<"date" | "time">("date");

  const handleClose = () => {
    onClose?.(false);
  };

  const handleSave = async () => {
    try {
      alert(JSON.stringify(data))
      if (id) {
        await database.update(id, data);
      }

      if (!id) {
        await database.create(data);
      }

      onClose?.(true);
    } catch (error) {
      console.warn(error);
    } finally {
    }
  };

  const handleOpenDatetimePicker = (mode: "date" | "time") => {
    setMode(mode);
    setOpenDatetimePicker(true);
  };

  return {
    data,
    phs,
    setData,
    handleClose,
    handleSave,
    openDatetimePicker,
    setOpenDatetimePicker,
    mode,
    handleOpenDatetimePicker,
  };
}
