import { hashState, tagState } from '@/store/posts/postAtoms';
import { uniqueId } from 'lodash';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

const HashTagForm = () => {
  const [tags, setTags] = useRecoilState(tagState);
  const [hashTag, setHashTag] = useRecoilState(hashState);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' && e.currentTarget.value.trim() !== '') {
      if (tags?.includes(e.currentTarget.value?.trim())) {
        toast.error('同じタグが既にあります。');
      } else {
        setTags(prev => (prev?.length > 0 ? [...prev, hashTag] : [hashTag]));
        setHashTag('');
      }
    }
  };

  const onChangeHashTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashTag(e.target.value?.trim());
  };

  const removeTag = (tag: string) => {
    setTags(tags?.filter(prevTag => prevTag !== tag));
  };

  return (
    <div className="py-3 border-t border-t-slate-700">
      <div className="flex flex-wrap gap-3">
        {tags?.map(tag => (
          <span
            className={`text-sm cursor-pointer text-primary pointerhover:hover:opacity-90`}
            key={uniqueId()}
            onClick={() => removeTag(tag)}
          >
            #{tag}
          </span>
        ))}
      </div>
      <input
        type="text"
        autoComplete="off"
        name="hashtag"
        placeholder="ハッシュタグ + スペースキー"
        className="w-full mt-2 bg-transparent outline-none"
        onChange={onChangeHashTag}
        onKeyUp={handleKeyUp}
        value={hashTag}
      />
    </div>
  );
};

export default HashTagForm;
