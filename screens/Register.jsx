import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage, {AsyncStorageStatic} from '@react-native-async-storage/async-storage'

const Login = ({ route, navigation }) => {
  const [inputName, setInputName] = useState();
  const [inputPassword, setInputPassword] = useState();
  const [inputPassword2, setInputPassword2] = useState();
  const [isValid, setIsValid] = useState(true);
  

  //Search
  const handleChangeInputName = (e) => {
    setInputName(e);
    console.log(e);
  };

  const handleChangeInputPassword = (e) => {
    setInputPassword(e);
    console.log(e);
  };

  const handleChangeInputPassword2 = (e) => {
    setInputPassword2(e);
    console.log(e);
  };

  const handleSaveUser = () => {
    if(inputName || inputPassword == '')
    {
      setIsValid(false)
    }else
    if(inputPassword.length < 6)
    {
      setIsValid(false)
    }else

    if(inputPassword !== inputPassword2)
    {
      setIsValid(false)
    }else
    {
      setIsValid(true)
      console.log('Validado')
      AsyncStorage.setItem('Usuario', inputName)
      .then(() => {
          navigation.navigate('BottomNav')
      })
    }

  };
  return (
    <SafeAreaView>
      <View>
        <Text>Register</Text>
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
          <View style={styleSheet.searchBox}>
            <Text>Confirmar Contraseña:</Text>
            <TextInput
              placeholder="usuario1, pepito..."
              style={styleSheet.searchInput}
              value={inputPassword2}
              onChangeText={(e) => handleChangeInputPassword2(e)}
            />
          </View>
          <Text>{!isValid ? 'Error en las credenciales' : ''}</Text>
        </View>
        <TouchableOpacity onPress={handleSaveUser}>
          <Text>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>Volver al Inicio de Sesion</Text>
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