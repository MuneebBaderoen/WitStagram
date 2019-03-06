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
    const offset = 50;
    return Promise.resolve([
      "fact 1",
      "fact 2",
      "fact 3",
      "fact 4",
      "fact 5",
      "fact 6",
      "fact 7",
      "fact 8",
      "fact 9"
    ]);
    // return fetch(`https://cat-fact.herokuapp.com/facts`)
    //   .then(response => response.json())
    //   .then(response =>
    //     response.all
    //       .slice(offset, offset + numberOfFacts)
    //       .map(item => item.text)
    //   );
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
