import React, { useState, useEffect} from 'react';
import WebView from 'react-native-webview'
import 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image} from 'react-native';


// image resource
const PlaceholderImage = require('./assets/background-image.png');

export default function App() {
  // 访问uri
  const url1 = 'https://www.openai.com';
  const url2 = "https://chat.openai.com/"

  // 保存Cookies,Hook钩子
  const [key, setKey] = useState(0);
  const [cookies, setCookies] = useState('');

  // 异步保存Cookie
  const saveCookies = async (newCookies: any) => {
    try {
      await AsyncStorage.setItem('@cookies', newCookies);
    } catch (error) {
      console.log('Error saving cookies:', error);
    }
  };
  // 设置Cookie
  const getCookies = async () => {
    try {
      const storedCookies = await AsyncStorage.getItem('@cookies');
      if (storedCookies !== null) {
        setCookies(storedCookies);
      }
    } catch (error) {
      console.log('Error getting cookies:', error);
    }
  };

  // 高性能获取cookie
  useEffect(() => {
    getCookies();
  }, []);

  const refreshWebView = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <View style={styles.container}>
      {/* 注释代码 */}

      {/* <WebView source={{uri: url}}/> */}
      {/* <View style={styles.container}> */}
          {/* <Text style={styles.text}>你是一个大傻逼</Text> */}
         
          
      {/* </View> */}
      <WebView
        key={key}
        source={ {uri: url2, headers: {Cookie: cookies}}}
        style={styles.webview}
        onMessage={(event) => {
          const { data } = event.nativeEvent;
          if (data.includes('cookie')) {
            const newCookies = data.split('=')[1];
            setCookies(newCookies);
            saveCookies(newCookies);
          }
        }}
       
      />
      {/* <View style={styles.buttonContainer}>
          <Button title="Refresh" onPress={refreshWebView} />
      </View> */}
      <View style={styles.buttonContainer}>
        <Button title="Refresh" onPress={refreshWebView} />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  }
});
