'use client';

import { AuthProvider } from "../../components/authContext";
import ClientLayout from "../../app/clientLayout";

export default function ProfileLayout() {
  return (
    <div className="p-16">
        <AuthProvider>
          <ClientLayout></ClientLayout>
        </AuthProvider>
    </div>
  );
}