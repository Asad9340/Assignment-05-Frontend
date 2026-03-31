'use client';

import { FormEvent, useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateMyProfileAction } from '@/app/(dashboardLayout)/(commonProtectedLayout)/my-profile/_actions';

type ProfileEditorCardProps = {
  name: string;
  email: string;
  image: string;
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part.trim()[0] || '')
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

const isValidUrl = (value: string): boolean => {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

const ProfileEditorCard = ({ name, email, image }: ProfileEditorCardProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [fullName, setFullName] = useState(name);
  const [imageUrl, setImageUrl] = useState(image);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const initials = useMemo(
    () => getInitials(fullName || name),
    [fullName, name],
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    const trimmedName = fullName.trim();
    const trimmedImage = imageUrl.trim();

    if (!trimmedName || trimmedName.length < 2) {
      setFeedback({
        type: 'error',
        message: 'Name must be at least 2 characters long.',
      });
      return;
    }

    if (trimmedImage && !isValidUrl(trimmedImage)) {
      setFeedback({
        type: 'error',
        message: 'Image URL must be a valid http or https URL.',
      });
      return;
    }

    startTransition(async () => {
      const result = await updateMyProfileAction({
        name: trimmedName,
        image: trimmedImage,
      });

      setFeedback({
        type: result.success ? 'success' : 'error',
        message: result.message,
      });

      if (result.success) {
        router.refresh();
      }
    });
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Edit Profile</h2>
          <p className="mt-1 text-sm text-slate-600">
            Keep your display information up to date.
          </p>
        </div>
        <Avatar size="lg" className="size-16 ring-2 ring-slate-200">
          {imageUrl ? (
            <AvatarImage src={imageUrl} alt={fullName || name} />
          ) : null}
          <AvatarFallback>{initials || 'U'}</AvatarFallback>
        </Avatar>
      </div>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="profile-name">Full Name</Label>
          <Input
            id="profile-name"
            value={fullName}
            onChange={event => setFullName(event.target.value)}
            placeholder="Enter your full name"
            disabled={isPending}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="profile-email">Email (read only)</Label>
          <Input
            id="profile-email"
            value={email}
            disabled
            readOnly
            className="h-11 bg-slate-100"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="profile-image">Avatar URL</Label>
          <Input
            id="profile-image"
            value={imageUrl}
            onChange={event => setImageUrl(event.target.value)}
            placeholder="https://example.com/my-avatar.png"
            disabled={isPending}
            className="h-11"
          />
        </div>

        {feedback ? (
          <p
            className={`rounded-lg p-3 text-sm ${
              feedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-rose-50 text-rose-700'
            }`}
          >
            {feedback.message}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={isPending}
          className="h-11 bg-[#101b3d] text-white hover:bg-[#1a2f66]"
        >
          {isPending ? 'Saving...' : 'Save Profile'}
        </Button>
      </form>
    </section>
  );
};

export default ProfileEditorCard;
