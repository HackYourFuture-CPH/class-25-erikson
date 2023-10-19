import React, { useState } from 'react';
import { FileDrop } from '../fileDrop/FileDrop';
import { Lesson, LessonData } from '../../../types/component';
import FormWrapper from '../wrapper/FormWrapper';
import trashcan from '../../../assets/icons/delete.svg';
import styles from './LessonForm.module.css';
import Input from '../../input/Input.component';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Button from '../../button/Button.component';

type LessonFormProps = LessonData & {
  updateFields: (fields: Partial<LessonData>) => void;
};

const LessonForm: React.FC<LessonFormProps> = ({ lessons, updateFields }: LessonFormProps) => {
  const [expanded, setExpanded] = useState<number>(0);

  const handleImageChange = (selectedImage: File | undefined, index: number) => {
    const updatedLessons = lessons.map((lesson, i) => {
      if (i === index) {
        return {
          ...lesson,
          lesson_image: selectedImage || undefined,
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
      lesson_image: undefined,
      lesson_description: '',
      resources: [{ lesson_resources: '' }],
    };

    handleAccordionChange(lessons.length)({} as React.SyntheticEvent, false);

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

  const handleAccordionChange =
    (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(panel);
    };

  return (
    <FormWrapper noStyle={true} title='Lessons'>
      <div className={styles.wrapper}>
        {lessons.map((lesson, index) => (
          <Accordion
            expanded={expanded === index}
            onChange={handleAccordionChange(index)}
            key={index}
          >
            <AccordionSummary>
              <div className={styles.lessonSummary}>
                <div className={styles.lessonTitle}>Lesson {index + 1}</div>
                <button
                  type='button'
                  onClick={() => handleDeleteLesson(index)}
                  className={styles.trashcan}
                >
                  <img src={trashcan} alt='delete-icon' />
                </button>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className={styles.lessonWrapper}>
                <div className={styles.fileImport}>
                  <FileDrop
                    label='Lesson thumbnail'
                    selectedImage={lesson.lesson_image}
                    onImageSelect={(selectedImage: File | undefined) =>
                      handleImageChange(selectedImage, index)
                    }
                  />
                </div>
                <Input
                  label='Lesson Title'
                  isRequired={true}
                  placeholder='Set lesson title'
                  value={lesson.lesson_title}
                  setValue={(title) => handleLessonTitleChange(title, index)}
                />
                <Input
                  label='Lesson Description'
                  isRequired={true}
                  placeholder='Add lesson description'
                  value={lesson.lesson_description}
                  setValue={(description) => handleLessonDescriptionChange(description, index)}
                />
                <Input
                  label='Lesson Resource url'
                  isRequired={true}
                  placeholder='Add lesson url'
                  value={lesson.resources[0].lesson_resources}
                  setValue={(resource) => handleLessonResourcesChange(resource, index)}
                />
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      <Button label='Add more lessons' onClick={handleAddLesson} />
    </FormWrapper>
  );
};

export default LessonForm;
