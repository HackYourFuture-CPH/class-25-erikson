import React from 'react';
import SuccessIcon from '../../assets/icons/success.svg';
import alerts from './Alert.module.css';

interface SuccessModalProps {
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => (
  <div className={alerts.modal}>
    <div className={alerts.modalContent}>
      <span className={alerts.close} onClick={onClose}>
        &times;
      </span>
      <div className={alerts.head}>
        <img src={SuccessIcon} alt='showing-form-success' />
      </div>
      <h2>Great!</h2>
      <p>Your course has been successfully submitted</p>
    </div>
  </div>
);

export default SuccessModal;
