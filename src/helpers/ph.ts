export const getColorForPH = (pH: number): string => {
  if (pH <= 5.6) return "#EDC703";
  if (pH <= 5.9) return "#EEC654";
  if (pH <= 6.2) return "#D9BF67";
  if (pH <= 6.5) return "#BBBB71";
  if (pH <= 6.8) return "#89A56A";
  if (pH <= 7.0) return "#407752";
  if (pH <= 7.2) return "#075942";
  if (pH <= 7.4) return "#0D5A50";
  if (pH <= 7.7) return "#044C5A";

  return "#033856";
};

export const getColorAlertPh = (pH: number) => {
  if (pH < 6.2) return { color: "#EDC703", display: "Aumentar a dose" };
  if (pH > 6.8) return { color: "#e20909", display: "Atenção: diminua a dose" };

  return { color: "#fff", display: "Manter a dose" };
};
