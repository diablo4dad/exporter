import {
  D4ChallengeCategory,
  D4ChallengeDefinition,
  D4Dependencies,
  getTextFromStl,
  resolveSno,
  resolveStringsList,
  stu
} from "../../d4.js";
import {D4DadChallenge, D4DadChallengeCategory, D4DadTranslation} from "../index.js";

export function challengeToDad(deps: D4Dependencies): (definition: D4ChallengeDefinition) => [D4DadChallenge, D4DadTranslation] {
  return (definition: D4ChallengeDefinition): [D4DadChallenge, D4DadTranslation] => {
    const challengeStringsList = resolveStringsList(definition, deps.strings);

    const mapCategory = (cat: D4ChallengeCategory): D4DadChallengeCategory => {
      const name = stu(getTextFromStl(challengeStringsList, "Challenge_Category_" + cat.dwID));
      const categoryId = cat.dwID;
      const categories = cat.arCategories.map(mapCategory);
      const achievements = cat.arAchievementSnos
        .map(a => resolveSno(a, deps.achievements))
        .map(a => a?.__snoID__)
        .filter(a => a !== undefined)
        .map(Number);

      return {
        name,
        categoryId,
        categories: categories.length ? categories : undefined,
        achievements: achievements.length ? achievements : undefined,
      };
    }

    const id = definition.__snoID__;
    const filename = definition.__fileName__;
    const categories = definition.arCategories.map(mapCategory);

    return [{
      id,
      filename,
      categories,
    }, {
      // empty
    }];
  }
}
