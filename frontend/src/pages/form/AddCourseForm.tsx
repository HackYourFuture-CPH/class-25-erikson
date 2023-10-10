import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../../data/data';
import { useAuthContext } from '../../hooks/useAuthContext';
import { AddCourseFields } from '../../types/component';
import { useMultistepForm } from '../../hooks/useMultiStepForm';
// import axios from 'axios';
import CourseForm from '../../components/formDetails/course/CourseForm';
import LessonForm from '../../components/formDetails/lesson/LessonForm';
import SalesForm from '../../components/formDetails/sales/SalesForm';
import DashboardWrapper from '../../components/dashboardLayout/DashboardWrapper';
import BackArrow from '../../assets/icons/back.svg';
import FrontArrow from '../../assets/icons/front.svg';
import styles from './AddCourseForm.module.css';
// import useFirebaseStorage from '../../hooks/useFirebaseStorage';
import useSingleCourseStore from '../../store/addSingleCourse.store';

const AddCourseForm: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  // const { generateUniqueFileName, uploadImageToFirebaseStorage } = useFirebaseStorage();

  const userType = users[1].type;

  if (!user?.emailVerified) {
    navigate('/login', { replace: true });
  }

  if (user?.emailVerified && userType === 'Student') {
    navigate('/courses');
  }

  const { data, updateCourseFields, resetForm } = useSingleCourseStore();

  const updateFields = (fields: Partial<AddCourseFields>) => {
    updateCourseFields({ ...data, ...fields });
  };

  const { steps, currentIndex, step, isFirstStep, isLastStep, back, next, goTo } = useMultistepForm(
    [
      <CourseForm {...data} updateFields={updateFields} />,
      <LessonForm {...data} updateFields={updateFields} />,
      <SalesForm {...data} updateFields={updateFields} />,
    ],
  );

  const checkImageAttached = async (e: FormEvent) => {
    if (isFirstStep && !data.course_image.name) {
      e.preventDefault();
      alert('Please select an course image.');
      return;
    }

    if (isLastStep && !data.sales_image.name) {
      e.preventDefault();
      alert('Please select a sale image.');
      return;
    }

    if (!isFirstStep && !isLastStep && !data.lesson_image.name) {
      e.preventDefault();
      alert('Please select a lesson image.');
      return;
    }
  };

  const submitForm = (e: FormEvent) => {
    // const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLastStep) return next();

    // try {
    // // Getting Firebase ID token
    // const idToken = await user?.getIdToken();
    // const courseImagePath = `courses/${generateUniqueFileName(data.course_image.name)}`;
    // const lessonImagePath = `lessons/${generateUniqueFileName(data.lesson_image.name)}`;
    // const salesImagePath = `sales/${generateUniqueFileName(data.sales_image.name)}`;

    // const [courseImageUrl, lessonImageUrl, salesImageUrl] = await Promise.all([
    //   uploadImageToFirebaseStorage(data.course_image, courseImagePath),
    //   uploadImageToFirebaseStorage(data.lesson_image, lessonImagePath),
    //   uploadImageToFirebaseStorage(data.sales_image, salesImagePath)
    // ]);

    // const formDataWithUrls = {
    //   ...data,
    //   course_image: courseImageUrl,
    //   lesson_image: lessonImageUrl,
    //   sales_image: salesImageUrl
    // };

    // // Posting form data to the server
    // await axios.post(
    //   'http://localhost:3000/courses',
    //   formDataWithUrls,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${idToken}`,
    //     }
    //   }
    // );

    //   navigate('/courses');
    // }
    // catch (error) {
    //   console.error('Error submitting form:', error);
    // }

    alert('Form Submitted');
    console.log(data);
    resetForm();
    goTo(0);
    navigate('/courses');
  };

  return (
    <DashboardWrapper>
      <div className={styles.addCourse}>
        <form onSubmit={submitForm}>
          <div>
            {currentIndex + 1} / {steps.length}
          </div>
          {step}
          <div className={styles.buttonsDiv}>
            {!isFirstStep && (
              <button type='button' onClick={back}>
                <>
                  <img src={BackArrow} alt='Back Arrow' />
                  <span>Go Back</span>
                </>
              </button>
            )}
            <button type='submit' onClick={checkImageAttached}>
              {isLastStep ? (
                'Add Course'
              ) : (
                <>
                  <span>Publish Course</span>
                  <img src={FrontArrow} alt='Front Arrow' />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardWrapper>
  );
};

export default AddCourseForm;
