import FormWrapper from './FormWrapper';

type SaleData = {
  sales_image: File;
  faq: string;
  faq_answer: string;
  key_learning: string;
  pricing_benefits: string;
};
type FAQ = {
  question: string;
  answer: string;
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
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    updateFields({ sales_image: selectedImage });
  };
  return (
    <FormWrapper title='Sales Page'>
      <label>Upload Image</label>
      <input type='file' accept='image/*' onChange={handleImageChange} />

      <span>FAQs</span>
      <label>Question:</label>
      <input
        type='text'
        placeholder='Question'
        value={faq}
        onChange={(e) => updateFields({ faq: e.target.value })}
      />

      <label>Answer:</label>
      <input
        type='text'
        placeholder='Answer'
        value={faq_answer}
        onChange={(e) => updateFields({ faq_answer: e.target.value })}
      />

      <label> what you will learn</label>
      <input
        required
        type='text'
        value={key_learning}
        onChange={(e) => updateFields({ key_learning: e.target.value })}
      />
      <label> pricing benefits </label>
      <input
        required
        type='text'
        value={pricing_benefits}
        onChange={(e) => updateFields({ pricing_benefits: e.target.value })}
      />
    </FormWrapper>
  );
};

export default SalesForm;
