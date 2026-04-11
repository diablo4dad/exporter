import fs from 'fs';
import path from 'path';

interface MatchResult {
  searchString: string;
  bestMatch: {
    fileName: string;
    matchedText: string;
    confidence: number;
  } | null;
}

interface StoreChild {
  storeProducts: string[];
  [key: string]: any;
}

interface StoreFile {
  name: string;
  description: string;
  category: string;
  premium: boolean;
  children: StoreChild[];
}

function categorizeMatches(resultsPath: string, storeFilesDir: string) {
  // Read the results.json file
  const resultsContent = fs.readFileSync(resultsPath, 'utf8');
  const results: MatchResult[] = JSON.parse(resultsContent);

  // Define category patterns based on the existing store files
  const categoryPatterns = {
    barbarian: ['_bar_', '_Bar_', '_Barbarian_'],
    druid: ['_dru_', '_Druid_'],
    necromancer: ['_nec_'],
    rogue: ['_rog_', '_Rog_'],
    sorcerer: ['_sor_'],
    spiritborn: ['_spi_', '_Spiritborn_'],
    paladin: ['_pal_'],
    mounts: ['_HMount_stor', '_EventMount_', '_MountAmor_'],
    catMount: ['_HMount_cat_'],
    weapons: ['_Weapons_', '_MagmaticArmaments', '_StarterPack2'],
    portal: ['_TPortal_', '_TPortals_'],
    pets: ['_companion_', '_Companion_'],
  };

  // Store the categorized matches
  const categorizedMatches: { [key: string]: MatchResult[] } = {
    barbarian: [],
    druid: [],
    necromancer: [],
    rogue: [],
    sorcerer: [],
    spiritborn: [],
    paladin: [],
    mounts: [],
    catMount: [],
    weapons: [],
    portal: [],
    pets: [],
    uncategorized: [],
  };

  // Categorize each match
  for (const match of results) {
    if (!match.bestMatch) continue;

    const fileName = match.bestMatch.fileName;
    let categorized = false;

    // Check each category pattern
    for (const [category, patterns] of Object.entries(categoryPatterns)) {
      if (patterns.some((pattern) => fileName.includes(pattern))) {
        categorizedMatches[category].push(match);
        categorized = true;
        break;
      }
    }

    if (!categorized) {
      categorizedMatches.uncategorized.push(match);
    }
  }

  // Convert filename to store product path format
  function convertToStoreProductPath(fileName: string): string {
    // Extract the base name from the StringList path
    const baseName = path.basename(fileName, '.stl');
    // Remove the "StoreProduct_" prefix if present
    const cleanName = baseName.replace(/^StoreProduct_/, '');

    return `json\\\\base\\\\meta\\\\StoreProduct\\\\${cleanName}.prd.json`;
  }

  // Update each store file
  const storeFileMap = {
    barbarian: 'barbarian.ts',
    druid: 'druid.ts',
    necromancer: 'necromancer.ts',
    rogue: 'rogue.ts',
    sorcerer: 'sorcerer.ts',
    spiritborn: 'spiritborn.ts',
    paladin: 'paladin.ts',
    mounts: 'mount.ts',
    catMount: 'catMount.ts',
    weapons: 'weapon.ts',
    portal: 'portal.ts',
    pets: 'pets.ts',
  };

  for (const [category, matches] of Object.entries(categorizedMatches)) {
    if (matches.length === 0 || category === 'uncategorized') continue;

    const storeFileName = storeFileMap[category as keyof typeof storeFileMap];
    if (!storeFileName) continue;

    const storeFilePath = path.join(storeFilesDir, storeFileName);

    if (!fs.existsSync(storeFilePath)) {
      console.warn(`Store file not found: ${storeFilePath}`);
      continue;
    }

    // Read the existing store file
    let fileContent = fs.readFileSync(storeFilePath, 'utf8');

    // Find the insertion point (before the closing ];)
    const childrenEndPattern = /(\s*],\s*};)(\s*)export default/;
    const match = fileContent.match(childrenEndPattern);

    if (!match) {
      console.warn(`Could not find insertion point in ${storeFileName}`);
      continue;
    }

    // Generate the new entries
    const newEntries = matches
      .map((result) => {
        if (!result.bestMatch) return '';

        const storeProductPath = convertToStoreProductPath(result.bestMatch.fileName);

        return `    {
      // ${result.searchString}
      storeProducts: ['${storeProductPath}'],
    },`;
      })
      .join('\n');

    // Insert the new entries
    const beforeClosing = match[1];
    const afterExport = match[2] + 'export default';

    fileContent = fileContent.replace(
      childrenEndPattern,
      `${newEntries}
${beforeClosing}${afterExport}`,
    );

    // Write the updated file
    fs.writeFileSync(storeFilePath, fileContent, 'utf8');
    console.log(`Updated ${storeFileName} with ${matches.length} new entries`);
  }

  // Report uncategorized matches
  if (categorizedMatches.uncategorized.length > 0) {
    console.log('\nUncategorized matches:');
    categorizedMatches.uncategorized.forEach((match) => {
      if (match.bestMatch) {
        console.log(`- "${match.searchString}" -> ${match.bestMatch.fileName}`);
      }
    });
  }

  // Summary
  console.log('\nSummary:');
  for (const [category, matches] of Object.entries(categorizedMatches)) {
    if (matches.length > 0) {
      console.log(`${category}: ${matches.length} matches`);
    }
  }

  console.log(categorizedMatches);
}

// Usage
const resultsPath = '../../results.json';
const storeFilesDir = '../collection/definition/shop';

categorizeMatches(resultsPath, storeFilesDir);
