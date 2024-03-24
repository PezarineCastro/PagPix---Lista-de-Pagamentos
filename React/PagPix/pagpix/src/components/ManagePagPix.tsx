import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa os estilos do Bootstrap
import axios from 'axios';
import CreateItem from './CreateItem';
import UpdateItem from './EditItem';
import DetailItem from './DetailItem';
import DeleteItem from './DeleteItem';
import { Modal } from 'react-bootstrap';

  //-----------------------------------------------------------------
  const ManagePagPix: React.FC = () => {
  const [items, setItems] = useState([]);
  const [processing, setProcessing] = useState(true);

  const [showCreateForm, setShowCreateForm] = useState(false); // Estado para controlar a exibição do formulário de inclusão
  const [showEditForm, setShowEditForm] = useState(false); // Estado para controlar a exibição do formulário de edição
  const [showDeleteForm, setShowDeleteForm] = useState(false); // Estado para controlar a exibição do formulário de exclusão
  const [showDetailForm, setShowDetailForm] = useState<any>(null); // Estado para controlar a exibição do formulário de detalhes

  const [itemToEdit, setItemToEdit] = useState<any>(null); // Estado para armazenar os dados do item a ser editado
  const [itemToDelete, setItemToDelete] = useState<any>(null); // Estado para armazenar os dados do item a ser excluído

//  useEffect(() => {
//    refreshItems();
//  }, []);

  //-----------------------------------------------------------------
  const handleListForm = async () => {
    setProcessing(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/pagpix/');
      setItems(response.data);
    } catch (error) {
      setProcessing(false);  
      console.error('Erro ao buscar itens:', error);
    }
    finally {
      setProcessing(false); // Define o estado de carregamento como falso após a conclusão do processo de criação
      }     
  };

  //-----------------------------------------------------------------
  const handleCreate = () => {
    setShowCreateForm(true);
    setShowDeleteForm(false); 
    setShowEditForm(false); 
    setShowDetailForm(null);     
  };
  const handleCloseCreate = () => {
    setShowCreateForm(false); 
  };
  
  //-----------------------------------------------------------------
  const handleDelete = async (codigo: string) => {
    const item = items.find((item: any) => item.codigo === codigo);
    setItemToDelete(item);
    setShowDeleteForm(true); 
    setShowEditForm(false); 
    setShowCreateForm(false);   
    setShowDetailForm(null); 
  };
  const handleCloseDelete = () => {
    setShowDeleteForm(false); 
  };

  //-----------------------------------------------------------------
  const handleEdit = async (codigo: string) => {
    const item = items.find((item: any) => item.codigo === codigo);
    setItemToEdit(item);
    setShowEditForm(true);
    setShowDeleteForm(false); 
    setShowCreateForm(false);   
    setShowDetailForm(null);     
  };
  const handleCloseEdit = () => {
    setShowEditForm(false); 
  };

  //-----------------------------------------------------------------
  const handleDetail = (codigo: string) => {
    setShowDetailForm(items.find((item: any) => item.codigo === codigo)); // Encontrar o item pelo código e definir como item selecionado
    setShowDeleteForm(false); 
    setShowEditForm(false); 
    setShowCreateForm(false);   
  };
  const handleCloseDetail = () => {
    setShowDetailForm(null); // Define o item selecionado como null para fechar a janela de detalhes
  };

  //-----------------------------------------------------------------
  useEffect(() => {
    handleListForm(); // Chamando a função ao montar a lista
  }, []);             // Executa apenas uma vez ao montar o componente

  //-----------------------------------------------------------------
  return (
    <div>
        
      <h2>PagPix - Lista de Pagamentos</h2>
      <div className="row">
        <div className="col-md-1">
          <button className="btn btn-success btn-sm me-2" onClick={handleCreate} disabled={processing} style={{ width: '100%' }}>
            {processing ? 'Aguarde...' : 'Novo'}
          </button>
        </div>
        <div className="col-md-1">
          <button className="btn btn-info btn-sm" onClick={handleListForm} disabled={processing} style={{ width: '100%' }}>
          {processing ? 'Aguarde...' : 'Atualizar'} </button> 
           
        </div>
      </div>      

      <ul className="list-group">
      {items.map((item: any) => (
        <li key={item.codigo} className="list-group-item d-flex justify-content-between align-items-center">
          {item.nome}
          <div>
            <button className="btn btn-warning btn-sm me-2" onClick={() => handleDetail(item.codigo)}  disabled={processing}>Detalhe</button>
            <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(item.codigo)}  disabled={processing}>Editar</button>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.codigo)}  disabled={processing}>Excluir</button>
          </div>
        </li>
      ))}
      </ul>

      {/* Detalhes */}
      <Modal show={showDetailForm} onHide={() => setShowDetailForm(false)}>
        <Modal.Header closeButton>
          <h2>Detalhes Pagamento</h2> 
        </Modal.Header>
        <Modal.Body>
          <DetailItem item={showDetailForm} onClose={handleCloseDetail} />
        </Modal.Body>
      </Modal>

      {/* Create */}
      <Modal show={showCreateForm} onHide={() => setShowCreateForm(false)}>
        <Modal.Header closeButton>
        <h2>Novo Pagamento</h2> 
        </Modal.Header>
        <Modal.Body>
          <CreateItem onClose={handleCloseCreate} onRefresh={handleListForm} />
        </Modal.Body>
      </Modal>
      
        {/* Editar */}
        <Modal show={showEditForm} onHide={() => setShowEditForm(false)}>
        <Modal.Header closeButton>
        <h2>Editar Pagamento</h2> 
        </Modal.Header>
        <Modal.Body>
        <UpdateItem item={itemToEdit} onClose={handleCloseEdit} onRefresh={handleListForm} /> {/* Passa a função para fechar a janela de edição como propriedade */}
        </Modal.Body>
      </Modal>

      {/* Delete */}
      <Modal show={showDeleteForm} onHide={() => setShowDeleteForm(false)}>
        <Modal.Header closeButton>
        <h2>Excluir Pagamento</h2> 
        </Modal.Header>
        <Modal.Body>
          {/* Conteúdo do modal "Novo" */}
          <DeleteItem item={itemToDelete} onClose={handleCloseDelete} onRefresh={handleListForm} /> {/* Passa a função para fechar a janela de exclusão como propriedade */}
        </Modal.Body>
      </Modal>

    </div>
  );
};

export default ManagePagPix;
