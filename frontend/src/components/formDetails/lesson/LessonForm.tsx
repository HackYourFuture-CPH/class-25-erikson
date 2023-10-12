import React from 'react';
import { FileDrop } from '../FileDrop/FileDrop';
import { Lesson, LessonData } from '../../../types/component';
import FormWrapper from '../wrapper/FormWrapper';
import trashcan from '../../../assets/icons/delete.svg';
import add from '../../../assets/icons/add.svg';
import styles from '../course/CourseForm.module.css';
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
    <FormWrapper title='Lessons'>
      {lessons.map((lesson, index) => (
        <div key={index}>
          <div className={styles.fileImport}>
            {lesson.lesson_image.name ? (
              <img
                src={URL.createObjectURL(lesson.lesson_image)}
                alt='LessonImg'
                className={classes.attachedPhoto}
              />
            ) : (
              <FileDrop
                onImageSelect={(selectedImage) => handleImageChange(selectedImage, index)}
              />
            )}
          </div>
          <label className={styles.label}>Lesson Title</label>
          <input
            className={styles.input}
            required
            type='text'
            placeholder='Set course title'
            value={lesson.lesson_title}
            onChange={(e) => handleLessonTitleChange(e.target.value, index)}
          />
          <label className={styles.label}>Lesson Description</label>
          <input
            className={styles.input}
            required
            type='text'
            placeholder='Input Text Here'
            value={lesson.lesson_description}
            onChange={(e) => handleLessonDescriptionChange(e.target.value, index)}
          />
          <label className={styles.label}>Lesson Resources</label>
          <input
            className={styles.input}
            required
            type='text'
            placeholder='Resources Here'
            value={lesson.resources[0].lesson_resources}
            onChange={(e) => handleLessonResourcesChange(e.target.value, index)}
          />
          <button onClick={() => handleDeleteLesson(index)} className={styles.trashcan}>
            <img src={trashcan} alt='delete-icon' />
          </button>
        </div>
      ))}
      <button onClick={handleAddLesson} className={styles.add}>
        <span>
          <img src={add} alt='add-icon' />
        </span>
        <span>Add more lessons</span>
      </button>
    </FormWrapper>
  );
};

export default LessonForm;
