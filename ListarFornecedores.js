import React, { useState, useEffect } from 'react';
import { firestore } from './firebase'; // Verifique se este caminho está correto
import { collection, getDocs } from 'firebase/firestore';

function ListarFornecedores() {
    const [fornecedores, setFornecedores] = useState([]);

    useEffect(() => {
        const fetchFornecedores = async () => {
            try {
                const fornecedoresCollection = collection(firestore, 'donators'); // Nome real da coleção
                const fornecedoresSnapshot = await getDocs(fornecedoresCollection);
                const fornecedoresList = fornecedoresSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setFornecedores(fornecedoresList);
            } catch (error) {
                console.error("Erro ao buscar fornecedores:", error);
            }
        };

        fetchFornecedores();
    }, []);

    return (
        <div>
            <h1>Fornecedores</h1>
            <ul>
                {fornecedores.map(fornecedor => (
                    <li key={fornecedor.id}>
                        <h2>{fornecedor.name}</h2>
                        <p>Endereço: {fornecedor.location?.address}</p>
                        <p>Cidade: {fornecedor.location?.city}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListarFornecedores;