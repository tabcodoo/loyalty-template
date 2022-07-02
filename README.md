<p align="center">
  <!-- <a href="https://echobind.com">
    <img src="https://camo.githubusercontent.com/d22763c73585cf5d4cf87534659689c2a6b3f214/68747470733a2f2f7265732d332e636c6f7564696e6172792e636f6d2f6372756e6368626173652d70726f64756374696f6e2f696d6167652f75706c6f61642f635f6c7061642c685f3235362c775f3235362c665f6175746f2c715f6175746f3a65636f2f76313439393437333135312f68326b3233696f6f3479687230676a746f636d792e6a7067" alt="Logo" width="80" height="80">
  </a> -->

  <h3 align="center">Template for Loyalty projects</h3>

  <p align="center">
    Our Recommended template for Loyalty projects.
    <br />
  </p>
</p>
<hr>

# List of things needed to release apps

- applicationID (from Bojan)
- Primary & header color
- webClientId (from firebase)
- Terms and conditions
- Social media links
- About us (either locally or through web)

- App name \*
- Short description \*
- Full description \*
- App icon \* 512x512
- Feature graphic \* 1024x500
- Phone screenshots \* Upload 2-8 phone screenshots. Screenshots must be PNG or JPEG, up to 8 MB each, 16:9 or 9:16 aspect ratio, with each side between 320 px and 3,840 px

# Quickstart

# Create new repository in the organisation:

https://github.com/organizations/tabcodoo/repositories/new

![Alt text](./__readme-images/github-create.png "Github create new project")

## Clone it locally

```
git clone git@github.com:tabcodoo/template-test.git
```

![Alt text](./__readme-images/clone.png "Github clone new project")

## Go into the cloned folder

```
cd template-test
git checkout -b develop
git push --set-upstream origin develop
```

# Make sure to set template repo to public before you try to use it:

https://github.com/tabcodoo/loyalty-template.git

## To generate new client based on the template of :

```
npx react-native init ImeNovogKlijenta --template https://github.com/tabcodoo/loyalty-template.git --skip-install
```

![Alt text](./__readme-images/generated-new-client.png "Github new client structure")

Through VS code, copy the files from the folder ImeNovogKlijenta into the root folder and delete empty one ImeNovogKlijenta

![Alt text](./__readme-images/generated-new-client-extracted-files.png "Github new client structure")

# Rename new client

### Change the name of the project, folders in it and bundle ID of app:

```
npx react-native-rename NovoIme -b com.tabco.imeNovogKlijenta
```

### Change the app display name on these locations by searching for

```
Loyalty Demo
```

![Alt text](./__readme-images/rename.png "Rename")

# Github actions

Create new workflow action in main project for new repository
https://github.com/tabcodoo/loyalty-mobile-app-dev

For example:

```
name: Template Test
dst_repo_name: template-test
```

Make sure that the new project has develop branch, and every new change in the main branch in demo loyalty project will copy its source to the ones in github actions

![Alt text](./__readme-images/github-actions.png "Github Actions")

# Constants file setup

- applicationID (from Bojan)
- Primary & header color
- webClientId (from firebase)
- Terms and conditions
- Social media links
- About us (either locally or through web)

![Alt text](./__readme-images/constants-folder.png "Step1")

# Launch icons

## Android

To generate icons for android:

- Open android folder via android studio
- Follow as in images below

![Alt text](./__readme-images/Android-icon-step-1.png "Step1")
![Alt text](./__readme-images/Android-icon-step-2.png "Step3")
![Alt text](./__readme-images/Android-icon-step-3.png "Step3")

- The result

  ![Alt text](./__readme-images/Android-icon-step-4.png "Results")

## iOS

- Open xcode project (.xcworkspace extension)
- Follow steps below

![Alt text](./__readme-images/iOS-step-1.png "Step1")

## To generate icons for iOS use 1024x1024 image - https://appicon.co/

![Alt text](./__readme-images/iOS-step-2.png "Step2")

### Drag and drop images to their correct sizes

