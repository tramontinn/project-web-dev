import React, { useState, useEffect } from 'react';
import { firestore } from './firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

function CrudDonators() {
    const [doadores, setDoadores] = useState([]);
    const [selectedDoadorId, setSelectedDoadorId] = useState('');
    const [doadorData, setDoadorData] = useState({ name: '', items: [] });
    const [newItem, setNewItem] = useState({ itemName: '', quantity: 0 });

    useEffect(() => {
        fetchDoadores();
    }, []);

    const fetchDoadores = async () => {
        const doadoresSnapshot = await getDocs(collection(firestore, 'donators'));
        const doadoresList = doadoresSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDoadores(doadoresList);
        if (selectedDoadorId) {
            const selectedDoador = doadoresList.find(d => d.id === selectedDoadorId);
            if (selectedDoador) {
                setDoadorData(selectedDoador);
            }
        }
    };

    const handleSelectDoador = (id) => {
        setSelectedDoadorId(id);
        const selectedDoador = doadores.find(d => d.id === id);
        if (selectedDoador) {
            setDoadorData({ ...selectedDoador });
        }
    };

    const handleNewItemChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };
    
    const addItem = async () => {
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
        <div>
            <h1>CRUD Doadores</h1>
            <div>
                <select onChange={(e) => handleSelectDoador(e.target.value)}>
                    <option value="">Selecione um Doador</option>
                    {doadores.map(doador => (
                        <option key={doador.id} value={doador.id}>{doador.name}</option>
                    ))}
                </select>
                <div>
                    <input type="text" name="itemName" placeholder="Nome do Item" value={newItem.itemName} onChange={handleNewItemChange} />
                    <input type="number" name="quantity" placeholder="Quantidade" value={newItem.quantity} onChange={handleNewItemChange} />
                    <button onClick={addItem}>Adicionar Item</button>
                </div>
            </div>
            {selectedDoadorId && doadorData.items && (
                <ul>
                    {doadorData.items.map((item, index) => (
                        <li key={index}>
                            {item.itemName} - {item.quantity}
                            <button onClick={() => deleteItem(index)}>Remover</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CrudDonators;