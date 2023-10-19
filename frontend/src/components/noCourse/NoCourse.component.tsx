import React from 'react';
import Button from '../button/Button.component';
import { Link } from 'react-router-dom';
import styles from './NoCourse.module.css';
import NoCourseImage from '../../assets/dashboard/no_course.svg';

interface Props {
  userType?: string;
}

const NoCourse: React.FC<Props> = ({ userType }: Props) => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.image} src={NoCourseImage} alt='No course' />
      {userType && (
        <Link className={styles.link} to='/add-course'>
          <Button label={'Create New Course+'} type='submit' />
        </Link>
      )}
    </div>
  );
};

export default NoCourse;
