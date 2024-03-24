import React, { useState, useEffect } from 'react';
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
  valor: number;    
  vencimento: string;   
  desconto1: number;    
  dataDesconto1: string;
  desconto2: number;    
  dataDesconto2: string;
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

interface EditItemProps {
    item: Item;
    onClose: () => void; // Função para fechar a janela de edição
    onRefresh: () => void; // Função para atualizar a lista
}

const EditItem: React.FC<EditItemProps> = ({ item, onClose, onRefresh }) => {  
    const [processing, setProcessing] = useState(false); // Estado para controlar o carregamento  
    const [formData, setFormData] = useState<Item>(item);
  
    useEffect(() => {
      setFormData(item);
    }, [item]);
  
    useEffect(() => {
      // Define a data atual como o valor inicial para o campo de vencimento
      const currentDate = new Date(item.vencimento);
      const formattedDate = currentDate.toISOString().split('T')[0];
      const currentDate1 = new Date(item.dataDesconto1);
      const formattedDate1 = currentDate1.toISOString().split('T')[0];
      const currentDate2 = new Date(item.dataDesconto2);
      const formattedDate2 = currentDate2.toISOString().split('T')[0];
      setFormData(prevState => ({
        ...prevState,
        vencimento: formattedDate,
        dataDesconto1: formattedDate1,
        dataDesconto2: formattedDate2,
      }));
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleEdit = async () => {
      setProcessing(true); // Define o estado inicial de processamento
      try {
        await axios.put(`http://127.0.0.1:8000/pagpix/${item.codigo}/`, formData);
        // Atualiza a lista de itens após a atualização bem-sucedida
        onRefresh();
        onClose();

        // Você pode usar um sistema de notificação para informar o usuário sobre o sucesso
      } catch (error) {
        setProcessing(false);
        console.error('Erro ao atualizar item:', error);
      }
      finally {
        setProcessing(false); // Define o estado de carregamento como falso após a conclusão do processo de criação
      }      
    };
  
    return (
      <div className="container">
        {/* <h2>Editar:</h2> */}
        {processing && (
        <div style={{ backgroundColor: 'yellow', color: 'black', padding: '10px', marginBottom: '10px', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 999 }}>
          Aguarde, atualizando registro...
        </div>
        )} {/* Exibe a mensagem de aguarde enquanto o processo está ocorrendo */}

        <div className="col-12">
          <button type="submit" className="btn btn-primary me-2" onClick={handleEdit} disabled={processing}>Confirmar</button>
          <button className="btn btn-dark me-2" onClick={onClose} disabled={processing}>Cancelar</button> 
        </div> 

        <div className="col-md-6">
          <label htmlFor="nome" className="form-label">Nome</label>
          <input type="text" className="form-control" id="nome" placeholder="Nome" name="nome" value={formData.nome} onChange={handleInputChange} />
        </div>

        <div className="col-md-6">
          <label htmlFor="email" className="form-label">E-mail</label>
          <input type="email" className="form-control" id="email" placeholder="E-mail" name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="telefone" className="form-label">Telefone</label>
          <input type="text" className="form-control" id="telefone" placeholder="Telefone" name="telefone" value={formData.telefone} onChange={handleInputChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="cpfCNPJ" className="form-label">CPF/CNPJ</label>
          <input type="text" className="form-control" id="cpfCNPJ" placeholder="CPF/CNPJ" name="cpfCNPJ" value={formData.cpfCNPJ} onChange={handleInputChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="endereco" className="form-label">Endereço</label>
          <input type="text" className="form-control" id="endereco" placeholder="Endereço" name="endereco" value={formData.endereco} onChange={handleInputChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="bairro" className="form-label">Bairro</label>
          <input type="text" className="form-control" id="bairro" placeholder="Bairro" name="bairro" value={formData.bairro} onChange={handleInputChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="cidade" className="form-label">Cidade</label>
          <input type="text" className="form-control" id="cidade" placeholder="Cidade" name="cidade" value={formData.cidade} onChange={handleInputChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="uf" className="form-label">UF</label>
          <input type="text" className="form-control" id="uf" placeholder="UF" name="uf" value={formData.uf} onChange={handleInputChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="cep" className="form-label">CEP</label>
          <input type="text" className="form-control" id="cep" placeholder="CEP" name="cep" value={formData.cep} onChange={handleInputChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="nrDoc" className="form-label">Nr. Doc</label>
          <input type="text" className="form-control" id="nrDoc" placeholder="Nr. Doc" name="nrDoc" value={formData.nrDoc} onChange={handleInputChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="nNum" className="form-label">NNum</label>
          <input type="text" className="form-control" id="nNum" placeholder="NNum" name="nNum" value={formData.nNum} onChange={handleInputChange} />
        </div>

        <div className="col-md-6">
          <label htmlFor="valor" className="form-label">Valor</label>
          <input type="number" step="0.01" className="form-control" id="valor" placeholder="Valor" name="valor" value={formData.valor} onChange={handleInputChange} />
        </div>

        <div className="col-md-6">
          <label htmlFor="vencimento" className="form-label">Vencimento</label>
          <input type="date" className="form-control" id="vencimento" name="vencimento" value={formData.vencimento} onChange={handleInputChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="desconto1" className="form-label">Desconto 1</label>
          <input type="number" step="0.01" className="form-control" id="desconto1" placeholder="Desconto 1" name="desconto1" value={formData.desconto1} onChange={handleInputChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="dataDesconto1" className="form-label">Data Desconto 1</label>
          <input type="date" className="form-control" id="dataDesconto1" name="dataDesconto1" value={formData.dataDesconto1} onChange={handleInputChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="desconto2" className="form-label">Desconto 2</label>
          <input type="number" step="0.01" className="form-control" id="desconto2" placeholder="Desconto 2" name="desconto2" value={formData.desconto2} onChange={handleInputChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="dataDesconto2" className="form-label">Data Desconto 2</label>
          <input type="date" className="form-control" id="dataDesconto2" name="dataDesconto2" value={formData.dataDesconto2} onChange={handleInputChange} />
        </div>

        <div className="col-md-6">
          <label htmlFor="info" className="form-label">Informação</label>
          <input type="text" className="form-control" id="info" placeholder="Informação" name="info" value={formData.info} onChange={handleInputChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="comentarios" className="form-label">Comentários</label>
          <input type="text" className="form-control" id="comentarios" placeholder="Comentários" name="comentarios" value={formData.comentarios} onChange={handleInputChange} />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary me-2" onClick={handleEdit} disabled={processing}>Confirmar</button>
          <button className="btn btn-dark me-2" onClick={onClose} disabled={processing}>Cancelar</button> 
        </div>      
      </div>
    );
  }
  

export default EditItem;


