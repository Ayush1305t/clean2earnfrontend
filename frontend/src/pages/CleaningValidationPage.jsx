import { useState } from "react";
import { ShieldCheck, Sparkles } from "lucide-react";
import ImageUploadBox from "../component/cleaningValidation/ImageUploadBox";
import ImagePreview from "../component/cleaningValidation/ImagePreview";
import ValidateButton from "../component/cleaningValidation/ValidationButton";
import CompareResult from "../component/cleaningValidation/CompareResult";
import useGrokValidation from "../hooks/useGrokValidation";
import SiteNavbar from "../component/SiteNavbar";

const CleaningValidationPage = () => {
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const { loading, result, validate } = useGrokValidation();

  const handleSubmit = async () => {
    if (!beforeImage || !afterImage) {
      alert("Please upload both images");
      return;
    }
    validate(beforeImage, afterImage);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-green-500/10 via-black to-emerald-500/5" />
      <div className="pointer-events-none fixed left-10 top-24 h-40 w-40 rounded-full bg-green-500/10 blur-3xl" />
      <div className="pointer-events-none fixed bottom-16 right-10 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />

      <SiteNavbar active="Clean" ctaLabel="Dashboard" ctaPath="/dashboard" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-10">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-green-500/40 bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-300">
                <Sparkles size={16} />
                Grok-powered validation
              </div>
              <h1 className="mt-4 text-4xl font-black md:text-5xl">
                Validate your
                <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-green-400 bg-clip-text text-transparent">
                  {" "}
                  cleanup proof
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-gray-300">
                Upload before and after photos to check whether the cleanup shows
                a real, visible environmental improvement.
              </p>
            </div>

            <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-green-300">
              <ShieldCheck size={28} />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <ImageUploadBox
                label="Before Image"
                onChange={(e) => setBeforeImage(e.target.files[0])}
              />
              <div className="mt-4">
                <ImagePreview file={beforeImage} />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <ImageUploadBox
                label="After Image"
                onChange={(e) => setAfterImage(e.target.files[0])}
              />
              <div className="mt-4">
                <ImagePreview file={afterImage} />
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-5">
            <ValidateButton onClick={handleSubmit} loading={loading} />
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-5">
            <CompareResult result={result} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleaningValidationPage;
