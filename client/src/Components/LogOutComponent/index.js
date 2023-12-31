import React from "react";
import { Text, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import colors from "../../config/colors";
import AppButton from "../AppButton";

const LogoutButton = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // Remove token from AsyncStorage
      await AsyncStorage.removeItem('token');
      
      // Ask for confirmation
      Alert.alert(
        "Logout",
        "Are you sure you want to log out?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "Logout", onPress: () => logoutConfirmed() },
        ]
      );
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const logoutConfirmed = () => {
    // Navigate to the login screen
    navigation.navigate("LogIn");
  };

  return (
    <AppButton title="Logout" onPress={handleLogout} color="primary" />
  );
};

export default LogoutButton;

