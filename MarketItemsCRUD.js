import React, { useState, useEffect } from 'react';
import { firestore } from './firebase'; // Verifique se o caminho está correto
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";

function MarketItemsCRUD() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', category: '' });
  const [editItemIndex, setEditItemIndex] = useState(-1);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'marketItems'), (snapshot) => {
      const itemsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(itemsData);
    });

    return unsubscribe;
  }, []);

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const addItem = async () => {
    if (newItem.id) {
      await updateDoc(doc(firestore, 'marketItems', newItem.id), newItem);
    } else {
      await addDoc(collection(firestore, 'marketItems'), newItem);
    }
    setNewItem({ name: '', quantity: '', category: '' });
    setEditItemIndex(-1); // Resetar o índice de edição
  };

  const startEditItem = (item) => {
    setNewItem(item);
    setEditItemIndex(items.findIndex(i => i.id === item.id)); // Define o índice de edição para o item atual
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(firestore, 'marketItems', id));
  };

  return (
    <div>
      <h1>CRUD de Itens de Mercado</h1>
      <div>
        <input type="text" name="name" placeholder="Nome do Item" value={newItem.name} onChange={handleInputChange} />
        <input type="number" name="quantity" placeholder="Quantidade" value={newItem.quantity} onChange={handleInputChange} />
        <input type="text" name="category" placeholder="Categoria" value={newItem.category} onChange={handleInputChange} />
        <button onClick={addItem}>{editItemIndex >= 0 ? 'Atualizar' : 'Adicionar'}</button>
      </div>
      <div>
        {items.map((item, index) => (
          <div key={item.id}>
            <span>{item.name} - {item.quantity} - {item.category}</span>
            <button onClick={() => startEditItem(item)}>Editar</button>
            <button onClick={() => deleteItem(item.id)}>Deletar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketItemsCRUD;