import { schedule } from "@/database/schemas";
import { getColorForPH } from "@/helpers/ph";
import { useDatabase } from "@/hooks/use-database";
import { colors } from "@/styles/color";
import { and, asc, sql, gte, lte, eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
} from "react-native-gifted-charts";

type Data = {
  id: number;
  date: Date;
  spoons: number;
  ph: number;
  day: number;
  year: number;
  month: number;
};

// const data = [
//   {
//     value: 40,
//     label: "Jan",
//     spacing: 0,
//     labelWidth: 30,
//     labelTextStyle: { color: "gray" },
//     frontColor: "#177AD5",
//   },
//   { value: 5.6, frontColor: "#EDC703", label: "Jan" },
//   { value: 6.9, frontColor: "#EEC654", label: "2" },
//   { value: 6.2, frontColor: "#D9BF67" },
//   { value: 6.5, frontColor: "#BBBB71" },
//   { value: 6.8, frontColor: "#89A56A" },
//   { value: 7.0, frontColor: '"#407752' },
//   { value: 7.2, frontColor: "#075942" },
//   { value: 7.4, frontColor: "#0D5A50" },
//   { value: 7.7, frontColor: "#044C5A" },
//   { value: 8.0, frontColor: "#033856" },
// ];

export default function Charts() {
  const database = useDatabase(schedule);
  const window = useWindowDimensions();

  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(9);
  const [data, setData] = useState<any[]>([]);

  const listDataByMonth = () => {
    // listar todos dados por mês
  };

  useEffect(() => {
    setLoading(true);
    const days = new Date(year, month, 0).getDate();
    const pageSize = days * 3; // 3-> quantidade máxima de vezes por dia
    const orderBy = asc(schedule.date);

    database
      .list<Data>({
        select: {
          id: schedule.id,
          day: sql<string>`CAST(strftime('%d', ${schedule.date}) AS INTEGER) as day`,
          year: sql<string>`CAST(strftime('%Y', ${schedule.date}) AS INTEGER) as year`,
          month: sql<string>`CAST(strftime('%m', ${schedule.date}) AS INTEGER) as month`,
          ph: schedule.pH,
          spoons: schedule.spoons,
          date: schedule.date,
          labelWidth: 30,
        },
        page: 1,
        pageSize,
        orderBy,
        where: and(sql`month = ${month}`, sql`year = ${year}`),
      })
      .then((response) => {
        if (!response) return;

        const responseData = response.data;
        let lastDay = null;

        // const newData = Array.from({ length: days }).map((_, dayIndex) => {
        //   let items =
        //     dayIndex > 0 ? [{ label: `${dayIndex + 1}`, value: 0 }] : [];

        //   for (let item of responseData) {
        //     if (dayIndex + 1 !== item.day) {
        //       // items.push({ label: `${dayIndex + 1}`, value: 0 });
        //       continue;
        //     }

        //     let separate = false;
        //     lastDay = null;

        //     if (
        //       dayIndex < responseData.length - 1 &&
        //       responseData[dayIndex + 1].day !== item.day
        //     ) {
        //       separate = true;
        //       lastDay = item.day;
        //     }

        //     items.push({
        //       value: item.ph.toFixed(1),
        //       ...(separate ? { label: `${lastDay}` } : {}),
        //       frontColor: getColorForPH(item.ph),
        //       spacing: separate ? undefined : 2,
        //       labelTextStyle: { color: colors.text },
        //     });
        //   }

        //   return { ...items };
        // });

        // console.log(JSON.stringify(newData, null, 5));
        // setData(newData);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  if (loading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator animating color={colors.primary} />
      </View>
    );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: colors.background }}
    >
      <View
        style={{
          flex: 1,
          padding: 16,
          backgroundColor: colors.background,
        }}
      >
        <BarChart
          data={data}
          isAnimated
          color={colors.text}
          barWidth={8}
          roundedTop
          hideRules
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{ color: colors.text }}
          // noOfSections={10}

          maxValue={8}
        />
      </View>
    </ScrollView>
  );
}
