import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './FaqsSection.module.css'
interface FaqsSectionProps {
  faqs: {
    faq: string;
    faq_answer: string;
  }[];
}

const FaqsSection: React.FC<FaqsSectionProps> = ({ faqs }) => {
  return (
    <div className="course-section">
      <h3>FAQs</h3>
      <div className={styles.faqsWrap}>
        {faqs.map((faq, index) => (
          <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" >{faq.faq}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            {faq.faq_answer}
            </Typography>
          </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default FaqsSection;
