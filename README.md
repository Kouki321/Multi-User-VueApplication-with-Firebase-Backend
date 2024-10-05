# Multi-User Vue.js Application with Firebase Backend

## Overview

This project is a simple Vue.js application integrated with a Firebase backend. It supports multiple users, allowing administrators to manage user statuses and access user activity logs.

### Features

- **Multi-User Support**: Users can create accounts and log in.
- **Admin Functionality**: Administrators can:
  - Create and manage public posts.
  - Change user statuses (active/inactive).
  - View last online status and current online/offline status of users.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Make sure Node.js is installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- **Firebase Account**: You need a Firebase account to set up the backend services.

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Kouki321/EnicarInternShipsMgSystem.git
   cd EnicarInternShipsMgSystem



# Configure Firebase:

Create a Firebase project in your Firebase Console.
Set up Firestore and Authentication services.
In the src/firebase directory, create a configuration file (e.g., firebaseConfig.js) and add your Firebase configuration:
javascript
Copier le code
```

// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
```

# prj-fire

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
