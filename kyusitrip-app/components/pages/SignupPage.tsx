import React, { FC, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationProp } from '@react-navigation/native';
import config from '../../utils/config'
import axios from 'axios'

interface NewObject {
  name: string;
  password: string;
  email: string;
}

interface SignupPageProps {
  navigation: NavigationProp<any>;
}

const SignupPage: FC<SignupPageProps> = ( { navigation } ) => {
  const [hidden, setHidden] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [wait, setWait] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignupClick = async() => {

    const data: NewObject = {name, password, email}
    console.log(data)
    setWait(true)
    try {
      const response = await axios.post(`${config.URL_USED}/api/users`, data)
      setMsg(response.data.message)
      setError("")
      setModalOpen(true);
      setWait(false)
    } catch(error: any) {
      setModalOpen(true);
      setWait(false)
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message)
        setMsg("")
      }
    }
  };

  return (
    <>
      <Modal
        visible={modalOpen}
        transparent={true}
        statusBarTranslucent={true}
        animationType="fade"
      >
        <Pressable 
          style={styles.modal} 
          onPress={() => {
            if (msg) {
              setModalOpen(false)
              navigation.navigate("StartingPage")
            } else {
              setModalOpen(false)
            }
          }}
        >
          <View style={styles.modalContainer}>
            <View style={{ height: "35%", justifyContent: "center" }}>

              {msg && 
                <Text style={{ color: "#c23e34", fontWeight: "bold", fontSize: 20 }}>
                  SUCCESSFUL
                </Text> 
              }

              {error && 
                <Text style={{ color: "#c23e34", fontWeight: "bold", fontSize: 20 }}>
                  INVALID SIGNUP
                </Text> 
              }



            </View>
            <View
              style={{
                height: "65%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                borderTopWidth: 1,
                borderColor: "#c7c7c7",
                paddingRight: 10,
                paddingLeft: 10
              }}
            >
              {msg && <Text>{msg}</Text>}
              {error && <Text>{error}</Text>}
            </View>
          </View>
        </Pressable>
      </Modal>
      

      <View style={styles.container}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate("StartingPage")}
        >
          <Icon name="arrow-left" size={20} color="#f8ecc4"></Icon>
        </Pressable>


        <View style={styles.loginItems}>
          <Text style={styles.loginPageHeader}>Create an account</Text>

          <View style={styles.loginForm}>
            <View style={styles.formsItems}>
              <Text>Name:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(newName) => setName(newName)}
                defaultValue={name}
              />
            </View>

            <View style={styles.formsItems}>
              <Text>Email:</Text>
              <TextInput
                style={styles.textInput}
                inputMode="email"
                onChangeText={(newEmail) => setEmail(newEmail)}
                defaultValue={email}
              />
            </View>

            <View style={styles.formsItems}>
              <Text>Password:</Text>
              <View
                style={{
                  flexDirection: "row",
                  padding: 10,
                  borderColor: "#818181",
                  borderWidth: 1,
                  borderRadius: 10,
                  width: "100%",
                  height: 45,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TextInput
                  style={{ width: "80%" }}
                  secureTextEntry={hidden}
                  onChangeText={(newPassword) => setPassword(newPassword)}
                  defaultValue={password}
                />
                <TouchableOpacity
                  style={{
                    width: "20%",
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                  onPress={() => setHidden(!hidden)}
                >
                  <Text>Show</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleSignupClick}>
              <Text style={styles.defText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.bottomView}>
        {wait && <Text style={styles.bottomText}>Please Wait...</Text>}
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flexDirection: "column",
    backgroundColor: "white",
    width: 330,
    height: 150,

    borderRadius: 12,

    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8ecc4",
    justifyContent: "center",
    padding: 30,
    width: "100%",
  },
  backButton: {
    position: "absolute",
    marginLeft: 15,
    top: "5%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8c107",

    width: 50,
    height: 50,

    borderRadius: 10,
  },

  textInput: {
    padding: 10,
    borderColor: "#818181",

    borderWidth: 1,
    borderRadius: 10,

    width: "100%",
    height: 45,

    fontSize: 15,
  },

  loginItems: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  row: {
    flexDirection: "row",
  },

  loginPageHeader: {
    fontWeight: "500",
    fontSize: 40,
    marginBottom: 30,
  },

  loginForm: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  formsItems: {
    marginBottom: 20,
    width: "100%",
  },

  loginButton: {
    backgroundColor: "#880015",

    width: "100%",
    height: 45,

    borderRadius: 10,
    marginTop: 15,

    alignItems: "center",
    justifyContent: "center",
  },

  defText: {
    color: "#F8ECC4",
    fontWeight: "400",
    fontSize: 17,
  },

  signInOptions: {
    flexDirection: "row",
    borderColor: "#818181",
    borderWidth: 1,
    borderRadius: 10,

    width: "100%",
    height: 45,

    fontSize: 15,

    marginBottom: 20,

    alignItems: "center",
    justifyContent: "center",
  },

  bottomView: {
    width: '100%',
    height: "auto",
    // backgroundColor: '#EE5407',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 50, //Here is the trick
  },

  bottomText: {
    fontWeight: "bold"
  }
});

export default SignupPage;