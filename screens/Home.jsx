import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_URL, API_FIELDS, API_KEY } from "../config";
import { days } from "../constants/days.js";
import {FontAwesome5} from '@expo/vector-icons'



const Home = ({ route, navigation }) => {
  const [dataWheater, setDataWheater] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isCelsiusTemperature, setIsCelsiusTemperature] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const changeFahrenheit = (temp) => {
    const newTemp = (temp*(9/5) + 32).toFixed(2)
    return newTemp
  }

  const getWheather = async (location = "Lalibertad") => {
    try {
      const url = `${API_URL}${location}${API_FIELDS}${API_KEY}`;
      console.log('Url a hacer fetch',url)
      const res = await fetch(url)
      const data = await res.json()
      console.log(data)
      //console.log('Timelines',data.data.timelines)
      let wheaters = data.data.timelines[0].intervals.map((interval) => ({
        id: interval.startTime,
        day: new Date(interval.startTime).getDay(),
        nameDay: days.find(
          (item) => item.id === new Date(interval.startTime).getDay()
        ),
        temperature: interval.values.temperature,
      }));

      wheaters = wheaters.sort((a, b) => a.day - b.day);
      //Obtener el dia en letras a partir del numero del dia de la semana
      setDataWheater(wheaters);

      console.log("Clima", wheaters);
    } catch (error) {
      console.log("Error en el get Wheater", error);
    }
  };

  useEffect(() => {
    getWheather();
  }, []);

  //Search
  const handleChangeInput = (e) => {
    console.log('Buscar',e.replace(' ',''))    
    setSearchInput(e);
    console.log(e);
  };

  const handleSearch = () => {
      setLoading(true)
      getWheather(searchInput)
  }

  return (
    <SafeAreaView>
      <View style={styleSheet.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>Regresar al Login</Text>
        </TouchableOpacity>
        <View style={styleSheet.searchBox}>
          <TextInput
            placeholder="San Salvador, La Libertad..."
            style={styleSheet.searchInput}
            value={searchInput}
            onChangeText={(e) => handleChangeInput(e)}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Text>Buscar</Text>
          </TouchableOpacity>
        </View>
        <Text>Cambiar de Metrica de Temperatura</Text>
        <View>
          <TouchableOpacity onPress={() => setIsCelsiusTemperature((prev) => !prev)}><Text>Cambiar</Text></TouchableOpacity>
        </View>

        <FlatList    
          horizontal      
          data={dataWheater}
          key={({ item }) => item.id}
          renderItem={({ item }) => (
            <View style={styleSheet.wheaterListItem}>
              <View>
                <Text> {item.nameDay.value} </Text>
                <FontAwesome5 name={item.temperature > 30 ? 'sun' : item.temperature > 25 ? 'cloud-sun' : item.temperature > 20 ? 'cloud' : 'cloud-rain'}  size={24} />
                <Text> {isCelsiusTemperature ? `${item.temperature} °C` : `${changeFahrenheit(item.temperature)} °F`} </Text>
              </View>
            </View>
          )}
        />
        <View>
          <TouchableOpacity>
            <Text>Guardar Busqueda</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: "center",
    width: "100%",
  },
  searchInput: {
    width: "70%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
  },
});

export default Home;
