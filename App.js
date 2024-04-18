import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { Provider as PaperProvider } from 'react-native-paper';
import CustomHeader from './components/navigation/CustomHeader';
import LandingPage from './Pages/LandingPage';
import HomePage from './Pages/HomePage';
import EventDetails from './components/events/EventDetails';
import SignInMock from './components/authenticationMock/SignInMock';
import PostEvent from './API/PostEvent';
import { signIn, signOut, getCurrentUser } from './components/authenticationMock/AuthService';

const Stack = createStackNavigator();
const supabase = createClient(
  "https://dvuyyfttynkfiehqkeqv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dXl5ZnR0eW5rZmllaHFrZXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEzOTAyNDQsImV4cCI6MjAyNjk2NjI0NH0.5bBAFK27IL30lGcTdI46LzIv4Do4_kroxFzQhgDOpdQ"
)

export default function App() {
  const [user, setUser] = useState(getCurrentUser()); // State to hold the authenticated user

  const handleSignIn = async (email, password) => {
    try {
      const role = await signIn(email, password);
      setUser({ username: email, role });
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return (
    <PaperProvider>
      <NavigationContainer> {/* Ensure NavigationContainer wraps all navigators */}
        <SessionContextProvider supabaseClient={supabase}>
          <Stack.Navigator
            screenOptions={{
              header: ({ navigation, route, options }) => (
                <CustomHeader
                  title={"EventCuria"}
                  navigation={navigation}
                  isDark={true} // You can pass a prop to toggle between dark and light mode
                  onSignOut={handleSignOut} // Pass handleSignOut function to CustomHeader
                />
              ),
            }}
          >
            {user ? ( // If user is authenticated, show the HomePage
              <>
                <Stack.Screen
                  name="HomePage"
                  component={HomePage}
                  options={{ title: 'Home Page' }}
                  showBackButton={true}
                />
                {user.role === 'staff' && ( // Show Create Event screen only for staff users
                  <Stack.Screen
                    name="Create Event"
                    component={PostEvent}
                    options={{ title: 'Create Event' }}
                    showBackButton={true}
                  />
                )}
                <Stack.Screen
                  name="EventDetail"
                  component={EventDetails}
                  options={({ route }) => ({
                    headerTitle: route.params.event.name.text
                  })}
                  showBackButton={true}
                />
              </>
            ) : ( // If user is not authenticated, show the SignInMock
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
