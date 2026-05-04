import { Text, ActivityIndicator } from 'react-native';

// Component to display a list of exercises from the Exercises Ninja API

const ExerciseList = ({ isLoading, error, response, onPress, styles }) => {
    if (isLoading) {
        return <ActivityIndicator size="large" />;
    }
    if (error || response == undefined) {
        return <Text>{error}</Text>;
    }
    return response.map((ex, index) => (
        <Text style={styles.button} key={index} onPress={() => onPress(ex)}>
            {ex.name}
        </Text>
    ));
};

export default ExerciseList;