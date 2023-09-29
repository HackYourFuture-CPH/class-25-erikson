import FormWrapper from './FormWrapper';

type Lesson = {
  title: string;
  duration: string;
  video: string;
  pdfs: {
    title: string;
    file: string;
  }[];
};

type ContentOutlineData = {
  contentOutline: {
    lessons: Lesson[];
  };
  date: string;
  comments: string[];
};

type ContentOutlineFormProps = ContentOutlineData & {
  updateFields: (fields: Partial<ContentOutlineData>) => void;
};

const ContentOutlineForm = ({ contentOutline, date, updateFields }: ContentOutlineFormProps) => {
  const handleLessonChange = (lessonIndex: number, field: keyof Lesson, value: string) => {
    const updatedLessons = [...contentOutline.lessons];
    updatedLessons[lessonIndex][field] = value as any;
    updateFields({
      contentOutline: {
        ...contentOutline,
        lessons: updatedLessons,
      },
    });
  };

  const handlePdfChange = (
    lessonIndex: number,
    pdfIndex: number,
    field: keyof Lesson['pdfs'][number],
    value: string,
  ) => {
    const updatedLessons = [...contentOutline.lessons];
    updatedLessons[lessonIndex].pdfs[pdfIndex][field] = value;
    updateFields({
      contentOutline: {
        ...contentOutline,
        lessons: updatedLessons,
      },
    });
  };

  return (
    <FormWrapper title='Course Content Outline'>
      <label>Date</label>
      <input
        required
        type='text'
        value={date}
        onChange={(e) => updateFields({ date: e.target.value })}
      />

      <label>Lessons</label>
      {contentOutline.lessons.map((lesson, lessonIndex) => (
        <div key={lessonIndex}>
          <label>Lesson Title</label>
          <input
            required
            type='text'
            value={lesson.title}
            onChange={(e) => handleLessonChange(lessonIndex, 'title', e.target.value)}
          />

          <label>Lesson Duration</label>
          <input
            required
            type='text'
            value={lesson.duration}
            onChange={(e) => handleLessonChange(lessonIndex, 'duration', e.target.value)}
          />

          <label>Lesson Video URL</label>
          <input
            required
            type='text'
            value={lesson.video}
            onChange={(e) => handleLessonChange(lessonIndex, 'video', e.target.value)}
          />

          <label>Lesson PDFs</label>
          {lesson.pdfs.map((pdf, pdfIndex) => (
            <div key={pdfIndex}>
              <label>PDF Title</label>
              <input
                required
                type='text'
                value={pdf.title}
                onChange={(e) => handlePdfChange(lessonIndex, pdfIndex, 'title', e.target.value)}
              />

              <label>PDF File URL</label>
              <input
                required
                type='text'
                value={pdf.file}
                onChange={(e) => handlePdfChange(lessonIndex, pdfIndex, 'file', e.target.value)}
              />
            </div>
          ))}
        </div>
      ))}
    </FormWrapper>
  );
};

export default ContentOutlineForm;
