

// Attach event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', attachEventListeners);

// Event listner for generate  button
document.getElementById('generate').onclick = () => {

  console.log("Generate")
  generateMessageSignal();

};

// Event listner for generate  button
document.getElementById('generateCarrier').onclick = () => {

  console.log("Generate Carrier")
  generateCarrierSignal();

};

// Event listner for generate  button
document.getElementById('simulateask').onclick = () => {

  console.log("Simulate ASK")
  simulateASK();

};

// Event listner for generate  button
document.getElementById('demodulateASK').onclick = () => {

  console.log("Demodulate ASK")
  demodulateASK();

};





let messageSignal = null;
let f = null;
let m = null;
let fs = null;
let t2 = null; // Define t2 here to make it accessible globally
let bp = null; // Define bp here to make it accessible globally
let bitRate = null; // Define bitRate here


function generateMessageSignal() {
    const num_bits = parseInt(document.getElementById("num_bits").value);
    fs = parseInt(document.getElementById("sampling_frequency").value);
    bitRate = parseInt(document.getElementById("bit_rate").value);

    // Calculate the time period for each bit
    bp = 1 / bitRate;

    messageSignal = [];
    for (let i = 0; i < num_bits; i++) {
        messageSignal.push(Math.round(Math.random()));
    }
    console.log("Message Signal:", messageSignal);
    plotOriginalMessage(messageSignal, fs);
}

function checkFrequencies() {
    // Get values from input fields
    let carrierFrequency = parseFloat(document.getElementById('carrier_frequency').value);
    let bit_rate = parseFloat(document.getElementById('bit_rate').value);

    // Check the frequencies
    if (carrierFrequency <= bit_rate) {
        alert("Carrier frequency should be much higher than bit rate.");
        window.location.reload(true);
    } else {
        console.log("Carrier frequency should be much high than bit rate.");
    }
}

// Function to attach event listeners to all buttons
function attachEventListeners() {
    let buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', checkFrequencies);
    });
}





function plotOriginalMessage(messageSignal, fs) {
    const bit = [];
    for (let n = 0; n < messageSignal.length; n++) {
        if (messageSignal[n] === 1) {
            bit.push(Array(fs).fill(1));
        } else {
            bit.push(Array(fs).fill(0));
        }
    }
    const t1 = [];
    for (let i = 1; i <= fs * messageSignal.length; i++) {
        t1.push((i * bp) / fs);
    }

    const data = [
        {
            x: t1,
            y: bit.flat(),
            type: "scatter",
            mode: "lines",
            name: "Original Message Signal",
            line: { color: "red" },
        },
    ];

    const annotations = messageSignal.map((bit, index) => ({
        x: (index + 0.5) * bp, // Center the annotation in the bit interval
        y: 1.1, // Position the text above the line
        text: bit.toString(),
        showarrow: false,
        font: { color: "black" },
    }));

    Plotly.newPlot("plot", data, {
        title: "Binary Information at Transmitter",
        annotations: annotations,
        xaxis: { title: "Time (s)" },
        yaxis: { title: "Amplitude", range: [-0.2, 1.2] },
    });
}

function simulateASK() {
    if (!messageSignal) {
        console.error("Message signal is not generated yet.");
        return;
    }
    superimposed();
    fs = parseInt(document.getElementById("sampling_frequency").value);
    f = parseFloat(document.getElementById("carrier_frequency").value);

    console.log("Binary information at Transmitter:");
    console.log(messageSignal);

    const bit = [];
    for (let n = 0; n < messageSignal.length; n++) {
        if (messageSignal[n] === 1) {
            bit.push(Array(fs).fill(1));
        } else {
            bit.push(Array(fs).fill(0));
        }
    }
    const t1 = [];
    for (let i = 1; i <= fs * messageSignal.length; i++) {
        t1.push((i * bp) / fs);
    }

    const A1 = 1; // Amplitude of carrier signal for information 1
    const A2 = 0; // Amplitude of carrier signal for information 0
    t2 = []; // Define t2 here
    for (let i = 1; i <= fs; i++) {
        t2.push((i * bp) / (fs - 1));
    }
    m = [];
    for (let i = 0; i < messageSignal.length; i++) {
        // Declare t and calculate it
        const t = Array.from({ length: fs }, (_, k) => k / fs);
        const y =
            messageSignal[i] === 1
                ? Array.from(t2, (t2) => A1 * Math.cos(2 * Math.PI * f * t2))
                : Array.from(t2, (t2) => A2 * Math.cos(2 * Math.PI * f * t2));
        m.push(y);
    }
    const modulatedData = [
        {
            x: t1,
            y: m.flat(),
            type: "scatter",
            mode: "lines",
            name: "ASK Modulated Signal",
            line: { color: "blue" },
        },
    ];

    Plotly.newPlot("modulated-plot", modulatedData, {
        title: "ASK Modulated Signal",
    });

    saveData();
}

