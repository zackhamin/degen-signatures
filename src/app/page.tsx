import { SignatureForm } from "@/components/signature-form";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <SignatureForm />
      </div>
    </div>
  );
}