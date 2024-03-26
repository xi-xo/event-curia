import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LandingPage  from './Pages/LandingPage'
import HomePage from './Pages/HomePage';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

const Stack = createStackNavigator();
const supabase = createClient(
  "https://dvuyyfttynkfiehqkeqv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2dXl5ZnR0eW5rZmllaHFrZXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEzOTAyNDQsImV4cCI6MjAyNjk2NjI0NH0.5bBAFK27IL30lGcTdI46LzIv4Do4_kroxFzQhgDOpdQ"
)

export default function App() {
  return (
    <NavigationContainer>
    <SessionContextProvider supabaseClient={supabase}>
      <Stack.Navigator>
        <Stack.Screen name="LandingPage" component={LandingPage}></Stack.Screen>
        <Stack.Screen name="HomePage" component={HomePage}></Stack.Screen>
      </Stack.Navigator>
    </SessionContextProvider>
    </NavigationContainer>
  );
}
