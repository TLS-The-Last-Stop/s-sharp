import React, {useEffect, useState} from 'react';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import styled from 'styled-components';
import Faq from './Faq';
import {faqService} from "../api/faqService";

const ChatbotDiv = styled.div`
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 99;
    cursor: pointer;
    display: ${props => props.isOpen ? 'none' : 'block'};
`;

const PopupDiv = styled.div`
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 300px;
    height: 400px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 100;
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
`;

const PopupHeader = styled.div`
    background-color: #f1f1f1;
    padding: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PopupContent = styled.div`
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const CloseButton = styled.button`
    background: black;
    border: none;
    font-size: 18px; 
    cursor: pointer;
`;

const DetailView = styled.div`
    overflow-y: auto;
    padding: 20px;
`;

const BackButton = styled.button`
    margin-bottom: 10px;
    padding: 5px 10px;
    background: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [faqList, setFaqList] = useState([]);

  useEffect(() => {
    if(isOpen) loadFaqs();
  }, [isOpen]);

  const loadFaqs = async ()=>{
    try{
      const faqs = await faqService.getAllFaq();
      setFaqList(faqs.data);
    }catch(error){
      console.error('Failed to load FAQs:',error)
    }
  }

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setSelectedItem(null);
  };

  const handleSelectedItem = async (item) => {
    try{
      const updatedFaq = await faqService.getFaqById(item.id);
      setSelectedItem(updatedFaq.data);
    }catch(error){
      console.error('Failed to get FAQ details:', error);
    }
  };

  const handleBack = () => {
    setSelectedItem(null);
  };


  return (
    <>
      <ChatbotDiv isOpen={isOpen} onClick={togglePopup}>
        <IoChatboxEllipsesOutline size={45} color={'#a17fd2'} />
      </ChatbotDiv>

      <PopupDiv isOpen={isOpen}>
        <PopupHeader>
          <span>자주 묻는 질문</span>
          <CloseButton onClick={togglePopup}>X</CloseButton>
        </PopupHeader>
        <PopupContent>
          {selectedItem ? (
            <DetailView>
              <BackButton onClick={handleBack}>뒤로</BackButton>
              <h3>{selectedItem.question}</h3>
              <p>{selectedItem.answer}</p>
              <p>조회수: {selectedItem.views}</p>
            </DetailView>
          ) : (
            <Faq faqList={faqList} onSelectItem={handleSelectedItem} />
          )}
        </PopupContent>
      </PopupDiv>
    </>
  );
};

export default Chatbot;