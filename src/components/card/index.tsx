import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import { getColorAlertPh, getColorForPH } from "@/helpers/ph";
import { dayjs } from "@/libs/datyjs";
import { colors } from "@/styles/color";

type Data = {
  id: number;
  date: Date;
  spoons: number;
  pH: number;
};

interface Props {
  data: Data;
  onPress?(): void;
}

export function Card(props: Props) {
  const { data, onPress } = props;
  const status = getColorAlertPh(data.pH);

  const period = () => {
    const time = data.date.getHours();
    if (time < 12) return "Manhã";
    if (time < 18) return "Tarde";
    return "Noite";
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.left}>
          <View
            style={[
              styles.phContainer,
              { backgroundColor: getColorForPH(data.pH) },
            ]}
          >
            <Text style={styles.phText}>{data.pH.toFixed(1)}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.date}>{dayjs(data.date).fromNow()}</Text>
            <Text style={styles.spoons}>{`${data.spoons} colher(es)`}</Text>
          </View>
        </View>
        <View style={styles.right}>
          <Text style={{ textAlign: "right", color: colors.text }}>{""}</Text>
          <Text
            style={[styles.statusDisplay, { color: status.color }]}
            numberOfLines={1}
          >
            {status.display}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
