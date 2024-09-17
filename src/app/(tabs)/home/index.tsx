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

export function Home() {
  const {
    data,
    dataId,
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
    handleResetDatabase,
    handleExportData,
    handleImportData,
  } = useHome();
  const window = useWindowDimensions();
  const heightWindow = window.height - 200;

  return (
    <>
      <View style={styles.container}>
        <View style={{ position: "relative" }}>
          <Text style={styles.title}>UUCS</Text>
          <View
            style={{
              position: "absolute",
              right: 0,
              top: 40,
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
            }}
          >
            <Button
              onPress={() =>
                exportData().then(() => alert("Backup feito com sucesso."))
              }
            >
              <MaterialIcons
                name="vertical-align-top"
                size={24}
                color={colors.text}
              />
            </Button>
            <Button
              onPress={() =>
                importFromTxt().then(() => alert("Restauro feito com sucesso"))
              }
            >
              <MaterialIcons
                name="vertical-align-bottom"
                size={24}
                color={colors.text}
              />
            </Button>
            <Button onPress={handleResetDatabase}>
              <MaterialIcons name="restart-alt" size={24} color={colors.text} />
            </Button>
          </View>
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
    </>
  );
}
