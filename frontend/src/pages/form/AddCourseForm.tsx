import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { AddCourseFields } from '../../types/component';
import { useMultistepForm } from '../../hooks/useMultiStepForm';
import axios from 'axios';
import useFirebaseStorage from '../../hooks/useFirebaseStorage';
import useSingleCourseStore from '../../store/addSingleCourse.store';
import useUserStore from '../../store/user.store';
import CourseForm from '../../components/formDetails/course/CourseForm';
import LessonForm from '../../components/formDetails/lesson/LessonForm';
import SalesForm from '../../components/formDetails/sales/SalesForm';
import BackArrow from '../../assets/icons/back.svg';
import FrontArrow from '../../assets/icons/front.svg';
import styles from './AddCourseForm.module.css';
import SuccessModal from './SuccessModal';
import FailureModal from './FailureModal';
import Loader from './Loader';
import useNotificationStore from '../../store/notification.store';
import Button from '../../components/button/Button.component';

const AddCourseForm: React.FC = () => {
  const { user } = useAuthContext();
  const { currentUser } = useUserStore();
  const { generateUniqueFileName, uploadImageToFirebaseStorage } = useFirebaseStorage();
  const { setNotification } = useNotificationStore();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const navigate = useNavigate();

  const userType = currentUser?.user_type;
  const mentorId = currentUser?.id;

  useEffect(() => {
    if (user?.emailVerified && userType === 'Student') {
      navigate('/courses');
    }
  }, [user, userType, navigate]);

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
    if (isFirstStep && !data.course_image?.name) {
      e.preventDefault();
      setNotification({ message: 'Please select an course image.', severity: 'warning' });
      return;
    }

    if (isLastStep && !data.sales_image?.name) {
      e.preventDefault();
      setNotification({ message: 'Please select a sale image.', severity: 'warning' });
      return;
    }

    if (!isFirstStep && !isLastStep && data.lessons.some((lesson) => !lesson.lesson_image?.name)) {
      e.preventDefault();
      setNotification({
        message: 'Please select a lesson image for all lessons.',
        severity: 'warning',
      });
      return;
    }
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLastStep) return next();

    try {
      setIsLoading(true);
      // Upload course image to Firebase Storage
      const courseImagePath = `courses/${generateUniqueFileName(data.course_image?.name || '')}`;
      const courseImageUrl =
        data.course_image &&
        (await uploadImageToFirebaseStorage(data.course_image, courseImagePath));

      // Upload lesson images to Firebase Storage
      const lessonsWithImageUrls = await Promise.all(
        data.lessons.map(async (lesson) => {
          const lessonImagePath = `lessons/${generateUniqueFileName(
            lesson.lesson_image?.name || '',
          )}`;
          const lessonImageUrl =
            lesson.lesson_image &&
            (await uploadImageToFirebaseStorage(lesson.lesson_image, lessonImagePath));

          return {
            ...lesson,
            lesson_image: lessonImageUrl,
          };
        }),
      );

      // Upload sales image to Firebase Storage
      const salesImagePath = `sales/${generateUniqueFileName(data.sales_image?.name || '')}`;
      const salesImageUrl =
        data.sales_image && (await uploadImageToFirebaseStorage(data.sales_image, salesImagePath));

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

      setIsLoading(false);
      setSuccess(true);
      resetForm();
      goTo(0);
      navigate('/courses');
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsLoading(false);
      setFailure(true);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className={styles.addCourse}>
          <form onSubmit={submitForm}>
            {step}

            <div className={styles.buttonsDiv}>
              {!isFirstStep ? (
                <Button label='Go Back' leftIcon={BackArrow} onClick={back} />
              ) : (
                <div></div>
              )}
              <Button
                type='submit'
                label={isLastStep ? 'Publish Course' : 'Next'}
                rightIcon={isLastStep ? undefined : FrontArrow}
                onClick={checkImageAttached}
              />
            </div>
          </form>
        </div>
      )}
      {success && <SuccessModal onClose={() => setSuccess(false)} />}
      {failure && <FailureModal onClose={() => setFailure(false)} />}
    </>
  );
};

export default AddCourseForm;
