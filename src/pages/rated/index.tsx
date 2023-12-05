import { useState } from "react";
import { Container, Menu, Segment, Header, Loader } from "semantic-ui-react";
import { DisplayType } from "../home";
import { useQuery } from "@tanstack/react-query";
import { fetchRatedMovies, fetchRatedTvShows } from "./query";
import ColumnDisplay from "../home/column-display";
import { Navigate } from "react-router-dom";
const Rated = () => {
  const [activeTabs, setActiveTabs] = useState<DisplayType>(DisplayType.Movies);

  const { data: ratedMovies, isLoading: isLoadingMovies } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchRatedMovies,
  });
  const { data: ratedTvshows, isLoading: isLoadingTvShows } = useQuery({
    queryKey: ["tvshows"],
    queryFn: fetchRatedTvShows,
  });

  if (isLoadingMovies || isLoadingTvShows) {
    <Loader active />;
  }

  if (localStorage.getItem("guest_session_id") === null) {
    return <Navigate to="/auth" />;
  }

  return (
    <Container style={{ marginTop: 50 }}>
      <Menu pointing secondary>
        <Menu.Item
          name="Movies"
          active={activeTabs === DisplayType.Movies}
          onClick={() => setActiveTabs(DisplayType.Movies)}
        ></Menu.Item>
        <Menu.Item
          name="TvShows"
          active={activeTabs === DisplayType.TvShows}
          onClick={() => setActiveTabs(DisplayType.TvShows)}
        ></Menu.Item>
      </Menu>
      <Segment>
        {activeTabs === DisplayType.Movies ? (
          <div>
            <Header as={"h2"}>Rated Movies</Header>
            <ColumnDisplay
              data={ratedMovies?.results}
              displayType={DisplayType.Movies}
              isRated
            />
          </div>
        ) : (
          <div>
            <Header as={"h2"}>Rated Tv Show</Header>
            <ColumnDisplay
              data={ratedTvshows?.results}
              displayType={DisplayType.TvShows}
              isRated
            />
          </div>
        )}
      </Segment>
    </Container>
  );
};

export default Rated;
