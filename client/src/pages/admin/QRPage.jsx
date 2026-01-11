import React from 'react';
import { useSelector } from 'react-redux';
import QRCode from 'react-qr-code'; // ✅ import from react-qr-code

const QRPage = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user?.slug) {
    return (
      <div className="p-6 bg-gray-100 flex flex-col items-center">
        <p className="text-red-500">No store information found.</p>
      </div>
    );
  }

  const qrLink = `${import.meta.env.VITE_BASE_URL}/s/${user.slug}`;

  return (
    <div className="w-full h-full p-6 bg-gray-100 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Store QR Code</h1>

      <div className="bg-white p-4 rounded shadow">
        <QRCode value={qrLink} size={256} />
      </div>

      <p className="mt-4 text-center max-w-sm text-gray-600">
        Scan this QR code to view your menu at <br />
        <span className="font-mono text-blue-600">{qrLink}</span>
      </p>
    </div>
  );
};

export default QRPage;