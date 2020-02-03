import React from 'react';
import { StyleSheet,View, Text,ScrollView ,TextInput,Button,Image} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import axios from 'axios';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Input,Header } from 'react-native-elements';


class VerifyScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            otp: '',
            id : '',
            verified:'0',
    // 
      };
      this.updateValue = this.updateValue.bind(this);
      this.getOtp = this.getOtp.bind(this);
      this.verifyOtp = this.verifyOtp.bind(this)
    //   this.submit = this.submit.bind(this);
      }


      updateValue(text,field){
        if(field == "otp"){
          // console.log(text);
          // console.log(this.state.complainersName)
          this.setState({
            otp:text,
          })
        }
    }

    getOtp(){
        var mob = JSON.stringify(this.props.navigation.getParam('mobileNumber'))
        let data = {mobileNumber:mob}
        let url = "http://192.168.31.205:3000/api/verify/getotp/"

//         const fetchPromise = fetch(`http://192.168.31.205:3000/api/verify/getotp/?mobileNumber=${data.mobileNumber}&channel=${data.channel}`);
// fetchPromise.then(response => {
//   console.log(response);
// });

    
    
    fetch(url, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        this.setState({
            id:data["reqId"]
        })
        
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      
      
    } 


       
//        data = {mobileNumber:mob,channel:"sms"}
//         fetch(`http://192.168.31.205:3000/api/verify/getotp?mobileNumber=${data.mobileNumber}&channel=${data.channel}`,{
//             method:"POST",
//             headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify(data),
//         })
//         .then((response) => response.json())
// .then((data) => {
//   console.log('Success:', data);
// })
// .catch((error) => {
//   console.error('Error:', error);
    


// });
        
verifyOtp(){
  
    let url = "http://192.168.31.205:3000/api/verify/verifyOtp/"

//         const fetchPromise = fetch(`http://192.168.31.205:3000/api/verify/getotp/?mobileNumber=${data.mobileNumber}&channel=${data.channel}`);
// fetchPromise.then(response => {
//   console.log(response);
// });

data = {code:this.state.otp,reqID:this.state.id}

fetch(url, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
    if(data["status"] == "0"){
        this.setState({
            verified:'1'
        })
        this.props.navigation.state.params.onSelect({veri:'1'})
        this.props.navigation.goBack();
    }
    
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
  
} 

  render() {
    return (
        <View style={styles.container}>
         
      <Button
         color="blue"
          title="GET OTP"
          onPress={this.getOtp}
        />
      
        <Input
        containerStyle = {styles.inputBox}
        label = "ENTER OTP"
        placeholder='OTP'
        onChangeText = {(text)=>this.updateValue(text,'otp')}
        />
      <Text>This might take upto 1 minute</Text>
        <Button
         color="green"
          title="VERIFY"
          onPress={this.verifyOtp}
        />
        </View>
     
    );
  }
}
const styles = StyleSheet.create({
    container:{
      flex:1,
    //   backgroundColor:'#b3ecff',
      padding:20
      // alignItems:'center',
   
    },
    inputBox:{
      marginTop:10,
      marginBottom:10,
    },
    aboutUser:{
      marginTop:10,
      flex:1,
      padding:40,
      backgroundColor:'#ffffff'
    },
    aboutCase:{
      marginTop:10,
      flex:1,
      padding:40,
      backgroundColor:'#ffffff'
    },
    firStatement:{
      flex:1,
      justifyContent:"flex-start",
      height: 50,
      borderWidth: 2,
      borderColor: '#9E9E9E',
      
      backgroundColor : "#FFFFFF",
      height: 150
    }
  })


export default VerifyScreen;