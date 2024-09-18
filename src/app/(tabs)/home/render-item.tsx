import { ActivityIndicator, ListRenderItemInfo, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { colors } from "@/styles/color";
import { Card } from "@/components/card";
import { Option } from "@/components/option";

import { styles } from "./styles";

export type SwipeableWillOpen = {
  id: number;
  direction: "left" | "right";
  currentRef: any;
};

type Props = ListRenderItemInfo<{
  id: number;
  date: Date;
  spoons: number;
  pH: number;
}> & {
  onSwipeableWillOpen?(props: SwipeableWillOpen): void;
  onEdit?(id: string): void;
  onPress?(): void;
};

export function renderItem(props: Props) {
  const { onSwipeableWillOpen, item, onEdit, onPress } = props;
  let currentRef: any = null;

  return (
    <Swipeable
      ref={(swipeable) => (currentRef = swipeable)}
      containerStyle={styles.swipeableContainer}
      overshootRight={false}
      leftThreshold={5}
      onSwipeableWillOpen={(direction) =>
        onSwipeableWillOpen?.({ id: item.id, direction, currentRef })
      }
      renderLeftActions={() => {
        return (
          <View style={styles.leftContainer}>
            <Option icon="delete" backgroundColor={colors.danger} />
          </View>
        );
      }}
      renderRightActions={() => {
        return (
          <View style={styles.rightContainer}>
            <Option
              icon="mode-edit"
              backgroundColor="#033856"
              onPress={() => onEdit?.(String(item.id))}
            />
          </View>
        );
      }}
    >
      <Card data={item} onPress={onPress} />
    </Swipeable>
  );
}
