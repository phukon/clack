import { setTimeout } from 'timers';

// Define an interface for storing word count requests for each note
interface WordCountRequest {
    noteId: string;
    wordCount: number;
    timestamp: number;
}

// Define a dictionary to store word count requests for each note
const wordCountRequests: Record<string, WordCountRequest[]> = {};

// Function to update word count in the database
function updateWordCount(noteId: string, wordCount: number) {
    // Update word count in the database for the given note ID
    // Reset word count requests for this note
    // Reset timer for this note (if applicable)
}

// Function to handle word count update requests
function handleWordCountUpdate(noteId: string, wordCount: number) {
    // Add the word count request to the dictionary
    if (!wordCountRequests[noteId]) {
        wordCountRequests[noteId] = [];
    }
    wordCountRequests[noteId].push({ noteId, wordCount, timestamp: Date.now() });
    
    // Check if the number of requests exceeds 10
    if (wordCountRequests[noteId].length >= 10) {
        const latestWordCount = wordCountRequests[noteId][wordCountRequests[noteId].length - 1].wordCount;
        updateWordCount(noteId, latestWordCount);
    } else {
        // Start or reset timer for this note
        // Timer should trigger after 10 minutes
        // When the timer expires, update the word count in the database
        // and clear the word count requests for this note
        setTimeout(() => {
            const latestWordCount = wordCountRequests[noteId][wordCountRequests[noteId].length - 1].wordCount;
            updateWordCount(noteId, latestWordCount);
            delete wordCountRequests[noteId];
        }, 10 * 60 * 1000); // 10 minutes in milliseconds
    }
}

// Function to periodically check and update word count
function checkAndUpdateWordCount() {
    setInterval(() => {
        // Iterate over notes and check their word count requests
        for (const noteId in wordCountRequests) {
            if (wordCountRequests.hasOwnProperty(noteId)) {
                if (wordCountRequests[noteId].length >= 10) {
                    const latestWordCount = wordCountRequests[noteId][wordCountRequests[noteId].length - 1].wordCount;
                    updateWordCount(noteId, latestWordCount);
                } else if (Date.now() - wordCountRequests[noteId][0].timestamp >= 10 * 60 * 1000) {
                    const latestWordCount = wordCountRequests[noteId][wordCountRequests[noteId].length - 1].wordCount;
                    updateWordCount(noteId, latestWordCount);
                    delete wordCountRequests[noteId];
                }
            }
        }
    }, 60 * 1000); // Check every minute
}

// Start a separate process to periodically check and update word count
// (if your application supports multi-threading)
checkAndUpdateWordCount();

/*
import { setTimeout } from 'timers';

// Define an interface for storing word count requests for each note
interface WordCountRequest {
    noteId: string;
    wordCount: number;
    timestamp: number;
}

// Define a dictionary to store word count requests for each note
const wordCountRequests: Record<string, WordCountRequest[]> = {};

// Function to update word count in the database
function updateWordCount(noteId: string, wordCount: number) {
    // Update word count in the database for the given note ID
    // Reset word count requests for this note
    // Reset timer for this note (if applicable)
}

// Function to handle word count update requests
function handleWordCountUpdate(noteId: string, wordCount: number) {
    // Add the word count request to the dictionary
    if (!wordCountRequests[noteId]) {
        wordCountRequests[noteId] = [];
    }
    wordCountRequests[noteId].push({ noteId, wordCount, timestamp: Date.now() });
    
    // Check if the number of requests exceeds 10
    if (wordCountRequests[noteId].length >= 10) {
        const latestWordCount = wordCountRequests[noteId][wordCountRequests[noteId].length - 1].wordCount;
        updateWordCount(noteId, latestWordCount);
    } else {
        // Start or reset timer for this note
        // Timer should trigger after 10 minutes
        // When the timer expires, update the word count in the database
        // and clear the word count requests for this note
        setTimeout(() => {
            const latestWordCount = wordCountRequests[noteId][wordCountRequests[noteId].length - 1].wordCount;
            updateWordCount(noteId, latestWordCount);
            delete wordCountRequests[noteId];
        }, 10 * 60 * 1000); // 10 minutes in milliseconds
    }
}

// Function to periodically check and update word count
function checkAndUpdateWordCount() {
    setInterval(() => {
        // Iterate over notes and check their word count requests
        for (const noteId in wordCountRequests) {
            if (wordCountRequests.hasOwnProperty(noteId)) {
                if (wordCountRequests[noteId].length >= 10) {
                    const latestWordCount = wordCountRequests[noteId][wordCountRequests[noteId].length - 1].wordCount;
                    updateWordCount(noteId, latestWordCount);
                } else if (Date.now() - wordCountRequests[noteId][0].timestamp >= 10 * 60 * 1000) {
                    const latestWordCount = wordCountRequests[noteId][wordCountRequests[noteId].length - 1].wordCount;
                    updateWordCount(noteId, latestWordCount);
                    delete wordCountRequests[noteId];
                }
            }
        }
    }, 60 * 1000); // Check every minute
}

// Start a separate process to periodically check and update word count
// (if your application supports multi-threading)
checkAndUpdateWordCount();

*/