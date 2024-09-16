import { useEffect, useRef, useState } from "react";
import { SwipeableWillOpen } from "./render-item";
import { useDatabase } from "@/hooks/use-database";
import * as scheduleSchema from "@/database/schemas/schedule-schema";

type Data = { id: number; date: Date; spoons: number; pH: number };
type ResponseData = {
  data: Data;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export function useHome() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [dataId, setDataId] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [loadingStart, setLoadingStart] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [data, setData] = useState<Data[]>([]);
  const [page, setPage] = useState(1);

  const database = useDatabase(scheduleSchema);

  const handleOpenAddModal = () => setOpenAddModal(true);

  const handleCloseAddModal = (updateList: boolean) => {
    setOpenAddModal(false);
    setDataId(null);
    handleLoadingStart();
  };

  const handleEditData = (id: string) => {
    setDataId(id);
    handleOpenAddModal();
  };

  const handleDeleteData = (id: string) => {};

  const openSwipeableRef = useRef<any | null>(null);

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
    if (loadingStart) return;

    try {
      setLoadingStart(true);
      const response = await database.list<Data>(page);
      setData(response?.data || []);
    } catch (error) {
    } finally {
      setLoadingStart(false);
    }
  };

  const handleLoadingMore = async () => {
    if (loadingMore) return;

    try {
      setLoadingMore(true);
      const response = await database.list(page);
      // setData((prev) => [...prev, ...(response as any)]);
    } catch (error) {
    } finally {
      setLoadingMore(false);
    }
  };

  const handleRefresh = async () => {
    if (refresh) return;

    try {
      setRefresh(true);
      const response = await database.list(page);
      // setData((prev) => [...prev, ...(response as any)]);
    } catch (error) {
    } finally {
      setRefresh(false);
    }
  };

  useEffect(() => {
    handleLoadingStart();
  }, []);

  return {
    data,
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
    onSwipeableWillOpen,
  };
}
