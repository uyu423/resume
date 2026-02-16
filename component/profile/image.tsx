export default function ProfileImage({ src }: { src: string }) {
  return (
    <div className="text-center mb-4">
      <img
        className="profile-image"
        src={src}
        alt="Profile"
        style={{
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          objectFit: 'cover',
          border: '3px solid var(--color-accent)',
          boxShadow: '0 0 0 8px var(--color-bg-highlight)',
        }}
      />
    </div>
  );
}
