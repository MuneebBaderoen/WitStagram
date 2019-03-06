import { Contacts, Permissions } from "expo";
import { CameraRoll } from "react-native";

const formatName = name => {
  return name
    .split(" ")
    .join("")
    .toLowerCase();
};

export const DataService = {
  fetchCatFacts: numberOfFacts => {
    return Promise.resolve(["One", "Two"]);
    // return fetch(`https://glacial-lowlands-15829.herokuapp.com/`)
    //   .then(response => response.json())
    //   .then(response => response.slice(0, numberOfFacts));
  },
  getContacts: async () => {
    const { status: contactsStatus } = await Permissions.askAsync(
      Permissions.CONTACTS
    );
    if (contactsStatus === "granted") {
      const response = await Contacts.getContactsAsync();
      const contacts = response.data
        .filter(item => item.imageAvailable)
        .map(item => ({
          name: formatName(item.name),
          uri: item.image.uri
        }));

      return contacts;
    }
  },
  getPhotos: async (numberOfPhotos, photosEndCursor) => {
    const { status: cameraRollStatus } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (cameraRollStatus === "granted") {
      const response = await CameraRoll.getPhotos({
        first: numberOfPhotos,
        after: photosEndCursor
      });
      return {
        photos: response.edges.map(item => ({
          uri: item.node.image.uri,
          liked: false
        })),
        photosEndCursor: response.page_info.end_cursor
      };
    }
  }
};
