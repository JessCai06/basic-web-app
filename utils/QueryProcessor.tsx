// utils/QueryProcessor.tsx
export default function QueryProcessor(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (q.includes("name")) {
    return "jess06";
  }
  if (q.includes("plus")) {
    // Find two numbers around the word 'plus'. The prompt guarantees two-digit numbers.
    // We'll extract all numbers from the query and if there are at least two, add the first two.
    const nums = Array.from(q.matchAll(/\d+/g)).map((m) => parseInt(m[0], 10));
    if (nums.length >= 2) {
      return String(nums[0] + nums[1]);
    }
    // Fallback: try to parse digits immediately surrounding the word 'plus'
    const idx = q.indexOf("plus");
    const left = q.slice(Math.max(0, idx - 5), idx).match(/\d+/);
    const right = q.slice(idx + 4, idx + 9).match(/\d+/);
    if (left && right) {
      return String(parseInt(left[0], 10) + parseInt(right[0], 10));
    }
    return "";
  }

  // Handle queries asking for the largest of a list of numbers
  if (
    q.includes("largest") ||
    q.includes("which of the following numbers is the largest") ||
    q.includes("which of the following is the largest")
  ) {
    const nums = Array.from(q.matchAll(/\d+/g)).map((m) => parseInt(m[0], 10));
    if (nums.length === 0) return "";
    const max = nums.reduce((a, b) => (a > b ? a : b), nums[0]);
    return String(max);
  }

  return "";
}
//Which of the following numbers is the largest: 16, 67, 45?
//	What is 56 plus 2?
