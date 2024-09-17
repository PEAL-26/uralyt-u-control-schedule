const packageJSON = require("./package.json");
export default () => {
  const version = packageJSON.version;

  const name =
    process.env.APP_ENV === "production"
      ? "Uralyt-U Control App"
      : "Uralyt-U Control App (DEV)";
  const bundleIdentifier =
    process.env.APP_ENV === "production"
      ? "com.peal26.uralytucontrolapp"
      : "com.peal26.uralytucontrolapp-dev";

  return {
    expo: {
      name,
      slug: "uralyt-u-control-app",
      scheme: "uralyt-u-control-app",
      version,
      orientation: "portrait",
      icon: "./assets/icon.png",
      userInterfaceStyle: "dark",
      splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#111827",
      },
      ios: {
        supportsTablet: true,
        bundleIdentifier,
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#ffffff",
        },
        package: "com.peal26.uralytucontrolapp",
      },
      web: {
        favicon: "./assets/favicon.png",
      },
      plugins: ["expo-router"],
      extra: {
        eas: {
          projectId: "acdd5d39-6b6f-4831-8322-58c81c538dd9",
        },
      },
      owner: "peal26",
      runtimeVersion: {
        policy: "appVersion",
      },
      updates: {
        url: "https://u.expo.dev/acdd5d39-6b6f-4831-8322-58c81c538dd9",
      },
    },
  };
};
