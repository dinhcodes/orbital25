'use client';

import AddVoucherForm from "./newDealForm";
import MainLayout from '../../components/mainLayout';

export default function NewPostLayout() {
  return (
    <MainLayout>
      <div className="p-16">
              <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
                <AddVoucherForm></AddVoucherForm>
              </div>
      </div>
    </MainLayout>
  );
}