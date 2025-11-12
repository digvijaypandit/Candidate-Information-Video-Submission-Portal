export default function VideoPlayer({ src }) {
  return (
    <video controls width="500">
      <source src={src} type="video/webm" />
    </video>
  );
}
