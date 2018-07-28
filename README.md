### Deprecated
This repository is no longer updated, please see https://github.com/Jerameel/Catalyst for an improved template using React's Context API.


# Reactor

#### A dynamic **react-native** template using redux and react-navigation.

![Alt Text](./screenshots/android/animated.gif)

## Features

* Conditional screen rendering with redux and react-navigation
* redux-logger enabled
* Implementation of custom drawer navigation
* Dynamic login and register screen
* Modern mix of flat and material design
* Saving session state with AsyncStorage
* Fully customizable components and styles

## Building Demo

1.  Initialize node modules with **yarn install**.
2.  Create an instance of react-native packager by **react-native start**.
3.  Make sure a device is connected.
    ### Android
4.  Execute **react-native run-android** for android.
    ### iOS
5.  **react-native run-ios** for iOS.

## Creating a New Project

1.  Initialize a new project.

```
react-native init [project-name]
```

2.  Add essential packages.

```
yarn add react-navigation react-redux redux redux-thunk redux-logger react-native-vector-icons
```

3.  Link libraries to native code.

```
react-native link
```

4.  Copy the **src** folder inside the new project folder.
5.  Register the component by modifying the **index.js** inside the new project folder and directly import App from **src/index.js** instead of **App.js**.
6.  Delete the old **App.js** file.
7.  Start the packager.

```
react-native start
```

8.  Build and run the application

```
#Android
react-native run-android

#iOS
react-native run-ios
```

## Contribute

Feel free to contribute to the development of this template. Please take note of the coding standard used in this project. You can request for a feature in the "Issues" section of the repository.

## License

Copyright 2017 Jerameel M. Delos Reyes

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
