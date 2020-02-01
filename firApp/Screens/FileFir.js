import React from 'react';
import { StyleSheet,View, Text,ScrollView ,TextInput,Button,Image} from 'react-native';
import ViewFir from './ViewFir';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Header } from 'react-native-elements';

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#b3ecff',
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

class FileFir extends React.Component {
  // state = {
  //   image: null,
  //   complainersName:'',
  //   mobileNumber:'',
  //   emailId:'',
  //   currentAddress:'',
  //   occupation:'',
  //   firStatement:'',
  //   placeOfOffence:'',
  //   moreDetails:'',

  // };
  constructor(props){
    super(props);
    this.state = {
    image: null,
    complainersName:'',
    mobileNumber:'',
    emailId:'',
    currentAddress:'',
    occupation:'',
    firStatement:'',
    placeOfOffence:'',
    moreDetails:'',
// 
  };
  this.updateValue = this.updateValue.bind(this);
  this.submit = this.submit.bind(this);
  }
  
  componentDidMount() {
    this.getPermissionAsync();
    console.log('hi');
  }
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }


  updateValue(text,field){
    if(field == "complainersName"){
      // console.log(text);
      // console.log(this.state.complainersName)
      this.setState({
        complainersName:text,
      })
    }
    else if(field == "mobileNumber"){
      this.setState({
        mobileNumber:text,
      })
    }
    else if(field == "emailId"){
      this.setState({
        emailId:text,
      })
    }
    else if(field == "currentAddress"){
      this.setState({
        currentAddress:text,
      })
    }
    else if(field == "occupation"){
      this.setState({
        occupation:text,
      })
    }
    else if(field == "firStatement"){
      this.setState({
        firStatement:text,
      })
    }
    else if(field == "placeOfOffence"){
      this.setState({
        placeOfOffence:text,
      })
    }
    else if(field == "moreDetails"){
      this.setState({
        moreDetails:text,
      })
    }
    else{
      console.log("no field");
    }
  }


  submit(){
    console.log("submit");

    let collection ={}
    collection.complainersName=this.state.complainersName;
    collection.mobileNumber=this.state.mobileNumber;
    collection.emailId=this.state.emailId;
    collection.currentAddress=this.state.currentAddress;
    collection.occupation=this.state.occupation;
    collection.firStatement=this.state.firStatement;
    collection.placeOfOffence=this.state.placeOfOffence;
    collection.moreDetails=this.state.moreDetails;

    // console.warn(collection);

    

fetch('http://192.168.31.205:3000/api/fileFir/file', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(collection),
})
.then((response) => response.json())
.then((data) => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});


  }
  _pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }

  }

  
  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
        <Header
        
        centerComponent={{ text: 'FILE FIR', style: { color: '#fff' } }}
        
        />
          <ScrollView>
       <View style={styles.aboutUser}>
       <Text style={{textAlign:"center",fontSize:16}}>Your Details</Text>
       <Input
          containerStyle = {styles.inputBox}
          label = "Complainer's Name"
          placeholder='complainers name'
          onChangeText = {(text)=>this.updateValue(text,'complainersName')}
            />
          <Input
          containerStyle = {styles.inputBox}
          keyboardType= "numeric"
          label = "Mobile Number"
          placeholder= "aadhar registered number"
          onChangeText = {(text)=>this.updateValue(text,'mobileNumber')}
            />
            <Input
          containerStyle = {styles.inputBox}
          label = "Email Id"
          placeholder= "your email here"
          onChangeText = {(text)=>this.updateValue(text,'emailId')}
            />
            <Input
          containerStyle = {styles.inputBox}
          label = "Current Address"
          placeholder="your current address here"
          onChangeText = {(text)=>this.updateValue(text,'currentAddress')}
            />
            <Input
          containerStyle = {styles.inputBox}
          label = "Occupation"
          placeholder="your occupation here"
          onChangeText = {(text)=>this.updateValue(text,'occupation')}
            />
       </View>


       <View style={styles.aboutCase}>
         <Text style={{textAlign:"center",fontSize:16}}>Case Details</Text>
       {/* <Input
          containerStyle = {styles.inputBox}
          inputStyle = {styles.firStatement}
          label = "FIR Statement"
          placeholder='your statement here.'
            /> */}
          <Text>
            FIR statement
          </Text>
          <TextInput
          label="FIR statement"
            
            style={styles.firStatement}
            underlineColorAndroid="transparent"
            placeholder={"Your Statement Here"}
            placeholderTextColor={"#9E9E9E"}
            numberOfLines={10}
            multiline={true}
            onChangeText = {(text)=>this.updateValue(text,'firStatement')}
          />
          <Input
          containerStyle = {styles.inputBox}
          label = "Place Of Offence"
          placeholder= "Place of offence here."
          onChangeText = {(text)=>this.updateValue(text,'placeOfOffence')}
            />
            <Input
          containerStyle = {styles.inputBox}
          label = "More Details"
          placeholder= "Enter more details here"
          onChangeText = {(text)=>this.updateValue(text,'moreDetails')}
            />

        <Button
          title="Click E-Sign"
          onPress={this._pickImage}
        />
        <Text>Press the above button the click a pic of your signature.</Text>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',marginTop:20,marginBottom:20 }}>
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
      
        <Button
         color="red"
          title="File FIR"
          onPress={this.submit}
        />

       </View>
       
       </ScrollView>
        
      </View>
    );
  }



}

const TabNavigator = createBottomTabNavigator({
  "File Fir": {
    screen: FileFir,
  },
  "View Fir":{
    screen : ViewFir,
  }
});

export default createAppContainer(TabNavigator);