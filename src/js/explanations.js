

export const explanationMap = {
  "error_404": "The page you are looking for does not exist.",
  "error_500": "The server encountered an internal error.",


  "welcome_msg": "Welcome to the Digital Signal Visualizer! \
Please enter a binary string and select an \
encoding method to visualize the signal. \
You can choose from NRZ, NRZI, Manchester, Differential Manchester, and 4B5B encoding. \
Each method will display the corresponding signal waveform based on the input binary data. \
Enjoy exploring digital signal encoding!",
 
"uniPolarNRZ": "Unipolar Non-Return-to-Zero (NRZ) is a simple line-coding technique \
using one polarity, where binary '1' is represented by a positive voltage and binary '0' \
by zero voltage. The signal does not return to zero in the middle of the bit period, \
staying at the voltage level for the entire duration.",


"NRZL": "NRZ-L (Non-Return-to-Zero-Level) is a line coding scheme where the signal level is constant during the bit interval. A binary '1' is represented by one voltage level (e.g., high), while a binary '0' is represented by another voltage level (e.g., low). The signal does not return to zero between bits, making it simple but susceptible to synchronization issues with long runs of identical bits.",
"AMI": "Bi-Polar AMI (Alternate Mark Inversion) is a line coding scheme where binary '0' is represented by zero voltage, while binary '1' is represented by alternating positive and negative voltages. This means that consecutive '1's will alternate in polarity, which helps to maintain synchronization and reduce the DC component of the signal. The alternating nature of the '1's allows for better error detection and improved performance over long distances compared to unipolar schemes.",
"PST": "Pseudoternary is a line coding scheme where binary '1' is represented by zero voltage, while binary '0' is represented by alternating positive and negative voltages. This means that consecutive '0's will alternate in polarity, which helps to maintain synchronization and reduce the DC component of the signal. The alternating nature of the '0's allows for better error detection and improved performance over long distances compared to unipolar schemes.",
"NRZI": "Non-Return-to-Zero Inverted (NRZI) is a line coding scheme where a binary '1' is represented by a change in the signal level, while a binary '0' is represented by no change. This means that for every '1', the signal will toggle between high and low voltage, while for '0's, the signal remains constant. NRZI helps to maintain synchronization and reduce the DC component of the signal, making it more efficient for long-distance communication compared to unipolar schemes.",
"MLT3": "MLT-3 (Multi-Level Transmit - 3 levels) is a line coding scheme that uses three voltage levels: positive, zero, and negative. In MLT-3, a binary '1' is represented by a transition to the next voltage level in the sequence (positive to zero, zero to negative, negative to positive), while a binary '0' is represented by no change in the signal level. This means that for every '1', the signal will cycle through the three voltage levels, while for '0's, the signal remains constant. MLT-3 helps to reduce the bandwidth required for transmission and improve performance over long distances compared to unipolar schemes.",
"diffMan": "Differential Manchester encoding is a line coding scheme where the presence of a transition at the beginning of a bit period indicates a binary '0', while the absence of a transition indicates a binary '1'. Additionally, there is always a transition in the middle of each bit period to provide synchronization. This means that for every '0', there will be a transition at the start of the bit period, while for '1's, there will be no transition at the start. The consistent mid-bit transition helps to maintain synchronization and reduce the DC component of the signal, making it more efficient for long-distance communication compared to unipolar schemes.",
"MAN": "Manchester encoding is a line coding scheme where each bit period is divided into two halves. A binary '1' is represented by a transition from low to high voltage in the middle of the bit period, while a binary '0' is represented by a transition from high to low voltage in the middle of the bit period. This means that for every '1', there will be a transition from low to high in the middle of the bit period, while for '0's, there will be a transition from high to low. The consistent mid-bit transition helps to maintain synchronization and reduce the DC component of the signal, making it more efficient for long-distance communication compared to unipolar schemes.",
"B8ZS": "B8ZS (Bipolar with 8-Zero Substitution) is a line coding scheme that is used to maintain synchronization in the presence of long runs of zeros. In B8ZS, if there are eight consecutive zeros in the data stream, they are replaced with a specific pattern of bipolar violations (alternating positive and negative voltages) to ensure that there are enough transitions in the signal for synchronization. This means that for every sequence of eight '0's, there will be a specific pattern of voltage changes that helps to maintain synchronization and reduce the DC component of the signal, making it more efficient for long-distance communication compared to unipolar schemes.",
"HDB3": "HDB3 (High-Density Bipolar 3) is a line coding scheme that is used to maintain synchronization in the presence of long runs of zeros. In HDB3, if there are four consecutive zeros in the data stream, they are replaced with a specific pattern of bipolar violations (alternating positive and negative voltages) to ensure that there are enough transitions in the signal for synchronization. This means that for every sequence of four '0's, there will be a specific pattern of voltage changes that helps to maintain synchronization and reduce the DC component of the signal, making it more efficient for long-distance communication compared to unipolar schemes.",
"4B5B": "4B5B is a line coding scheme that maps groups of 4 bits to 5-bit code words. Each 4-bit group is represented by a unique 5-bit code, which helps to ensure that there are enough transitions in the signal for synchronization and error detection. The 5-bit code words are designed to have a balanced number of '1's and '0's, which helps to reduce the DC component bias of the signal and improve performance over long distances compared to unipolar schemes."


}

export default { explanationMap };