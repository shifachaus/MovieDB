import { Button, Loader } from "semantic-ui-react";
import { useState } from "react";
import ColumnDisplay from "./column-display";
import { fetchTvShows, fetchMovies } from "./query";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

export enum DisplayType {
  Movies = "movies",
  TvShows = "tvshows",
}

const Home = () => {
  const [displayType, setDisplayType] = useState<DisplayType>(
    DisplayType.Movies
  );

  const { data: movieData, isLoading: isLoadingMovies } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });
  const { data: tvshowData, isLoading: isLoadingTvShows } = useQuery({
    queryKey: ["tvshows"],
    queryFn: fetchTvShows,
  });

  if (localStorage.getItem("guest_session_id") === null) {
    return <Navigate to="/auth" />;
  }

  return (
    <div style={{ marginTop: 50, height: "auto" }}>
      <Button.Group>
        <Button
          color={displayType === DisplayType.Movies ? "blue" : undefined}
          onClick={() => {
            setDisplayType(DisplayType?.Movies);
          }}
        >
          Movies
        </Button>
        <Button
          color={displayType === DisplayType.TvShows ? "blue" : undefined}
          onClick={() => {
            setDisplayType(DisplayType?.TvShows);
          }}
        >
          Tv Shows
        </Button>
      </Button.Group>

      {isLoadingMovies || isLoadingTvShows ? (
        <Loader active />
      ) : (
        <div style={{ marginTop: 20 }}>
          {displayType === DisplayType.Movies ? (
            <ColumnDisplay
              data={movieData.results}
              displayType={DisplayType.Movies}
            />
          ) : (
            <ColumnDisplay
              data={tvshowData.results}
              displayType={DisplayType.TvShows}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
