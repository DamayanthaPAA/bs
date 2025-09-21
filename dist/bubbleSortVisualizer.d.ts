declare const ARRAY_SIZE: number;
declare const ANIMATION_DELAY: number;
declare const AUDIO_DURATION: number;
declare const AUDIO_GAIN: number;
declare const BASE_FREQUENCY: number;
declare const FREQUENCY_RANGE: number;
declare let array: number[];
declare let audioCtx: AudioContext | null;
declare const container: HTMLElement | null;
interface SortStep {
    indices: [number, number];
    type: 'swap' | 'comp';
}
interface WebkitAudioContext extends AudioContext {
}
/**
 * Plays a note with the given frequency using Web Audio API
 * @param freq - The frequency of the note to play
 */
declare function playNote(freq: number): void;
/**
 * Initialize the array with random values and display the bars
 */
declare function init(): void;
/**
 * Start the bubble sort animation with audio
 */
declare function play(): void;
/**
 * Animate the sorting steps with visual and audio feedback
 * @param steps - Array of sorting steps to animate
 */
declare function animate(steps: SortStep[]): void;
/**
 * Performs bubble sort and returns an array of steps for animation
 * @param array - The array to sort
 * @returns Array of sorting steps
 */
declare function bubbleSort(array: number[]): SortStep[];
/**
 * Displays the array as bars with optional highlighting for current step
 * @param step - Optional step to highlight in the visualization
 */
declare function showBars(step?: SortStep): void;
