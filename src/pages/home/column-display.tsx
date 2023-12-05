import { Grid, Card, Form, Label } from "semantic-ui-react";
import { DisplayType } from ".";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { rateMovie, rateTvShow } from "./mutation";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

interface DisplayData {
  id: number;
  overview: string;
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: number;
  release_Date: string;
  rating?: number;
}

interface Props {
  data: DisplayData[];
  displayType: DisplayType;
  isRated?: boolean;
}

const ColumnDisplay = (props: Props) => {
  const { data, displayType, isRated } = props;
  const [rating, seRating] = useState<number>(0);

  const onSuccess = () => {
    toast.success("Successfully Rated!");
  };
  const onError = () => {
    toast.success("Something Went Wrong!");
  };

  const { mutate: rateMovieMutation } = useMutation({
    mutationKey: ["rateMovie"],
    mutationFn: (id: number) => rateMovie(id, rating),
    onSuccess,
    onError,
  });

  const { mutate: rateTvShowMutation } = useMutation({
    mutationKey: ["rateMovie"],
    mutationFn: (id: number) => rateTvShow(id, rating),
    onSuccess,
    onError,
  });

  const rate =
    displayType === DisplayType.Movies ? rateMovieMutation : rateTvShowMutation;

  return (
    <Grid
      columns={3}
      stackable
      centered
      verticalAlign="top"
      padded="vertically"
    >
      {data?.map((displayData: DisplayData) => {
        return (
          <Grid.Column key={displayData.id}>
            <Card.Group>
              <Link
                to={`/${
                  displayType === DisplayType.Movies ? "movie" : "tvshow"
                }/${displayData.id}`}
              >
                <Card
                  style={{ height: 820 }}
                  fluid
                  image={`https://image.tmdb.org/t/p/original/${displayData.poster_path}`}
                  header={
                    displayType === DisplayType.Movies
                      ? displayData.title
                      : displayData.name
                  }
                  meta={`Release Date:${displayData.release_Date} | Rating :${displayData.vote_average}`}
                  description={displayData.overview.slice(0, 350) + "..."}
                />

                {isRated && (
                  <Label color="green">Your Rating: {displayData.rating}</Label>
                )}
              </Link>

              <Form style={{ marginTop: 10 }}>
                <Form.Group>
                  <Form.Field>
                    <Form.Input
                      type="number"
                      min="0"
                      max="10"
                      step="0.5"
                      onChange={(e) => seRating(Number(e.target.value))}
                      action={{
                        color: "violet",
                        labelPosition: "right",
                        icon: "star",
                        content: "Rate",
                        onClick: () => rate(displayData.id),
                      }}
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
            </Card.Group>
          </Grid.Column>
        );
      })}
    </Grid>
  );
};

export default ColumnDisplay;
