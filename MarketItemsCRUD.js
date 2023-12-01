import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, TextInput, Menu, Provider as PaperProvider } from 'react-native-paper';
import { firestore } from './firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

function MarketItemsCRUD() {
  const [donators, setDonators] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [selectedDonator, setSelectedDonator] = useState(null);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [newItem, setNewItem] = useState({ itemName: '', quantity: 0 });
  // Estados adicionais para controle do menu
  const [donatorMenuVisible, setDonatorMenuVisible] = useState(false);
  const [institutionMenuVisible, setInstitutionMenuVisible] = useState(false);
  

  useEffect(() => {
    const fetchDonators = async () => {
      const donatorsSnapshot = await getDocs(collection(firestore, 'donators'));
      const donatorsList = donatorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDonators(donatorsList);
    };

    const fetchInstitutions = async () => {
      const institutionsSnapshot = await getDocs(collection(firestore, 'institution'));
      const institutionsList = institutionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInstitutions(institutionsList);
    };

    fetchDonators();
    fetchInstitutions();
  }, []);

  const handleNewItemChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const transferItem = async () => {
    if (selectedDonator && selectedInstitution && newItem.itemName && newItem.quantity > 0) {
      const donatorRef = doc(firestore, 'donators', selectedDonator.id);
      const institutionRef = doc(firestore, 'institution', selectedInstitution.id);

      const updatedDonatorItems = selectedDonator.items.map(item => {
        if (item.itemName === newItem.itemName) {
          return { ...item, quantity: Math.max(item.quantity - newItem.quantity, 0) };
        }
        return item;
      });

      let itemAddedToInstitution = false;
      const updatedInstitutionItems = selectedInstitution.items.map(item => {
        if (item.itemName === newItem.itemName) {
          itemAddedToInstitution = true;
          return { ...item, quantity: item.quantity + newItem.quantity };
        }
        return item;
      });
      if (!itemAddedToInstitution) {
        updatedInstitutionItems.push(newItem);
      }

      await updateDoc(donatorRef, { items: updatedDonatorItems });
      await updateDoc(institutionRef, { items: updatedInstitutionItems });

      setSelectedDonator(null);
      setSelectedInstitution(null);
      setNewItem({ itemName: '', quantity: 0 });
    }
  };

  return (
    <PaperProvider>
      <ScrollView style={{ flex: 1, padding: 10 }}>
        <View>
          <Menu
            visible={donatorMenuVisible}
            onDismiss={() => setDonatorMenuVisible(false)}
            anchor={
              <Button onPress={() => setDonatorMenuVisible(true)}>Selecionar Doador</Button>
            }>
            {donators.map((donator) => (
              <Menu.Item
                key={donator.id}
                title={donator.name}
                onPress={() => {
                  setSelectedDonator(donator);
                  setDonatorMenuVisible(false);
                }}
              />
            ))}
          </Menu>

          <Menu
            visible={institutionMenuVisible}
            onDismiss={() => setInstitutionMenuVisible(false)}
            anchor={
              <Button onPress={() => setInstitutionMenuVisible(true)}>Selecionar Instituição</Button>
            }>
            {institutions.map((institution) => (
              <Menu.Item
                key={institution.id}
                title={institution.name}
                onPress={() => {
                  setSelectedInstitution(institution);
                  setInstitutionMenuVisible(false);
                }}
              />
            ))}
          </Menu>

          <TextInput
            label="Nome do Item"
            value={newItem.itemName}
            onChangeText={text => setNewItem({ ...newItem, itemName: text })}
          />
          <TextInput
            label="Quantidade"
            value={String(newItem.quantity)}
            onChangeText={text => setNewItem({ ...newItem, quantity: parseInt(text) })}
            keyboardType="numeric"
          />
          <Button mode="contained" onPress={transferItem}>
            Transferir Item
          </Button>
        </View>
      </ScrollView>
    </PaperProvider>
  );
}

export default MarketItemsCRUD;