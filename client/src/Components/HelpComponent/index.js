import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Linking
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";

import AppButton from "../AppButton";

const openLink = (url) => {
    Linking.openURL(url);
  };

function Help() {
    const [modalHelpVisible, setModalHelpVisible] = useState(false);
    const [selectedHelpOption, setSelectedHelpOption] = useState(null);
  
    const helpModal = (option) => {
      setSelectedHelpOption(option);
      setModalHelpVisible(true);
    };
  
    const closeHelpModal = () => {
      setModalHelpVisible(false)
    }


    return (
        <View style={styles.container}>
        <View style={styles.line} />
    <Text style={styles.header}>Help</Text>

      <TouchableOpacity onPress={() => helpModal(1)}>
        <Text style={styles.click}>FAQ</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => helpModal(2)}>
        <Text style={styles.click}>About App</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => helpModal(3)}>
        <Text style={styles.click}>Delete Account</Text>
      </TouchableOpacity>

      <GestureRecognizer style={{ flex: 1 }} onSwipeDown={() => closeHelpModal()}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalHelpVisible}
        onRequestClose={() => setModalHelpVisible(false)}
      >
        <View style={styles.modalContainer}>
          {selectedHelpOption === 1 && (
            <View style={{paddingTop: 65}}>
              <ScrollView>
                <Text style={styles.info}>Is my data safe?</Text>
                <Text style={styles.placeholderText}>
                  Placeholder text for data safety goes here. You can find key information, privacy and security settings all in your Google Account. We have created easy-to-use tools like Dashboard and My Activity, which give you transparency data collected from your activity across Google services. There are also powerful privacy controls such as Activity Controls and Ad Settings, which allow you to switch the collection and use of data on or off to decide how all of Google can work better for you.
                </Text>

                <Text style={styles.info}>How to share my event on Social Media?</Text>
                <Text style={styles.placeholderText}>
                  Placeholder text for sharing on social media goes here. You can find key information, privacy and security settings all in your Google Account. We have created easy-to-use tools like Dashboard and My Activity, which give you transparency data collected from your activity across Google services. There are also powerful privacy controls such as Activity Controls and Ad Settings, which allow you to switch the collection and use of data on or off to decide how all of Google can work better for you.
                </Text>

                <Text style={styles.info}>Can I use this app for businesses?</Text>
                <Text style={styles.placeholderText}>
                  Placeholder text for using the app for businesses goes here. You can find key information, privacy and security settings all in your Google Account. We have created easy-to-use tools like Dashboard and My Activity, which give you transparency data collected from your activity across Google services. There are also powerful privacy controls such as Activity Controls and Ad Settings, which allow you to switch the collection and use of data on or off to decide how all of Google can work better for you.
                </Text>
              </ScrollView>
            </View>
          )}
          {selectedHelpOption === 2 && (
            <View>
              <Text style={styles.info}>Metro Mingle - to travel, to track</Text>
              <Text style={styles.placeholderText}>
                Placeholder text for Metro Mingle goes here. Describe the app's features, purpose, and any other relevant information.
              </Text>

              <Text style={styles.info}>Meet the team</Text>

              <TouchableOpacity onPress={() => openLink("https://github.com/JustaGlitch")}>
                <Text style={styles.link}>Justin, Project Lead</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => openLink("https://github.com/pablo-romeroclavijo")}>
                <Text style={styles.link}>Pablo, Backend Developer</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => openLink("https://github.com/swthes")}>
                <Text style={styles.link}>Sidique, Frontend Developer</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => openLink("https://github.com/olgaKhristo")}>
                <Text style={styles.link}>Olga, Frontend Developer</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => openLink("https://github.com/AndrewAmir003")}>
                <Text style={styles.link}>Andrew, Frontend Developer</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => openLink("https://github.com/AnoopBhandal")}>
                <Text style={styles.link}>Anoop, Frontend Developer</Text>
              </TouchableOpacity>
            </View>
          )}
          {selectedHelpOption === 3 && (
            <Text style={styles.info}>Delete my account content goes here</Text>
          )}

          <View style={{ alignSelf: "center", marginBottom: 20 }}>
            <AppButton
              title="Close"
              onPress={() => setModalHelpVisible(false)}
              style={styles.info}
            />
          </View>
        </View>
      </Modal>
      </GestureRecognizer>

      </View>
    );
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     padding: 20
    },
    header: {
      fontSize: 35,
      fontWeight: "bold",
      marginBottom: 20,
      marginTop: -110,
    },
    info: {
      fontWeight: "bold",
      alignItems: "flex-start",
      marginVertical: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      marginTop: 0,
    },
    click: {
      fontWeight: "bold",
      textAlign: "left",
      fontSize: 23,
    },
    link: {
      color: "blue",
      marginVertical: 5,
    }
  });

export default Help;
