import React from 'react';
import FailureIcon from '../../assets/icons/failure.svg';
import alerts from './Alert.module.css';

interface FailureModalProps {
  onClose: () => void;
}

const FailureModal: React.FC<FailureModalProps> = ({ onClose }) => (
  <div className={alerts.modal}>
    <div className={alerts.modalContent}>
      <span className={alerts.close} onClick={onClose}>
        &times;
      </span>
      <div className={alerts.fail}>
        <img src={FailureIcon} alt='showing-form-failure' />
      </div>
      <h2 className={alerts.error}>Error!</h2>
      <p>Your course has not been submitted</p>
    </div>
  </div>
);

export default FailureModal;
