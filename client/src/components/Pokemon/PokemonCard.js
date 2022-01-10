import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    cursor: "pointer",
    backgroundColor: "black",
    color: "white",
    "&:hover": {
      backgroundColor: "rgb(90, 90 ,90)",
    },
  },
  cardMedia: {
    margin: "auto",
    width: 130,
    height: 130,
  },
  cardContent: {
    textAlign: "center",
    
  },
  link: {
    textDecoration: "none",
  },
  name: {
    marginTop: 90
    }
}));
const PokemonCard = (props) => {
  const classes = useStyles();
  const { pokemon, image } = props;
  const { id, name } = pokemon;

  return (
    <Grid item xs={12} sm={2} key={id}>
      <Link to={"/pokemon/" + id} className={classes.link}>
        <Card className={classes.card}>
          <CardMedia image={image} className={classes.cardMedia}>
            <CardContent className={classes.cardContent}>
              <Typography className={classes.name} >{name}</Typography>
            </CardContent>
          </CardMedia>
        </Card>
      </Link>
    </Grid>
  );
};

export default PokemonCard;
