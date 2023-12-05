export const fetchMovieDetails = async (movieId: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        accept: "application/json",
      },
    }
  );
  const data = response.json();

  return data;
};
