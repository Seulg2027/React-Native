import React from 'react';
import {Alert} from "react-native";
import Loading from "./Loading";
import * as Location from "expo=location";
import Weather from "./Weather";
import axios from "axios";

const API_KEY ="ef279429441cfdcd8f728912efd18d57";

export default function App() {
  state = {
    isLoading: true
  };

  getWeather = async() => {
    const { data } = await axios.get(
      `https://samples.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    this.setstate({ isLoading: false, temp: data.main.temp }); //isLoading이 false로 바뀔 때, 렌더링을 통해 weather로 전환
  }
  getLocation = async(latitude, longitude) => {
    try {
      // 여기서 error() 하면 location이 실행되지 않고 경고창
      await Location.requestPermisstionsAsync();
      /* Location : 사용자의 현재 위치를 물어봄 */
      const {
        coords: latitude, longitude
      } = await Location.getCurrentPositionAsync(); //location의 오브젝트들 가져오기
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find you", "so sad");
    }
  }
  componentDidmount(){
    this.getLocation();
  }
  render() {
    const {isLoading, temp} = this.state;
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} />;
  }
}
