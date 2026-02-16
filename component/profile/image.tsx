export default function ProfileImage({ src }: { src: string }) {
  return (
    <div className="text-center profile-image-wrap">
      <img className="profile-image" src={src} alt="Profile" />
    </div>
  );
}
