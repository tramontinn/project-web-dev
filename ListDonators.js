import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { List } from 'react-native-paper'; // Import List component from React Native Paper
import { firestore } from './firebase'; // Verify if this path is correct
import { collection, getDocs } from 'firebase/firestore';

function ListDonators() {
    const [donators, setDonators] = useState([]);

    useEffect(() => {
        const fetchDonators = async () => {
            const donatorsSnapshot = await getDocs(collection(firestore, 'donators'));
            const donatorsList = donatorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDonators(donatorsList);
        };

        fetchDonators();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Doadores</Text>
            <List.Section style={styles.list}>
                {donators.map(doador => (
                    <List.Accordion
                        key={doador.id}
                        title={doador.name}
                        style={styles.donorItem}
                        titleStyle={styles.donorName}
                    >
                        <List.Item title={`Endereço: ${doador.location?.address}`} />
                        <List.Item title={`Cidade: ${doador.location?.city}`} />
                        <List.Section style={styles.itemList}>
                            {doador.items?.map((item, index) => (
                                <List.Item
                                    key={index}
                                    title={`${item.itemName} - ${item.quantity}`}
                                    titleStyle={styles.item}
                                />
                            ))}
                        </List.Section>
                    </List.Accordion>
                ))}
            </List.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    list: {
        flex: 1,
    },
    donorItem: {
        marginBottom: 30,
        borderRadius: 5,
    },
    donorName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemList: {
        marginTop: 10,
    },
    item: {
        fontSize: 16,
    },
});

export default ListDonators;