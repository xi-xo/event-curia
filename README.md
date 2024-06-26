# <span style="color:#1E5B7B; font-size:50px; display:block; background-color:white; font-weight:bold; text-align:center;">EventCuria</span>
Welcome to EventCuria – your go-to app for discovering and signing up for exciting events! EventCuria is a mobile application built with React Native that brings the world of events to your fingertips. Whether you're looking for workshops, meetups, or concerts, EventCuria has got you covered.

## Features
Discover Events: Explore a wide range of upcoming events in your area.
Sign Up Effortlessly: Easily sign up for events directly from the app with just a few taps.
Stay Informed: Get detailed event information including name, description, date, time, venue, and capacity.
Responsive Design: Enjoy a seamless experience on both Android and iOS devices.



## Installation
To run EventCuria locally on your machine, follow these simple steps:

***Clone the Repository:***
   ```bash
   git clone <repository_url>
```
***Navigate to the Project Directory:***

```bash
cd EventCuria
```
***Install Dependencies:***
```bash
npm install
```


## Set Up Environment Variables:
***Install `react-native-dotenv`***
```bash
npm install --save @env/react-native-dotenv
```

### Create a .env file in the root directory of the project.
***makefile***
```bash
env.
```
### Add your Eventbrite organization ID and API token to the .env file in the following format:
Visit Eventbrite to get your token and authentication code [Eventbrite official website](https://www.eventbrite.com/platform/docs/introduction). 

***copy code***
```bash
REACT_APP_ORGANIZATION_ID=your_organization_id
REACT_APP_API_TOKEN=your_api_token
```

***You can access these variables in your code  as follows***
```bash
import { REACT_APP_API_KEY, REACT_APP_API_URL } from '@env';
```

## Additional requirements
### Set up Supabase: ###

**1. Sign up and create a new project:**

Go to the [Supabase official website](https://supabase.com/). and sign up for an account if you haven't already. Create a new project.

**2. Set up authentication:** 

Enable authentication for your project in the Supabase dashboard. You can choose the authentication provider (e.g., email/password, Google, etc.). For Google authentication, you'll need to set up OAuth credentials.

### Obtain Google Calendar API Credentials: 
**1. Create a new project in Google Cloud Console:**

Create a new project if you haven't already.

**2. Enable the Google Calendar API:**

Search for "Google Calendar API" in the API Library and enable it for your project.

**3. Create OAuth 2.0 Credentials:**

Navigate to the "Credentials" tab in the API Console. Click on "Create Credentials" and select "OAuth client ID". Choose the application type (Web application or Mobile application) depending on your use case.

**4. Configure OAuth consent screen:**
Set up the OAuth consent screen by providing necessary details like the application name, support email, etc. Add required scopes (e.g., https://www.googleapis.com/auth/calendar) to access user's calendar.

**5. Get client ID and client secret:**

After creating OAuth credentials, you'll get a client ID and client secret. Keep these credentials secure.

``` 
make sure you to add your Supabase url and anon public key in App.js line 39 & 40
```
## Finally Start the Development Server:
```bash
npx expo start
```

**Run the App on Your Device:**
Follow the instructions in the terminal to open the app
**Usage**
Explore Events: Browse through a curated list of events and find the ones that interest you.
Sign Up: Click on an event to view details and sign up with ease, once signed up will promp to add to google calendar

##
## Technologies Used ##
<div style="display:flex; flex-direction: row; flex-wrap: wrap;">
    <div style="flex: 1; padding-right: 20px;">
        <ul>
            <li><strong>React Native</strong></li>
            <li><strong>Eventbrite API</strong></li>
            <li><strong>Google Calendar API</strong></li>
        </ul>
    </div>
    <div style="flex: 1; padding-left: 20px;">
        <ul>
            <li><strong>Supabase</strong></li>
            <li><strong>JavaScript</strong></li>
        </ul>
    </div>
</div>