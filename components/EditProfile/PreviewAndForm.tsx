'use client';

import * as Form from '@radix-ui/react-form';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const PreviewAndForm = ({ session }: { session: Session | null }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null | undefined>(
    session ? session.user : undefined,
  );
  const [profile, setProfile] = useState<{
    full_name: string;
    avatar_url: string;
    banner: string;
    headline: string;
  } | null>(null);
  const [fullName, setFullName] = useState(profile?.full_name);
  const [headLine, setHeadline] = useState(profile?.headline);
  const [newAvatar, setNewAvatar] = useState<File | false>(false);
  const [newBanner, setNewBanner] = useState<File | false>(false);
  const [saveEnabled, setSaveEnabled] = useState(false);
  const [originalValues, setOriginalValues] = useState({
    fullName: profile?.full_name,
    headline: profile?.headline,
  });

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    if (!session?.user) getUser();
  }, [supabase, session]);

  useEffect(() => {
    const getProfile = async () => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name,avatar_url,banner,headline')
        .eq('id', user?.id)
        .single();
      setProfile(profile);
      setFullName(profile?.full_name);
      setHeadline(profile?.headline);
      setOriginalValues({
        fullName: profile?.full_name,
        headline: profile?.headline,
      });
    };
    getProfile();
  }, [supabase, user]);

  const avatarRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);

  return (
    profile && (
      <section className='flex flex-col gap-6'>
        <hgroup>
          <h1 className=' h1-semibold text-blue-300'>Design your Profile</h1>
          <h2 className='base-regular text-gray-400 '>
            Your profile is something anyone can see!
          </h2>
        </hgroup>
        <section className='flex flex-col items-center justify-between gap-8 lg:flex-row'>
          <Form.Root
            className='w-full rounded-lg bg-white p-10 dark:bg-gray-850 lg:w-7/12'
            onSubmit={async (event) => {
              event.preventDefault();
              await supabase
                .from('profiles')
                .update({ full_name: fullName, headline: headLine })
                .eq('id', user?.id);

              if (newAvatar) {
                const newName = `${profile.full_name}-${
                  newAvatar.size
                }-${Math.floor(Math.random() * 999999)}-${newAvatar.name}`;
                const { data } = await supabase.storage
                  .from('avatars')
                  .upload(newName, newAvatar);
                if (!data) return;
                const {
                  data: { publicUrl },
                } = supabase.storage.from('avatars').getPublicUrl(data.path);
                setProfile({ ...profile, avatar_url: publicUrl });
                await supabase
                  .from('profiles')
                  .update({ avatar_url: publicUrl })
                  .eq('id', user?.id);
              }

              if (newBanner) {
                const newName = `${profile.full_name}-${
                  newBanner.size
                }-${Math.floor(Math.random() * 999999)}-${newBanner.name}`;
                const { data } = await supabase.storage
                  .from('banners')
                  .upload(newName, newBanner);
                if (!data) return;
                const {
                  data: { publicUrl },
                } = supabase.storage.from('banners').getPublicUrl(data.path);
                setProfile({ ...profile, banner: publicUrl });
                await supabase
                  .from('profiles')
                  .update({ banner: publicUrl })
                  .eq('id', user?.id);
              }

              router.refresh();
              setOriginalValues({ fullName, headline: headLine });
              setSaveEnabled(false);
            }}
          >
            <section className='flex flex-col gap-3'>
              <Form.Field className='flex flex-col gap-2' name='fullName'>
                <Form.Label className='font-semibold'>Full Name</Form.Label>
                <Form.Control asChild>
                  <input
                    className='h-10 rounded-lg bg-white-200 p-4 text-sm tracking-wider outline-none placeholder:text-sm placeholder:text-gray-400/70 dark:bg-dark-900/75 dark:text-blue-50'
                    type='fullName'
                    maxLength={30}
                    defaultValue={profile?.full_name}
                    onChange={(element: React.FormEvent<HTMLInputElement>) => {
                      setFullName(element.currentTarget.value);
                      element.currentTarget.value !== originalValues.fullName ||
                      originalValues.headline !== headLine
                        ? setSaveEnabled(true)
                        : setSaveEnabled(false);
                      if (
                        element.currentTarget.value.length <= 3 ||
                        headLine!.length <= 3
                      ) {
                        setSaveEnabled(false);
                      }
                    }}
                    required
                  />
                </Form.Control>
              </Form.Field>
              <Form.Field className='flex flex-col gap-2' name='headline'>
                <Form.Label className='font-semibold'>Headline</Form.Label>
                <Form.Control asChild>
                  <input
                    className='h-10 rounded-lg bg-white-200 p-4 text-sm tracking-wider outline-none placeholder:text-sm placeholder:text-gray-400/70 dark:bg-dark-900/75 dark:text-blue-50'
                    type='headline'
                    defaultValue={profile?.headline}
                    maxLength={30}
                    onChange={(element: React.FormEvent<HTMLInputElement>) => {
                      setHeadline(element.currentTarget.value);
                      element.currentTarget.value !== originalValues.headline ||
                      originalValues.fullName !== fullName
                        ? setSaveEnabled(true)
                        : setSaveEnabled(false);
                      if (
                        element.currentTarget.value.length <= 3 ||
                        fullName!.length <= 3
                      ) {
                        setSaveEnabled(false);
                      }
                    }}
                    required
                  />
                </Form.Control>
              </Form.Field>
              <Form.Submit asChild className='mt-2'>
                <button
                  className='h-10 rounded-lg bg-blue-500 font-semibold text-white transition ease-in-out hover:bg-blue-700 disabled:bg-blue-500/60 disabled:text-white/60'
                  disabled={!saveEnabled}
                >
                  Save Changes
                </button>
              </Form.Submit>
            </section>
          </Form.Root>
          {/* Profile Preview */}
          <section className='w-full rounded-10 bg-white dark:bg-dark-850'>
            <figure className='relative h-32 w-full'>
              <Image
                src={profile.banner}
                alt='user banner'
                objectFit='cover'
                fill
                priority
                className='rounded-t-10'
              />
              <section className='relative h-full w-full'>
                <input
                  type='file'
                  id='bannerupload'
                  className='hidden'
                  ref={bannerRef}
                  accept='image/png,image/jpeg,image/gif'
                  onChange={(event) => {
                    const file = event.target.files && event.target.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setProfile({ ...profile, banner: imageUrl });
                      setNewBanner(file);
                      setSaveEnabled(true);
                    }
                  }}
                />
                <button
                  className='relative h-full w-full rounded-t-lg font-semibold text-transparent transition ease-in-out hover:bg-black/60 hover:text-white'
                  onClick={() => {
                    bannerRef?.current?.click();
                  }}
                >
                  Change Banner
                </button>
              </section>
            </figure>
            <section className='flex items-center gap-16'>
              <figure className='relative -top-6 left-8 h-20 w-20 sm:h-32 sm:w-32'>
                <Image
                  src={profile.avatar_url}
                  alt='Profile Picture'
                  fill
                  priority
                  objectFit='cover'
                  className='rounded-full'
                />
              </figure>
              <section className='absolute h-20 w-20 rounded-full sm:h-32 sm:w-32'>
                {/* Input for Avatar Image */}
                <input
                  type='file'
                  id='avatarupload'
                  className='hidden'
                  ref={avatarRef}
                  accept='image/png,image/jpeg,image/gif'
                  onChange={(event) => {
                    const file = event.target.files && event.target.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setProfile({ ...profile, avatar_url: imageUrl });
                      setNewAvatar(file);
                      setSaveEnabled(true);
                    }
                  }}
                />
                <button
                  className='relative bottom-6 left-8 h-full w-full rounded-full font-semibold text-transparent transition ease-in-out hover:bg-black/60 hover:text-white'
                  onClick={() => avatarRef?.current?.click()}
                >
                  <div className='relative'>
                    <div className='relative bottom-3 left-12 flex h-6 w-6 items-center justify-center rounded-full bg-white-200 sm:bottom-9 sm:left-20 sm:h-10 sm:w-10'>
                      <figure className='relative h-4 w-4 rounded-full sm:h-6 sm:w-6'>
                        <Image
                          src='/img/AddPhoto.svg'
                          priority
                          fill
                          alt=''
                          className='relative'
                        />
                      </figure>
                    </div>
                  </div>
                  Change Avatar
                </button>
              </section>
              <hgroup>
                <h2 className='font-bold sm:text-xl'>{fullName}</h2>
                <h3 className='text-xs text-gray-900 dark:text-blue-100 sm:text-sm'>
                  {headLine}
                </h3>
              </hgroup>
            </section>
          </section>
        </section>
      </section>
    )
  );
};

export default PreviewAndForm;
