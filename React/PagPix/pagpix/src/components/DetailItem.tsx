import React from 'react';
import './Styles.scss';

interface Item {
//    codigo: string;
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
    valor: number,
    vencimento: Date;   
    desconto1: number;    
    dataDesconto1: Date;
    desconto2: number;    
    dataDesconto2: Date;
//    modoMulta: number;    
    multa: number;        
//    modoJuros: number;    
    juros: number;        
    validade: number;     
    info: string;         
    comentarios: string}  
//    callback: string;     
//    originId: number;  }

interface DetailItemProps {
  item: Item;
  onClose: () => void; // Função para fechar a janela de detalhes
}

const DetailItem: React.FC<DetailItemProps> = ({ item, onClose }) => {
  return (
    <div className="container">
{/*      <h2>Detalhes do Item</h2> */}
      <div className="col-12">
      {/*    <button className="btn btn-dark me-2" onClick={onClose}>Fechar</button>  */}
      </div> 

   {/*   <p><strong>codigo:</strong> {item.codigo}</p> */}
      <p><strong>dataHora:</strong> {String(item.dataHora)}</p>
      <p><strong>nome:</strong> {item.nome}</p>
      <p><strong>email:</strong> {item.email}</p>
      <p><strong>telefone:</strong> {item.telefone}</p>
      <p><strong>cpfCNPJ:</strong> {item.cpfCNPJ}</p>
      <p><strong>endereco:</strong> {item.endereco}</p>
      <p><strong>bairro:</strong> {item.bairro}</p>
      <p><strong>cidade:</strong> {item.cidade}</p>
      <p><strong>uf:</strong> {item.uf}</p>
      <p><strong>cep:</strong> {item.cep}</p>
      <p><strong>nrDoc:</strong> {item.nrDoc}</p>
      <p><strong>nNum:</strong> {item.nNum}</p>
      <p><strong>valor:</strong> {item.valor}</p>
      <p><strong>Vencimento:</strong> {new Date(item.vencimento).toLocaleDateString('pt-BR')}</p>
      <p><strong>desconto1:</strong> {item.desconto1}</p>
      <p><strong>dataDesconto1:</strong> {new Date(item.dataDesconto1).toLocaleDateString('pt-BR')}</p>
      <p><strong>desconto2:</strong> {item.desconto2}</p>
      <p><strong>dataDesconto2:</strong> {new Date(item.dataDesconto2).toLocaleDateString('pt-BR')}</p>
      <p><strong>multa:</strong> {item.multa}</p>
      <p><strong>juros:</strong> {item.juros}</p>
      <p><strong>validade:</strong> {item.validade}</p>
      <p><strong>info:</strong> {item.info}</p>
      <p><strong>comentarios:</strong> {item.comentarios}</p>
      <div className="col-12">
      </div> 

    </div>
  );
};

export default DetailItem;
