"use client";

import DesignerKycWizard from '@/components/kyc/DesignerKycWizard';

export default function DesignerKycPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-3xl bg-white shadow-xl rounded-lg p-6 md:p-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-8 text-center">设计师认证</h1>
        <DesignerKycWizard />
      </div>
    </div>
  );
} 