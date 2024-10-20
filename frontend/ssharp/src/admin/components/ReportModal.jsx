import React, {useState} from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
`;

const Select = styled.select`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 300px;
    padding: 10px;
    margin-bottom: 10px;
    resize: none;
`;

const Button = styled.button`
    padding: 10px 20px;
    margin-right: 10px;
`;

const ReportModal = ({isOpen, onClose, onSubmit}) => {
  const [reportType, setReportType] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (reportType.trim().length < 1) {
      alert('신고 유형을 선택해주세요.');
      return;
    }
    onSubmit({reportType, reason});
    onClose();
    setReportType('');
    setReason('');
  };

  if (!isOpen) return null;

  return (
      <ModalBackground>
        <ModalContent>
          <h2>신고하기</h2>
          <Select value={reportType} onChange={(e) => setReportType(e.target.value)}>
            <option value="">신고 유형 선택</option>
            <option value="음란물">음란물</option>
            <option value="홍보">홍보</option>
            <option value="혐오발언">혐오발언</option>
            <option value="정치질">정치질</option>
            <option value="기타사유">기타사유</option>
          </Select>
          <TextArea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="신고 이유를 입력해주세요."
          />
          <Button onClick={handleSubmit}>제출</Button>
          <Button onClick={onClose}>취소</Button>
        </ModalContent>
      </ModalBackground>
  );
};

export default ReportModal;