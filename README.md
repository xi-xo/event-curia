# <span style="font-size:36px;">EventCuria</span>
Welcome to EventCuria – your go-to app for discovering and signing up for exciting events! EventCuria is a mobile application built with React Native that brings the world of events to your fingertips. Whether you're looking for workshops, meetups, or concerts, EventCuria has got you covered.

## Features
Discover Events: Explore a wide range of upcoming events in your area or around the world.
Sign Up Effortlessly: Easily sign up for events directly from the app with just a few taps.
Stay Informed: Get detailed event information including name, description, date, time, venue, and capacity.
Responsive Design: Enjoy a seamless experience on both Android and iOS devices.

## Installation
To run EventCuria locally on your machine, follow these simple steps:

**Clone the Repository:**
   ```bash
   git clone <repository_url>
```
**Navigate to the Project Directory:**

```bash
cd EventCuria
```
```bash
Copy code
Install Dependencies:
```
```bash
Copy code
npm install
```

##Set Up Environment Variables:##

Create a file named .env in the root directory of the project.
Add your Eventbrite organization ID and API token to the .env file in the following format:
makefile
Copy code
REACT_APP_ORGANIZATION_ID=your_organization_id
REACT_APP_API_TOKEN=your_api_token


Start the Development Server:
```bash
Copy code
npx expo start
```
**Run the App on Your Device:**
Follow the instructions in the terminal to open the app
**Usage**
Explore Events: Browse through a curated list of events and find the ones that interest you.
Sign Up: Click on an event to view details and sign up with ease, once signed up will promp to add to google calendar
**Technologies Used**
React Native
Eventbrite API
Google Calendar API
Supabase
JavaScript
