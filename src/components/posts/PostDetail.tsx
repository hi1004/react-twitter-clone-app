import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const PostDetail = () => {
  const navigate = useNavigate();
  return (
    <div className="md:w-[580px] relative min-h-screen w-full md:border-r dark:md:border-r-slate-700 md:border-r-slate-300">
      <div onClick={() => navigate('..')}>
        <AiOutlineArrowLeft />
      </div>
      PostDetail
    </div>
  );
};

export default PostDetail;
