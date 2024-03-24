// src/components/DeleteItem.tsx

import React, { useState } from 'react';
import axios from 'axios';
import './Styles.scss';

interface Item {
    codigo: string;
    dataHora: Date;
    nome: string;
    email: string;
    telefone: string;
    cpfCNPJ: string;
    endereco: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    nrDoc: string;      
    nNum: string;         
    vencimento: Date;   
    desconto1: number;    
    dataDesconto1: Date;
    desconto2: number;    
    dataDesconto2: Date;
    modoMulta: number;    
    multa: number;        
    modoJuros: number;    
    juros: number;        
    validade: number;     
    info: string;         
    comentarios: string;  
    callback: string;     
    originId: number;   
  }

interface Props {
  item: Item;
  onClose: () => void;
  onRefresh: () => void;
}

const DeleteItem: React.FC<Props> = ({ item, onClose, onRefresh }) => {
  const [processing, setProcessing] = useState(false); // Estado para controlar o carregamento
  
  const handleDelete = async () => {
    setProcessing(true); // Define o estado inicial de processamento    
    try {
      await axios.delete(`http://127.0.0.1:8000/pagpix/${item.codigo}`);
      // Atualiza a lista de itens após a atualização bem-sucedida
      onRefresh();
      onClose();
    } catch (error) {
      setProcessing(false);
      console.error('Erro ao excluir item:', error);
    }
    finally {
        setProcessing(false); // Define o estado de carregamento como falso após a conclusão do processo de criação
      }    
  };

  return (
    <div className="container">
      {/* <h2>Excluir:</h2> */}
      Excluir {item.nome}?
      {processing && (
        <div style={{ backgroundColor: 'yellow', color: 'black', padding: '10px', marginBottom: '10px', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 999 }}>
          Aguarde, excluindo registro...
        </div>
      )} {/* Exibe a mensagem de aguarde enquanto o processo está ocorrendo */}

      <div className="col-12">
          <button type="submit" className="btn btn-primary me-2" onClick={handleDelete} disabled={processing}>Excluir</button>
          <button className="btn btn-dark me-2" onClick={onClose} disabled={processing}>Cancelar</button> 
      </div>          
    </div>
  );
}

export default DeleteItem;
