// app/layout.tsx
'use client';

import { AuthProvider } from "../../components/authContext";
import ClientLayout from "../../app/clientLayout";

export default function ProfileLayout() {
  return (
        <AuthProvider>
          <ClientLayout></ClientLayout>
        </AuthProvider>
  );
}