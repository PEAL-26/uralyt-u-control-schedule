import { Modal, Text, View, TextInput, ActivityIndicator } from "react-native";

import { dayjs } from "@/libs/datyjs";
import { colors } from "@/styles/color";
import { getColorForPH } from "@/helpers/ph";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";
import { Button } from "../button";
import { useAddEditModal } from "./use-add-edit-modal";

export interface Props {
  id: string | null;
  open: boolean;
  onClose?(updateList: boolean): void;
}

export function DetailsModal(props: Props) {
  const { id, open } = props;

  const { phs, data, handleClose, error, isLoading, loadData } =
    useAddEditModal(props);

  return (
    <Modal
      visible={open}
      onRequestClose={handleClose}
      onDismiss={handleClose}
      animationType="fade"
      style={styles.main}
      transparent
    >
      <View style={styles.main}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Detalhes</Text>
            <Button onPress={handleClose}>
              <MaterialIcons name="close" color="#fff" size={32} />
            </Button>
          </View>
          <View style={styles.content}>
            <View style={styles.datetime}>
              <View style={[styles.inputContainer, { width: "100%", flex: 1 }]}>
                <Text style={styles.inputLabel}>Data</Text>
                <TextInput
                  readOnly
                  style={styles.input}
                  value={dayjs(data.date).format("DD/MM/YYYY")}
                  cursorColor={colors.primary}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Hora</Text>
                <TextInput
                  readOnly
                  style={styles.input}
                  value={dayjs(data.date).format("HH:mm")}
                  cursorColor={colors.primary}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Colher(es)</Text>
              <TextInput
                readOnly
                keyboardType="numeric"
                returnKeyType="done"
                style={styles.input}
                cursorColor={colors.primary}
                value={data?.spoons ? String(data.spoons) : undefined}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Selecione o pH: </Text>
              <View style={styles.buttonPhContainer}>
                {phs.map((pH, key) => {
                  const selected = pH === data?.pH;

                  return (
                    <Button
                      key={key}
                      disabled
                      textStyle={styles.buttonPhText}
                      style={[
                        styles.buttonPh,
                        { backgroundColor: getColorForPH(pH) },
                      ]}
                      text={`${pH.toFixed(1)}`}
                    >
                      {selected && (
                        <View
                          style={{
                            position: "absolute",
                            top: -5,
                            borderWidth: 2,
                            width: 50,
                            height: 50,
                            borderColor: getColorForPH(pH),
                            borderRadius: 25,
                          }}
                        />
                      )}
                    </Button>
                  );
                })}
              </View>
            </View>
          </View>
          {isLoading && id && (
            <View
              style={[
                styles.loading,
                error ? { backgroundColor: colors.background } : {},
              ]}
            >
              <ActivityIndicator
                animating={isLoading}
                size={24}
                color={colors.primary}
              />
              <Text style={styles.headerTitle}>{error}</Text>
              <Button
                text="Recarregar"
                textStyle={{ color: colors.text }}
                style={[styles.buttonSave]}
                onPress={loadData}
              />
              <Button
                text="Fechar"
                textStyle={{ color: colors.text }}
                onPress={handleClose}
                style={[
                  styles.buttonSave,
                  {
                    backgroundColor: "transparent",
                    borderColor: colors.primary,
                    borderWidth: 1,
                  },
                ]}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
