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

- [] applicationID (from Armin)
- [] Primary & header color
- [] webClientId (from firebase)
- [] Terms and conditions
- [] Social media links
- [] About us (either locally or through web)

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

## iOS

Automatically launch icon is used

## Android

Seems like svg might be the best option, if you try to use .png that is not the right format, icons could turn out all white, avoid that

![Alt text](./__readme-images/Android-notification-icon.png "Notifications")

# Splash screens

# Firebase setup

# Appcenter setup

# Stores setup

# Testiranje notifikacija
