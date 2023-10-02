import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';
import { users } from '../../data/data';
import { useAuthContext } from '../../hooks/useAuthContext';
import { AddCourseFields } from '../../types/component';
import { useMultistepForm } from '../../hooks/useMultiStepForm';
import CourseForm from '../../components/formDetails/CourseForm';
import MentorForm from '../../components/formDetails/MentorForm';
import ContentOutlineForm from '../../components/formDetails/ContentOutlineForm';
import DashboardWrapper from '../dashboard/DashboardWrapper';

const newCourse: AddCourseFields = {
  course_name: '',
  tag: '',
  description: '',
  mentor: {
    name: '',
    image: '',
    role: '',
    socialNetworks: {
      linkedin: '',
      twitter: '',
      instagram: '',
      facebook: '',
    },
    bio: '',
    categories: [],
  },
  contentOutline: {
    lessons: [
      {
        title: '',
        duration: '',
        video: '',
        pdfs: [
          {
            title: '',
            file: '',
          },
        ],
      },
    ],
  },
  date: '',
  comments: [],
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
    <MentorForm {...data} updateFields={updateFields} />,
    <ContentOutlineForm {...data} updateFields={updateFields} />,
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
