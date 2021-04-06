League of Legends Stats API
===========================

Simple API to serve stats for [League of Legends](https://leagueoflegends.com) game.

## Requirements

- NodeJS >=1.10|<=1.14: https://nodejs.org/en/download/

## Install

Do those commands only at the first install on a machine. You do not have to this again.

1. Open a terminal
2. Clone the repository on your machine. `git clone git@github.com:ecole-hexagone/lol-stats-express.git`
3. Change directory to the one created by git `cd lol-stats-express`
4. Install front dependencies `npm install` (or with yarn, `yarn`)

That all.

## Launching projet in dev environment

You need to do those commands each time you want to work on the project.

1. Open a terminal inside your root directory.
2. Run `npm run start` => Default start a server listing on http://localhost:3000
3. Open another terminal (keep the previous running) inside your root directory.
4. Run `npm run watch` (or `yarn watch`) => Start a nodejs server watching your assets files (css, js, etc...)

## License

[MIT License](LICENSE)

If you want more info about this license: https://opensource.org/licenses/MIT