![Alt text](./__readme-images/iOS-step-3.png "Step3")

- The result

![Alt text](./__readme-images/iOS-step-4.png "Results")

# Notification icons

## Android

Seems like svg might be the best option, if you try to use .png that is not the right format, icons could turn out all white, avoid that

![Alt text](./__readme-images/Android-notification-icon.png "Notifications")

After it is generated change path to drawable inside AndroidManifest

```
  <meta-data
    android:name="com.google.firebase.messaging.default_notification_icon"
    android:resource="@drawable/ic_notification" />
```

## iOS

Automatically launch icon is used

# Stores setup

## Android

https://play.google.com/console

![Alt text](./__readme-images/store-android-1.png "Android store step 1")

App name \*

Short description \*

Full description \*

App icon \* 512x512

Feature graphic \* 1024x500

Phone screenshots \* Upload 2-8 phone screenshots. Screenshots must be PNG or JPEG, up to 8 MB each, 16:9 or 9:16 aspect ratio, with each side between 320 px and 3,840 px

![Alt text](./__readme-images/store-android-2.png "Android store step 3")

App or game \*

Email address \*

Category \*

## iOS

https://appstoreconnect.apple.com/apps

![Alt text](./__readme-images/store-iOS-1.png "iOS store step 1")

App Previews and Screenshots (Use)

# Firebase setup

https://console.firebase.google.com/u/0/project/loyalty-1-7b2d8/overview

## Android

Add android app into the firebase project and follow the second step (other steps are already implemented)

![Alt text](./__readme-images/firebase-android-1.png "Firebase setup Android")

Generate keystore for production versions of the app

- https://reactnative.dev/docs/signed-apk-android

update firebase android project with certs

```
cd android && ./gradlew signingReport && cd ..
```

Add SHA fingerprints to the firebase android project so it could oAuth

- https://console.firebase.google.com/u/0/project/loyalty-1-7b2d8/settings/general/android:com.tabco.chipas

## iOS

Add iOS app into the firebase project and follow the second step (other steps are already implemented)

![Alt text](./__readme-images/firebase-ios-1.png "Firebase setup iOS")

Get reverse client ID from downloaded firebase file and paste it in here
![Alt text](./__readme-images/firebase-ios-2.png "Firebase setup iOS")

Download certs from drive and upload them to firebase iOS config
https://drive.google.com/drive/folders/1hCcEm2fGI0krXe4CeGDvMwPMlKjSGjMg

As in previous projects we have here  
https://console.firebase.google.com/u/0/project/loyalty-1-7b2d8/settings/cloudmessaging

# Testiranje notifikacija

# Splash screens

## Android

If you want to use only logo with color background, change these values.

![Alt text](./__readme-images/Android-splashscreen.png "Splash screen")

## iOS

If you want to use only logo with color background, change these values.

![Alt text](./__readme-images/iOS-splashscreen.png "Splash screen")

# Animated splash screens

https://www.npmjs.com/package/react-native-lottie-splash-screen

```
yarn remove react-native-splash-screen
```

Replace all imports
![Alt text](./__readme-images/Android-animated-splashscreen.png "Animated Splash screen")

```
yarn add lottie-react-native
```

Adjust the assets

# Appcenter setup

## Android

Create android app

- https://appcenter.ms/orgs/tabco/applications/create

![Alt text](./__readme-images/appcenter-step-1.png "Appcenter step 1")

![Alt text](./__readme-images/appcenter-step-2.png "Appcenter step 2")

Create public group in project

- https://appcenter.ms/orgs/tabco/apps/Chipas/distribute/distribution-groups

Configure branch as in other appcenter projects

Put public link in asana task for specific project

- https://app.asana.com/0/1202066263371626/1202103654021204/f

Add webhook so it can notify when build is succesfull

- https://appcenter.ms/orgs/tabco/apps/Chipas/settings/webhooks
- https://hooks.slack.com/services/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

## iOS

If you want to use only logo with color background, change these values.

![Alt text](./__readme-images/iOS-splashscreen.png "Splash screen")
