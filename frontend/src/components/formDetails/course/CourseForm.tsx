import { FileDrop } from '../fileDrop/FileDrop';
import { CourseData } from '../../../types/component';
import FormWrapper from '../wrapper/FormWrapper';
import classes from '../fileDrop/FileDrop.module.css';
import styles from './CourseForm.module.css';

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
      <div className={styles.fileImport}>
        {course_image.name ? (
          <img
            src={URL.createObjectURL(course_image)}
            alt='CourseImg'
            className={classes.attachedPhoto}
          />
        ) : (
          <FileDrop onImageSelect={handleImageChange} />
        )}
      </div>
      <label className={styles.label}>Course Title</label>
      <input
        className={styles.input}
        autoFocus
        required
        type='text'
        value={course_title}
        onChange={(e) => updateFields({ course_title: e.target.value })}
      />
      <label className={styles.label}>Description</label>
      <textarea
        className={styles.textArea}
        required
        value={course_description}
        onChange={(e) => updateFields({ course_description: e.target.value })}
      />
      <label className={styles.label}>Price</label>
      <input
        className={styles.input}
        required
        type='number'
        value={course_price}
        onChange={(e) => updateFields({ course_price: e.target.valueAsNumber })}
      />
      <label className={styles.label}>category</label>
      <select className={styles.select} value={course_category} onChange={handleCategoryChange}>
        <option value='personal'>Personal</option>
        <option value='finance'> Finance</option>
        <option value='professional'>Professional</option>
      </select>
    </FormWrapper>
  );
};

export default CourseForm;
