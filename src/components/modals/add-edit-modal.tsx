import {
  Modal,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ActivityIndicatorBase,
  ActivityIndicator,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { getColorForPH } from "@/helpers/ph";

import { Button } from "../button";
import { styles } from "./styles";
import { useAddEditModal } from "./use-add-edit-modal";
import { dayjs } from "@/libs/datyjs";
import { colors } from "@/styles/color";
import { DatetimePicker } from "../datetime-picker";

export interface Props {
  id: string | null;
  open: boolean;
  onClose?(updateList: boolean): void;
}

export function AddEditModal(props: Props) {
  const { id, open } = props;

  const {
    mode,
    data,
    phs,
    handleClose,
    handleSave,
    setData,
    openDatetimePicker,
    setOpenDatetimePicker,
    handleOpenDatetimePicker,
    isLoading,
    error,
    saving,
    loadData,
  } = useAddEditModal(props);

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
            <Text style={styles.headerTitle}>
              {id ? "Editar" : "Adicionar"}
            </Text>
            <Button onPress={handleClose}>
              <MaterialIcons name="close" color="#fff" size={32} />
            </Button>
          </View>
          <View style={styles.content}>
            <View style={styles.datetime}>
              <View style={[styles.inputContainer, { width: "100%", flex: 1 }]}>
                <Text style={styles.inputLabel}>Data</Text>
                <TouchableOpacity
                  onPress={() => handleOpenDatetimePicker("date")}
                  activeOpacity={0.8}
                >
                  <TextInput
                    readOnly
                    style={styles.input}
                    value={dayjs(data.date).format("DD/MM/YYYY")}
                    cursorColor={colors.primary}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Hora</Text>
                <TouchableOpacity
                  onPress={() => handleOpenDatetimePicker("time")}
                  activeOpacity={0.8}
                >
                  <TextInput
                    readOnly
                    style={styles.input}
                    value={dayjs(data.date).format("HH:mm")}
                    cursorColor={colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Colher(es)</Text>
              <TextInput
                keyboardType="numeric"
                returnKeyType="done"
                style={styles.input}
                cursorColor={colors.primary}
                value={data?.spoons ? String(data.spoons) : undefined}
                onChangeText={(text) =>
                  setData(({ ...prev }) => ({
                    ...prev,
                    spoons: parseInt(text ?? "0"),
                  }))
                }
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
                      textStyle={styles.buttonPhText}
                      style={[
                        styles.buttonPh,
                        { backgroundColor: getColorForPH(pH) },
                      ]}
                      text={`${pH.toFixed(1)}`}
                      onPress={() =>
                        setData(({ ...prev }) => ({ ...prev, pH }))
                      }
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
            <Button
              disabled={saving}
              style={styles.buttonSave}
              textStyle={styles.buttonSaveText}
              text="Guardar"
              onPress={handleSave}
            />

            {error && (
              <Text style={{ color: colors.danger, textAlign: "center" }}>
                {error}
              </Text>
            )}
          </View>
          {isLoading && id && (
            <View
              style={[
                styles.loading,
                /*error*/ true ? { backgroundColor: colors.background } : {},
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
      <DatetimePicker
        open={openDatetimePicker}
        onChange={(date) => {
          date && setData(({ ...prev }) => ({ ...prev, date }));
        }}
        mode={mode}
        // value={data.date}
        onClose={() => setOpenDatetimePicker(false)}
      />
    </Modal>
  );
}
