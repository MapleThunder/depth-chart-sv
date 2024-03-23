# Depth Chart

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

You can find a detailed narrative write up about this app [on my blog](https://nikobentley.ca/projects/depth-chart).

## Formations & Positions

There are boxes that signify different positions on the pitch (striker, winger, midfielder, etc) arranged depending on the formation chosen. The colour of the header bar for each position box changes as you add or remove players to the different positions. A player can be added to multiple positions and when the "X" is clicked on a player they are only removed from that position

The position box header colours have the following meanings:

- Red: not enough players to start
- Yellow: enough players to start but more depth needed
- Green: enough depth in this position

The formations currently supported are:

- 343
- 351
- 4231
- 424
- 442
- 433
- 523
- 532

## Data Storage

All data is saved to local storage of the browser.

## Build & Run Locally

If you would like to run the web app locally just follow these steps:

1. Clone the repository and navigate to the cloned directory
2. Install all the necessary modules
3. Run the app
4. Navigate to the running app using the link output to the terminal

These commands end up looking like:

```bash
# Clone the repository
git clone https://github.com/MapleThunder/depth-chart-sv.git depth-chart
cd depth-chart

npm install # Install the modules
npm run dev # Run the application in dev mode

# Click the link output to the terminal to visit the site in the browser

```
