import React, { useState, useEffect } from 'react';
import CampaignLeadModal from './CampaignLeadModal';
import { isCampaignActive } from '../config/campaignConfig';

export default function LeadPopup({ isOpen, onClose }) {
  const [modalOpen, setModalOpen] = useState(false);
  const active = isCampaignActive();

  useEffect(() => {
    if (isOpen) {
      setModalOpen(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setModalOpen(false);
    if (onClose) onClose();
  };

  return (
    <CampaignLeadModal 
      isOpen={modalOpen} 
      onClose={handleClose} 
      source="exit_intent_popup"
    />
  );
}
