import { Loader } from 'lucide-react';

export default function Loading() {
  return (
    <div
      className={`
        flex h-screen w-screen animate-spin items-center justify-center
      `}
    >
      <Loader size={30} />
    </div>
  );
}
