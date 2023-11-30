import React, { useState, useEffect } from 'react';
import { firestore } from './firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

function MarketItemsCRUD() {
  const [donators, setDonators] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [selectedDonator, setSelectedDonator] = useState(null);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [newItem, setNewItem] = useState({ itemName: '', quantity: 0 });

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
    <div>
      <h1>Transferência de Itens</h1>
      <div>
        <select onChange={(e) => setSelectedDonator(donators.find(d => d.id === e.target.value))}>
          <option value="">Selecione um Doador</option>
          {donators.map(donator => (
            <option key={donator.id} value={donator.id}>{donator.name}</option>
          ))}
        </select>
        <select onChange={(e) => setSelectedInstitution(institutions.find(inst => inst.id === e.target.value))}>
          <option value="">Selecione uma Instituição</option>
          {institutions.map(institution => (
            <option key={institution.id} value={institution.id}>{institution.name}</option>
          ))}
        </select>
        <div>
          <input type="text" name="itemName" placeholder="Nome do Item" value={newItem.itemName} onChange={handleNewItemChange} />
          <input type="number" name="quantity" placeholder="Quantidade" value={newItem.quantity} onChange={handleNewItemChange} />
          <button onClick={transferItem}>Transferir Item</button>
        </div>
      </div>
      {selectedDonator && (
        <ul>
          {selectedDonator.items.map((item, index) => (
            <li key={index}>
              {item.itemName} - {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MarketItemsCRUD;