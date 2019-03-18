import { Contacts, Permissions } from "expo";
import { CameraRoll } from "react-native";

const formatName = name => {
  return name
    .split(" ")
    .join("")
    .toLowerCase();
};

export const DataService = {
  fetchFacts: numberOfFacts => {
    // return Promise.resolve([
    //   "You can hide a component by returning null from the render method",
    //   "The InVision inspect tool allows engineers to interact with the layers of your designs pulled through from Sketch",
    //   "Components can conditionally prevent rendering using the shouldComponentUpdate lifecycle method",
    //   "Sketch lets you set your artboard size to the screen size of your app. This gives engineers a better idea of what the app should look like at different screen sizes",
    //   "JSX gets converted to JavaScript function calls by transpilers like Babel",
    //   "React and React Native have a large community, providing plenty of useful libraries and components",
    //   "Material Design is just one of many design systems out in the world. Do your research, and choose a paradigm that works for the look and feel you want to create",
    //   "Inside a block of JSX, the pair of curly braces allows JavaScript expressions to be used, and the return value of the expression is rendered",
    //   "You should always test your app on different screen sizes, and ensure the experience is still optimal for your users",
    //   "React components form a tree, like the DOM, where components are responsible for rendering themselves, and all child components",
    //   "CSS is a powerful styling language, but CSS3 still has many unsupported properties, even in the browser. UI driven by JavaScript is often necessary for complex interactions",
    //   "React Native runs UI components on a separate thread to JS. You can observe this on some components by setting a breakpoint in JS, and noticing that the component still responds to interactions",
    //   "Material Design components were actually tested in three dimensions with real paper and ink, before being implemented digitally",
    //   "Expo is a project for simplifying the app development process for those not comfortable in native mobile development territory. It offers an abstraction for the responsibility of compiling artifacts for each platform and is great for getting started",
    //   "React Native does not support all CSS properties, but provides first class support for FlexBox layouts",
    // ]);

    return fetch(`https://glacial-lowlands-15829.herokuapp.com/`).then(
      response => response.json()
    );
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
