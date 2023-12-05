export const fetchTvShowDetails = async (tvshowID: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${tvshowID}?language=en-US`,
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
