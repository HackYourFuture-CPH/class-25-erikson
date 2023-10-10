import { FileDrop } from '../FileDrop/FileDrop';
import { CourseData } from '../../../types/component';
import FormWrapper from '../wrapper/FormWrapper';
import classes from '../FileDrop/FileDrop.module.css';

type CourseFormProps = CourseData & {
  updateFields: (fields: Partial<CourseData>) => void;
};

const CourseForm = ({
  course_title,
  course_description,
  course_category,
  course_image,
  course_price,
  updateFields,
}: CourseFormProps) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFields({ course_category: e.target.value });
  };

  const handleImageChange = (selectedImage: File | undefined) => {
    updateFields({ course_image: selectedImage });
  };

  return (
    <FormWrapper title='Overview'>
      {course_image.name ? (
        <img
          src={URL.createObjectURL(course_image)}
          alt='CourseImg'
          className={classes.attachedPhoto}
        />
      ) : (
        <FileDrop onImageSelect={handleImageChange} />
      )}
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
      <label>Price</label>
      <input
        required
        type='number'
        value={course_price}
        onChange={(e) => updateFields({ course_price: e.target.valueAsNumber })}
      />
      <label>category</label>
      <select value={course_category} onChange={handleCategoryChange}>
        <option value='personal'>Personal</option>
        <option value='finance'> Finanace</option>
        <option value='profesional'>Profesional</option>
      </select>
    </FormWrapper>
  );
};

export default CourseForm;
