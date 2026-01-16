// Test the exact scenario
import { calculateFeedback } from './core/FeedbackCalculator.ts';

console.log("=== Testing FeedbackCalculator ===");
console.log("");

const targetWord = "HOME";
const guess = "HOME";

console.log("Input guess:", guess);
console.log("Target word:", targetWord);
console.log("");

const feedback = calculateFeedback(guess, targetWord);

console.log("Feedback array:", JSON.stringify(feedback, null, 2));
console.log("");

const letters = feedback.map(f => f.letter);
console.log("Letters from feedback:", letters);
console.log("Expected: H,O,M,E");
console.log("Match:", JSON.stringify(letters) === JSON.stringify(['H','O','M','E']));
