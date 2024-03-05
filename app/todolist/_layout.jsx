import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTintColor: '#007AFF',
            headerTitleStyle: {
                fontWeight: 'bold',
                
            },
        }}  
        >
            <Stack.Screen name="list" options={{
            }}/>
            <Stack.Screen name="details" options={{
                title: 'Details',
            }}/>

        </Stack>
    );
}