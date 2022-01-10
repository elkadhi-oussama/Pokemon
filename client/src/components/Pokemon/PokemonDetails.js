import React, { Component } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { POK_API } from "./config/api";

import {
  Box,
  CircularProgress,
  withStyles,
  Typography,
  Grid,
 
} from "@material-ui/core";


const styles = (theme) => ({
  pokedexContainer: {
    height: "84vh",
    backgroundColor: "black",
    color: "white",
    marginTop: 75,
    textAlign: "center",
    borderRadius: 5,
    paddingTop: 30,
  },
  textTitle: {
    textTransform: "upperCase",
    fontFamily: "Fantasy",
  },
  pokemonImage: {
    width: "170px",
    height: "170px",
  },
  pokemonInfoContainer: {
    bottom: 60,
    position: "absolute",
    width: "100%",
  },
  seperator: {
    height: "0.01mm",
    width: "95%",
  },
  favourite: {
    height: 50,
    width: 50,
    marginTop: 15,
    
  },
  text: {
    fontSize: 30,
  },
});
class PokemonDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: null,
    };
  }
  componentDidMount() {
    const { match } = this.props;
    const { id } = match?.params;
    axios.get(POK_API + "/" + id).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        this.setState({ pokemon: response.data });
      }
    });
  }

  render() {
    console.log(this.props.favourites)
    const { classes } = this.props;
    const { pokemon } = this.state;
    if (pokemon) {
      const { name, sprites, height, weight, types } = pokemon;
      return (
        <>
          <NavBar></NavBar>
          <Box>
            <Box className={classes.pokedexContainer}>
              <Typography variant="h1" className={classes.textTitle}>
                {name}
              </Typography>
              <img
                className={classes.pokemonImage}
                src={sprites.front_default}
                alt="pokImg"
              />
              <Box className={classes.pokemonInfoContainer}>
                <hr className={classes.seperator} />
                <Grid container>
                  
                  <Grid item md={2}>
                    <Typography className={classes.text}>
                      Name
                      <br />
                      {name}
                    </Typography>
                  </Grid>
                  <Grid item md={2}>
                    <Typography className={classes.text}>
                      Height
                      <br />
                      {height}m
                    </Typography>
                  </Grid>
                  <Grid item md={2}>
                    <Typography className={classes.text}>
                      Weight
                      <br />
                      {weight}kg
                    </Typography>
                  </Grid>
                  {types.map((pokemonType) => {
                    const { name } = pokemonType.type;
                    return (
                      <Grid item md={2}>
                        <Typography className={classes.text}>
                          Type
                          <br />
                          {name}
                        </Typography>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </Box>
          </Box>
        </>
      );
    } else {
      return <CircularProgress></CircularProgress>;
    }
  }
}

export default withStyles(styles)(PokemonDetails);
