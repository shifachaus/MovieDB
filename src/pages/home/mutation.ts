export const rateMovie = async (movieId: number, rating: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${localStorage.getItem(
      "guest_session_id"
    )}&api_key=${import.meta.env.VITE_API_KEY}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json;charset=utf-8",
      },
      body: `{"value":${rating}}`,
    }
  );

  const data = await response.json();

  console.log(data, "movie");

  return data;
};

export const rateTvShow = async (tvShowId: number, rating: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${tvShowId}/rating?guest_session_id=${localStorage.getItem(
      "guest_session_id"
    )}&api_key=${import.meta.env.VITE_API_KEY}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json;charset=utf-8",
      },
      body: `{"value":${rating}}`,
    }
  );

  const data = await response.json();

  return data;
};
