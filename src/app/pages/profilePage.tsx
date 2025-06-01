import MainLayout from '../../components/mainLayout';

export default function ProfilePage() {
  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
        <p className="text-gray-600">Profile information and settings will appear here.</p>
      </div>
    </MainLayout>
  );
}