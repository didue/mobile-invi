import JSConfetti from "js-confetti";

const EMOJIS = ["🎉", "👰🏻‍♀️", "🤵🏻‍♂️", "✨", "💛", "💜", "💞", "🌸"];
const CONFETTI_NUMBER = 50;

export function fireConfetti(emojiSize: number) {
  const confetti = new JSConfetti();
  confetti.addConfetti({
    emojis: EMOJIS,
    emojiSize,
    confettiNumber: CONFETTI_NUMBER,
  });
}
