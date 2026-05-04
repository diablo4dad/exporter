import fs from 'fs';
import path from 'path';

interface StringEntry {
  szLabel: string;
  szText: string;
}

interface StoreProductFile {
  __fileName__: string;
  arStrings: StringEntry[];
}

function calculateSimilarity(searchString: string, targetString: string): number {
  const search = searchString.toLowerCase().trim();
  const target = targetString.toLowerCase().trim();

  // Early exact match check
  if (search === target) return 1.0;

  // High priority matches
  if (target.includes(search)) return 0.95;
  if (search.includes(target)) return 0.9;
  if (target.startsWith(search)) return 0.85;
  if (target.endsWith(search)) return 0.8;

  // Word-based matching with higher weight
  const wordScore = calculateWordBasedSimilarity(search, target);
  if (wordScore > 0.7) return wordScore;

  // Subsequence matching (characters in order but not consecutive)
  const subsequenceScore = calculateSubsequenceSimilarity(search, target);

  // Levenshtein with normalization improvements
  const levenshteinScore = calculateImprovedLevenshtein(search, target);

  // N-gram similarity
  const ngramScore = calculateNgramSimilarity(search, target, 2);

  // Return the best score from all methods
  return Math.max(wordScore, subsequenceScore, levenshteinScore, ngramScore);
}

function calculateWordBasedSimilarity(search: string, target: string): number {
  const searchWords = search.split(/\s+/).filter((w) => w.length > 1);
  const targetWords = target.split(/\s+/).filter((w) => w.length > 1);

  if (searchWords.length === 0 || targetWords.length === 0) return 0;

  let totalScore = 0;
  let maxPossibleScore = 0;

  for (const searchWord of searchWords) {
    let bestWordScore = 0;

    for (const targetWord of targetWords) {
      let wordScore = 0;

      if (searchWord === targetWord) {
        wordScore = 1.0;
      } else if (targetWord.includes(searchWord)) {
        wordScore = 0.9;
      } else if (searchWord.includes(targetWord)) {
        wordScore = 0.85;
      } else if (targetWord.startsWith(searchWord) || searchWord.startsWith(targetWord)) {
        wordScore = 0.8;
      } else {
        // Use character-level similarity for partial matches
        const charSim = calculateCharacterSimilarity(searchWord, targetWord);
        if (charSim > 0.6) {
          wordScore = charSim * 0.7;
        }
      }

      bestWordScore = Math.max(bestWordScore, wordScore);
    }

    totalScore += bestWordScore;
    maxPossibleScore += 1;
  }

  // Bonus for matching more words proportionally
  const wordMatchRatio = totalScore / maxPossibleScore;
  const lengthPenalty =
    Math.min(searchWords.length, targetWords.length) / Math.max(searchWords.length, targetWords.length);

  return wordMatchRatio * lengthPenalty;
}

function calculateSubsequenceSimilarity(search: string, target: string): number {
  let i = 0; // pointer for search string
  let j = 0; // pointer for target string
  let matches = 0;

  while (i < search.length && j < target.length) {
    if (search[i] === target[j]) {
      matches++;
      i++;
    }
    j++;
  }

  if (matches === 0) return 0;

  const ratio = matches / search.length;
  const positionPenalty = 1 - (Math.abs(search.length - target.length) / Math.max(search.length, target.length)) * 0.3;

  return ratio * positionPenalty * 0.8; // Cap at 0.8 since it's not exact matching
}

function calculateImprovedLevenshtein(str1: string, str2: string): number {
  // Don't process very different length strings
  const lengthDiff = Math.abs(str1.length - str2.length);
  const maxLength = Math.max(str1.length, str2.length);

  if (lengthDiff > maxLength * 0.7) return 0;

  const distance = levenshteinDistance(str1, str2);
  const similarity = 1 - distance / maxLength;

  // Apply bonus for similar lengths
  const lengthSimilarity = 1 - lengthDiff / maxLength;

  return similarity * (0.7 + 0.3 * lengthSimilarity);
}

function calculateCharacterSimilarity(str1: string, str2: string): number {
  const set1 = new Set(str1.toLowerCase());
  const set2 = new Set(str2.toLowerCase());

  const intersection = new Set([...set1].filter((char) => set2.has(char)));
  const union = new Set([...set1, ...set2]);

  return intersection.size / union.size;
}

function calculateNgramSimilarity(str1: string, str2: string, n: number): number {
  const ngrams1 = generateNgrams(str1, n);
  const ngrams2 = generateNgrams(str2, n);

  if (ngrams1.length === 0 || ngrams2.length === 0) return 0;

  const set1 = new Set(ngrams1);
  const set2 = new Set(ngrams2);

  const intersection = new Set([...set1].filter((ngram) => set2.has(ngram)));

  return intersection.size / Math.max(set1.size, set2.size);
}

function generateNgrams(str: string, n: number): string[] {
  const ngrams: string[] = [];
  for (let i = 0; i <= str.length - n; i++) {
    ngrams.push(str.substr(i, n));
  }
  return ngrams;
}

