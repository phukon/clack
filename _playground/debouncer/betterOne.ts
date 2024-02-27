import { setTimeout, clearTimeout } from 'timers';

// Define an interface for storing word count requests for each note
interface WordCountRequest {
    noteId: string;
    wordCount: number;
    timestamp: number;
}

// Define a dictionary to store word count requests for each note
const wordCountRequests: Record<string, WordCountRequest> = {};

// Define a dictionary to store timers for each note
const timers: Record<string, NodeJS.Timeout> = {};

// Function to update word count in the database
function updateWordCount(noteId: string, wordCount: number) {
    // Update word count in the database for the given note ID
    // Reset timer for this note
    // Clear word count request for this note
    clearTimeout(timers[noteId]);
    // Update word count in database here
    console.log(`Updating word count for note ${noteId} to ${wordCount}`);
    delete wordCountRequests[noteId];
}

// Function to handle word count update requests
function handleWordCountUpdate(noteId: string, wordCount: number) {
    // Add or update the word count request
    wordCountRequests[noteId] = { noteId, wordCount, timestamp: Date.now() };

    // Clear any previous timer
    clearTimeout(timers[noteId]);

    // Start a new timer
    timers[noteId] = setTimeout(() => {
        if (wordCountRequests[noteId]) {
            const latestWordCount = wordCountRequests[noteId].wordCount;
            updateWordCount(noteId, latestWordCount);
        }
    }, 10 * 60 * 1000); // 10 minutes
}

// Test scenario
handleWordCountUpdate('note1', 100);
handleWordCountUpdate('note1', 200);
handleWordCountUpdate('note1', 300); // This will replace the previous requests

// Simulate passage of time
setTimeout(() => {
    // 10 minutes later
    handleWordCountUpdate('note1', 400); // This should update the word count to 400 and clear the previous requests
}, 10 * 60 * 1000);
