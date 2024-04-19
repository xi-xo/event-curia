// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { Provider as PaperProvider } from 'react-native-paper';
import CustomHeader from './components/navigation/CustomHeader';
import HomePage from './Pages/HomePage';
import EventDetails from './components/events/EventDetails';
import SignInMock from './components/authenticationMock/SignInMock';
import PostEvent from './API/PostEvent';
import { signIn, signOut, getCurrentUser } from './components/authenticationMock/AuthService';
import AboutUs from './Pages/AboutUs';



const Stack = createStackNavigator();
const supabase = createClient(
  "https://dvuyyfttynkfiehqkeqv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dXl5ZnR0eW5rZmllaHFrZXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEzOTAyNDQsImV4cCI6MjAyNjk2NjI0NH0.5bBAFK27IL30lGcTdI46LzIv4Do4_kroxFzQhgDOpdQ"
);

export default function App() {
  const [user, setUser] = useState(getCurrentUser()); // State to hold the authenticated user
  const [userRole, setUserRole] = useState(null); // State to hold the user role

  const handleSignIn = async (email, password) => {
    try {
      console.log("Attempting sign-in with email:", email, "and password:", password);
      const signedInUser = await signIn(email, password);
      console.log("Signed in user:", signedInUser);
      setUser(signedInUser.user); // Update user state with the signed-in user object
      setUserRole(signedInUser.user.role); // Update userRole state with the role
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
    console.log("User state changed:", user);
    console.log("User role changed:", userRole);
  }, [user, userRole]);


  return (
    <PaperProvider>
      <NavigationContainer>
        <SessionContextProvider supabaseClient={supabase}>
          <Stack.Navigator
            screenOptions={{
              header: ({ navigation, route, options }) => (
                <CustomHeader
                title={options.headerTitle || "EventCuria"}
                  isDark={true}
                  user={user}
                  userRole={userRole}
                  onSignOut={handleSignOut}
                />
              ),
            }}
          >
            {user ? (
              <>
                <Stack.Screen
                  name="HomePage"
                  component={HomePage}
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
                    headerTitle: route.params.event.name.text
                  })}
                  showBackButton={true}
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
