export const fetchMovies = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        accept: "application/json",
      },
    }
  );

  const data = await response.json();

  console.log(data);

  return data;
};

export const fetchTvShows = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        accept: "application/json",
      },
    }
  );

  const data = await response.json();

  return data;
};
