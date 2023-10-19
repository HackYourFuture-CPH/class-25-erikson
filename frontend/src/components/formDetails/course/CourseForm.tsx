import { FileDrop } from '../fileDrop/FileDrop';
import { CourseData } from '../../../types/component';
import FormWrapper from '../wrapper/FormWrapper';
import styles from './CourseForm.module.css';
import Input from '../../input/Input.component';
import Textarea from '../../textarea/Textarea.component';
import Select from '../../select/Select.component';

type CourseFormProps = CourseData & {
  updateFields: (fields: Partial<CourseData>) => void;
};

const categoryList = [
  { value: 'Personal', label: 'Personal' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Professional', label: 'Professional' },
];

const CourseForm = ({
  course_title,
  course_description,
  course_category,
  course_image,
  course_price,
  updateFields,
}: CourseFormProps) => {
  const handleImageChange = (selectedImage: File | undefined) => {
    updateFields({ course_image: selectedImage });
  };

  return (
    <FormWrapper title='Overview'>
      <div className={styles.fileImport}>
        <FileDrop
          label='Course thumbnail'
          selectedImage={course_image}
          onImageSelect={handleImageChange}
        />
      </div>
      <Input
        label='Course Title'
        autoFocus={true}
        isRequired={true}
        type='text'
        value={course_title}
        setValue={(course_title) => updateFields({ course_title })}
      />
      <Textarea
        label='Description'
        isRequired={true}
        value={course_description}
        setValue={(course_description) => updateFields({ course_description })}
      />
      <Input
        label='Price'
        isRequired={true}
        type='number'
        value={course_price}
        setValue={(course_price) => updateFields({ course_price: Number(course_price) })}
      />
      <Select
        label='Category'
        items={categoryList}
        value={course_category}
        setValue={(course_category) => updateFields({ course_category })}
      />
    </FormWrapper>
  );
};

export default CourseForm;
