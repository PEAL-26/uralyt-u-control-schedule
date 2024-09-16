import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  RefreshControl,
  useWindowDimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "@/styles/color";
import { Button } from "@/components/button";
import { AddEditModal } from "@/components/modals/add-edit-modal";

import { styles } from "./styles";
import { useHome } from "./use-home";
import { renderItem } from "./render-item";

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
    handleLoadingStart,
    handleLoadingMore,
    onSwipeableWillOpen,
  } = useHome();
  const window = useWindowDimensions();
  const heightWindow = window.height - 200;

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Uralyt-U Control Schedule</Text>
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
              loading: loadingStart,
              heightWindow,
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
                <ActivityIndicator
                  color={colors.primary}
                  size={24}
                  animating={loadingMore}
                />
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
              <Text style={{ color: colors.text, textAlign: "center" }}>
                Vazio
              </Text>
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
