Mobile builds: Android APK and iOS IPA
======================================

This project is a Vite + React app already wired with Capacitor. Follow these steps to produce installable builds from scratch. Nothing is assumed; every required install and command is listed.

Prerequisites
-------------
- Node.js and npm.
- Android:
  - Install Android Studio from https://developer.android.com/studio.
  - During setup, let it install the Android SDK and at least one emulator image.
- iOS (Mac only):
  - Install Xcode from the App Store (must be the full app, not just command-line tools).
  - Open Xcode once to finish setup.
  - Install CocoaPods: `sudo gem install cocoapods`.
  - If needed: `sudo xcode-select --switch "/Applications/Xcode.app/Contents/Developer"` and `sudo xcodebuild -runFirstLaunch` (accept license if prompted).

Initial project setup (one-time per machine)
--------------------------------------------
1) Install JS deps:
   ```bash
   npm install
   ```
2) Ensure Capacitor config is present:
   - `capacitor.config.ts` should exist with `webDir: "dist"`.
   - Scripts are available in `package.json`: `cap:sync`, `cap:open:android`, `cap:open:ios`.
   (If starting from a fresh clone with no native folders, run `npx cap init <appName> <appId> --web-dir=dist`, then `npx cap add android` and `npx cap add ios`.)

Daily build workflow (web → native)
-----------------------------------
Run these from the project root after making web changes:
```bash
npm run build      # builds web into dist/
npm run cap:sync   # copies dist/ into android/ and ios/ and updates plugins
```

Running and building for Android (APK)
--------------------------------------
1) Open the Android project in Android Studio:
   ```bash
   npm run cap:open:android
   ```
2) Let Gradle sync finish.
3) Run on emulator/device: choose a device and press Run (►).
4) Build a debug APK:
   - Android Studio: Build > Build Bundle(s) / APK(s) > Build APK(s).
   - Output: `android/app/build/outputs/apk/debug/`.
5) Build a release APK:
   - Create/choose a keystore in Build > Generate Signed Bundle / APK.
   - Select APK, follow the wizard, choose release build type.
   - Output: `android/app/build/outputs/apk/release/`.

Running and building for iOS (IPA)
----------------------------------
1) Ensure Xcode + CocoaPods are installed (see prerequisites).
2) Sync web assets:
   ```bash
   npm run cap:sync
   ```
3) Open the iOS project:
   ```bash
   npm run cap:open:ios
   ```
4) If prompted, run `pod install` inside `ios/App` (CocoaPods).
5) In Xcode, set a Team under Signing & Capabilities so the app can run on a device.
6) Run on simulator or plugged-in device via the Run (►) button.
7) Export an IPA (requires an Apple Developer account):
   - Product > Archive, then in Organizer choose Distribute/Export and follow the prompts for App Store, Ad Hoc, or Development.

Common issues and fixes
-----------------------
- `xcode-select` / `xcodebuild` errors: Install full Xcode, then `sudo xcode-select --switch "/Applications/Xcode.app/Contents/Developer"` and `sudo xcodebuild -runFirstLaunch`.
- Missing CocoaPods: `sudo gem install cocoapods` then rerun `npm run cap:sync` or `npx cap sync ios`.
- Android SDK not found: open Android Studio once; it installs the SDK. If CLI tools still complain, set `ANDROID_SDK_ROOT` to the SDK path shown in Android Studio > Settings > Android SDK.

Release hygiene
---------------
- Android: keep your keystore file and passwords safe; update `android/app/build.gradle` if you standardize signing configs.
- iOS: use the correct provisioning profiles/certificates per environment; clean and re-archive if signing changes.

Quick command recap
-------------------
- Build web: `npm run build`
- Sync web → native: `npm run cap:sync`
- Open Android project: `npm run cap:open:android`
- Open iOS project: `npm run cap:open:ios`
