import { D4Achievement, D4ChallengeCategory, D4ChallengeDefinition } from '../../d4data/struct.js';
import { D4DadChallenge, D4DadChallengeCategory, D4DadCollection, D4DadTranslation } from '../index.js';
import { achievementToCollectionItems } from './achievements.js';
import { resolveSno, resolveStringsList } from '../../d4data/resolver.js';
import { getTextFromStl } from '../../d4reader/strings.js';
import { stu } from '../../helper.js';
import { D4Dependencies } from '../../d4reader/struct.js';

export function challengeToCollection(deps: D4Dependencies) {
  return (definition: D4ChallengeDefinition) => {
    return (category: D4ChallengeCategory): D4DadCollection => {
      const challengeStringsList = resolveStringsList(definition, deps.strings);
      const name = getTextFromStl(challengeStringsList, 'Challenge_Category_' + category.dwID);
      const achievements = category.arAchievementSnos
        .map((a) => resolveSno(a, deps.achievements))
        .filter((a): a is D4Achievement => a !== undefined);

      return {
        id: category.dwID,
        name: name,
        subcollections: category.arCategories.map(challengeToCollection(deps)(definition)),
        collectionItems: achievements
          .map(achievementToCollectionItems(deps))
          .flat()
          .filter((ci) => ci.items.length),
      };
    };
  };
}

export function challengeToDad(
  deps: D4Dependencies,
): (definition: D4ChallengeDefinition) => [D4DadChallenge, D4DadTranslation] {
  return (definition: D4ChallengeDefinition): [D4DadChallenge, D4DadTranslation] => {
    const challengeStringsList = resolveStringsList(definition, deps.strings);

    const mapCategory = (cat: D4ChallengeCategory): D4DadChallengeCategory => {
      const name = stu(getTextFromStl(challengeStringsList, 'Challenge_Category_' + cat.dwID));
      const categoryId = cat.dwID;
      const categories = cat.arCategories.map(mapCategory);
      const achievements = cat.arAchievementSnos
        .map((a) => resolveSno(a, deps.achievements))
        .map((a) => a?.__snoID__)
        .filter((a) => a !== undefined)
        .map(Number);

      return {
        name,
        categoryId,
        categories: categories.length ? categories : undefined,
        achievements: achievements.length ? achievements : undefined,
      };
    };

    const id = definition.__snoID__;
    const filename = definition.__fileName__;
    const categories = definition.arCategories.map(mapCategory);

    return [
      {
        id,
        filename,
        categories,
      },
      {
        // empty
      },
    ];
  };
}
