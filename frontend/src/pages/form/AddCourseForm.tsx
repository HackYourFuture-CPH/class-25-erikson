import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';
import { users } from '../../data/data';
import { useAuthContext } from '../../hooks/useAuthContext';
import { AddCourseFields } from '../../types/component';
import { useMultistepForm } from '../../hooks/useMultiStepForm';
import CourseForm from '../../components/formDetails/CourseForm';
import LessonForm from '../../components/formDetails/LessonForm';
import SalesForm from '../../components/formDetails/SalesForm';
import DashboardWrapper from '../dashboard/DashboardWrapper';

const emptyFile: File = new File([], '', { type: '' });
const newCourse: AddCourseFields = {
  course_title: '',
  course_description: '',
  course_category: '',
  course_image: emptyFile,
  course_subscriptionType: '',
  course_price: 0,
  lesson_title: '',
  lesson_image: emptyFile,
  lesson_description: '',
  lesson_resources: '',
  sales_image: emptyFile,
  faq: '',
  faq_answer: '',
  key_learning: '',
  pricing_benefits: '',
};

type CourseStore = {
  data: AddCourseFields;
  updateCourseFields: (fields: Partial<AddCourseFields>) => void;
};

export const useCourseStore = create<CourseStore>((set) => ({
  data: newCourse,
  updateCourseFields: (fields) =>
    set((state) => ({
      data: { ...state.data, ...fields },
    })),
}));

const AddCourseForm: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const userType = users[1].type;

  if (!user?.emailVerified) {
    navigate('/login', { replace: true });
  }

  if (user?.emailVerified && userType === 'Student') {
    navigate('/courses');
  }

  const { data, updateCourseFields } = useCourseStore();

  function updateFields(fields: Partial<AddCourseFields>) {
    updateCourseFields({ ...data, ...fields });
  }

  const { steps, currentIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([
    <CourseForm {...data} updateFields={updateFields} />,
    <LessonForm {...data} updateFields={updateFields} />,
    <SalesForm {...data} updateFields={updateFields} />,
  ]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    alert('Successful Account Creation');
    console.log(data);
  }

  return (
    <DashboardWrapper>
      <div
        style={{
          position: 'relative',
          background: 'white',
          border: '1px solid black',
          padding: '2rem',
          margin: '1rem',
          borderRadius: '.5rem',
          fontFamily: 'Arial',
          maxWidth: 'max-content',
        }}
      >
        <form onSubmit={onSubmit}>
          <div style={{ position: 'absolute', top: '.5rem', right: '.5rem' }}>
            {currentIndex + 1} / {steps.length}
          </div>
          {step}
          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              gap: '.5rem',
              justifyContent: 'flex-end',
            }}
          >
            {!isFirstStep && (
              <button type='button' onClick={back}>
                Back
              </button>
            )}
            <button type='submit'>{isLastStep ? 'Finish' : 'Next'}</button>
          </div>
        </form>
      </div>
    </DashboardWrapper>
  );
};

export default AddCourseForm;
