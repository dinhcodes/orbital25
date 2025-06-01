import MainLayout from '../../components/mainLayout';

export default function HomePage() {
  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to Dealio</h1>
        <p className="text-gray-600">App content goes here.</p>
      </div>
    </MainLayout>
  );
}