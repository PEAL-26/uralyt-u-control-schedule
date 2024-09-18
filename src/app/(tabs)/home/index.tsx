import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  RefreshControl,
  useWindowDimensions,
  Alert,
  AlertButton,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "@/styles/color";
import { Button } from "@/components/button";
import { AddEditModal } from "@/components/modals/add-edit-modal";

import { styles } from "./styles";
import { useHome } from "./use-home";
import { renderItem } from "./render-item";
import { resetDatabase } from "@/database/migrate";
import { exportData, importFromTxt } from "@/database/backup";
import { DetailsModal } from "@/components/modals/details-modal";

export default function Home() {
  const {
    data,
    dataId,
    setDataId,
    handleCloseAddModal,
    handleOpenAddModal,
    openAddModal,
    handleEditData,
    loadingStart,
    loadingMore,
    refresh,
    responseData,
    handleRefresh,
    handleNextPage,
    handleLoadingStart,
    handleLoadingMore,
    onSwipeableWillOpen,
    openDetailsModal,
    setOpenDetailsModal,
  } = useHome();
  const window = useWindowDimensions();
  const heightWindow = window.height - 200;

  return (
    <>
      <View style={styles.container}>
        <View style={{ position: "relative" }}>
          <Text style={styles.title}>UUCS</Text>
        </View>
        <FlatList
          data={loadingStart ? [] : data}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={handleRefresh}>
              <ActivityIndicator animating={refresh} color={colors.primary} />
            </RefreshControl>
          }
          renderItem={(render) =>
            renderItem({
              ...render,
              onSwipeableWillOpen,
              onEdit: handleEditData,
              onPress: () => {
                setOpenDetailsModal(true);
                setDataId(String(render.item.id));
              },
            })
          }
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyExtractor={({ id }) => String(id)}
          ListFooterComponent={() => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {responseData?.hasNextPage &&
                !loadingMore &&
                !refresh &&
                !loadingStart && (
                  <Button
                    onPress={handleNextPage}
                    style={{
                      backgroundColor: colors.primary,
                      borderRadius: 20,
                      height: 40,
                      width: 40,
                    }}
                    text="Mais"
                    textStyle={{
                      color: colors.text,
                      textAlign: "center",
                      fontSize: 10,
                    }}
                  />
                )}
              {loadingMore && (
                <ActivityIndicator color={colors.primary} size={24} animating />
              )}
            </View>
          )}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: heightWindow,
              }}
            >
              <ActivityIndicator
                color={colors.primary}
                animating={loadingStart}
                size={24}
              />
              {!loadingStart &&
                !loadingMore &&
                !refresh &&
                data.length === 0 && (
                  <Text style={{ color: colors.text, textAlign: "center" }}>
                    Vazio
                  </Text>
                )}
            </View>
          )}
        />
        <Button onPress={handleOpenAddModal} style={styles.addButton}>
          <MaterialIcons name="add" color="#fff" size={32} />
        </Button>
      </View>
      <AddEditModal
        id={dataId}
        open={openAddModal}
        onClose={handleCloseAddModal}
      />
      <DetailsModal
        id={dataId}
        open={openDetailsModal}
        onClose={() => {
          setOpenDetailsModal(false);
          setDataId(null);
        }}
      />
    </>
  );
}
