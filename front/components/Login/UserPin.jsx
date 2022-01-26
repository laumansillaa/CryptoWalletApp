    
//    function handleSubmit(){
//         setMessage("Loading...");
//           if(error === ""){
//             if(pin !== ""){
//                 if (pin === userData?.pin) {
//                         dispatch(Log(userToken));
//                         setMessage("Sign in succeeded.");
//                         dispatch(TokenLogOut());                   
//                     }
//             


import Icon from "react-native-vector-icons/Ionicons"
import React, { useEffect, useRef, useState } from "react"
import { SafeAreaView, StatusBar, } from "react-native"
import ReactNativePinView from "react-native-pin-view"
import { Text } from "native-base";
import { useDispatch, useSelector } from 'react-redux';
import { getDataUser, Log, TokenLogOut} from '../../redux/actions';

export default function UserPin () {
  const dispatch = useDispatch();
  const pinView = useRef(null);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [enteredPin, setEnteredPin] = useState("");
  const [showCompletedButton, setShowCompletedButton] = useState(false);  
  const userToken = useSelector(state => state.userToken);
  const userData = useSelector(state => state.userData);
  useEffect(() => {
    if (enteredPin.length > 0) {
      setShowRemoveButton(true)
    } else {
      setShowRemoveButton(false)
    }
    if (enteredPin.length === 6) {
      setShowCompletedButton(true)
    } else {
      setShowCompletedButton(false)
    }
    dispatch(getDataUser());
  }, [enteredPin])
  return (
    <>
      <StatusBar barStyle="light-content" />
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "#18181b", justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              paddingTop: 24,
              paddingBottom: 48,
              color: "#059669",
              fontSize: 30,
            }}>
            Insert your pin
          </Text>
          <ReactNativePinView
            inputSize={32}
            ref={pinView}
            pinLength={6}
            buttonSize={60}
            onValueChange={value => setEnteredPin(value)}
            buttonAreaStyle={{
              marginTop: 24,
            }}
            inputAreaStyle={{
              marginBottom: 24,
            }}
            inputViewEmptyStyle={{
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "#FFF",
            }}
            inputViewFilledStyle={{
              backgroundColor: "#FFF",
            }}
            buttonViewStyle={{
              borderWidth: 1,
              borderColor: "#18181b",
            }}
            buttonTextStyle={{
              color: "#FFF",
            }}
            onButtonPress={key => {
              if (key === "custom_left") {
                pinView.current.clear()
              }
              if (key === "custom_right") {
                if (enteredPin === userData?.pin) {
                    dispatch(Log(userToken));
                    dispatch(TokenLogOut());                   
                }
              }
            }}
            customLeftButton={showRemoveButton ? <Icon name={"ios-backspace"} size={36} color={"#FFF"} /> : undefined}
            customRightButton={showCompletedButton ? <Icon name={"caret-forward-circle-sharp"} size={36} color={"#FFF"} /> : undefined}
          />
        </SafeAreaView>
    </>
  )
}