# WitStagram

#### Getting started with React Native

---

Welcome to the repository for the guided tour through the fundamentals of React Native

To follow along, you'll need to install the React Native toolchain on your machine. Follow the instruction below to get the necessary dependencies on your machine

1. [Install nodejs](https://nodejs.org/en/)

---

2. Install the expo cli tool. More information on Expo can be [found here](https://expo.io/)

```
npm install -g expo-cli
```

---

3. On your phone, download the Expo app from the [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent), or [Apple App Store](https://itunes.apple.com/za/app/expo-client/id982107779). We'll need this wrapper app to run the app we'll be building

---

4. Clone this repository on your machine

```
$ git clone https://github.com/MuneebBaderoen/WitStagram.git
```

---

5. Change directory into the freshly cloned repository, and install the necessary dependencies

```
$ cd WitStagram
$ npm install
```

---

6. Once the necessary packages are installed, you should be able to launch the expo packager, to bundle javascript assets

```
$ expo start
```

---

7. Once the packager is running and serving the javascript assets for our new app, we need to get it on a real phone!

- Android:

  - Launch the Expo App, ignore any prompts to sign in as this step is optional.
  - Select the `Projects` tab
  - Select `Scan QR Code`
  - Point your camera at the QR Code, and wait for the app to run :)

- iOS:

  - Open the default iOS Camera app
  - Point your camera at the QR Code
  - A prompt should appear at the top of your screen, suggesting to open the link using the Expo app
  - Open the link using the Expo app, and wait for the app to run :)
