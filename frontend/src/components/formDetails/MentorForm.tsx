import FormWrapper from './FormWrapper';

type MentorData = {
  mentor: {
    name: string;
    image: string;
    role: string;
    socialNetworks: {
      linkedin: string;
      twitter: string;
      instagram: string;
      facebook: string;
    };
    bio: string;
    categories: string[];
  };
};

type MentorFormProps = MentorData & {
  updateFields: (fields: Partial<MentorData>) => void;
};

const MentorForm = ({ mentor, updateFields }: MentorFormProps) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    updateFields({
      mentor: { ...mentor, categories: selectedOptions },
    });
  };

  return (
    <FormWrapper title='Mentor Details'>
      <label>Mentor Name</label>
      <input
        required
        type='text'
        value={mentor.name}
        onChange={(e) =>
          updateFields({
            mentor: { ...mentor, name: e.target.value },
          })
        }
      />
      <label>Mentor Image URL</label>
      <input
        required
        type='text'
        value={mentor.image}
        onChange={(e) =>
          updateFields({
            mentor: { ...mentor, image: e.target.value },
          })
        }
      />
      <label>Mentor Role</label>
      <input
        required
        type='text'
        value={mentor.role}
        onChange={(e) =>
          updateFields({
            mentor: { ...mentor, role: e.target.value },
          })
        }
      />

      <label>Mentor Social Networks</label>
      <input
        type='text'
        placeholder='LinkedIn'
        value={mentor.socialNetworks.linkedin}
        onChange={(e) =>
          updateFields({
            mentor: {
              ...mentor,
              socialNetworks: {
                ...mentor.socialNetworks,
                linkedin: e.target.value,
              },
            },
          })
        }
      />
      <input
        type='text'
        placeholder='Twitter'
        value={mentor.socialNetworks.twitter}
        onChange={(e) =>
          updateFields({
            mentor: {
              ...mentor,
              socialNetworks: {
                ...mentor.socialNetworks,
                twitter: e.target.value,
              },
            },
          })
        }
      />
      <input
        type='text'
        placeholder='Instagram'
        value={mentor.socialNetworks.instagram}
        onChange={(e) =>
          updateFields({
            mentor: {
              ...mentor,
              socialNetworks: {
                ...mentor.socialNetworks,
                instagram: e.target.value,
              },
            },
          })
        }
      />
      <input
        type='text'
        placeholder='Facebook'
        value={mentor.socialNetworks.facebook}
        onChange={(e) =>
          updateFields({
            mentor: {
              ...mentor,
              socialNetworks: {
                ...mentor.socialNetworks,
                facebook: e.target.value,
              },
            },
          })
        }
      />

      <label>Mentor Bio</label>
      <textarea
        required
        value={mentor.bio}
        onChange={(e) =>
          updateFields({
            mentor: { ...mentor, bio: e.target.value },
          })
        }
      />

      <label>Mentor Categories (Select multiple)</label>
      <select multiple value={mentor.categories} onChange={handleCategoryChange}>
        <option value='Category1'>Category 1</option>
        <option value='Category2'>Category 2</option>
        <option value='Category3'>Category 3</option>
      </select>
    </FormWrapper>
  );
};

export default MentorForm;
