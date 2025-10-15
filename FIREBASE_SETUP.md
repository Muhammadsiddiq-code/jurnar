# Firebase Setup Instructions

This app now uses **Firebase Firestore** to store all data permanently instead of localStorage.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project

## Step 2: Enable Firestore Database

1. In your Firebase project, go to **Build** > **Firestore Database**
2. Click "Create database"
3. Choose **Start in test mode** (for development) or **Start in production mode** (for production)
4. Select a Cloud Firestore location (choose one closest to your users)
5. Click "Enable"

## Step 3: Get Your Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click the **Web** icon (`</>`) to add a web app
4. Register your app with a nickname (e.g., "Attendance App")
5. Copy the `firebaseConfig` object

## Step 4: Add Your Firebase Config to the App

1. Open the file `lib/firebase.ts` in your project
2. Replace the placeholder values with your actual Firebase configuration:

\`\`\`typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",              // Replace with your actual API key
  authDomain: "YOUR_AUTH_DOMAIN_HERE",      // Replace with your auth domain
  projectId: "YOUR_PROJECT_ID_HERE",        // Replace with your project ID
  storageBucket: "YOUR_STORAGE_BUCKET_HERE", // Replace with your storage bucket
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE", // Replace with your sender ID
  appId: "YOUR_APP_ID_HERE",                // Replace with your app ID
}
\`\`\`

## Step 5: Configure Firestore Security Rules (Important!)

For development/testing, you can use these rules (in Firebase Console > Firestore Database > Rules):

\`\`\`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
\`\`\`

⚠️ **Warning**: These rules allow anyone to read/write your database. For production, use proper authentication and security rules:

\`\`\`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /students/{studentId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /attendance/{attendanceId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
\`\`\`

## Step 6: Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy your app
4. Your data will now persist across reloads and visits!

## How It Works

- **Students**: Stored in Firestore collection `students`
- **Attendance**: Stored in Firestore collection `attendance`
- **Real-time Updates**: The app uses Firestore listeners to automatically update when data changes
- **Auto-cleanup**: Attendance records older than 12 hours are automatically deleted
- **Session Data**: Theme and current user session are still stored in localStorage (session-specific)

## Collections Structure

### Students Collection
\`\`\`
students/
  {studentId}/
    - id: string
    - name: string
    - username: string
    - password: string
    - class: string
    - photo: string
    - createdAt: string
\`\`\`

### Attendance Collection
\`\`\`
attendance/
  {studentId}_{date}/
    - studentId: string
    - date: string (YYYY-MM-DD)
    - status: "present" | "absent"
    - timestamp: number
\`\`\`

## Troubleshooting

### Data not showing up?
- Check that you've added your Firebase config correctly
- Verify Firestore is enabled in Firebase Console
- Check browser console for errors
- Ensure Firestore security rules allow read/write access

### Permission denied errors?
- Update your Firestore security rules (see Step 5)
- Make sure your Firebase project is active

### Need help?
- Check Firebase documentation: https://firebase.google.com/docs/firestore
- Verify your Firebase config values are correct
