## React Native vs React

- The primitives

  - In react the primitives are html primitives: div, span, p, etc
  - In react native your primitives are closer to mobile: View, Text, FlatList, Scrollview

- Tooling

  - Debugging is a little different, though you're still in the chrome debugger
  - Turning things off and on again really does work
  - Packager / App / Debugger

- Productive in one maps closely to being productive in the other

## Before the project begins

- Choose a component library

  - Chances are your design requirements can be fullfilled mostly by a third party library
  - Custom components should differentiate your app from the world, theres no need to build what already exists
  - React libraries are not guaranteed to work here

- Choose your state management

  - You've got choices here. Redux, Mobx, Context API, Component State, etc.
  - Everything that works for React works here\*

- Define any API's you need as soon as possible

  - Working with well-defined data makes it much easier to produce good UI

## Scaffolding the app (Demo only)

- Generate blank project
- Install our component library: react-native-paper
- Checkpoint 0 --------------------
- Add basic navigation toolbar: two buttons that each display different text
- Get permissions for device API's we want to use: contacts, camera, camera roll

### Build feed (Code along)

- Checkpoint 1 --------------------
- Setup our colour theme and statusbar
- (Given) Get data from device into component state: contacts, camera roll (console log is good enough)
- (Given) Get data from remote API: cat facts
- Iterate over the list of photos
- Get the necessary bits of data per item: random list items, formatting, etc
- Create a scrollview and wrap the list of items
- Make the items look more like we want them to in the end
  - Add cards, padding, header
  - Change flexDirection for header to get desired layout
  - Add icon button for the like button
- Checkpoint 2 --------------------
- Add loading indicator on page load
- Port Scrollview to FlatList
- Add Pull Refresh
- Add Infinite scroll

### Build camera (Code along)

- Checkpoint 3 --------------------
- (Given) Get permissions from the device
- (Given) Add Camera view to the screen
- Add buttons, style them, console log button behaviour
- Showing bounds with rectangles vs toggle inspector
- Bind camera ref
- Take a photo
- Save it to camera roll
- Add feedback for the user
- Animate the feedback
