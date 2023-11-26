import HeaderProfile from '@/components/layout/header/HeaderProfile';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import AuthContext, { AuthProps } from '@/context/AuthContext';
import { storage } from '@/firebaseApp';
import { profileModalState } from '@/store/modal/homeModalAtoms';
import { profileEidtState } from '@/store/modal/profileModalAtoms';
import { updateProfile } from 'firebase/auth';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from 'firebase/storage';
import { useContext, useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { CgClose } from 'react-icons/cg';
import { FaFileImage } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_DOWNLOAD_URL_STR = 'https://firebasestorage.googleapis.com';

const ProfileEdit = () => {
  const setIsProfileEditModalOpen = useSetRecoilState(profileModalState);
  const [imageUrl, setImageUrl] = useRecoilState(profileEidtState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm<FieldValues>({ mode: 'onChange' });
  const navigate = useNavigate();

  const { user } = useContext(AuthContext as React.Context<AuthProps>);
  useEffect(() => {
    if (user?.photoURL) {
      setImageUrl(user?.photoURL);
    }

    setValue('profile_name', user?.displayName);
  }, [user?.photoURL, user?.displayName]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    e.stopPropagation();
    const file = files?.[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file as Blob);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fileReader.onloadend = (e: any) => {
      const { result } = e.currentTarget;
      setImageUrl(result);
    };
  };
  const onHandleSubmit = handleSubmit(async data => {
    const { profile_name } = data;
    const key = `${user?.uid}/${uuidv4()}`;
    const storageRef = ref(storage, key);
    let newImageUrl = null;
    try {
      if (
        user?.photoURL &&
        user?.photoURL?.includes(STORAGE_DOWNLOAD_URL_STR)
      ) {
        const imageRef = ref(storage, user?.photoURL);
        if (imageRef) {
          await deleteObject(imageRef).catch(error => console.log(error));
        }
      }

      if (imageUrl) {
        const data = await uploadString(storageRef, imageUrl, 'data_url');
        newImageUrl = await getDownloadURL(data?.ref);
      }

      if (user) {
        await updateProfile(user, {
          displayName: profile_name || '',
          photoURL: newImageUrl,
        });

        toast.success('プロフィールが修正できました');
        setImageUrl(user?.photoURL);
        navigate(`/profile/${user.uid}`);
        setIsProfileEditModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form className="px-4" onSubmit={onHandleSubmit}>
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-4">
          <div
            role="presentation"
            onClick={() => {
              setIsProfileEditModalOpen(false);
            }}
            className="flex items-center h-10 p-3 my-2 rounded-full cursor-pointer w-max pointerhover:hover:bg-gray-200 dark:pointerhover:hover:bg-gray-600 bg-opacity-20"
          >
            <CgClose />
          </div>
          <span className="text-xl font-semibold">プロフィールを編集</span>
        </div>
        <Button
          label="保存"
          disabled={isSubmitting}
          className="px-4 py-1 rounded-full disabled:bg-gray-200 bg-primary dark:disabled:bg-gray-700 w-max pointerhover:hover:bg-opacity-70"
        />
      </div>

      <div>
        <div className="w-full cursor-pointer relative h-[100px] md:h-[200px] dark:bg-slate-600 bg-slate-300">
          <label
            htmlFor="file-input"
            className="absolute overflow-hidden left-5 -bottom-20"
          >
            {imageUrl && (
              <HeaderProfile
                user={user}
                toProfile
                src={imageUrl}
                profilePath={true}
                overlay={true}
              />
            )}

            <div className="absolute w-full h-full p-4 -translate-x-1/2 -translate-y-1/2 bg-opacity-50 rounded-full cursor-pointer top-1/2 left-1/2 bg-dark pointerhover:hover:bg-opacity-60">
              <FaFileImage className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />
            </div>
          </label>

          <input
            type="file"
            id="file-input"
            name="file-input"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      <div className="flex flex-col mt-[100px]">
        <Input
          id="profile_name"
          label="名前"
          register={register}
          errors={errors}
          isSubmitted={isSubmitted}
        />
        <div className="mt-4" />
        {/* <Input
          id="intro"
          label="自己紹介"
          type="textarea"
          register={register}
          errors={errors}
          isSubmitted={isSubmitted}
        /> */}
      </div>
    </form>
  );
};

export default ProfileEdit;
