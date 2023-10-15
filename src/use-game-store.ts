import { defineStore } from "pinia";

type GameScreens = "Splash" | "Question" | "Options" | "Statistics";

const getDefaultStore = () => ({
  screen: "Splash" as GameScreens,
  numberOfAnswers: 8,
});

export const useGameStore = defineStore("game", {
  state: () => {
    return getDefaultStore();
  },
});
