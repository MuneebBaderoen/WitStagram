import React from "react";
import { YellowBox } from "react-native";
import { RootComponent } from "./src/RootComponent";

YellowBox.ignoreWarnings(["Remote debugger"]);

export default () => <RootComponent />;
