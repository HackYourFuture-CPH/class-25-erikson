import FormWrapper from './FormWrapper';

type CourseData = {
  course_name: string;
  tag: string;
  description: string;
};

type CourseFormProps = CourseData & {
  updateFields: (fields: Partial<CourseData>) => void;
};

const CourseForm = ({ course_name, tag, description, updateFields }: CourseFormProps) => {
  return (
    <FormWrapper title='Course Details'>
      <label>Course Name</label>
      <input
        autoFocus
        required
        type='text'
        value={course_name}
        onChange={(e) => updateFields({ course_name: e.target.value })}
      />
      <label>Tag</label>
      <input
        required
        type='text'
        value={tag}
        onChange={(e) => updateFields({ tag: e.target.value })}
      />
      <label>Description</label>
      <textarea
        required
        value={description}
        onChange={(e) => updateFields({ description: e.target.value })}
      />
    </FormWrapper>
  );
};

export default CourseForm;
