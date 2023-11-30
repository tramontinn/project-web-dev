import React, { useState, useEffect } from 'react';
import { firestore } from './firebase'; // Verifique se este caminho está correto
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
        <div>
            <h1>ListSuppliers</h1>
            <ul>
                {ListSuppliers.map(fornecedor => (
                    <li key={fornecedor.id}>
                        <h2>{fornecedor.name}</h2>
                        <p>Endereço: {fornecedor.location?.address}</p>
                        <p>Cidade: {fornecedor.location?.city}</p>
                        <h3>Itens:</h3>
                        <ul>
                            {fornecedor.items?.map((item, index) => (
                                <li key={index}>
                                    <span>Item: {item.itemName}<br />
                                    <li>Quantidade: {item.quantity}</li></span>
                                    <br /><br />
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            <br /><br />
        </div>
    );
}

export default ListSuppliers;