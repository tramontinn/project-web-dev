import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Button, TextInput, Menu, Provider as PaperProvider } from 'react-native-paper';
import { firestore } from './firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

function CrudDonators() {
    const [doadores, setDoadores] = useState([]);
    const [selectedDoadorId, setSelectedDoadorId] = useState('');
    const [doadorData, setDoadorData] = useState({ name: '', items: [] });
    const [newItem, setNewItem] = useState({ itemName: '', quantity: 0 });
    const [menuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        fetchDoadores();
    }, []);

    const fetchDoadores = async () => {
        const doadoresSnapshot = await getDocs(collection(firestore, 'donators'));
        const doadoresList = doadoresSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDoadores(doadoresList);
    };

    const handleSelectDoador = (id, name) => {
        setSelectedDoadorId(id);
        const selectedDoador = doadores.find(d => d.id === id);
        if (selectedDoador) {
            setDoadorData({ ...selectedDoador });
        }
        setMenuVisible(false);
    };

    const handleNewItemChange = (name, value) => {
        setNewItem({ ...newItem, [name]: value });
    };
    
    const addItem = async () => {
        console.log("Adicionando item:", newItem);
        const doadorRef = doc(firestore, 'donators', selectedDoadorId);
        // Verifica se items existe e é um array, senão usa um array vazio
        const currentItems = doadorData.items ? doadorData.items : [];
        const updatedItems = [...currentItems, newItem]; // Adiciona o novo item
    
        await updateDoc(doadorRef, {
            items: updatedItems
        });
    
        setNewItem({ itemName: '', quantity: 0 });
        await fetchDoadores();
    };

    const deleteItem = async (itemIndex) => {
        const updatedItems = doadorData.items.filter((_, index) => index !== itemIndex);
        const doadorRef = doc(firestore, 'donators', selectedDoadorId);
        await updateDoc(doadorRef, { items: updatedItems });
        fetchDoadores();
    };

    return (
        <PaperProvider>
            <ScrollView style={{ flex: 1, padding: 10 }}>
                <View>
                    <Menu
                        visible={menuVisible}
                        onDismiss={() => setMenuVisible(false)}
                        anchor={<Button onPress={() => setMenuVisible(true)}>Selecionar Doador</Button>}>
                        {doadores.map(doador => (
                            <Menu.Item
                                key={doador.id}
                                title={doador.name}
                                onPress={() => handleSelectDoador(doador.id, doador.name)}
                            />
                        ))}
                    </Menu>

                    <TextInput
                        label="Nome do Item"
                        value={newItem.itemName}
                        onChangeText={text => handleNewItemChange('itemName', text)}
                    />
                    <TextInput
                        label="Quantidade"
                        value={String(newItem.quantity)}
                        onChangeText={text => handleNewItemChange('quantity', parseInt(text))}
                        keyboardType="numeric"
                    />
                    <Button mode="contained" onPress={addItem}>Adicionar Item</Button>

                    {/* Lista de itens */}
                    {selectedDoadorId && doadorData.items && (
                        doadorData.items.map((item, index) => (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text>{item.itemName} - {item.quantity}</Text>
                                <Button onPress={() => deleteItem(index)}>Remover</Button>
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
        </PaperProvider>
    );
}

export default CrudDonators;