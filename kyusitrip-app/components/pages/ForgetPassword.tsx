import React, { FC, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import config from '../../utils/config'

interface ForgetPasswordProps {
  navigation: NavigationProp<any>;
}

interface EmailObject {
  email: string
}

const ForgetPassword: FC<ForgetPasswordProps> = ({ navigation }) => {
  const [hidden, setHidden] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [msg, setMsg] = useState("")
  const [error, setError] = useState("")
  const [wait, setWait] = useState(false);
  const [email, setEmail] = useState("");

  const handleSendClick = async() => {
    const data: EmailObject = {email}
    setWait(true)
    try {
      const response = await axios.post(`${config.URL_USED}/api/password-reset`, data)
      setMsg(response.data.message)
      setError("")
      setModalOpen(true)
      setWait(false)
    } catch (error: any) {
      setModalOpen(true)
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
  }

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
              navigation.navigate("LoginPage")
            } else {
              setModalOpen(false)
            }
          }}
        >

          <View style={styles.modalContainer}>
            <View style={{ height: "35%", justifyContent: "center" }}>
              
              {msg && 
                <Text style={{ color: "#c23e34", fontWeight: "bold", fontSize: 20 }}>
                  EMAIL SENT
                </Text> 
              }

              {error && 
                <Text style={{ color: "#c23e34", fontWeight: "bold", fontSize: 20 }}>
                  INVALID EMAIL
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
          onPress={() => navigation.navigate("LoginPage")}
        >
          <Icon name="arrow-left" size={20} color="#f8ecc4"></Icon>
        </Pressable>


        <View style={styles.loginItems}>
          <Text style={styles.loginPageHeader}>Change Password</Text>

          <View style={styles.loginForm}>
            <View style={styles.formsItems}>
              <Text>Email:</Text>
              <TextInput
                style={styles.textInput}
                inputMode="email"
                onChangeText={(newEmail) => setEmail(newEmail)}
                defaultValue={email}
              />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleSendClick}>
              <Text style={styles.defText}>Send Email</Text>
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
    padding: 10,

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

  passwordFormsItems: {
    marginBottom: 5,
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
  },

});

export default ForgetPassword;