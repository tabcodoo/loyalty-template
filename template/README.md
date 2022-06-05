# loyalty-demo-mobile

This Project serves as base blueprint for the loyalty project and to show off to clients what is possible with loyalty.

To create new project, the first step is to create repo for it in imperea-dev organisation: e.g. loyalty-demo-copy-test2
Clone the repo

-------- Local repo --------
Create new branch "git co -b develop"
git push --set-upstream origin develop

npx react-native init loyaltyDemoCopy2 (the name of new client app)

Move all files from loyaltyDemoCopy2 folder to repo folder (manuall or with commands):
mv ./loyaltyDemoCopy2/\*(D) ./
rm -rf loyaltyDemoCopy2

Copy from package.json -> dependencies, devDependencies, jest

copy templates and patches folder to a new project
yarn install
IMPORTANT: complete instalation of this package https://docs.expo.io/bare/installing-unimodules/

Copy tsconfig.json

Copy react-native.config.js

Copy index.js

Copy babel.config.js

Copy firebase.json

Disable landscape mode: https://learncode.net/2019/03/28/how-to-disable-landscape-mode-in-react-native/
ANDROID :: Add android:screenOrientation="portrait" to AndroidManifest(main)
IOS :: Project -> Targets -> MainTarget(appName) -> Deployment info -> Device orientation

Copy local.properties to android folder

react-native link

Go to android/app/build.gradle

For chinease icons -> https://github.com/oblador/react-native-vector-icons/issues/1106
Add: apply from: "../../node_modules/react-native-vector-icons/fonts.gradle" in the end of the code.

apply plugin: 'com.google.gms.google-services'

implementation 'com.android.support:multidex:1.0.3'
implementation "androidx.browser:browser:1.2.0"

defaultConfig{
missingDimensionStrategy 'react-native-camera', 'general'
multiDexEnabled true
}

Go to android/build.gradle

minSdkVersion = 21

classpath 'com.google.gms:google-services:4.3.3'

Go to android/gradle.properties

org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8

Go to android/app/src/main/res/values/styles.xml

< item name="android:forceDarkAllowed">false</item>

< item name="android:textColor">#000000</item>

< item name="android:datePickerDialogTheme">@style/MyDialogTheme</item>

< item name="android:timePickerDialogTheme">@style/MyDialogTheme</item>

< item name="android:windowIsTranslucent">true</item>

<style name="MyDialogTheme" parent="Theme.AppCompat.Light.Dialog">

    <item name="colorAccent">#cea589</item>

</style>

Create android/app/src/main/res/values/colors.xml

< resources>

    < color name="white">#FFF</color>

    < color name="main">#cea589</color>

    < color name="splashscreen_bg">#cea589</color>

< /resources>

Copy Drawable and Layout folders from android/app/src/main/res, these will be used for splash screen

Go to AndroidManifest.xml and copy relevant lines:

<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.VIBRATE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.MANAGE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.DOWNLOAD_WITHOUT_NOTIFICATION" />

<meta-data
    android:name="com.google.firebase.messaging.default_notification_icon"
    android:resource="@mipmap/ic_notification" />

<queries>
      <intent>
        <action android:name="android.intent.action.VIEW" />
        <data android:scheme="https" />
      </intent>
    </queries>

<application
android:screenOrientation="portrait"
android:requestLegacyExternalStorage="true"
... >

<intent-filter>
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.LAUNCHER" />
    <action android:name="android.intent.action.DOWNLOAD_COMPLETE"/>
</intent-filter>

Create new workflow action in folder .github/ and change fields
name: Demo 2
dst_repo_name: loyalty-demo-copy-test2

commit changes

git pull in loyalty-demo-copy-test2 repo

Copy App.js

create empty src folder

Create folder below src, called constants

-- iOS --

Podfile

permissions_path = '../node_modules/react-native-permissions/ios'

pod 'Permission-Camera', :path => "#{permissions_path}/Camera"

In AppDelegate.m add firebase and splashscreen
Add LaunchScreen.xib from previous project, change values for splash screen

---

Flow for all of the loyalty projects should be:

1.  Whenever changes are pushed to master,
    the "src" folder of demo repo is copied to all the other repositories and their "src" folder automatically

2.  "constants" folder should be unique to every repo itself and it should contain assets and values specific to the new project

    List of constants that will be used:

         - API
         - React native paper theme

3.  Native settings should be done by hand but follow Readme of demo app

    This part contains all the steps that are required to be fullfilled by other repositories to contain the same native configuration as the demo app.

-------------------------------------------------- NATIVE SECTION --------------------------------------------------
All files for every Loyalty project should be contained and updated on:

https://drive.google.com/drive/folders/1vHdoU1Zbmme2j-_-YYReEuFdhIcGf2tE?usp=sharing

Create new project Folder, add sheet with specific info for new client
Three folders android, assets, ios.
Here save project specific files used in the project

------------------------ Signing android ------------------------

keytool -genkeypair -v -keystore loyalty-demo.keystore -alias loyalty-demo -keyalg RSA -keysize 2048 -validity 10000

