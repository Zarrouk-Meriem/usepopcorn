import { useEffect, useRef, useState } from "react";
import { useMovies } from "./useMovies";
import StarRating from "./StarRating";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const KEY = "f84fc31d";
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export default function App() {
  const [query, setQuery] = useState("");

  const [watched, setWatched] = useLocalStorageState([], "watched");

  const [closedMovie, setCloseMovie] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [rating, setRating] = useState(0);

  function handleSelection(id) {
    setSelectedId(id);
    setCloseMovie(true);
    setRating(0);
  }
  function handleCloseMovie() {
    setCloseMovie(false);
    setSelectedId(null);
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} handleSelection={handleSelection} />
          )}
          {error && <ErrorMessage errorMessage={error} />}
        </Box>
        <Box>
          {selectedId ? (
            closedMovie && (
              <MovieDetails
                onCloseMovie={handleCloseMovie}
                onSetRating={setRating}
                rating={rating}
                selectedId={selectedId}
                movies={movies}
                onSetWatched={handleAddWatched}
                watched={watched}
              />
            )
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <List watched={watched} onDeleteWatched={handleDeleteWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
function ErrorMessage({ errorMessage }) {
  return (
    <p className="error">
      <span>⛔️ </span>
      {errorMessage}
    </p>
  );
}
function Loader() {
  return (
    <div className="loader">
      <svg
        className="loader-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="2" r="0" fill="currentColor">
          <animate
            attributeName="r"
            begin="0"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          />
        </circle>
        <circle
          cx="12"
          cy="2"
          r="0"
          fill="currentColor"
          transform="rotate(45 12 12)"
        >
          <animate
            attributeName="r"
            begin="0.125s"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          />
        </circle>
        <circle
          cx="12"
          cy="2"
          r="0"
          fill="currentColor"
          transform="rotate(90 12 12)"
        >
          <animate
            attributeName="r"
            begin="0.25s"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          />
        </circle>
        <circle
          cx="12"
          cy="2"
          r="0"
          fill="currentColor"
          transform="rotate(135 12 12)"
        >
          <animate
            attributeName="r"
            begin="0.375s"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          />
        </circle>
        <circle
          cx="12"
          cy="2"
          r="0"
          fill="currentColor"
          transform="rotate(180 12 12)"
        >
          <animate
            attributeName="r"
            begin="0.5s"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          />
        </circle>
        <circle
          cx="12"
          cy="2"
          r="0"
          fill="currentColor"
          transform="rotate(225 12 12)"
        >
          <animate
            attributeName="r"
            begin="0.625s"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          />
        </circle>
        <circle
          cx="12"
          cy="2"
          r="0"
          fill="currentColor"
          transform="rotate(270 12 12)"
        >
          <animate
            attributeName="r"
            begin="0.75s"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          />
        </circle>
        <circle
          cx="12"
          cy="2"
          r="0"
          fill="currentColor"
          transform="rotate(315 12 12)"
        >
          <animate
            attributeName="r"
            begin="0.875s"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
            repeatCount="indefinite"
            values="0;2;0;0"
          />
        </circle>
      </svg>
    </div>
  );
}
function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (inputEl.current === document.activeElement) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
function Main({ children }) {
  return <main className="main">{children}</main>;
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function List({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
          </div>
          <button
            className="btn-delete"
            onClick={() => onDeleteWatched(movie.imdbID)}
          >
            x
          </button>
        </li>
      ))}
    </ul>
  );
}
function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(0)} min</span>
        </p>
      </div>
    </div>
  );
}
function MovieList({ movies, handleSelection }) {
  return (
    <ul className="list">
      {movies?.map((movie, i) => (
        <Movie key={i} movie={movie} onSetSelectedId={handleSelection} />
      ))}
    </ul>
  );
}
function Movie({ movie, onSetSelectedId }) {
  return (
    <li onClick={() => onSetSelectedId(movie.imdbID)} key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
function MovieDetails({
  selectedId,
  rating,
  onSetRating,
  onCloseMovie,
  onSetWatched,
  watched,
}) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const countRef = useRef(0);
  useEffect(
    function () {
      if (rating) countRef.current = countRef.current + 1;
    },
    [rating]
  );
  const watchedMovieUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  useEffect(
    function () {
      async function fetchMovieById(id) {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${id}`
        );
        const data = await res.json();
        setSelectedMovie(data);
        setIsLoading(false);
      }

      fetchMovieById(selectedId);
    },
    [selectedId]
  );
  useEffect(
    function () {
      if (!selectedId) return;
      document.title = `Movie | ${selectedMovie?.Title}`;

      return function () {
        document.title = "UsePopcorn";
      };
    },
    [selectedMovie, selectedId]
  );
  function handleAdd() {
    const addedMovie = {
      imdbID: selectedId,
      imdbRating: Number(selectedMovie.imdbRating),
      Title: selectedMovie.Title,
      Poster: selectedMovie.Poster,
      runtime: Number(selectedMovie.Runtime.split(" ")[0]),
      userRating: rating,
      countRatingDecisions: countRef.current,
    };
    onSetWatched(addedMovie);
    onCloseMovie();
  }
  useKey("Escape", onCloseMovie);
  // useEffect(
  //   function () {
  //     function callback(e) {
  //       if (e.code === "Escape") onCloseMovie();
  //     }
  //     document.addEventListener("keydown", callback);
  //     return function () {
  //       document.addEventListener("keydown", callback);
  //     };
  //   },
  //   [onCloseMovie]
  // );
  return (
    <div
      style={{ justifyContent: isLoading ? "center" : "start" }}
      className="details"
    >
      {isLoading ? (
        <svg
          className="loader-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="2" r="0" fill="currentColor">
            <animate
              attributeName="r"
              begin="0"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(45 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.125s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(90 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.25s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(135 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.375s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(180 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.5s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(225 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.625s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(270 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.75s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(315 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.875s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
        </svg>
      ) : (
        <>
          <button className="btn-back " onClick={() => onCloseMovie()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path
                  strokeDasharray="20"
                  strokeDashoffset="20"
                  d="M21 12h-17.5"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.2s"
                    values="20;0"
                  />
                </path>
                <path
                  strokeDasharray="12"
                  strokeDashoffset="12"
                  d="M3 12l7 7M3 12l7 -7"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.2s"
                    dur="0.2s"
                    values="12;0"
                  />
                </path>
              </g>
            </svg>
          </button>
          <header>
            <img alt="poster" src={selectedMovie?.Poster} />
            <div className="details-overview">
              <h2>{selectedMovie?.Title}</h2>
              <p>
                {selectedMovie?.Released} &bull; {selectedMovie?.Runtime}
              </p>
              <p>{selectedMovie?.Genre}</p>
              <p>
                <span>⭐️</span> {selectedMovie?.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p>
                  You rated this movie {watchedMovieUserRating} <span>⭐️</span>
                </p>
              ) : (
                <>
                  <StarRating
                    key={selectedId}
                    maxRating={10}
                    color="#fcc419"
                    size={24}
                    onSetRating={onSetRating}
                    defaultRate={rating}
                  />
                  {rating ? (
                    <button className="btn-add" onClick={() => handleAdd()}>
                      + Add to list
                    </button>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
            <p style={{ marginBottom: "1rem", fontStyle: "italic" }}>
              {selectedMovie?.Plot}
            </p>
            <p style={{ marginBottom: "1rem" }}>
              Starring {selectedMovie?.Writer}
            </p>
            <p>Directed by {selectedMovie?.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
