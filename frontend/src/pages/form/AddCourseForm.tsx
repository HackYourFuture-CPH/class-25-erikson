import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { AddCourseFields } from '../../types/component';
import { useMultistepForm } from '../../hooks/useMultiStepForm';
import axios from 'axios';
import CourseForm from '../../tmp_components/formDetails/course/CourseForm';
import LessonForm from '../../tmp_components/formDetails/lesson/LessonForm';
import SalesForm from '../../tmp_components/formDetails/sales/SalesForm';
import DashboardWrapper from '../../tmp_components/dashboardLayout/DashboardWrapper';
import BackArrow from '../../assets/icons/back.svg';
import FrontArrow from '../../assets/icons/front.svg';
import styles from './AddCourseForm.module.css';
import useFirebaseStorage from '../../hooks/useFirebaseStorage';
import useSingleCourseStore from '../../store/addSingleCourse.store';
import useUserStore from '../../store/user.store';

const AddCourseForm: React.FC = () => {
  const { user } = useAuthContext();
  const { currentUser } = useUserStore();
  const { generateUniqueFileName, uploadImageToFirebaseStorage } = useFirebaseStorage();
  const navigate = useNavigate();

  const userType = currentUser?.user_type;
  const mentorId = currentUser?.id;

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

  const { step, isFirstStep, isLastStep, back, next, goTo } = useMultistepForm([
    <CourseForm {...data} updateFields={updateFields} />,
    <LessonForm {...data} updateFields={updateFields} />,
    <SalesForm {...data} updateFields={updateFields} />,
  ]);

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

    if (!isFirstStep && !isLastStep && data.lessons.some((lesson) => !lesson.lesson_image.name)) {
      e.preventDefault();
      alert('Please select a lesson image for all lessons.');
      return;
    }
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLastStep) return next();

    try {
      // Upload course image to Firebase Storage
      const courseImagePath = `courses/${generateUniqueFileName(data.course_image.name)}`;
      const courseImageUrl = await uploadImageToFirebaseStorage(data.course_image, courseImagePath);

      // Upload lesson images to Firebase Storage
      const lessonsWithImageUrls = await Promise.all(
        data.lessons.map(async (lesson) => {
          const lessonImagePath = `lessons/${generateUniqueFileName(lesson.lesson_image.name)}`;
          const lessonImageUrl = await uploadImageToFirebaseStorage(
            lesson.lesson_image,
            lessonImagePath,
          );

          return {
            ...lesson,
            lesson_image: lessonImageUrl,
          };
        }),
      );

      // Upload sales image to Firebase Storage
      const salesImagePath = `sales/${generateUniqueFileName(data.sales_image.name)}`;
      const salesImageUrl = await uploadImageToFirebaseStorage(data.sales_image, salesImagePath);

      // Update data with image URLs
      const formDataWithUrls = {
        ...data,
        course_image: courseImageUrl,
        lessons: lessonsWithImageUrls,
        sales_image: salesImageUrl,
      };

      // Getting Firebase ID token
      const idToken = await user?.getIdToken();

      // Posting form data to the server
      await axios.post(`api/courses/${mentorId}/add_course`, formDataWithUrls, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      alert('Form Submitted');
      resetForm();
      goTo(0);
      navigate('/courses');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <DashboardWrapper>
      <div className={styles.addCourse}>
        <form onSubmit={submitForm}>
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
