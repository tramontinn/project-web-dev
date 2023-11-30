import React, { useState, useEffect } from 'react';
import { firestore } from './firebase'; // Verifique se este caminho está correto
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
        <div>
            <h1>Doadores</h1>
            <ul>
                {donators.map(doador => (
                    <li key={doador.id}>
                        <h2>{doador.name}</h2>
                        <p>Endereço: {doador.location?.address}</p>
                        <p>Cidade: {doador.location?.city}</p>
                        <ul>
                            {doador.items?.map((item, index) => (
                                <li key={index}>{item.itemName} - {item.quantity}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListDonators;