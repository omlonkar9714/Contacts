import React, { PureComponent } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Button,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  AsyncStorage
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import Modal from "react-native-modal";
import { Icon } from "react-native-elements";
// import { NavigationActions } from "react-navigation";
// import Detail from "./ViewCon";

export default class ContactListHome extends PureComponent {
  static navigationOptions = {
    headerTitle: "Contacts"
  };
  constructor(props) {
    super(props);
    this.state = {
      storedData: [],
      image: null,
      isDeleteModal: false,
      addModalVisible: false,
      isHomeVisible: true,
      newContactid: 0,
      newContactName: "",
      newContactPhoto: null,
      newContactNumber: 0,
      text: "",
      name: "",
      search: "",
      contacts: [
        {
          id: 1,
          name: "Omkar",
          Photo:
            "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/01/12201051/cute-puppy-body-image.jpg",
          contactNumber: "8208957851"
        },
        {
          id: 2,
          name: "Aries",
          Photo:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/single-minded-royalty-free-image-997141470-1558379890.jpg?crop=0.671xw:1.00xh;0.0847xw,0&resize=640:*",
          contactNumber: "7745854428"
        },
        {
          id: 3,
          name: "Nikhil",
          Photo:
            "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/01/12201051/cute-puppy-body-image.jpg",
          contactNumber: "8208957851"
        },
        {
          id: 4,
          name: "Ankita",
          Photo:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/single-minded-royalty-free-image-997141470-1558379890.jpg?crop=0.671xw:1.00xh;0.0847xw,0&resize=640:*",
          contactNumber: "7745854428"
        },
        {
          id: 5,
          name: "Ganesh",
          Photo:
            "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/01/12201051/cute-puppy-body-image.jpg",
          contactNumber: "8208957851"
        },
        {
          id: 6,
          name: "Rupali",
          Photo:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/single-minded-royalty-free-image-997141470-1558379890.jpg?crop=0.671xw:1.00xh;0.0847xw,0&resize=640:*",
          contactNumber: "7745854428"
        },
        {
          id: 7,
          name: "Aditya",
          Photo:
            "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/01/12201051/cute-puppy-body-image.jpg",
          contactNumber: "8208957851"
        },
        {
          id: 8,
          name: "Snehal",
          Photo:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/single-minded-royalty-free-image-997141470-1558379890.jpg?crop=0.671xw:1.00xh;0.0847xw,0&resize=640:*",
          contactNumber: "7745854428"
        },
        {
          id: 9,
          name: "Komal",
          Photo:
            "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/01/12201051/cute-puppy-body-image.jpg",
          contactNumber: "8208957851"
        },
        {
          id: 10,
          name: "Sushant",
          Photo:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/single-minded-royalty-free-image-997141470-1558379890.jpg?crop=0.671xw:1.00xh;0.0847xw,0&resize=640:*",
          contactNumber: "7745854428"
        },
        {
          id: 11,
          name: "Damini",
          Photo:
            "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/01/12201051/cute-puppy-body-image.jpg",
          contactNumber: "8208957851"
        },
        {
          id: 12,
          name: "Rohit",
          Photo:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/single-minded-royalty-free-image-997141470-1558379890.jpg?crop=0.671xw:1.00xh;0.0847xw,0&resize=640:*",
          contactNumber: "7745854428"
        },
        {
          id: 13,
          name: "Akshay",
          Photo:
            "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/01/12201051/cute-puppy-body-image.jpg",
          contactNumber: "8208957851"
        },
        {
          id: 14,
          name: "Ashwini",
          Photo:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/single-minded-royalty-free-image-997141470-1558379890.jpg?crop=0.671xw:1.00xh;0.0847xw,0&resize=640:*",
          contactNumber: "7745854428"
        }
      ]
    };
  }

