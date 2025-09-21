"use strict";
// TypeScript Bubble Sort Visualizer with Audio Feedback
// Constants
const ARRAY_SIZE = 50;
const ANIMATION_DELAY = 50;
const AUDIO_DURATION = 0.1;
const AUDIO_GAIN = 0.01;
const BASE_FREQUENCY = 200;
const FREQUENCY_RANGE = 500;
// Global variables
let array = [];
let audioCtx = null;
// DOM elements
const container = document.getElementById('container');
// Initialize the application
init();
/**
 * Plays a note with the given frequency using Web Audio API
 * @param freq - The frequency of the note to play
 */
function playNote(freq) {
    if (audioCtx === null) {
        audioCtx = new (AudioContext ||
            window.webkitAudioContext)();
    }
    const osc = audioCtx.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audioCtx.currentTime + AUDIO_DURATION);
    const node = audioCtx.createGain();
    node.gain.value = AUDIO_GAIN;
    node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + AUDIO_DURATION);
    osc.connect(node);
    node.connect(audioCtx.destination);
}
/**
 * Initialize the array with random values and display the bars
 */
function init() {
    array = [];
    for (let i = 0; i < ARRAY_SIZE; i++) {
        array[i] = Math.random();
    }
    showBars();
}
/**
 * Start the bubble sort animation with audio
 */
function play() {
    const copy = [...array];
    const steps = bubbleSort(copy);
    animate(steps);
}
/**
 * Animate the sorting steps with visual and audio feedback
 * @param steps - Array of sorting steps to animate
 */
function animate(steps) {
    if (steps.length === 0) {
        showBars();
        return;
    }
    const step = steps.shift();
    const [i, j] = step.indices;
    if (step.type === "swap") {
        [array[i], array[j]] = [array[j], array[i]];
    }
    // Play notes for the elements being compared/swapped
    playNote(BASE_FREQUENCY + array[i] * FREQUENCY_RANGE);
    playNote(BASE_FREQUENCY + array[j] * FREQUENCY_RANGE);
    showBars(step);
    setTimeout(() => {
        animate(steps);
    }, ANIMATION_DELAY);
}
/**
 * Performs bubble sort and returns an array of steps for animation
 * @param array - The array to sort
 * @returns Array of sorting steps
 */
function bubbleSort(array) {
    const steps = [];
    let swapped;
    do {
        swapped = false;
        for (let i = 1; i < array.length; i++) {
            // Uncomment the next line to show comparison steps
            // steps.push({indices: [i-1, i], type: "comp"});
            if (array[i - 1] > array[i]) {
                swapped = true;
                steps.push({ indices: [i - 1, i], type: "swap" });
                [array[i - 1], array[i]] = [array[i], array[i - 1]];
            }
        }
    } while (swapped);
    return steps;
}
/**
 * Displays the array as bars with optional highlighting for current step
 * @param step - Optional step to highlight in the visualization
 */
function showBars(step) {
    if (!container) {
        console.error('Container element not found');
        return;
    }
    container.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("bar");
        if (step && step.indices.includes(i)) {
            bar.style.backgroundColor = step.type === "swap" ? "red" : "yellow";
        }
        container.appendChild(bar);
    }
}
// Make functions globally available for HTML onclick handlers
window.init = init;
window.play = play;
//# sourceMappingURL=bubbleSortVisualizer.js.map