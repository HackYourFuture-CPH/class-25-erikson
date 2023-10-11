import React from 'react';
import { FileDrop } from '../FileDrop/FileDrop';
import { Lesson, LessonData } from '../../../types/component';
import FormWrapper from '../wrapper/FormWrapper';
import styles from './LessonForm.module.css';
import classes from '../FileDrop/FileDrop.module.css';

type LessonFormProps = LessonData & {
  updateFields: (fields: Partial<LessonData>) => void;
};

const LessonForm: React.FC<LessonFormProps> = ({ lessons, updateFields }: LessonFormProps) => {
  const handleImageChange = (selectedImage: File | undefined, index: number) => {
    const updatedLessons = lessons.map((lesson, i) => {
      if (i === index) {
        return {
          ...lesson,
          lesson_image: selectedImage || new File([], ''),
        };
      }
      return lesson;
    });

    updateFields({
      lessons: updatedLessons,
    });
  };

  const handleLessonTitleChange = (value: string, index: number) => {
    const updatedLessons = lessons.map((lesson, i) => {
      if (i === index) {
        return {
          ...lesson,
          lesson_title: value,
        };
      }
      return lesson;
    });

    updateFields({
      lessons: updatedLessons,
    });
  };

  const handleLessonDescriptionChange = (value: string, index: number) => {
    const updatedLessons = lessons.map((lesson, i) => {
      if (i === index) {
        return {
          ...lesson,
          lesson_description: value,
        };
      }
      return lesson;
    });

    updateFields({
      lessons: updatedLessons,
    });
  };

  const handleLessonResourcesChange = (value: string, index: number) => {
    const updatedLessons = lessons.map((lesson, i) => {
      if (i === index) {
        return {
          ...lesson,
          resources: [{ lesson_resources: value }],
        };
      }
      return lesson;
    });

    updateFields({
      lessons: updatedLessons,
    });
  };

  const handleAddLesson = () => {
    const newLesson: Lesson = {
      lesson_title: '',
      lesson_image: new File([], ''),
      lesson_description: '',
      resources: [{ lesson_resources: '' }],
    };

    updateFields({
      lessons: [...lessons, newLesson],
    });
  };

  const handleDeleteLesson = (index: number) => {
    const updatedLessons = lessons.filter((lesson, i) => i !== index);
    updateFields({
      lessons: updatedLessons,
    });
  };

  return (
    <FormWrapper title='Lesson'>
      {lessons.map((lesson, index) => (
        <div key={index} className={styles.container}>
          {lesson.lesson_image.name ? (
            <img
              src={URL.createObjectURL(lesson.lesson_image)}
              alt='LessonImg'
              className={classes.attachedPhoto}
            />
          ) : (
            <FileDrop onImageSelect={(selectedImage) => handleImageChange(selectedImage, index)} />
          )}
          <label>Lesson Title</label>
          <input
            className={styles.titleInput}
            required
            type='text'
            placeholder='Set course title'
            value={lesson.lesson_title}
            onChange={(e) => handleLessonTitleChange(e.target.value, index)}
          />
          <label>Lesson Description</label>
          <input
            className={styles.descriptionInput}
            required
            type='text'
            placeholder='Input Text Here'
            value={lesson.lesson_description}
            onChange={(e) => handleLessonDescriptionChange(e.target.value, index)}
          />
          <label>Lesson Resources</label>
          <input
            className={styles.resourcesInput}
            required
            type='text'
            placeholder='Resources Here'
            value={lesson.resources[0].lesson_resources}
            onChange={(e) => handleLessonResourcesChange(e.target.value, index)}
          />
          <button onClick={() => handleDeleteLesson(index)}>Delete Lesson</button>
        </div>
      ))}
      <button onClick={handleAddLesson}>Add Lesson</button>
    </FormWrapper>
  );
};

export default LessonForm;
