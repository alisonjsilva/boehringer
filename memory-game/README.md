# KEMORY

KEMORY GAME is a fun and challenging memory game inspired by the classic memory game. The unique feature of KEMORY GAME is that it generates random images using the "Google Custom Search API" based on the topic entered by the user. The game consists of a 4x4 grid of cards, and players need to match pairs of cards with the same image to win the game. The number of movements taken to complete the game is displayed on the screen.

## Technologies and Frameworks Used

- Next.js 13.4.x
- TailwindCSS 3.3.x
- TypeScript

## Getting Started

To run the KEMORY GAME locally on your machine, follow these steps:

1. Clone the repository: `git clone https://github.com/keynertyc/kemory.git`
2. Navigate to the project folder: `cd kemory`
3. Install dependencies: `npm install` or `yarn install`
4. Set up your Google Custom Search API key and CX ID and add them to the project's environment variables.
5. Start the development server: `npm run dev` or `yarn dev`
6. Open your browser and go to `http://localhost:3000` to play the game.

## How to Play

1. On the game's home screen, you will see an input field where you can enter a topic (e.g., "animals," "cars," "nature," etc.).
2. Press the "Generate Images" button to fetch random images related to the entered topic using the Google Custom Search API.
3. The cards will be generated with the fetched images, and they will be shuffled and placed face down on the grid.
4. Click on a card to flip it and reveal the image. Remember the position of each image.
5. Click on another card to flip it and reveal the image. If the two images match, they will remain face up. Otherwise, they will be flipped back face down.
6. Continue flipping cards and matching pairs until all pairs are found.
7. The game will keep track of the number of movements taken to complete the game, and it will be displayed on the screen.
8. Once all pairs are matched, the game will show a success message, and you can restart the game with a new topic.

Enjoy playing KEMORY GAME and test your memory skills with exciting random images! Have fun!

## Author

- Name: Keyner TYC
- Email: keyner.peru@gmail.com

## Screenshots

![Screenshot 1](https://i.imgur.com/f1UbocU.png)
![Screenshot 2](https://i.imgur.com/IJ9nOHJ.png)
![Screenshot 3](https://i.imgur.com/kztav07.png)
![Screenshot 4](https://i.imgur.com/DDzBnfW.png)
![Screenshot 5](https://i.imgur.com/m82fQcr.png)