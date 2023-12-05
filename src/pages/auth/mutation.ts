export const mutationLogin = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/authentication/guest_session/new",
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
