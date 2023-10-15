export function recordAnswer(kana: string, correct: boolean) {
  const key = `analytics-v1-${kana}`;

  const value = parseInt(window.localStorage.getItem(`${key}-visible`) ?? "0");
  window.localStorage.setItem(`${key}-visible`, `${value + 1}`);

  if (correct) {
    const value = parseInt(
      window.localStorage.getItem(`${key}-correct`) ?? "0"
    );
    window.localStorage.setItem(`${key}-correct`, `${value + 1}`);
  }
}
