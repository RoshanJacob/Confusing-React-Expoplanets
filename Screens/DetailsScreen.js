import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";

export default class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imagePath: null,
      details: {},
      url: `https://53662354867d.ngrok.io/exoplanet?planet_name = ${this.props.navigation.getParam(
        planet_name
      )}`,
    };
  }
  componentDidMount() {
    this.getPlanetDetails();
  }

  getPlanetDetails = () => {
    const url = this.state.url;

    axios
      .get(url)
      .then((response) => {
        this.setDetails(response.data.data);
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  setDetails = (planet_details) => {
    const planet_type = planet_details.planet_type;

    let ImagePath = "";

    switch (planet_type) {
      case "Gas Giant":
        ImagePath = require("../assets/gas_giant.png");
        break;
      case "Terrestrial":
        ImagePath = require("../assets/terrestrial.png");
        break;
      case "Super Earth":
        ImagePath = require("../assets/super_earth.png");
        break;
      case "Neptune-like":
        ImagePath = require("../assets/neptune_like.png");
        break;
      default:
        ImagePath = require("../assets/gas_giant.png");
    }

    this.setState({
      imagePath: ImagePath,
      details: planet_details,
    });
  };
  render() {
    const { details, imagePath } = this.state;

    if (details.specifications) {
      return (
        <View style={styles.container}>
          <Card
            title={details.name}
            image={imagePath}
            imageProps={{ resizeMode: "contain", width: "100%" }}
          >
            <View>
              <Text
                style={styles.cardItem}
              >{`Distance From Earth : ${details.distance_from_earth}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Distance From It's Sun : ${details.distance_from_host_star}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Gravity : ${details.gravity}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Orbital Period : ${details.orbital_period}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Orbital Speed : ${details.orbital_speed}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Planet Mass : ${details.planet_mass}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Planet Radius : ${details.planet_radius}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Planet Type : ${details.planet_type}`}</Text>
            </View>

            <View style={[styles.cardItem, [(flexDirection: "column")]]}>
              <Text>{details.specifications ? `Specifications : ` : ""}</Text>
              {details.specifications.map((item, index) => (
                <Text key={index.toString()} style={{ marginLeft: 50 }}>
                  {item}
                </Text>
              ))}
            </View>
          </Card>
        </View>
      );
    }

    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardItem: {
    marginBottom: 10,
  },
});
