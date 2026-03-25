export const levenshteinDistance = (str1: string, str2: string) => {
  const len1 = str1.length;
  const len2 = str2.length;

  const matrix = Array(len1 + 1);
  for (let i = 0; i <= len1; i++) {
    matrix[i] = Array(len2 + 1);
  }

  for (let i = 0; i <= len1; i++) {
    matrix[i][0] = i;
  }

  for (let i = 0; i <= len2; i++) {
    matrix[0][i] = i;
  }

  for (let i = 0; i <= len1; i++) {
    for (let j = 0; j <= len2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + 1
        );
      }
    }
  }

  return matrix[len1][len2];
};
