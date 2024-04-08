import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import CustomHeader from './components/CustomHeader';
import LandingPage from './Pages/LandingPage';
import HomePage from './Pages/HomePage';

const Stack = createStackNavigator();
const supabase = createClient(
  "https://dvuyyfttynkfiehqkeqv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dXl5ZnR0eW5rZmllaHFrZXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEzOTAyNDQsImV4cCI6MjAyNjk2NjI0NH0.5bBAFK27IL30lGcTdI46LzIv4Do4_kroxFzQhgDOpdQ"
)

export default function App() {
  return (
    <PaperProvider>

      <NavigationContainer>
        <SessionContextProvider supabaseClient={supabase}>
          <Stack.Navigator
            screenOptions={{
              header: ({ navigation, route, options }) => (
                <CustomHeader
                  title={"EventCuria"}
                  navigation={navigation}
                  isDark={true} // You can pass a prop to toggle between dark and light mode
                />
              ),
            }}
          >
            <Stack.Screen
              name="LandingPage"
              component={LandingPage}
              options={{ title: 'Landing Page' }}
            />
            <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{ title: 'Home Page' }}
              showBackButton={true}
            />
          </Stack.Navigator>
        </SessionContextProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
