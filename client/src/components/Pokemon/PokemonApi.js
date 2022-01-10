import React, { useEffect, useState } from "react";
import { Box, Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import { POK_API, IMAGE_API_URL } from "./config/api";
import PokemonCard from "./PokemonCard";
const useStyles = makeStyles((theme) => ({
  containerGrid: {
    textAlign: "center",
    padding: "70px 10px 0px 10px",
    backgroundColor: "rgb(68, 68, 68)",
  },
}));
const PokemonApi = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    axios.get(POK_API + "?limit=800").then((response) => {
     
      if (response.status >= 200 && response.status < 300) {
        const result = response.data.results;
        let newPokemonData = [];
        result.forEach((pokemon, index) => {
          index++;
          let pokemonObject = {
            id: index,
            url: IMAGE_API_URL + index + ".png",
            name: pokemon.name,
          };
          newPokemonData.push(pokemonObject);
        });
        setPokemonData(newPokemonData);
      }
    });
  }, []);
  return (
    <Box>
      {pokemonData ? (
        <Grid className={classes.containerGrid} container spacing={2}>
          {pokemonData.map((pokemon) => {
            return (
              <PokemonCard
                pokemon={pokemon}
                image={pokemon.url}
                key={pokemon.id}
              />
            );
          })}
        </Grid>
      ) : (
        <h1>Loding Data ...</h1>
      )}
    </Box>
  );
};

export default PokemonApi;
