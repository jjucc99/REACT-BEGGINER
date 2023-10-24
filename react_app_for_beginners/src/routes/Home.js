import { useEffect, useState } from "react";
import Movie from "../components/Movie";

export const printMovie = (movies) => {
  return (
    <div>
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          coverImg={movie.medium_cover_image}
          title={movie.title}
          summary={movie.summary}
          genres={movie.genres}
        />
      ))}
    </div>
  );
};

const MoiveData = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return [loading, movies];
};

function Home() {
  const [loading, movies] = MoiveData();
  return <div>{loading ? <h1>Loading...</h1> : printMovie(movies)}</div>;
}

export default Home;
