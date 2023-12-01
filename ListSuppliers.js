import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { List } from 'react-native-paper'; // Import List component from React Native Paper
import { firestore } from './firebase'; // Verify if this path is correct
import { collection, getDocs } from 'firebase/firestore';

function ListSuppliers() {
    const [ListSuppliers, setListSuppliers] = useState([]);

    useEffect(() => {
        const fetchListSuppliers = async () => {
            try {
                const ListSuppliersCollection = collection(firestore, 'institution'); // Nome real da coleção
                const ListSuppliersSnapshot = await getDocs(ListSuppliersCollection);
                const ListSuppliersList = ListSuppliersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setListSuppliers(ListSuppliersList);
            } catch (error) {
                console.error("Erro ao buscar ListSuppliers:", error);
            }
        };

        fetchListSuppliers();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Campanhas</Text>
            {ListSuppliers.map(fornecedor => (
                <List.Accordion
                    key={fornecedor.id}
                    title={fornecedor.name}
                    style={styles.supplierItem}
                    titleStyle={styles.supplierName}
                >
                    <List.Item title={`Endereço: ${fornecedor.location?.address}`} />
                    <List.Item title={`Cidade: ${fornecedor.location?.city}`} />
                    <List.Section style={styles.itemList}>
                        {fornecedor.items?.map((item, index) => (
                            <List.Item
                                key={index}
                                title={`Item: ${item.itemName}\nQuantidade: ${item.quantity}`}
                                titleStyle={styles.item}
                            />
                        ))}
                    </List.Section>
                </List.Accordion>
            ))}
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
    supplierItem: {
        marginBottom: 30,
        borderRadius: 5,
    },
    supplierName: {
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

export default ListSuppliers;