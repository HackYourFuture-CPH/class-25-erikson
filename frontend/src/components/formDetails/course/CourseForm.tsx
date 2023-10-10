import { FileDrop } from '../FileDrop/FileDrop';
import FormWrapper from '../wrapper/FormWrapper';
import classes from "../FileDrop/FileDrop.module.css"

type CourseData = {
  course_title: string;
  course_description: string;
  course_category: string;
  course_image: File;
  course_subscriptionType: string;
  course_price: number;
};

type CourseFormProps = CourseData & {
  updateFields: (fields: Partial<CourseData>) => void;
};

const CourseForm = ({
  course_title,
  course_description,
  course_category,
  course_image,
  course_subscriptionType,
  course_price,
  updateFields,
}: CourseFormProps) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFields({ course_category: e.target.value });
  };

  const handleImageChange = (selectedImage: File | undefined) => {
    updateFields({ course_image: selectedImage });
  };

  const handleSubscriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFields({ course_subscriptionType: e.target.value });
  };

  return (
    <FormWrapper title='Overview'>
      {course_image.name ? 
        <img 
        src={URL.createObjectURL(course_image)} 
        alt="CourseImg" 
        className={classes.attachedPhoto} />
      : 
      <FileDrop onImageSelect={handleImageChange} />
      }
      <label>Course Title</label>
      <input
        autoFocus
        required
        type='text'
        value={course_title}
        onChange={(e) => updateFields({ course_title: e.target.value })}
      />
      <label>Description</label>
      <textarea
        required
        value={course_description}
        onChange={(e) => updateFields({ course_description: e.target.value })}
      />
      <label>category</label>
      <select value={course_category} onChange={handleCategoryChange}>
        <option value='personal'>Personal</option>
        <option value='finance'> Finanace</option>
        <option value='profesional'>Profesional</option>
      </select>
      <label>Subscription Type</label>
      <div>
        <label>
          <input
            type='radio'
            value='monthly'
            checked={course_subscriptionType === 'monthly'}
            onChange={handleSubscriptionChange}
          />
          Monthly
          {course_subscriptionType === 'monthly' && (
            <input
              type='number'
              value={course_price}
              onChange={(e) => updateFields({ course_price: parseFloat(e.target.value) })}
              placeholder='Monthly Price'
            />
          )}
        </label>
      </div>
      <div>
        <label>
          <input
            type='radio'
            value='individual'
            checked={course_subscriptionType === 'individual'}
            onChange={handleSubscriptionChange}
          />
          Individual
          {course_subscriptionType === 'individual' && (
            <input
              type='number'
              value={course_price}
              onChange={(e) => updateFields({ course_price: parseFloat(e.target.value) })}
              placeholder=' individual Price'
            />
          )}
        </label>
      </div>
    </FormWrapper>
  );
};

export default CourseForm;
