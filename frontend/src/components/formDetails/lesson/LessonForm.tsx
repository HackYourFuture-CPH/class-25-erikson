import { FileDrop } from '../FileDrop/FileDrop';
import FormWrapper from '../wrapper/FormWrapper';
import classes from '../FileDrop/FileDrop.module.css';

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
      {lesson_image.name ? 
        <img 
        src={URL.createObjectURL(lesson_image)} 
        alt="LessonImg" 
        className={classes.attachedPhoto} />
      : 
      <FileDrop onImageSelect={handleImageChange} />
      }
      <label>title</label>
      <input
        required
        type='text'
        value={lesson_title}
        onChange={(e) => updateFields({ lesson_title: e.target.value })}
      />

      <label>lessson description</label>
      <input
        required
        type='text'
        value={lesson_description}
        onChange={(e) => updateFields({ lesson_description: e.target.value })}
      />

      <label>Lesson Resources</label>
      <input
        required
        type='text'
        value={lesson_resources}
        onChange={(e) => updateFields({ lesson_resources: e.target.value })}
      />
    </FormWrapper>
  );
};

export default LessonForm;
