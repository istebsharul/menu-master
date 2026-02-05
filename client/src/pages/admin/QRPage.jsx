import React, { useRef } from "react";
import { useSelector } from "react-redux";
import QRCode from "react-qr-code";

import { toPng } from "html-to-image";
import jsPDF from "jspdf";

const QRPage = () => {
  const { user } = useSelector((state) => state.auth);
  const pdfRef = useRef(null);

  if (!user?.slug) {
    return <p>No store info</p>;
  }

  const qrLink = `${import.meta.env.VITE_BASE_URL}/s/${user.slug}`;

  // for A4 Size(210mm x 297mm) 
  // const downloadPDF = async () => {
  //   try {
  //     const node = pdfRef.current;

  //     const dataUrl = await toPng(node, {
  //       cacheBust: true,
  //       backgroundColor: "#ffffff",
  //     });

  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (node.offsetHeight * pdfWidth) / node.offsetWidth;

  //     pdf.addImage(dataUrl, "PNG", 0, 10, pdfWidth, pdfHeight);
  //     pdf.save("menu-master-qr.pdf");
  //   } catch (err) {
  //     console.error(err);
  //     alert("PDF download failed");
  //   }
  // };
  
  // for 4/7 Size(101.6mm x 177.8mm) 
  const downloadPDF = async () => {
    try { 
      const node = pdfRef.current;
  
      const dataUrl = await toPng(node, {
        cacheBust: true,
        backgroundColor: "#ffffff",
      }); 
  
      // 4x7 inch PDF (width x height in mm)
      const pdf = new jsPDF("p", "mm", [101.6, 177.8]);
   
      const pdfWidth = 101.6;
      const pdfHeight = (node.offsetHeight * pdfWidth) / node.offsetWidth;
  
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("menu-master-qr-4x7.pdf");
    } catch (err) { 
      console.error(err);
      alert("PDF download failed");
    }
  };
   

  return (
    <>   
      {/* PDF AREA */}
      <div
  ref={pdfRef} 
  className="w-full p-4 sm:p-6 flex flex-col items-center justify-center bg-gray-100"
>
  {/* HEADER */}
  {/* <div className="py-4 sm:py-6 w-full max-w-xs sm:max-w-sm bg-green-700 flex justify-center items-center gap-2">
    <div className="w-10 h-10 sm:w-12 sm:h-12">
      <img
        className="w-full h-full object-contain"
        src="/logo/mm-icon.png"
        alt="Menu Master Logo"
      />
    </div>
    <h1 className="capitalize text-2xl sm:text-4xl font-bold text-white">
      menu master
    </h1>
  </div> */}

<div className="py-4 sm:py-6 w-full max-w-xs sm:max-w-sm bg-green-700 flex justify-center items-center gap-2">
  {/* Restaurant Logo OR fallback initials */}
  {user?.logo ? (
    <div className="w-10 h-10 sm:w-12 sm:h-12">
      <img
        className="w-full h-full object-contain"
        src={user.logo}
        alt={user.businessName}
      />
    </div>
  ) : (
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-green-700 flex items-center justify-center font-bold text-lg">
      {user?.businessName?.charAt(0)}
    </div>
  )}  
  {/* Restaurant Name */}
  {/* <h1 className="capitalize text-2xl sm:text-4xl font-bold text-white">
    {user?.businessName}
  </h1> */}
  <h1 className="capitalize text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
  {user?.businessName}
</h1>

</div>  


  {/* BODY */}
  <div className="w-full max-w-xs sm:max-w-sm flex bg-white flex-col justify-center py-4 sm:py-5">
    <div className="text-center tracking-widest text-green-600 font-semibold text-2xl sm:text-4xl pt-2">
      Scan for Menu
    </div>
    
    <div className="py-6 sm:py-9 flex justify-center items-center">
      <QRCode value={qrLink} size={220} className="sm:hidden" />
      <QRCode value={qrLink} size={256} className="hidden sm:block" />
    </div>

    <div className="capitalize text-center text-sm sm:text-lg text-gray-500 font-medium pt-2">
      powered by
    </div>

    <div className="flex justify-center items-center gap-1 mt-1">
      <div className="w-6 h-6 sm:w-7 sm:h-7">
        <img
          className="w-full h-full object-contain"
          src="/logo/mm-icon.png"
          alt="Menu Master Logo"
        />
      </div>
      <h3 className="capitalize text-xl sm:text-2xl font-bold text-green-700">
        menu master
      </h3>
    </div>
  </div>
</div>

{/* BUTTON */}
<div className="flex justify-center mt-4 sm:mt-6">
  <button
    onClick={downloadPDF}
    className="px-5 sm:px-6 py-2.5 sm:py-3 bg-green-700 text-white rounded-lg"
  >
    Download QR
  </button>
</div>


    </>
  );
};

export default QRPage;
