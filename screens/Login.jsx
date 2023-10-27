import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = ({ route, navigation }) => {
  const [inputName, setInputName] = useState();
  const [inputPassword, setInputPassword] = useState();
  const [isValid, setIsValid] = useState(true);
  

  //Search
  const handleChangeInputName = (e) => {
    setSearchInput(e);
    console.log(e);
  };

  const handleChangeInputPassword = (e) => {
    setSearchInput(e);
    console.log(e);
  };

  const handleSaveUser = () => {
    navigation.navigate('Login')
  };
  return (
    <SafeAreaView>
      <View>
        <Text>Login</Text>
        <View style={styleSheet.formContainer}>
          <View style={styleSheet.searchBox}>
            <Text>Usuario:</Text>
            <TextInput
              placeholder="usuario1, pepito..."
              style={styleSheet.searchInput}
              value={inputName}
              onChangeText={(e) => handleChangeInputName(e)}
            />
          </View>
          <View style={styleSheet.searchBox}>
            <Text>Contraseña:</Text>
            <TextInput
              placeholder="usuario1, pepito..."
              style={styleSheet.searchInput}
              value={inputPassword}
              onChangeText={(e) => handleChangeInputPassword(e)}
            />
          </View>
          <Text>{!isValid ? 'Error en las credenciales' : ''}</Text>
        </View>
        <TouchableOpacity onPress={() => {navigation.navigate('BottomNav')}}>
          <Text>Iniciar Sesion</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text>Crear Nueva Cuenta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styleSheet = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  wheaterListItem: {
    flexDirection: "column",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'space-around',
    width: "80%",
    marginBottom: 20,
  },
  searchInput: {
    width: "70%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
  },
  formContainer:{
    alignItems:'center',
  }
});

export default Login;
