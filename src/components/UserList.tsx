import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import OpenedStory from "./OpenedStory";

const UserList = React.memo(({ userInfo }: { userInfo: User[] }) => {
  const [openedStory, setOpenedStory] = useState<User | null>(null);

  const handlePressUser = (user: User) => {
    setOpenedStory(user);
  };

  const handleCloseStory = () => {
    setOpenedStory(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={userInfo}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        style={styles.flatList}
        ItemSeparatorComponent={() => <View style={{ width: 15 }}></View>}
        ListHeaderComponent={() => <View style={{ width: 12 }}></View>}
        ListFooterComponent={() => <View style={{ width: 20 }}></View>}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.userContainer}
              onPress={() => handlePressUser(item)}
            >
              <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: item.avatar }}
                  style={styles.avatarImage}
                />
              </View>
              <Text style={styles.userName} numberOfLines={1}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      {openedStory && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={handleCloseStory}
        >
          <OpenedStory
            userInfo={userInfo}
            closeStory={handleCloseStory}
            user={openedStory}
          />
        </Modal>
      )}
    </View>
  );
});

export default UserList;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
  },
  flatList: {
    flex: 1,
    maxHeight: 200,
  },
  userContainer: {
    display: "flex",
    alignItems: "center",
    width: 70,
    height: 100,
    flex: 1,
  },
  avatarContainer: {
    height: 70,
    width: 70,
    padding: 1,
    borderWidth: 3,
    borderColor: "#29abe2",
    borderRadius: 100,
  },
  avatarImage: {
    height: "100%",
    width: "100%",
    borderRadius: 100,
  },
  userName: {
    flex: 1,
    width: "100%",
    textAlign: "center",
    marginTop: 5,
    fontWeight: "500",
    fontSize: 14,
  },
});