let isCarrierGenerated = false; // Track if carrier is generated

function generateCarrierSignal() {


    const fc = parseInt(document.getElementById("carrier_frequency").value); // Carrier frequency
    const fs = parseInt(document.getElementById("sampling_frequency").value); // Sampling frequency
    const num_bits = parseInt(document.getElementById("num_bits").value); // Number of bits in message signal
    const bitRate = parseInt(document.getElementById("bit_rate").value); // Bit rate of message signal

    // Message signal duration (in seconds)
    const messageSignalDuration = num_bits / bitRate;

    const carrierAmplitude = 1; // Amplitude of the carrier signal
    const t = []; // Time array for plotting
    const carrier = []; // Carrier signal array

    // Calculate the number of samples based on message signal duration
    const numSamples = fs * messageSignalDuration;

    // Generate the carrier signal samples
    for (let i = 0; i < numSamples; i++) {
        const time = i / fs; // Time for each sample (in seconds)
        t.push(time);
        carrier.push(carrierAmplitude * Math.cos(2 * Math.PI * fc * time)); // Carrier signal equation
    }

    // Plot the carrier signal using Plotly
    const carrierData = [
        {
            x: t,
            y: carrier,
            type: "scatter",
            mode: "lines",
            name: "Carrier Signal",
            line: { color: "green" },
        },
    ];

    Plotly.newPlot("carrier-plot", carrierData, {
        title: "Carrier Signal",
    });

    isCarrierGenerated = true; // Set flag to true after carrier is generated
}



function lowPassFilter(signal, cutoffFreq, fs) {
    const RC = 1.0 / (2 * Math.PI * cutoffFreq);
    const dt = 1.0 / fs;
    const alpha = dt / (RC + dt);

    let filtered = [];
    filtered[0] = signal[0]; // initialize
    for (let i = 1; i < signal.length; i++) {
        filtered[i] = filtered[i - 1] + alpha * (signal[i] - filtered[i - 1]);
    }
    return filtered;
}
function demodulateASK() {
    if (!messageSignal) {
        console.error("Message signal is not generated yet.");
        return;
    }

    const fc = parseInt(document.getElementById("carrier_frequency").value);
    const bitRate = parseInt(document.getElementById("bit_rate").value);
    const bitDuration = 1 / bitRate;
    const numSamples = Math.floor(fs);
    const t = Array.from({ length: numSamples }, (_, i) => i / fs);

    const carrier = t.map((time) => Math.cos(2 * Math.PI * fc * time));
    let modulated_signal = [];

    for (const bit of messageSignal) {
        if (bit === 1) {
            modulated_signal = modulated_signal.concat(carrier);
        } else {
            modulated_signal = modulated_signal.concat(Array(numSamples).fill(0));
        }
    }

    let demodulated_signal = [];
    const time = [];
    for (let i = 0; i < messageSignal.length; i++) {
        const startIndex = i * numSamples;
        const received = modulated_signal.slice(startIndex, startIndex + numSamples);
        const product = received.map((sample, index) => sample * carrier[index]);
        //const product = awgn(prduct0, -10);

        // Apply Low-Pass Filter with cutoff frequency (e.g., twice bitRate)
        //const cutoffFreq = 0;//0.2 * bitRate;
        //const filtered = lowPassFilter(product, cutoffFreq, fs);

        const integral = product.reduce((acc, val) => acc + val, 0) / numSamples; // Normalizing integral

        const threshold = 0.3;//Math.max(...carrier) * 0.5; // Adjust threshold as needed

        if (integral > threshold) {
            demodulated_signal.push(1);
        } else {
            demodulated_signal.push(0);
        }
        time.push(i * bitDuration);
    }
    console.log("Demodulated Signal:", demodulated_signal);

    const { bitx, tx } = representDigitalSignal(demodulated_signal);

    const demodulatedData = [
        {
            x: tx,
            y: bitx.flat(),
            type: "scatter",
            mode: "lines",
            name: "Demodulated Signal",
        },
    ];

    const annotations = demodulated_signal.map((bit, index) => ({
        x: (index + 0.5) * bitDuration, // Center the annotation in the bit interval
        y: 1.1, // Position the text above the line
        text: bit.toString(),
        showarrow: false,
        font: { color: "black" },
    }));

    const demodulatedLayout = {
        title: "Demodulated Signal",
        xaxis: {
            title: "Time (s)",
        },
        yaxis: {
            title: "Amplitude",
            range: [-0.2, 1.2]
        },
        annotations: annotations,
    };

    Plotly.newPlot("demodulated-plot", demodulatedData, demodulatedLayout);
}

