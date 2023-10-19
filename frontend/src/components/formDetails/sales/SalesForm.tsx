import { FileDrop } from '../fileDrop/FileDrop';
import { Faq, SaleData } from '../../../types/component';
import FormWrapper from '../wrapper/FormWrapper';
import trashcan from '../../../assets/icons/delete.svg';
import add from '../../../assets/icons/add.svg';
import styles from '../course/CourseForm.module.css';
import Input from '../../input/Input.component';
import React from 'react';

type SaleFormProps = {
  sales_image: File | undefined;
  faqs: Faq[];
  key_learning: string;
  updateFields: (fields: Partial<SaleData>) => void;
};

const SalesForm = ({ sales_image, faqs, key_learning, updateFields }: SaleFormProps) => {
  const handleImageChange = (selectedImage: File | undefined) => {
    updateFields({ sales_image: selectedImage });
  };

  const handleFaqChange = (index: number, updatedFaq: Partial<Faq>) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index] = { ...updatedFaqs[index], ...updatedFaq };
    updateFields({ faqs: updatedFaqs });
  };

  const handleAddFaq = () => {
    const updatedFaqs = [...faqs, { faq: '', faq_answer: '' }];
    updateFields({ faqs: updatedFaqs });
  };

  const handleDeleteFaq = (index: number) => {
    const updatedFaqs = [...faqs];
    updatedFaqs.splice(index, 1);
    updateFields({ faqs: updatedFaqs });
  };

  return (
    <FormWrapper title='Sales Page'>
      <div className={styles.fileImport}>
        <FileDrop
          label='Sales page thumbnail'
          selectedImage={sales_image}
          onImageSelect={handleImageChange}
        />
      </div>
      <Input
        label='What you will learn:'
        isRequired={true}
        placeholder='Enter key learning Takeaway'
        value={key_learning}
        setValue={(value) => updateFields({ key_learning: value })}
      />

      {faqs.map((faq, index) => (
        <div className={styles.elementWrapper} key={index}>
          <div className={styles.faqSummary}>
            <div className={styles.faqTitle}>FAQ {index + 1}</div>
            <button
              type='button'
              onClick={() => handleDeleteFaq(index)}
              className={styles.trashcan}
            >
              <img src={trashcan} alt='delete-icon' />
            </button>
          </div>
          <Input
            label='Question:'
            placeholder='Question'
            value={faq.faq}
            setValue={(value) => handleFaqChange(index, { faq: value })}
          />
          <Input
            label='Answer:'
            placeholder='Answer'
            value={faq.faq_answer}
            setValue={(value) => handleFaqChange(index, { faq_answer: value })}
          />
        </div>
      ))}

      <button type='button' onClick={handleAddFaq} className={styles.add}>
        <span>
          <img src={add} alt='add-icon' />
        </span>
        <span>Add more FAQ's</span>
      </button>
    </FormWrapper>
  );
};

export default SalesForm;
