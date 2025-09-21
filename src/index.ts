// Simple Bubble Sort Visualizer - Beginner Level

// How many numbers to sort
const ARRAY_SIZE = 20;

// How fast the animation goes (milliseconds)
const DELAY = 200;

// Our array of numbers
let array: number[] = [];

// Audio context for sound
let audioCtx: AudioContext | null = null;

// Get the container where we show the bars
const container = document.getElementById('container');

// Start the app
init();

// Create random numbers and show them as bars
function init(): void {
    array = [];
    for (let i = 0; i < ARRAY_SIZE; i++) {
        array[i] = Math.random();
    }
    showBars();
}

// Play a sound for each bar (higher bars = higher pitch)
function playNote(freq: number): void {
    if (audioCtx === null) {
        audioCtx = new (AudioContext || (window as any).webkitAudioContext)();
    }
    
    const osc = audioCtx.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
    
    const node = audioCtx.createGain();
    node.gain.value = 0.01;
    node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.1);
    
    osc.connect(node);
    node.connect(audioCtx.destination);
}

// Start sorting the numbers
function play(): void {
    bubbleSort();
}

// Show the numbers as colored bars
function showBars(): void {
    if (!container) return;
    
    container.innerHTML = "";
    
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("bar");
        container.appendChild(bar);
    }
}

// The bubble sort algorithm with proper timing
function bubbleSort(): void {
    let swapped = true;
    
    function sortStep(): void {
        if (!swapped) {
            return; // Sorting is complete
        }
        
        swapped = false;
        
        function compareNext(i: number): void {
            if (i >= array.length - 1) {
                // Finished this pass, start next pass
                setTimeout(sortStep, DELAY);
                return;
            }
            
            // Show which bars we're comparing
            highlightBars(i, i + 1);
            
            // Play sound for the bars being compared
            playNote(200 + array[i] * 500);
            playNote(200 + array[i + 1] * 500);
            
            // Wait a bit, then check if we need to swap
            setTimeout(() => {
                if (array[i] > array[i + 1]) {
                    // Swap the numbers
                    let temp = array[i];
                    array[i] = array[i + 1];
                    array[i + 1] = temp;
                    swapped = true;
                    
                    // Show the swap
                    showBars();
                }
                
                // Move to next comparison
                compareNext(i + 1);
            }, DELAY);
        }
        
        compareNext(0);
    }
    
    sortStep();
}

// Highlight two bars to show we're comparing them
function highlightBars(index1: number, index2: number): void {
    if (!container) return;
    
    const bars = container.children;
    if (bars[index1] && bars[index2]) {
        (bars[index1] as HTMLElement).style.backgroundColor = "red";
        (bars[index2] as HTMLElement).style.backgroundColor = "red";
        
        setTimeout(() => {
            (bars[index1] as HTMLElement).style.backgroundColor = "#4CAF50";
            (bars[index2] as HTMLElement).style.backgroundColor = "#4CAF50";
        }, DELAY / 2);
    }
}

// Make functions available to HTML buttons
(window as any).init = init;
(window as any).play = play;
