const jokes = require("../data/unformatted_jokes.json");
var fs = require("fs");

const format = async () => {
  formatted = await jokes
    .filter(joke => {
      if (
        joke.Joke.indexOf("?") !== -1 &&
        joke.Joke.indexOf(".com") === -1 &&
        joke.Joke.split("? ").length === 2
      ) {
        return joke;
      }
    })
    .map(joke => {
      return {
        Q: joke.Joke.split("? ")[0] + "?",
        A: joke.Joke.split("? ")[1]
      };
    });

  fs.writeFile(
    "../data/formatted_jokes.json",
    JSON.stringify(formatted, null, 2),
    () => {
      console.log("done results:", formatted.length);
    }
  );
};

format();

// console.log(jokes.length);

// const filterJokes = async () => {
//   const filtered = await jokes.filter(joke => joke.A);
//   console.log("filered length", filtered.length);
// };

// filterJokes();
