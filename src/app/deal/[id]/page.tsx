// app/voucher/[id]/page.tsx
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/clientApp"; // adjust path as needed
import { notFound } from "next/navigation";
import MainLayout from '../../../components/mainLayout';
import ChatButton from '@/components/chatButton';

type paramsType = Promise<{ id: string }>;
export default async function DealPage({
    params,
}: {
    params: paramsType;
}) {
  const { id } = await params;

  const docRef = doc(db, "Deals", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return notFound();

  const data = docSnap.data();

  return (
    <MainLayout>
      <div className="p-4 justify-items-center">
        <div className="w-full h-64 overflow-hidden flex items-center justify-center bg-gray-400 rounded border-white">
          <img src={data.imageUrl} alt={data.title} className="my-4 max-w-lg" />
        </div>
        <div className="text-left pt-16 grid gap-16 grid-cols-12">
          <div className="col-span-7">
            <h1 className="text-2xl font-bold pb-2">{data.title}</h1>
            <p>{data.description}</p>
            <p className="text-gray-500 mt-2">Valid until: {data.validUntil}</p>
          </div>
          <div className="flex flex-col col-span-5 w-full h-64 bg-gray-800 rounded border-white p-4">
            <ChatButton dealId={id} sellerId={data.createdBy} />
            <p className="pt-4 text-left">Refund Policy: </p>
            <p className="pt-4 text-left">Depends on the seller’s decision.</p>
            <p className="text-left">Pay only at the meet-up for physical voucher</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}