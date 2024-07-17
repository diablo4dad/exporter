import {CollectionReq, D4Dependencies} from "../common.js";
import {D4ChallengeCategory, D4ChallengeDefinition, getTextFromStl, resolveStringsList} from "../../d4.js";

export function challengeFactory(deps: D4Dependencies): (definition: D4ChallengeDefinition, category: D4ChallengeCategory, delta: number) => CollectionReq {
  return (definition: D4ChallengeDefinition, category: D4ChallengeCategory, delta = 0): CollectionReq => {
    const challengeStringsList = resolveStringsList(definition, deps.strings);

    const challengeId = category.dwID;
    const categoryName = "Challenge";
    const name = getTextFromStl(challengeStringsList, "Challenge_Category_" + category.dwID);
    const description = "";
    const collectionItems: number[] = [];
    const order = 6000 + delta;
    const platinum = 0;

    return {
      name,
      description,
      category: categoryName,
      collectionItems,
      itemId: challengeId,
      order,
      platinum,
    }
  }
}
