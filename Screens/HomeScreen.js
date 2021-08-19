import React from "react";
import {
  View,
  Alert,
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { ListItem } from "react-native-elements";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "https://53662354867d.ngrok.io/",
      listData: [],
    };
  }

  componentDidMount() {
    this.getPlanets();
  }

  getPlanets = () => {
    const url = this.state.url;

    axios
      .get(url)
      .then((response) => {
        return this.setState({
          listData: response.data.data,
        });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };
  keyExtractor = (item, index) => index.toString();
  // The distance from the host star is written as 'distance_from_host_star' in the data.

  renderItem = ({ item, index }) => (
    <ListItem
      key={index}
      title={`Planet : ${item.name}`}
      subtitle={`Distance from Earth : ${item.distance_from_earth}`}
      titleStyle={styles.title}
      containerStyle={styles.listContainer}
      bottomDivider
      chevron
      onPress={() => {
        this.props.navigation.navigate("DetailsScreen", {
          planet_name: item.name,
        });
      }}
    />
  );
  render() {
    const ListData = this.state.listData;

    if (ListData.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView />
          <View style={styles.upperContainer}>
            <Text style={styles.headerText}>Expoplanets</Text>
          </View>

          <View style={styles.lowerContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.listData}
              renderItem={this.renderItem}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edc988",
  },
  upperContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#132743",
  },
  lowerContainer: {
    flex: 0.9,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainerText: {
    fontSize: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d7385e",
  },
  listContainer: {
    backgroundColor: "#eeecda",
  },
});
