import { useEffect, useRef, useState } from "react";
import { SwipeableWillOpen } from "./render-item";
import { useDatabase } from "@/hooks/use-database";
import * as schema from "@/database/schemas";
import { Alert } from "react-native";
import { resetDatabase } from "@/database/migrate";
import { asc, desc } from "drizzle-orm";
import { useSelectFolder } from "@/hooks/use-select-folder";

type Data = { id: number; date: Date; spoons: number; pH: number };
type ResponseData = {
  data: Data[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export function useHome() {
  const orderByDate = desc(schema.schedule.date);
  const database = useDatabase(schema.schedule);
  const { selectFolder } = useSelectFolder();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [dataId, setDataId] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [loadingStart, setLoadingStart] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [data, setData] = useState<Data[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const openSwipeableRef = useRef<any | null>(null);

  const handleOpenAddModal = () => setOpenAddModal(true);

  const handleCloseAddModal = (updateList: boolean) => {
    setOpenAddModal(false);
    setDataId(null);

    if (updateList) handleLoadingStart();
  };

  const handleEditData = (id: string) => {
    setDataId(id);
    handleOpenAddModal();

    if (openSwipeableRef?.current) {
      openSwipeableRef.current.close();
    }
  };

  const handleDeleteData = (id: string) => {
    Alert.alert(
      "Deseja eliminar esse item?",
      "Não poderá recuperar os dados eliminados, continuar mesmo assim?",
      [
        { text: "Cancelar" },
        {
          text: "Ok",
          onPress: async () => {
            try {
              await database.delete(id);
              await handleLoadingStart();
            } catch (error) {
              console.error(error);
            }
          },
        },
      ],
      {
        cancelable: true,
        userInterfaceStyle: "dark",
      }
    );

    if (openSwipeableRef?.current) {
      openSwipeableRef.current.close();
    }
  };

  const onSwipeableWillOpen = ({
    id,
    direction,
    currentRef,
  }: SwipeableWillOpen) => {
    if (direction === "left") {
      handleDeleteData(String(id));
    }

    if (openSwipeableRef?.current) {
      openSwipeableRef.current.close();
    }

    openSwipeableRef.current = currentRef;
  };

  const handleLoadingStart = async () => {
    if (loadingMore || loadingStart || refresh) return;

    try {
      setData(() => []);
      setLoadingStart(true);
      const response = await database.list<Data>(page, pageSize, orderByDate);
      setData(response?.data || []);
      setResponseData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingStart(false);
    }
  };

  const handleLoadingMore = async () => {
    if (loadingMore || loadingStart || refresh) return;

    try {
      setLoadingMore(true);
      const response = await database.list<Data>(page, pageSize, orderByDate);
      const newData = response.data.filter(
        (item) => !data.find((f) => f.id === item.id)
      );
      setData((prev) => [...prev, ...newData]);
      setResponseData(response);
    } catch (error) {
    } finally {
      setLoadingMore(false);
    }
  };

  const handleNextPage = async () => {
    if (responseData?.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handleRefresh = async () => {
    if (loadingMore || loadingStart || refresh) return;

    try {
      setRefresh(true);
      setData(() => []);
      const newData: Data[] = [];
      let lastResponse: ResponseData | null = null;

      for (let index = 1; index <= page; index++) {
        const response = await database.list<Data>(
          index,
          pageSize,
          orderByDate
        );
        newData.push(...response.data);
        lastResponse = response;
      }

      setData(newData);
      setResponseData(lastResponse);
    } catch (error) {
    } finally {
      setRefresh(false);
    }
  };

  useEffect(() => {
    handleLoadingStart();
  }, []);

  useEffect(() => {
    handleLoadingMore();
  }, [page]);

  return {
    data,
    setDataId,
    responseData,
    dataId,
    handleOpenAddModal,
    openAddModal,
    handleCloseAddModal,
    handleEditData,
    handleDeleteData,
    refresh,
    loadingStart,
    loadingMore,
    handleRefresh,
    handleLoadingStart,
    handleLoadingMore,
    handleNextPage,
    onSwipeableWillOpen,
    openDetailsModal,
    setOpenDetailsModal,
  };
}
