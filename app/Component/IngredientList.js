import { Text, ActivityIndicator } from 'react-native';

// Component to display a list of ingredients from the Spoonacular API

const IngredientList = ({ isLoading, error, response, onPress, styles }) => {
    if (isLoading) {
        return <ActivityIndicator size="large" />;
    }

    if (error || response == undefined) {
        return <Text>{error}</Text>;
    }

    return response[0].map((pd, index) => (
        <Text
            style={styles.button}
            key={index}
            onPress={() => onPress(pd)}
        >
            {pd.name}
        </Text>
    ));
};

export default IngredientList;