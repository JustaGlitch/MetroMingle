import React, { useState } from "react"
import {
	View,
	Pressable,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
} from "react-native"
import { Picker } from "@react-native-picker/picker"
const FilterDropdown = ({ selectedFilter, setSelectedFilter }) => {
	const [visible, setVisible] = useState(false)

	const filters = ["All", "Past", "Mine", "Attending", "Upcoming"]

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.text}> Filter Events:</Text>
				<Pressable
					title="Filter"
					style={styles.dropwonButton}
					onPress={() => setVisible(true)}
				>
					<Text style={styles.buttonText}>{selectedFilter.toString()}</Text>
				</Pressable>
			</View>

			<Modal
				transparent={true}
				animationType="slide"
				visible={visible}
				onRequestClose={() => setVisible(false)}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.title}>Select a filter:</Text>
						<Picker
							selectedValue={selectedFilter}
							onValueChange={(itemValue, itemIndex) =>
								setSelectedFilter(itemValue)
							}
						>
							{filters.map((filter, index) => (
								<Picker.Item label={filter} value={filter} key={index} />
							))}
						</Picker>

						<TouchableOpacity
							style={styles.button}
							onPress={() => setVisible(false)}
						>
							<Text style={styles.buttonText}>Done</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingBottom: 20,
		marginBottom: 10
	},
	text:{
		color: "black"
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0)",
	},
	modalContent: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		width: "80%",
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
	button: {
		backgroundColor: "#007bff",
		padding: 10,
		borderRadius: 5,
		width: 100,
		height: 40,
	},
	dropwonButton: {
		backgroundColor: "lightblue",
		padding: 10,
		borderRadius: 5,
		width: 100,
		height: 40,
	},
	buttonText: {
		color: "white",
		textAlign: "center",
		fontSize: 16,
		opacity: 1,
	},
})

export default FilterDropdown
