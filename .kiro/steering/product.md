# Product Overview

Depth Chart is a web application for football (soccer) team management that helps coaches and managers track player depth across different positions and formations.

## Core Features

- **Formation Management**: Support for 8 different formations (343, 351, 4231, 424, 442, 433, 523, 532)
- **Player Assignment**: Players can be assigned to multiple positions with different weights
- **Depth Visualization**: Color-coded position boxes indicate depth status:
  - Red: Not enough players to start
  - Yellow: Enough to start but needs more depth
  - Green: Good depth in position
- **Data Persistence**: All data saved to browser localStorage
- **Export Functionality**: Generate shareable images of the depth chart using html2canvas

## Target Users

Football coaches, team managers, and analysts who need to visualize and manage squad depth across different tactical formations.

## Key Business Logic

- Players can play multiple positions with drag-and-drop weight adjustment
- Formation changes dynamically update position requirements
- Real-time depth calculation based on player assignments
- Local-first data storage with no backend dependency
