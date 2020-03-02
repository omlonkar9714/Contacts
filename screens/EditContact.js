import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ToastAndroid,
  Button,
  AsyncStorage,
  TouchableNativeFeedback
} from "react-native";
import { NavigationActions } from "react-navigation";
import {
  TextInput,
  TouchableWithoutFeedback
} from "react-native-gesture-handler";
import CalendarPicker from "react-native-calendar-picker";
import { Icon } from "react-native-elements";

export default class EditContact extends PureComponent {
  static navigationOptions = {
    headerTitle: "Edit Contact"
  };
  constructor(props) {
    super(props);
    this.state = {
      isFocused1: true,
      isFocused2: false,
      isFocused3: false,
      isFocused4: false,
      info: [],
      prevInfo: [],
      name: "",
      id: 0,
      isSave: false,
      contactNumber: 0,
      contactPhoto: null
    };
  }

  componentDidMount = () => {
    const data = this.props.navigation.getParam("info", "NO-User");
    this.setState({
      name: data.name,
      contactNumber: data.contactNumber,
      id: data.id,
      contactPhoto: data.Photo
    });
  };

  saveEditedContact = () => {
    if (this.state.isSave) {
      //update

      let uplid = this.state.id;
      AsyncStorage.getItem("data").then(value => {
        let rlist = JSON.parse(value);
        for (let i = 0; i < rlist.length; i++) {
          if (rlist[i].id == uplid) {
            rlist[i].name = this.state.name;
            rlist[i].contactNumber = this.state.contactNumber;
            rlist[i].Photo = this.state.contactPhoto;

            AsyncStorage.setItem("data", JSON.stringify(rlist));
            this.props.navigation.navigate("ContactsHome");
          }
        }
      });
      //update
      ToastAndroid.show("Saved", ToastAndroid.SHORT);
      this.props.navigation.goBack();
    } else {
      ToastAndroid.show("Edit First", ToastAndroid.SHORT);
    }
  };

  render() {
    const { navigation } = this.props;
    const user_info = navigation.getParam("info", "NO-User");
    return (
      <View style={styles.container}>
        <View
          style={{ height: 83, backgroundColor: "transparent", width: "100%" }}
        >
          <View
            style={{
              marginTop: 27,
              backgroundColor: "transparent",
              height: 56,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginLeft: "2%",
                alignItems: "center"
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  const navigateAction = NavigationActions.navigate({
                    routeName: "ViewContact",
                    params: { previous_screen: "Edit" } // current screen
                  });

                  this.props.navigation.dispatch(navigateAction);
                }}
              >
                <View>
                  <Text style={{ fontSize: 20, color: "#f50" }}>Cancel</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View
              style={{
                justifyContent: "flex-end",
                width: "90%",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <View style={{ marginRight: "30%" }}>
                <Text style={{ fontSize: 20, color: "#000000" }}>
                  Edit Contact
                </Text>
              </View>
              <View style={{ marginRight: "10%" }}>
                <Text
                  onPress={() => {
                    this.saveEditedContact();
                  }}
                  style={{
                    fontSize: 20,
                    color: this.state.isSave ? "#f50" : "#ccc"
                  }}
                >
                  Save
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              height: 2,
              backgroundColor: "#ccc"
            }}
          ></View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            alignItems: "center"
          }}
        >
          <View>
            <Image
              style={{ height: 100, width: 100, borderRadius: 10 }}
              source={{
                uri: user_info.Photo
              }}
            ></Image>
          </View>
          <View style={{ marginLeft: 25, width: "70%" }}>
            <View>
              <TextInput
                autoFocus={true}
                onFocus={() => {
                  this.setState({ isFocused1: true });
                }}
                onBlur={() => {
                  this.setState({ isFocused1: false });
                }}
                underlineColorAndroid={"transparent"}
                style={{ height: 40 }}
                onChangeText={text => {
                  this.setState({ isSave: true });
                  this.setState({ name: text });
                }}
                placeholder="Name here"
                value={this.state.name}
              />
              <View
                style={{
                  height: 1,
                  backgroundColor: this.state.isFocused1 ? "#f50" : "#ccc"
                }}
              ></View>
            </View>
            <View>
              <TextInput
                onFocus={() => {
                  this.setState({ isFocused2: true });
                }}
                onBlur={() => {
                  this.setState({ isFocused2: false });
                }}
                underlineColorAndroid={"transparent"}
                style={{ height: 40 }}
                placeholder="Surname here"
              />
              <View
                style={{
                  height: 1,
                  backgroundColor: this.state.isFocused2 ? "#f50" : "#ccc"
                }}
              ></View>
            </View>
            <View>
              <TextInput
                onFocus={() => {
                  this.setState({ isFocused3: true });
                }}
                onBlur={() => {
                  this.setState({ isFocused3: false });
                }}
                underlineColorAndroid={"transparent"}
                style={{ height: 40 }}
                placeholder="Workplace here"
              />
              <View
                style={{
                  height: 1,
                  backgroundColor: this.state.isFocused3 ? "#f50" : "#ccc"
                }}
              ></View>
            </View>
            <View>
              <TextInput
                onFocus={() => {
                  this.setState({ isFocused4: true });
                }}
                onBlur={() => {
                  this.setState({ isFocused4: false });
                }}
                underlineColorAndroid={"transparent"}
                style={{ height: 40 }}
                placeholder="Title here"
              />
              <View
                style={{
                  height: 1,
                  backgroundColor: this.state.isFocused4 ? "#f50" : "#ccc"
                }}
              ></View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 50 }}></View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20
          }}
        >
          <View>
            <Text>Mobile</Text>
          </View>
          <View
            style={{
              height: "70%",
              width: 0.8,
              backgroundColor: "#ccc",
              marginLeft: 50
            }}
          ></View>
          <View style={{ marginLeft: 30 }}>
            <TextInput
              onChangeText={text => {
                this.setState({ contactNumber: text });
              }}
              keyboardType="number-pad"
              maxLength={10}
              value={this.state.contactNumber}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20
          }}
        >
          <View>
            <Text>Email</Text>
          </View>
          <View
            style={{
              height: "70%",
              width: 0.8,

              marginLeft: 50
            }}
          ></View>
          <View style={{ marginLeft: 30 }}>
            <TextInput placeholder="Email Here" value={this.state.info.email} />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20
          }}
        ></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  }
});
