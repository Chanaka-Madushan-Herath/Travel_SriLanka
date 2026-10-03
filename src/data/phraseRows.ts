import { labelPhrases } from "./labelPhrases";
import { placePhrases } from "./placePhrases";
import type { PhraseRow } from "./phraseTypes";
import { tripPhrases } from "./tripPhrases";

export const phraseRows: Record<string, PhraseRow> = {
  ...labelPhrases,
  ...placePhrases,
  ...tripPhrases,
};
