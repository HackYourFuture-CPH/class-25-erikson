import { FileDrop } from '../FileDrop/FileDrop';
import FormWrapper from '../wrapper/FormWrapper';
import styles from './SalesForm.module.css';
type SaleData = {
  sales_image: File;
  faq: string;
  faq_answer: string;
  key_learning: string;
  pricing_benefits: string;
};

type SaleFormProps = SaleData & {
  updateFields: (fields: Partial<SaleData>) => void;
};

const SalesForm = ({
  sales_image,
  faq,
  faq_answer,
  key_learning,
  pricing_benefits,
  updateFields,
}: SaleFormProps) => {
  const handleImageChange = (selectedImage: File | undefined) => {
    updateFields({ sales_image: selectedImage });
  };
  return (
    <FormWrapper title='Sales Page'>
      <div className={styles.container}>
        <p>Featured Image</p>

        <FileDrop onImageSelect={handleImageChange} />

        <div className={styles.faqContainer}>
          <label> what you will learn</label>
          <input
            className={styles.faqQuestion}
            required
            type='text'
            placeholder='Enter key learning Takeaway'
            value={key_learning}
            onChange={(e) => updateFields({ key_learning: e.target.value })}
          />
          <label className={styles.faqText}>FAQs: </label>
          <label>Question:</label>
          <input
            className={styles.faqQuestion}
            type='text'
            placeholder='Question'
            value={faq}
            onChange={(e) => updateFields({ faq: e.target.value })}
          />
        </div>

        <div className={styles.inputContainer}>
          <label>Answer:</label>
          <input
            className={styles.faqAnswer}
            type='text'
            placeholder='Answer'
            value={faq_answer}
            onChange={(e) => updateFields({ faq_answer: e.target.value })}
          />
        </div>

        <div className={styles.inputContainer}>
          <label> pricing benefits </label>
          <input
            className={styles.faqQuestion}
            required
            type='text'
            value={pricing_benefits}
            onChange={(e) => updateFields({ pricing_benefits: e.target.value })}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default SalesForm;
