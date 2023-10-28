import { useGameStore } from "../store/use-game-store";
import {
  HIRAGANA_DIACRITICS,
  HIRAGANA_DIGRAPHS,
  HIRAGANA_MONOGRAPHS,
  KATAKANA_DIACRITICS,
  KATAKANA_DIGRAPHS,
  KATAKANA_MONOGRAPHS,
} from "./constants";

export const getAllCharacters = () => {
  const gameStore = useGameStore();

  let characters: { [k: string]: string } = {};

  if (gameStore.hiraganaMonographsEnabled) {
    characters = { ...characters, ...HIRAGANA_MONOGRAPHS };
  }

  if (gameStore.hiraganaMonographsWithDiacriticsEnabled) {
    characters = { ...characters, ...HIRAGANA_DIACRITICS };
  }

  if (gameStore.hiraganaWithDigraphsEnabled) {
    characters = { ...characters, ...HIRAGANA_DIGRAPHS };
  }

  if (gameStore.katakanaMonographsEnabled) {
    characters = { ...characters, ...KATAKANA_MONOGRAPHS };
  }

  if (gameStore.katakanaMonographsWithDiacriticsEnabled) {
    characters = { ...characters, ...KATAKANA_DIACRITICS };
  }

  if (gameStore.katakanaWithDigraphsEnabled) {
    characters = { ...characters, ...KATAKANA_DIGRAPHS };
  }

  return characters;
};
