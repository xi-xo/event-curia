/**
 * App Component
 * 
 * This component serves as the main entry point for the application. It sets up
 * navigation, authentication, and state management, and renders different screens
 * based on the user's authentication status and role.
 * 
 * It uses React Navigation for screen navigation and Supabase for authentication.
 * The component manages the user's authentication state, including signing in and
 * signing out, and provides context for authentication-related functions.
 * 
 * Props:
 * None
 * 
 * Params:
 * - route: Object containing route parameters
 * 
 * @param {Object} route - Route object containing parameters
 * @returns {JSX.Element} - JSX element representing the App component.
 */

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { Provider as PaperProvider } from 'react-native-paper';
import CustomHeader from './components/navigation/CustomHeader';
import EventWithVenueData from './API/EventWithVenuesData';
import EventDetails from './components/events/EventDetails';
import SignInMock from './components/authenticationMock/SignInMock';
import PostEvent from './API/PostEvent';
import { signIn, signOut, getCurrentUser } from './components/authenticationMock/AuthService';
import AboutUs from './Pages/AboutUs';
import CreateEventInCalendar from './components/CreateEventInCalendar';

const Stack = createStackNavigator();
const supabase = createClient(
  "URL",
  "ANON PUBLIC KEY"
);

export default function App() {
  const [user, setUser] = useState(getCurrentUser()); 
  const [userRole, setUserRole] = useState(null); 
  const [currentEventName, setCurrentEventName] = useState('');

  const handleSignIn = async (email, password) => {
    try {
      const signedInUser = await signIn(email, password);
      setUser(signedInUser.user); 
      setUserRole(signedInUser.user.role); 
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  const handleSignOut = async () => {
    console.log("Signing out...");
    await signOut();
    setUser(null);
    setUserRole(null);
  };

  useEffect(() => {
    
  }, [user, userRole]);

  return (
    <PaperProvider>
      <NavigationContainer>
        <SessionContextProvider supabaseClient={supabase}>
          <Stack.Navigator
            screenOptions={({ navigation, route }) => ({
              header: ({ options }) => (
                <CustomHeader
                  title={options.headerTitle || "EventCuria"}
                  isDark={true}
                  user={user}
                  userRole={userRole}
                  onSignOut={handleSignOut}
                  eventName={currentEventName}
                />
              ),
            })}
          >
            {user ? (
              <>
                <Stack.Screen
                  name="Events"
                  component={EventWithVenueData}
                  options={{ title: 'Events' }}
                  showBackButton={true}
                />
                {userRole === 'staff' && (
                  <Stack.Screen
                    name="CreateEvent"
                    component={PostEvent}
                    options={{ title: 'Create event' }}
                  />
                )}
                <Stack.Screen
                  name="AboutUs"
                  component={AboutUs}
                  options={{ title: 'About Us' }}
                />
                <Stack.Screen
                  name="EventDetail"
                  component={EventDetails}
                  options={({ route }) => ({
                    headerTitle: route.params.eventName,
                  })}
                  initialParams={{ userRole: userRole }}
                  showBackButton={true}
                  listeners={({ route }) => {
                    if (route.params && route.params.eventName) {
                      setCurrentEventName(route.params.eventName);
                    }
                  }}
                />
                <Stack.Screen
                  name="CreateEventInCalendar"
                  component={CreateEventInCalendar}
                  options={{title: 'Add Event To Calendar'}}
                />
              </>
            ) : (
              <Stack.Screen
                name="SignIn"
                options={{ title: 'Sign In' }}
              >
                {(props) => <SignInMock {...props} onSignIn={handleSignIn} />}
              </Stack.Screen>
            )}
          </Stack.Navigator>
        </SessionContextProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
