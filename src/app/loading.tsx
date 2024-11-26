import { Loader } from 'lucide-react';

export default function Loading() {
  return (
    <div className={`flex h-screen w-screen items-center justify-center`}>
      <Loader size={30} className="animate-spin" />
    </div>
  );
}
