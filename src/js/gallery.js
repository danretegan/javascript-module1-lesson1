// import axios from "axios";
import apiAll from "./api-all.js";
import { getMovieGenres } from "./api-genres.js";

// Funcția pentru afișarea cardurilor filmelor, inclusiv imaginile posterelor și informațiile despre film
async function displayMovieCards(movies) {
  const movieContainer = document.querySelector(".movie-container");

  try {
    const genres = await getMovieGenres();

    movies.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.classList.add("movie-card");

      const movieImage = document.createElement("img");
      const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      movieImage.src = imageUrl;
      movieImage.alt = movie.title;
      movieImage.classList.add("movie-image");

      const movieTitle = document.createElement("h3");
      movieTitle.textContent = movie.title;
      movieTitle.classList.add("movie-title");
      console.log(movieTitle.textContent);

      const movieInfo = document.createElement("p");
      const releaseYear =
        (movie.release_date && movie.release_date.split("-")[0]) || "undefined";
      console.log(movie.release_date);

      const movieGenres = movie.genre_ids.map((genreId) => {
        const foundGenre = genres.find((genre) => genre.id === genreId);
        return foundGenre ? foundGenre.name : "";
      });
      console.log(movie.genre_ids);

      const genresString = movieGenres.join(" ");
      movieInfo.textContent = `${genresString} | ${releaseYear} `;
      movieInfo.classList.add("movie-info");

      movieCard.appendChild(movieImage);
      movieCard.appendChild(movieTitle);
      movieCard.appendChild(movieInfo);
      movieContainer.appendChild(movieCard);
    });
  } catch (error) {
    console.error("There was a problem displaying movie cards:", error);
  }
}

// Funcția pentru obținerea datelor despre filme din API-ul TMDb folosind Axios
async function getMoviesFromApi() {
  try {
    const response = await axios.request(apiAll);

    if (!response.status === 200) {
      throw new Error("Network response was not ok");
    }

    return response.data.results;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return [];
  }
}

// Funcția pentru afișarea cardurilor pentru filmele obținute din API
async function displayMovieCardsFromApi() {
  try {
    const movies = await getMoviesFromApi();
    await displayMovieCards(movies);
  } catch (error) {
    console.error("There was a problem displaying movie cards:", error);
  }
}

// Apelul funcției pentru afișarea cardurilor pentru filme din API în pagină
displayMovieCardsFromApi();
