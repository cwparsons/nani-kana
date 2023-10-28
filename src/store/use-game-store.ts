import { defineStore } from "pinia";

type GameScreens = "Splash" | "Question" | "Options" | "Statistics";

type GameStore = {
  screen: GameScreens;
  numberOfAnswers: number;
  questionSelection: "random" | "least-correct";

  // Hiragana
  hiraganaMonographsEnabled: boolean;
  hiraganaMonographsWithDiacriticsEnabled: boolean;
  hiraganaWithDigraphsEnabled: boolean;

  // Katakana
  katakanaMonographsEnabled: boolean;
  katakanaMonographsWithDiacriticsEnabled: boolean;
  katakanaWithDigraphsEnabled: boolean;
};

export const GAME_STORE_KEY = "gamestore";

const previousStore: GameStore = JSON.parse(
  localStorage.getItem(GAME_STORE_KEY) ?? "{}"
);

const getDefaultStore: () => GameStore = () => ({
  screen: "Splash" as GameScreens,
  numberOfAnswers: 8,
  questionSelection: "random",
  hiraganaMonographsEnabled: true,
  hiraganaMonographsWithDiacriticsEnabled: false,
  hiraganaWithDigraphsEnabled: false,
  katakanaMonographsEnabled: false,
  katakanaMonographsWithDiacriticsEnabled: false,
  katakanaWithDigraphsEnabled: false,
});

export const useGameStore = defineStore("game", {
  state: () => {
    return {
      ...getDefaultStore(),
      ...previousStore,
    };
  },
});