  _launchCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ newContactPhoto: result.uri });
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ newContactPhoto: result.uri });
    }
  };

  renderItem({ item }) {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          ToastAndroid.show("Opening " + item.name, ToastAndroid.SHORT);
          this.props.navigation.navigate("ViewContact", {
            info: item
          });
        }}
      >
        <View
          style={{
            height: 40,
            marginBottom: 15,
            marginLeft: 20
          }}
        >
          <Text style={{ fontSize: 25 }}>{item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  ItemSeparatorComponent() {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%"
        }}
      />
    );
  }

  componentDidMount = () => {
    if (!AsyncStorage.getItem("data")) {
      let data = [
        {
          id: 7,
          name: "Omkar",
          contactNumber: 8208957851,
          Photo:
            "https://i.pinimg.com/originals/19/26/38/1926382e2a5f4b79310d6e951cce5ad6.jpg"
        }
      ];
      AsyncStorage.setItem("data", JSON.stringify(data));
    }
  };

  // saveContact = () => {
  //   const rnid = Math.random();
  //   let newContact = {
  //     name: this.state.newContactName,
  //     Photo: this.state.newContactPhoto,
  //     id: rnid,
  //     contactNumber: this.state.newContactNumber
  //   };
  // };

  saveContact = () => {
    if (this.state.newContactNumber != 0) {
      let rnid = Math.random();
      let newContact = {
        name: this.state.newContactName,
        Photo: this.state.newContactPhoto,
        id: rnid,
        contactNumber: this.state.newContactNumber
      };
      AsyncStorage.getItem("data").then(value => {
        let rlist = JSON.parse(value);
        rlist.push(newContact);
        // alert("List" + JSON.stringify(rlist));
        AsyncStorage.setItem("data", JSON.stringify(rlist));
      });
      ToastAndroid.show("Saved", ToastAndroid.SHORT);
      this.setState({
        newContactNumber: 0,
        newContactName: "",
        newContactid: 0,
        newContactPhoto: null
      });
      this.setState({
        isHomeVisible: !this.state.isHomeVisible
      });
      this.setState({
        addModalVisible: !this.state.addModalVisible
      });
    } else {
      ToastAndroid.show("Enter data first", ToastAndroid.SHORT);
    }
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  getContactList = () => {
    AsyncStorage.getItem("data").then(value => {
      const rlist = JSON.parse(value);
      this.setState({ storedData: rlist });
    });
    return this.state.storedData;
  };

  render() {
    let { image } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {this.state.isHomeVisible && (
          <View style={styles.container}>
            <View
              style={{
                height: 83,
                backgroundColor: "transparent",
                width: "100%"
              }}
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
                    marginLeft: "4%",
                    alignItems: "center"
                  }}
                >
                  <View>
                    <Icon
                      size={20}
                      name="id-badge"
                      type="font-awesome"
                      color="#f50"
                      onPress={() => {}}
                    />
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: "flex-end",
                    width: "90%",
                    alignItems: "center",
                    flexDirection: "row"
                  }}
                >
                  <View style={{ marginRight: "8%" }}>
                    <Text style={{ fontSize: 20, color: "#f50" }}>Select</Text>
                  </View>
                  <View style={{ marginRight: "8%" }}>
                    <Icon
                      size={20}
                      name="plus"
                      type="font-awesome"
                      color="#f50"
                      onPress={() => {
                        this.setState({
                          isHomeVisible: !this.state.isHomeVisible
                        });
                        this.setState({
                          addModalVisible: !this.state.addModalVisible
                        });
                      }}
                    />
                  </View>

                  <View>
                    <Icon
                      size={20}
                      name="cog"
                      type="font-awesome"
                      color="#f50"
                      onPress={() => console.log("hello")}
                    />
                  </View>
                </View>
              </View>
            </View>
            {/* <Button
          title="View details screen "
          onPress={() => {
            this.props.navigation.navigate("ViewConntacct");
          }}
        ></Button> */}

            <View
              style={{
                borderColor: "red",
                flexDirection: "row",
                width: "100%",
                height: 35,
                backgroundColor: "#EAECEE",
                borderRadius: 15,
                justifyContent: "flex-start",
                alignItems: "center"
              }}
            >
              <View style={{ marginLeft: "5%" }}>
                <Icon
                  size={20}
                  name="search"
                  type="font-awesome"
                  color="#f50"
                  onPress={() => navigation.goBack()}
                />
              </View>

              <View style={{ marginLeft: 15, width: "87%" }}>
                <TextInput placeholder="Search here"></TextInput>
                {/* <SearchBar
              round={true}
              placeholder="Search Here..."
              onChangeText={this.updateSearch}
              value={search}
            /> */}
              </View>
            </View>

            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.getContactList()}
              style={{ height: 400, width: "100%", margin: 20 }}
              renderItem={this.renderItem.bind(this)}
              ItemSeparatorComponent={this.ItemSeparatorComponent.bind(this)}
            />
          </View>
        )}

        {this.state.addModalVisible && (
          <View style={styles.container}>
            <View style={{ marginBottom: 50 }}>
              <Text style={{ fontSize: 25 }}>Add new Contact</Text>
            </View>
            <View
              style={{
                backgroundColor: "#ccc",
                marginBottom: 30,
                borderRadius: 20,
                marginHorizontal: 30,
                height: 40,
                width: "70%",
                justifyContent: "center",
                alignItems: "flex-start"
              }}
            >
              <TextInput
                style={{ marginLeft: 20 }}
                onChangeText={text => {
                  this.setState({ newContactName: text });
                }}
                placeholderTextColor="green"
                placeholder="Enter the name "
              ></TextInput>
            </View>
            <View
              style={{
                marginBottom: 30,
                borderRadius: 20,
                marginHorizontal: 30,
                height: 40,
                width: "50%",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <View>
                <Text>Pick Image</Text>
              </View>
              <View>
                <Icon
                  size={20}
                  name="camera"
                  type="font-awesome"
                  color="#f50"
                  onPress={() => {
                    this._launchCamera();
                  }}
                />
              </View>
              <View>
                <Icon
                  size={20}
                  name="picture-o"
                  type="font-awesome"
                  color="#f50"
                  onPress={() => {
                    this._pickImage();
                  }}
                />
              </View>
            </View>

            {this.state.newContactPhoto != null && (
              <Image
                style={{
                  marginBottom: 30,
                  borderRadius: 15,
                  height: 100,
                  width: 100
                }}
                source={{ uri: this.state.newContactPhoto }}
              ></Image>
            )}
            <View
              style={{
                backgroundColor: "#ccc",
                marginBottom: 30,
                borderRadius: 20,
                marginHorizontal: 30,
                height: 40,
                width: "70%",
                justifyContent: "center",
                alignItems: "flex-start"
              }}
            >
              <TextInput
                keyboardType="numeric"
                style={{ marginLeft: 20 }}
                placeholderTextColor="green"
                maxLength={10}
                placeholder="Enter phone number "
                onChangeText={text => {
                  this.setState({ newContactNumber: text });
                }}
              ></TextInput>
            </View>
            <TouchableOpacity
              onPress={() => {
                ToastAndroid.show("Saving", ToastAndroid.SHORT);

                this.saveContact();
              }}
              style={{
                backgroundColor: "#f50",
                marginBottom: 30,
                borderRadius: 20,
                marginHorizontal: 30,
                height: 40,
                width: "30%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    marginVertical: 10
                  }}
                >
                  SAVE
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                ToastAndroid.show("Cancelling", ToastAndroid.SHORT);
                this.setState({
                  isHomeVisible: !this.state.isHomeVisible
                });
                this.setState({
                  addModalVisible: !this.state.addModalVisible
                });
                this.setState({
                  newContactPhoto: null
                });
              }}
              style={{
                backgroundColor: "#ccc",
                marginBottom: 30,
                borderRadius: 20,
                marginHorizontal: 30,
                height: 40,
                width: "30%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    marginVertical: 10
                  }}
                >
                  Cancel
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        <Modal
          animationIn="bounceIn"
          animationOut="bounceOut"
          animationOutTiming={100}
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
          isVisible={this.state.isDeleteModal}
        >
          <View
            style={{
              borderRadius: 20,
              backgroundColor: "white",
              justifyContent: "center",
              alignContent: "center",
              width: "80%"
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 30,
                marginTop: 20
              }}
            >
              <Text style={{ fontSize: 20 }}>
                You want to delete this contact?
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
                justifyContent: "space-evenly"
              }}
            >
              <View>
                <Button
                  color="#f50"
                  title="Delete"
                  onPress={() => {
                    this.toggleModal();
                    this.deleteContact(user_info);
                  }}
                />
              </View>
              <View>
                <Button
                  color="black"
                  title="Cancel"
                  onPress={this.toggleModal}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 10,
    marginTop: 10
  },
  header: {
    fontSize: 25,
    fontStyle: "italic",
    fontWeight: "bold"
  }
});