loyalty-demo.keystore

loyalty-demo

pw: imperea

Put generated keystore to android/app folder, and store it on drive.
Then go to github.com and store the keystore in android/app folder (delete it locally) the git pull (This will be usefull for CI CD on appcenter)
Open gradle.properties -> paste

MYAPP_UPLOAD_STORE_FILE=loyalty-demo.keystore
MYAPP_UPLOAD_KEY_ALIAS=loyalty-demo
MYAPP_UPLOAD_STORE_PASSWORD=imperea
MYAPP_UPLOAD_KEY_PASSWORD=imperea

Open android/app/build.gradle
...
android {

...
defaultConfig { ... }

signingConfigs {

    release {

        if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
            storeFile file(MYAPP_UPLOAD_STORE_FILE)
            storePassword MYAPP_UPLOAD_STORE_PASSWORD
            keyAlias MYAPP_UPLOAD_KEY_ALIAS
            keyPassword MYAPP_UPLOAD_KEY_PASSWORD
        }

    }

}

buildTypes {

    release {
        ...
        signingConfig signingConfigs.release
        }
    }

}
...

Then manually upload keystore to the github, then appcenter distributions will work

**\*\***\***\*\*** RELEASE BUILD FAILING ON APPCENTER OR WHILE SETUPING **\*\***\***\*\***
https://github.com/facebook/react-native/issues/19239#issuecomment-499310486

------------------------ SPLASH SCREEN ------------------------
For iOS cop LaunchScreen.xib from loyalty demo workspace and change color, logo and splash screen background in Images.xcassets

https://medium.com/handlebar-labs/how-to-add-a-splash-screen-to-a-react-native-app-ios-and-android-30a3cec835ae

Android:

    - Add layout folder to the res folder
    - Add drawable folder to the res folder
    - Add colors file to the res/values folder

    - MainActivity
        - import android.os.Bundle; // here
        - import org.devio.rn.splashscreen.SplashScreen; // here

        SplashScreen.show(this); // here

    - styles.xml
        ...
            <item name="android:datePickerDialogTheme">@style/MyDialogTheme</item>
            <item name="android:timePickerDialogTheme">@style/MyDialogTheme</item>
            <item name="android:windowIsTranslucent">true</item>
        </style>
        <style name="MyDialogTheme" parent="Theme.AppCompat.Light.Dialog">
            <item name="colorAccent">#0B3039</item> // THIS IS ALSO COLOR OF DATE TIME PICKER
        </style>

------------------------ FIREBASE ------------------------

Installation:
https://rnfirebase.io/#prerequisites

Messages:
https://rnfirebase.io/messaging/usage#installation

oAuth:
https://rnfirebase.io/auth/usage
https://github.com/invertase/react-native-apple-authentication

Go to firebase Loyalty dashboard, add new app with new bundle id from iOS and Android.
Copy configuration files to the project

https://github.com/invertase/react-native-firebase/issues/3015#issuecomment-757785903

Topic name will be applicationId.

For iOS generate apn keys and upload to firebase for a specific project

Create new iOS project with Bundle Idetifier, copy InfoPlist to xcode folder.

Generate signing report: cd android && ./gradlew signingReport
Copy release SHA values to the project you are creating, for the android notifications/logins to work
https://console.firebase.google.com/u/0/project/loyalty-a2424/settings/general/

------------------------ APP store configuration ------------------------

Go to https://developer.apple.com/account/resources/identifiers/list/bundleId
And create bundleId, for example: com.imperea.demo
Set it up in the Xcode project

Register a new key for Sign in with apple, download the key and put it into
https://drive.google.com/drive/folders/1vHdoU1Zbmme2j-_-YYReEuFdhIcGf2tE?usp=sharing

You cannot add Apple Push Notification to anymore projects, you can use previous key from Demo
found in Drive (you put that Key into the firebase for notifications to work correctly).

Add capabilities: SignInWithApple, Push Notifications, Background Modes -> Remote Notification

Go to Info -> URL type: copy to url schemes the REVERSED_CLIENT_ID from (GoogleService-Info)

Copy to Info.plist

<key>FirebaseMessagingAutoInitEnabled</key>
<true/>

<key>NSCameraUsageDescription</key>
<string>For coupon validation</string>

<key>NSLocationWhenInUseUsageDescription</key>
<string></string>

<key>UIRequiredDeviceCapabilities</key>
<array>
<string>armv7</string>
</array>

------------------------ PLAY store configuration ------------------------

Upload google services json to android/app

If you have .xml errors here is the solution https://github.com/facebook/react-native/issues/19239#issuecomment-499310486

------------------------ CHANGING COLORS ------------------------

go to /constants/index

change primary color and header color

go to /android/app/src/res/values/colors.xml

main: #69c9d2
splashscreen_bg: #69c9d2

for iOS change main color of splash screen in LaunchScreen.xib

------------------------ CHANGING LOGO ------------------------

go to /constants/Logo.tsx

Create <Svg from new logo

add width="200"
height="150"

Android:
