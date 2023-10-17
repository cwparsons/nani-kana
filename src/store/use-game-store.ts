import { defineStore } from "pinia";

type GameScreens = "Splash" | "Question" | "Options" | "Statistics";

type GameStore = {
  screen: GameScreens;
  numberOfAnswers: number;
  questionSelection: "random" | "least-correct";
};

export const GAME_STORE_KEY = "gamestore";

const previousStore: GameStore = JSON.parse(
  localStorage.getItem(GAME_STORE_KEY) ?? "{}"
);

const getDefaultStore: () => GameStore = () => ({
  screen: "Splash" as GameScreens,
  numberOfAnswers: 8,
  questionSelection: "random",
});

export const useGameStore = defineStore("game", {
  state: () => {
    return {
      ...getDefaultStore(),
      ...previousStore,
    };
  },
});
