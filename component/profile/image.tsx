export default function ProfileImage({ src, name }: { src: string; name?: string }) {
  return (
    <div className="profile-image-wrap">
      <img className="profile-image" src={src} alt={name || 'Profile'} />
    </div>
  );
}
