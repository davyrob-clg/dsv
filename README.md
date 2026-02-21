
### You can use the visualizer at https://dvs.cs-unigib.org/

## About

This web app helps to visualize how the digital signals are encoded in Data communication.
It includes the following encode methods ,

1. Unipolar NRZ(Non Return to Zero )
2. NRZ - L
3. NRZ - I
4. Bi polar AMI (Alternate mark inversion)
5. Pseudoternary encoding
6. MLT-3 encoding (Multi-Level Transmit)
7. Manchester encoding
8. Differential Manchester encoding
9. Bipolar with Eight Zero Substitution (B8ZS)
10. High Density Bipolar Order 3 Encoding (HDB3)
11. 4B/5B Converts Nibbles to 5 bits based on lookup





## For Devs

1.  Clone the repo:

        git clone https://github.com/davy-clg/digital-signal-visualizer.git

2.  Install dependencies:

        npm install

3.  Run webpack:

        npm start

The page will open up automatically at http://localhost:3000 
<br/><br/><br/><br/><br/><br/><br/><br/>


##### *Canvas Boilerplate Code from https://github.com/christopher4lis/canvas-boilerplate* 

## Acks

I've updated this to use Vite and also to add some explanations for students on the encoding strategy.  I also added 4B5B encoding which is referenced the excellent book https://book.systemsapproach.org/

Original version cloned from https://nur-zaman.github.io/digital-signal-visualizer/     