// Enhanced matching function that also returns top candidates
function findBestMatches(searchStrings: string[], dataDir: string) {
  const results: Array<{
    searchString: string;
    bestMatch: {
      fileName: string;
      matchedText: string;
      confidence: number;
    } | null;
    topCandidates?: Array<{
      fileName: string;
      matchedText: string;
      confidence: number;
    }>;
  }> = [];

  // Read all StoreProduct_ files
  const files = fs.readdirSync(dataDir).filter((file) => file.startsWith('StoreProduct_') && file.endsWith('.json'));

  const storeProducts: Array<{ fileName: string; name: string }> = [];

  // Extract names from files
  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
      const data: StoreProductFile = JSON.parse(content);

      const nameEntry = data.arStrings?.find((entry) => entry.szLabel === 'Name');
      if (nameEntry) {
        storeProducts.push({
          fileName: data.__fileName__,
          name: nameEntry.szText,
        });
      }
    } catch (error) {
      console.error(`Error reading ${file}:`, error);
    }
  }

  // Find best matches for each search string
  for (const searchString of searchStrings) {
    const candidates: Array<{
      fileName: string;
      matchedText: string;
      confidence: number;
    }> = [];

    for (const product of storeProducts) {
      const score = calculateSimilarity(searchString, product.name);
      if (score > 0.2) {
        // Lower threshold for candidates
        candidates.push({
          fileName: product.fileName,
          matchedText: product.name,
          confidence: score,
        });
      }
    }

    // Sort candidates by confidence
    candidates.sort((a, b) => b.confidence - a.confidence);

    const bestMatch = candidates.length > 0 && candidates[0].confidence > 0.4 ? candidates[0] : null;

    results.push({
      searchString,
      bestMatch,
      topCandidates: candidates.slice(0, 5), // Include top 5 for debugging
    });
  }

  return results;
}

function displayMatchesTables(
  results: Array<{
    searchString: string;
    bestMatch: {
      fileName: string;
      matchedText: string;
      confidence: number;
    } | null;
  }>,
) {
  // Separate matches by confidence level
  const highConfidenceMatches = results.filter((result) => result.bestMatch && result.bestMatch.confidence >= 0.94);

  const lowerConfidenceMatches = results.filter((result) => result.bestMatch && result.bestMatch.confidence < 0.94);

  // Function to create a formatted table
  function createTable(data: typeof highConfidenceMatches, title: string) {
    if (data.length === 0) {
      console.log(`\n${title}: No matches found`);
      return;
    }

    console.log(`\n${title} (${data.length} matches):`);
    console.log('═'.repeat(150));

    // Table headers
    const headers = ['Search String', 'Confidence', 'Matched Text', 'File Name'];
    const colWidths = [40, 10, 40, 60];

    // Print header
    let headerRow = '│';
    headers.forEach((header, i) => {
      headerRow += ` ${header.padEnd(colWidths[i])} │`;
    });
    console.log(headerRow);
    console.log('├' + colWidths.map((width) => '─'.repeat(width + 2)).join('┼') + '┤');

    // Print data rows
    data.forEach((result) => {
      if (!result.bestMatch) return;

      const row = [
        truncateString(result.searchString, colWidths[0]),
        (result.bestMatch.confidence * 100).toFixed(1) + '%',
        truncateString(result.bestMatch.matchedText, colWidths[2]),
        truncateString(path.basename(result.bestMatch.fileName), colWidths[3]),
      ];

      let dataRow = '│';
      row.forEach((cell, i) => {
        dataRow += ` ${cell.padEnd(colWidths[i])} │`;
      });
      console.log(dataRow);
    });

    console.log('└' + colWidths.map((width) => '─'.repeat(width + 2)).join('┴') + '┘');
  }

  // Helper function to truncate strings that are too long
  function truncateString(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength - 3) + '...';
  }

  // Display both tables
  createTable(highConfidenceMatches, 'HIGH CONFIDENCE MATCHES (≥ 90%)');
  createTable(lowerConfidenceMatches, 'LOWER CONFIDENCE MATCHES (< 90%)');

  // Summary
  console.log(`\n📊 SUMMARY:`);
  console.log(`Total search strings: ${results.length}`);
  console.log(`High confidence matches (≥90%): ${highConfidenceMatches.length}`);
  console.log(`Lower confidence matches (<90%): ${lowerConfidenceMatches.length}`);
  console.log(`No matches found: ${results.filter((r) => !r.bestMatch).length}`);
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator, // substitution
      );
    }
  }

  return matrix[str2.length][str1.length];
}

const todo = [
  // demonic goods
  "Xazax's Razor", // (axe​stor052.itm)
  "Astrogha's Spindle", // (wand​stor045.itm)
  "Rakanoth's Toothpickz", // (twoHandSword​stor059.itm)
  "Maluus' Tenderizer", // (mace​stor061.itm)
  "Kabraxis' Skewer", // (twoHandQuarterstaff_​stor023.itm)

  // doom armors
  'PRAETOR OF THARSIS (BARB)',
  'PRAETOR OF EREBUS (DRUID)',
  'PRAETOR OF HECATES (NECRO)',
  'PRAETOR OF PAVONIS (PALADIN)',
  'PRAETOR OF ARGYRE (ROGUE)',
  'PRAETOR OF MARINERIS (SPIRITBORN)',
  'PRAETOR OF AEOLIS (SORCERER)',
];

const results = findBestMatches(todo, 'C:\\Users\\Sam\\Documents\\d4data\\json\\enUS_Text\\meta\\StringList');

fs.writeFileSync('../../results.json', JSON.stringify(results));

// Display the tables instead of JSON output
displayMatchesTables(results);
