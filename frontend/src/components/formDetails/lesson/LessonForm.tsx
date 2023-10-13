import { FileDrop } from '../fileDrop/FileDrop';
import FormWrapper from '../wrapper/FormWrapper';
import styles from './LessonForm.module.css';
import classes from '../fileDrop/FileDrop.module.css';

type LessonData = {
  lesson_title: string;
  lesson_image: File;
  lesson_description: string;
  lesson_resources: string;
};

type LessonFormProps = LessonData & {
  updateFields: (fields: Partial<LessonData>) => void;
};

const LessonForm = ({
  lesson_title,
  lesson_image,
  lesson_description,
  lesson_resources,
  updateFields,
}: LessonFormProps) => {
  const handleImageChange = (selectedImage: File | undefined) => {
    updateFields({ lesson_image: selectedImage });
  };
  return (
    <FormWrapper title='Lesson'>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
            {lesson_image.name ? 
            <img 
            src={URL.createObjectURL(lesson_image)} 
            alt="LessonImg" 
            className={classes.attachedPhoto} />
          : 
          <FileDrop onImageSelect={handleImageChange} />
          }
          <label>Lesson Title</label>
          <input
            className={styles.titleInput}
            required
            type='text'
            placeholder='Set course title'
            value={lesson_title}
            onChange={(e) => updateFields({ lesson_title: e.target.value })}
          />
        </div>
        <div className={styles.descriptionContainer}>
          <label>lessson description</label>
          <input
            className={styles.descriptionInput}
            required
            type='text'
            placeholder='Input Text Here'
            value={lesson_description}
            onChange={(e) => updateFields({ lesson_description: e.target.value })}
          />
        </div>

        <div className={styles.resourcesContainer}>
          <label>Lesson Resources</label>
          <input
            className={styles.resourcesInput}
            required
            type='text'
            placeholder='Resources Here'
            value={lesson_resources}
            onChange={(e) => updateFields({ lesson_resources: e.target.value })}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default LessonForm;