function representDigitalSignal(bits) {
    const bitx = [];
    const bp = 1 / bitRate; // Bit period
    for (let n = 0; n < bits.length; n++) {
        if (bits[n] === 1) {
            bitx.push(Array(fs).fill(1)); // Fill 100 elements with 1
        } else {
            bitx.push(Array(fs).fill(0)); // Fill 100 elements with 0
        }
    }
    const tx = [];
    for (let i = 1; i <= fs * bits.length; i++) {
        tx.push((i * bp) / fs); // Calculate time instance and push to array
    }
    return { bitx, tx }; // Return the digital signal and corresponding time instances
}

function gaussianRandom() {
    let u = 1 - Math.random(); // [0,1) -> (0,1]
    let v = 1 - Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function awgn(data, snr) {
    const variance = parseFloat((1 / 10 ** (snr / 10)).toFixed(10));
    const noisyData = [];
    for (let i = 0; i < data.length; i++) {
        const noise = parseFloat((Math.sqrt(variance) * gaussianRandom()).toFixed(10));
        noisyData.push(parseFloat((data[i] + noise).toFixed(10)));
    }
    return noisyData;
}


//const fs = 1000;
let Tb;
let fc;
function sinc(x) {
    return x === 0 ? 1 : Math.sin(Math.PI * x) / (Math.PI * x);
}

function generateSpectrum(centerFreqs, label, color) {
    const f = Array.from({ length: 1000 }, (_, i) => -150 + i * 0.3);
    const y = f.map(freq => {
        return centerFreqs.reduce((acc, fc) => acc + Math.abs(sinc((freq - fc) * Tb)), 0);
    });
    return {
        x: f,
        y: y,
        name: label,
        line: { color },
        mode: 'lines'
    };
}

function generateSpectrumASK() {
    Tb = 1 / parseInt(document.getElementById("bit_rate").value);//1/bitRate;
    console.log(Tb);
    let A = 1;
    fc = parseInt(document.getElementById("carrier_frequency").value);;
    let deltaF = 5;
    const askSpec = generateSpectrum([fc, -fc], 'ASK Spectrum', 'red');
    const fskSpec = generateSpectrum([fc + deltaF, fc - deltaF, -(fc + deltaF), -(fc - deltaF)], 'FSK Spectrum', 'blue');
    const pskSpec = generateSpectrum([fc, -fc], 'PSK Spectrum', 'green');

    Plotly.newPlot('frequencySpectrum', [askSpec], {
        title: 'Spectra of ASK',
        xaxis: { title: 'Frequency (Hz)' },
        yaxis: { title: 'Amplitude', rangemode: 'tozero' }
    });
    document.getElementById('frequencySpectrum').scrollIntoView({ behavior: 'smooth' });
}


function superimposed() {
    // Get user input values
    const num_bits = parseInt(document.getElementById("num_bits").value);
    const fs = parseInt(document.getElementById("sampling_frequency").value);
    const bitRate = parseInt(document.getElementById("bit_rate").value);
    const fc = parseInt(document.getElementById("carrier_frequency").value);

    const bp = 1 / bitRate; // Bit period
    const totalSamples = fs * messageSignal.length;

    // 1. Generate random binary message bits (0 or 1)
    const messageBits = [];
    for (let i = 0; i < num_bits; i++) {
        messageBits.push(Math.round(Math.random()));
    }

    // 2. Expand message bits to sampled waveform
    const messageSamples = [];
    messageSignal.forEach(bit => {
        for (let i = 0; i < fs; i++) {
            messageSamples.push(bit);
        }
    });

    // 3. Generate carrier signal
    const t = [];
    const carrierSamples = [];
    for (let i = 0; i < totalSamples; i++) {
        const time = (i * bp) / fs;
        t.push(time);
        carrierSamples.push(Math.cos(2 * Math.PI * fc * time)); // Amplitude = 10
    }

    // 4. Prepare plot data (both signals separately, on same time axis)
    const data = [
        {
            x: t,
            y: messageSamples,
            type: "scatter",
            mode: "lines",
            name: "Message Signal",
            line: { color: "red" }
        },
        {
            x: t,
            y: carrierSamples,
            type: "scatter",
            mode: "lines",
            name: "Carrier Signal",
            line: { color: "green" }
        }
    ];

    const layout = {
        title: "Superposition of Message and Carrier Signals",
        xaxis: { title: "Time (s)" },
        yaxis: { title: "Amplitude" },
        showlegend: true
    };

    // 5. Plot both signals in the same plot
    Plotly.newPlot("superimposed", data, layout);
}



function saveData() {
    const fs = parseFloat(document.getElementById('sampling_frequency').value);
    const fc = parseFloat(document.getElementById('carrier_frequency').value);
    const num_bits = parseFloat(document.getElementById('num_bits').value);
    const bitRate = parseFloat(document.getElementById('bit_rate').value);

    // Store as an object (use the variables you actually defined)
    const myData = { fs: fs, fc: fc, num_bits: num_bits, bitRate: bitRate, messageSignal: messageSignal };

    localStorage.setItem('sharedData', JSON.stringify(myData));
}
