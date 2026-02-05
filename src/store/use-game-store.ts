import { defineStore } from "pinia";

type GameScreens = "Splash" | "Question" | "Options" | "Statistics";

type GameStore = {
  screen: GameScreens;
  numberOfAnswers: number;
  questionSelection: "random" | "least-correct" | "sequential";
  /** Characters not yet shown this cycle; when empty we reshuffle and start over. */
  sequentialRemainingCharacters: string[];

  // Quiz direction (at least one should be true; both = random per question)
  kanaToRomajiEnabled: boolean;
  romajiToKanaEnabled: boolean;

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

const DEFAULT_STORE: GameStore = {
  screen: "Splash",
  numberOfAnswers: 8,
  questionSelection: "random",
  sequentialRemainingCharacters: [],
  kanaToRomajiEnabled: true,
  romajiToKanaEnabled: false,
  hiraganaMonographsEnabled: true,
  hiraganaMonographsWithDiacriticsEnabled: false,
  hiraganaWithDigraphsEnabled: false,
  katakanaMonographsEnabled: false,
  katakanaMonographsWithDiacriticsEnabled: false,
  katakanaWithDigraphsEnabled: false,
};

const SCREENS: GameScreens[] = ["Splash", "Question", "Options", "Statistics"];

function loadStore(): Partial<GameStore> {
  try {
    const raw = localStorage.getItem(GAME_STORE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return {
      ...(SCREENS.includes(parsed.screen as GameScreens)
        ? { screen: parsed.screen as GameScreens }
        : {}),
      ...(typeof parsed.numberOfAnswers === "number" &&
      parsed.numberOfAnswers >= 2 &&
      parsed.numberOfAnswers <= 12
        ? { numberOfAnswers: parsed.numberOfAnswers }
        : {}),
      ...(parsed.questionSelection === "random" ||
      parsed.questionSelection === "least-correct" ||
      parsed.questionSelection === "sequential"
        ? { questionSelection: parsed.questionSelection }
        : {}),
      ...(Array.isArray(parsed.sequentialRemainingCharacters) &&
      parsed.sequentialRemainingCharacters.every((x: unknown) => typeof x === "string")
        ? { sequentialRemainingCharacters: parsed.sequentialRemainingCharacters as string[] }
        : {}),
      ...(typeof parsed.kanaToRomajiEnabled === "boolean" && {
        kanaToRomajiEnabled: parsed.kanaToRomajiEnabled,
      }),
      ...(typeof parsed.romajiToKanaEnabled === "boolean" && {
        romajiToKanaEnabled: parsed.romajiToKanaEnabled,
      }),
      ...(typeof parsed.hiraganaMonographsEnabled === "boolean" && {
        hiraganaMonographsEnabled: parsed.hiraganaMonographsEnabled,
      }),
      ...(typeof parsed.hiraganaMonographsWithDiacriticsEnabled ===
        "boolean" && {
        hiraganaMonographsWithDiacriticsEnabled:
          parsed.hiraganaMonographsWithDiacriticsEnabled,
      }),
      ...(typeof parsed.hiraganaWithDigraphsEnabled === "boolean" && {
        hiraganaWithDigraphsEnabled: parsed.hiraganaWithDigraphsEnabled,
      }),
      ...(typeof parsed.katakanaMonographsEnabled === "boolean" && {
        katakanaMonographsEnabled: parsed.katakanaMonographsEnabled,
      }),
      ...(typeof parsed.katakanaMonographsWithDiacriticsEnabled ===
        "boolean" && {
        katakanaMonographsWithDiacriticsEnabled:
          parsed.katakanaMonographsWithDiacriticsEnabled,
      }),
      ...(typeof parsed.katakanaWithDigraphsEnabled === "boolean" && {
        katakanaWithDigraphsEnabled: parsed.katakanaWithDigraphsEnabled,
      }),
    };
  } catch {
    return {};
  }
}

export const useGameStore = defineStore("game", {
  state: () => ({ ...DEFAULT_STORE, ...loadStore() }),
});
