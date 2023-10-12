import { FileDrop } from '../FileDrop/FileDrop';
import { Faq, SaleData } from '../../../types/component';
import FormWrapper from '../wrapper/FormWrapper';
import trashcan from '../../../assets/icons/delete.svg';
import add from '../../../assets/icons/add.svg';
import styles from '../course/CourseForm.module.css';
import classes from '../FileDrop/FileDrop.module.css';

type SaleFormProps = {
  sales_image: File;
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
        {sales_image.name ? (
          <img
            src={URL.createObjectURL(sales_image)}
            alt='SalesImg'
            className={classes.attachedPhoto}
          />
        ) : (
          <FileDrop onImageSelect={handleImageChange} />
        )}

        <div>
          <label className={styles.label}>What you will learn:</label>
          <input
            className={styles.input}
            required
            type='text'
            placeholder='Enter key learning Takeaway'
            value={key_learning}
            onChange={(e) => updateFields({ key_learning: e.target.value })}
          />

          {faqs.map((faq, index) => (
            <div key={index}>
              <label className={styles.label}>Question:</label>
              <input
                className={styles.input}
                type='text'
                placeholder='Question'
                value={faq.faq}
                onChange={(e) => handleFaqChange(index, { faq: e.target.value })}
              />

              <label className={styles.label}>Answer:</label>
              <input
                className={styles.input}
                type='text'
                placeholder='Answer'
                value={faq.faq_answer}
                onChange={(e) => handleFaqChange(index, { faq_answer: e.target.value })}
              />

              <button onClick={() => handleDeleteFaq(index)} className={styles.trashcan}>
                <img src={trashcan} alt='delete-icon' />
              </button>
            </div>
          ))}

          <button type='button' onClick={handleAddFaq} className={styles.add}>
            <span>
              <img src={add} alt='add-icon' />
            </span>
            <span>Add more FAQ's</span>
          </button>
        </div>
      </div>
    </FormWrapper>
  );
};

export default SalesForm;
