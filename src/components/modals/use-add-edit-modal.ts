import { useEffect, useState } from "react";
import { Props } from "./add-edit-modal";
import * as schema from "@/database/schemas/schedule-schema";
import { useDatabase } from "@/hooks/use-database";

type DataType = {
  date: Date;
  spoons: number;
  pH: number;
};

const DATA_INITIAL: DataType = {
  date: new Date(),
  pH: 0,
  spoons: 1,
};

export function useAddEditModal(props: Props) {
  const { id, open, onClose } = props;
  const database = useDatabase(schema.schedule);

  const phs = [5.6, 5.9, 6.2, 6.5, 6.8, 7.0, 7.2, 7.4, 7.7, 8];

  const [saving, setSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DataType>(() => DATA_INITIAL);

  const [mode, setMode] = useState<"date" | "time">("date");
  const [openDatetimePicker, setOpenDatetimePicker] = useState(false);

  const handleClose = () => {
    onClose?.(false);
  };

  const handleSave = async () => {
    setError(null);
    if (saving) return;

    if (data.date.getTime() > new Date().getTime()) {
      return setError("Não pode aplicar a dose em uma data\\hora futura");
    }

    if (data.pH <= 0 || data.pH > 8) {
      return setError("Selecione o pH");
    }

    if (Number.isNaN(data.spoons) || data.spoons <= 0) {
      return setError("Insira a quantidade de colheres-medida");
    }

    setSaving(true);

    try {
      const newData = { ...data, date: data.date.toISOString() };

      if (id) {
        await database.update(id, newData);
      }

      if (!id) {
        await database.create(newData);
      }

      onClose?.(true);
    } catch (error) {
      console.warn(error);
      setError("Oops! Algo deu errado ao salvar os dados.");
    } finally {
      setSaving(false);
    }
  };

  const handleOpenDatetimePicker = (mode: "date" | "time") => {
    setMode(mode);
    setOpenDatetimePicker(true);
  };

  const loadData = () => {
    if (id && open) {
      setIsLoading(true);
      setError(null);

      database
        .getById<DataType>(id)
        .then((response) => {
          if (!response) {
            setError("Item não encontrado!");
            return;
          }
          setData({ ...response, date: new Date(response.date) });
        })
        .catch((error) => {
          setError("Oops! Falha ao carregar os dados.");
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const reset = () => {
    setData(DATA_INITIAL);
    setSaving(false);
    setError(null);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
    if (!open) {
      reset();
    }
  }, [id, open]);

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
    isLoading,
    saving,
    error,
    loadData,
  };
}
