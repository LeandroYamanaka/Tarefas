import { AppRegistry } from "react-native";
import index from "./components/index.js";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => index);