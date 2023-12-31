import React, { useState, useEffect } from "react"

import { View, Text, SafeAreaView, ScrollView, StyleSheet, Dimensions, Modal } from "react-native"

import {
	AppButton,
	AppTextInput,
	GetAsync,
	RouteParamsModal,

	SlideBox

} from "../../Components"
import validator from "validator"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Picker } from "@react-native-picker/picker"

import GestureRecognizer from "react-native-swipe-gestures";


const { width, height } = Dimensions.get("window")

export default function RoutesScreenForm() {

  const[modalVisible, setModalVisible] = useState(false)

  const [startPostcodeInput, setStartPostcodeInput] = useState("");
  const [endPostcodeInput, setEndPostcodeInput] = useState("");
  const [token, setToken] = useState("");
  const [route, setRoute] = useState(false);
  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [fDate, setFDate] = useState("");
  const [displayDate, setDisplayDate] = useState("")
  const [displayTime, setDisplayTime] = useState("")
  const [fTime, setFTime] = useState("");
  const [paramsModal, setParamsModal] = useState(false);
  const [selectedParams, setSelectedParams] = useState({
    taxiOnlyChecked: false,
    nationalSearch: false,
    journeyPref: "",
    mode: "",
    walkingSpeed: "",
  });
  const [timeOption, setTimeOption] = useState("")

  const closeModal = () => {
    setModalVisible(false);
  };


	const showDatepicker = () => {
		setShowDatePicker(true)
		setShowTimePicker(false)
	}

	const showTimepicker = () => {
		setShowTimePicker(true)
		setShowDatePicker(false)
	}

	const hideDateTimePicker = () => {
		setShowDatePicker(false)
		setShowTimePicker(false)
	}

	const onDateChange = (selectedDate) => {
		const currentDate = selectedDate.nativeEvent.timestamp || date
		hideDateTimePicker()
		let tempDate = new Date(currentDate)
		const formattedDate =
    	tempDate.getDate().toString().padStart(2, "0") + "-" +
    	(tempDate.getMonth() + 1).toString().padStart(2, "0") + "-" +
    	tempDate.getFullYear().toString();
  		setFDate(
    	tempDate.getFullYear().toString() +
		(tempDate.getMonth() + 1).toString().padStart(2, "0") +
		tempDate.getDate().toString().padStart(2, "0")
  		);
  		setDisplayDate(formattedDate);
	}

	const onTimeChange = (selectedTime) => {
		const currentTime = selectedTime.nativeEvent.timestamp || date
		hideDateTimePicker()
		let tempTime = new Date(currentTime)
		setFTime(
			tempTime.getHours().toString().padStart(2, "0") +
			tempTime.getMinutes().toString().padStart(2, "0")
		)
		setDisplayTime(
			tempTime.getHours().toString().padStart(2, "0") + ":" +
			tempTime.getMinutes().toString().padStart(2, "0")
		)
	}

	const handleParamsSelection = (params) => {
		setSelectedParams(params)
	}

	async function clickPreferences() {
		setParamsModal(!paramsModal)
	}

	useEffect(() => {
		async function getToken() {
			setToken(await GetAsync("token"))
		}
		getToken()
	}, [])


  function dataValidation() {
    if (!startPostcodeInput || !endPostcodeInput) {
      alert("Fill in all fields.");
    } else if (
      !validator.isPostalCode(startPostcodeInput.trim(), "GB") ||
      startPostcodeInput.length < 5
    ) {
      alert("Enter a valid starting postcode.");
    } else if (
      !validator.isPostalCode(endPostcodeInput.trim(), "GB") ||
      endPostcodeInput.length < 5
    ) {
      alert("Enter a valid ending postcode.");
    } else {
      getRoute();
      setModalVisible(true)
    }
  }


	async function getRoute() {
		const startPostcode = startPostcodeInput.trim()
		const endPostcode = endPostcodeInput.trim()
		const useDate = fDate || ""
		const useTime = fTime || ""
		const timeIs = timeOption || ""
		// console.log(useDate)
		// console.log(useTime)
		// console.log(timeIs)
		// console.log(selectedParams.mode)
		// console.log(selectedParams.walkingSpeed)
		// console.log(selectedParams.taxiOnlyChecked)
		// console.log(selectedParams.nationalSearch)
		const options = {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": token,
			},
			body: JSON.stringify({
				origins: {
					from: startPostcode,
					to: endPostcode,
				},
				params: {
					taxiOnlyTrip: selectedParams.taxiOnlyChecked,
					nationalSearch: true,
					date: useDate || "",
					time: useTime || "",
					timeIs: timeIs || "",
					mode: selectedParams.mode || "",
					walkingSpeed: selectedParams.walkingSpeed || "",
					useRealTimeArrivals: true,
				},
			}),
		}
		// console.log({
		// 	taxiOnlyTrip: selectedParams.taxiOnlyChecked,
		// 	nationalSearch: true,
		// 	date: useDate || "",
		// 	time: useTime || "",
		// 	timeIs: timeIs || "",
		// 	mode: selectedParams.mode || "bus, overground, dlr, tube, taxi",
		// 	walkingSpeed: selectedParams.walkingSpeed || "",
		// 	useRealTimeArrivals: true,
		// })
		const response = await fetch(
			"https://metro-mingle.onrender.com/tfl/get",
			options
		)
		if (response.status == 200) {
			const data = await response.json()
			setRoute(data.journeys)
		} else {
			alert("Request failed.")
		}
	}

	return (
		<View style={{ justifyContent: "flex-start", alignItems: "center" }}>
			<ScrollView style={styles.screen}>
				<AppTextInput
					onChangeText={(text) => setStartPostcodeInput(text)}
					placeholder="Start Postcode"
				/>
				<AppTextInput
					onChangeText={(text) => setEndPostcodeInput(text)}
					placeholder="End Postcode"
				/>

      <View style={{alignSelf: "center"}}>
      <AppButton
        title={displayDate ? displayDate : "Set Date"}
        onPress={showDatepicker}
      />
      
      <AppButton
        title={displayTime ? displayTime : "Set Time"}
        onPress={showTimepicker}
      />


				{showDatePicker && (
					<DateTimePicker
						testID="dateTimePicker"
						value={date}
						mode="date"
						is24Hour={true}
						display="default"
						onChange={onDateChange}
					/>
				)}

      {showTimePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onTimeChange}
        />
      )}
      
        <Picker selectedValue={timeOption} onValueChange={(itemValue)=>setTimeOption(itemValue)}>
            <Picker.Item style={styles.pickerLabel} label="Select" value={null} />
            <Picker.Item style={styles.pickerLabel} label="Arrive By" value="arriving" />
            {/* <Picker.Item label="Depart" value="departing" /> */}
        </Picker>
 
      <AppButton onPress={clickPreferences} title="Preferences" />
      {paramsModal ? (
        <RouteParamsModal
          paramsModal={paramsModal}
          closeModal={clickPreferences}
          onParamsSelect={handleParamsSelection}
        ></RouteParamsModal>
      ) : null}
      <AppButton onPress={dataValidation} title="Submit" />
      </View>
      {/* {route

        ? route.map((r, index) => <Text key={index}>{r.summary}</Text>)
        : null} */}
      <GestureRecognizer style={{ flex: 1 }} onSwipeDown={() => {closeModal()}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
			<SafeAreaView style={styles.container}>
				<View>
					{route ? (
						<SlideBox
							slides={[
								{
									journey: route[0],
									content: "Route 1",
									onSelect: () => console.log("Red Selected"),
								},
								{
									journey: route[1],
									content: "Route 2",
									onSelect: () => console.log("Blue Selected"),
								},
								{
									journey: route[2],
									content: "Route 3",
									onSelect: () => console.log("Green Selected"),
								},
							]}
						/>
					) : null}
				</View>
			</SafeAreaView>
    </Modal>
    </GestureRecognizer>
		</ScrollView>
    </View>

	)
}

const styles = StyleSheet.create({
	screen: {
		height: "auto",
		paddingTop: 40,
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20,
		height: "auto",
	},
	pickerLabel: {
		fontSize: 25,
	}
})
