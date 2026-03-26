import React, { useState, useEffect, useRef } from 'react';
import type { VoucherData } from '../types/voucherTypes';
import { Printer, Download, Image as ImageIcon } from 'lucide-react';
import logo from '../assets/trinity-logo.png';

interface VoucherPreviewProps {
  data1: VoucherData;
  data2: VoucherData;
  onDownloadPDF: () => void;
  onDownloadPNG: () => void;
  onPrint: () => void;
}

const VoucherPreview: React.FC<VoucherPreviewProps> = ({
  data1,
  data2,
  onDownloadPDF,
  onDownloadPNG,
  onPrint,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        // Subtract padding from container width
        const containerWidth = containerRef.current.clientWidth - 48;
        const targetWidth = 794;
        if (containerWidth < targetWidth) {
          setScale(containerWidth / targetWidth);
        } else {
          setScale(1);
        }
      }
    };

    const resizeObserver = new ResizeObserver(updateScale);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    updateScale();
    return () => resizeObserver.disconnect();
  }, []);

  // Abstract the single voucher layout so we can render it twice
  const SingleVoucher = ({ data }: { data: VoucherData }) => {
    const {
      voucherNo = '',
      date = '',
      accountHead = '',
      receiverName = '',
      address = '',
      amountInWords = '',
      accountNo = '',
      paymentMode = 'Cash',
      chequeNo = '',
      towards = '',
      amount = 0,
      regNo = '',
      orgName = '',
      orgTagline = '',
      orgAddress = '',
      orgPhone = '',
      orgCell = '',
      orgEmail = '',
      orgWebsite = '',
    } = data || {};

    const dataStyle = {
      color: '#1e3a8a',
      fontSize: '13px',
      fontWeight: 'bold',
    };

    const amountWhole = amount ? Math.floor(amount) : '';
    const amountDecimal = amount
      ? ((amount - Math.floor(amount)) * 100).toFixed(0).padStart(2, '0')
      : '';
    const psText = amountDecimal === '00' ? '/-' : amountDecimal;

    return (
      <div
        className="w-[794px] h-[540px] border border-[#1e3a8a] relative p-1 box-border bg-white flex flex-col shrink-0 text-[#1e3a8a]"
        style={{
          fontFamily: "'Times New Roman', Times, serif",
          lineHeight: '1.2',
        }}
      >
        {/* Header Section */}
        <div className="flex-none pt-2 relative">
          {/* Reg No */}
          <div className="absolute top-2 right-4 text-[12px] font-bold">
            Reg.No.: {regNo || '617/2008'}
          </div>

          <div className="flex justify-between items-start px-2">
            {/* Logo */}
            <div className="w-[130px] flex flex-col items-center pl-2">
              <img
                src={logo}
                style={{
                  width: '140px',
                  height: '140px',
                  objectFit: 'contain',
                }}
                alt="Logo"
              />
              <div className="text-[11px] text-center mt-1 leading-tight font-bold break-words w-full">
                {orgWebsite || 'www.trinityplussocial.org'}
              </div>
            </div>
            {/* Org Info */}
            <div className="flex-1 text-center flex flex-col items-center pt-4">
              <h1 className="text-[22px] font-bold uppercase leading-none text-[#233876] mb-1">
                {orgName || 'TRINITY PLUS SOCIAL TRUST'}
              </h1>
              <p className="text-[13px] mt-1 text-[#233876] font-bold italic">
                {orgTagline || 'Glory to God'}
              </p>
              <div className="text-[12px] mt-1 whitespace-nowrap text-[#233876]">
                {orgAddress ||
                  '329, Katcheri Road, Manapparai, Tiruchirappalli District, Tamil Nadu, India - 621 306.'}
              </div>
              <div className="text-[12px] flex items-center justify-center gap-2 whitespace-nowrap text-[#233876] mt-0.5">
                {orgPhone && <span>Ph : {orgPhone}</span>}
                {orgCell && <span>Cell : {orgCell}</span>}
                {orgEmail && <span>Email : {orgEmail}</span>}
              </div>
            </div>
            <div className="w-[130px]"></div> {/* Spacer */}
          </div>

          {/* Payment Voucher Label & Voucher No */}
          <div className="flex justify-center items-center mt-1 relative w-full">
            <div className="bg-[#475569] text-white px-6 h-[32px] rounded-md text-[14px] font-bold print:bg-[#1e3a8a] flex items-center justify-center">
              <span className="leading-none">Payment Voucher</span>
            </div>
            <div className="absolute right-3 flex items-center gap-2">
              <span className="text-[13px] text-[#233876]">Voucher No :</span>
              <div className="w-[85px] border border-[#1e3a8a] rounded-sm font-bold text-[14px] h-[28px] flex items-center justify-center bg-white">
                <span className="leading-none">{voucherNo}</span>
              </div>
            </div>
          </div>

          {/* Meta Fields Boxless */}
          <div className="mt-2 mb-2 px-3 text-[13px] font-bold text-[#233876]">
            {/* Account Head, Date */}
            <div className="flex items-end mb-[8px]">
              <span className="whitespace-nowrap pb-[2px]">Account Head :</span>
              <div
                className="flex-1 border-b border-[#1e3a8a] border-dotted mx-2 font-bold px-1 pt-[4px]"
                style={{ height: '24px', ...dataStyle }}
              >
                {accountHead}
              </div>

              <span className="whitespace-nowrap pb-[2px] ml-2">Date :</span>
              <div
                className="w-[120px] border-b border-[#1e3a8a] border-dotted ml-2 font-bold px-1 text-center pt-[4px]"
                style={{ height: '24px', ...dataStyle }}
              >
                {date}
              </div>
            </div>

            <div className="flex items-end mb-[8px]">
              <span className="whitespace-nowrap pb-[2px]">
                Name of the Receiver :
              </span>
              <div
                className="flex-1 border-b border-[#1e3a8a] border-dotted ml-2 font-bold pl-2 truncate pt-[4px]"
                style={{ height: '24px', ...dataStyle }}
              >
                {receiverName}
              </div>
            </div>

            <div className="flex items-end mb-[6px]">
              <span className="whitespace-nowrap pb-[2px]">Address :</span>
              <div
                className="flex-1 border-b border-[#1e3a8a] border-dotted ml-2 font-bold pl-2 truncate pt-[4px]"
                style={{ height: '24px', ...dataStyle }}
              >
                {address}
              </div>
            </div>
          </div>
        </div>

        {/* Amount and Details Row - 2 Column Table body */}
        <div className="flex-1 flex w-full border-t border-b border-[#1e3a8a]">
          {/* Left Details */}
          <div className="flex-1 p-3 flex flex-col justify-start text-[13px] font-bold text-[#233876]">
            <div className="flex items-end mb-[14px]">
              <span className="whitespace-nowrap pb-[2px]">
                PAID the sum of Rupees in words
              </span>
              <div
                className="flex-1 border-b border-[#1e3a8a] border-dotted mx-2 font-bold px-1 truncate pt-[4px]"
                style={{ height: '24px', ...dataStyle }}
              >
                {amountInWords}
              </div>
            </div>

            <div className="flex items-end pl-12 mb-[14px]">
              <span className="whitespace-nowrap pb-[2px]">A/c. No.</span>
              <div
                className="w-[140px] border-b border-[#1e3a8a] border-dotted mx-2 font-bold px-1 text-center pt-[4px]"
                style={{ height: '24px', ...dataStyle }}
              >
                {accountNo}
              </div>
              <span className="whitespace-nowrap pb-[2px] ml-4">
                by Cash / Cheque No
              </span>
              <div
                className="flex-1 border-b border-[#1e3a8a] border-dotted mx-2 font-bold px-1 text-center pt-[4px]"
                style={{ height: '24px', ...dataStyle }}
              >
                {paymentMode === 'Cash'
                  ? 'Cash'
                  : chequeNo
                    ? `${paymentMode} - ${chequeNo}`
                    : paymentMode}
              </div>
            </div>

            <div className="flex items-end mb-[14px]">
              <span className="whitespace-nowrap pb-[2px]">Date</span>
              <div
                className="w-[120px] border-b border-[#1e3a8a] border-dotted mx-2 font-bold px-1 text-center pt-[4px]"
                style={{ height: '24px', ...dataStyle }}
              >
                {date}
              </div>
              <span className="whitespace-nowrap pb-[2px] ml-2">Towards</span>
              <div
                className="flex-1 border-b border-[#1e3a8a] border-dotted mx-2 font-bold px-1 truncate pt-[4px]"
                style={{ height: '24px', ...dataStyle }}
              >
                {towards}
              </div>
            </div>

            {/* Additional filler dot lines */}
            <div className="flex items-end mb-[14px]">
              <div className="w-[40px]"></div>
              <div className="flex-1 border-b border-[#1e3a8a] border-dotted mx-2 h-[14px] relative top-[2px]"></div>
            </div>
            <div className="flex items-end">
              <div className="w-[40px]"></div>
              <div className="flex-1 border-b border-[#1e3a8a] border-dotted mx-2 h-[14px] relative top-[2px]"></div>
            </div>
          </div>

          {/* Right Amount Box - spans all the way down! */}
          <div className="w-[150px] border-l border-[#1e3a8a] shrink-0 flex flex-col bg-white">
            <div className="flex border-b border-[#1e3a8a] text-[13px] font-bold h-[26px] items-center text-center text-[#233876]">
              <div className="flex-1">₹.</div>
              <div className="w-[45px] border-l border-[#1e3a8a] h-full flex items-center justify-center">
                Ps.
              </div>
            </div>
            <div className="flex text-[14px] font-bold flex-1 items-center text-center">
              <div className="flex-1 text-[22px]" style={dataStyle}>
                {amountWhole}
              </div>
              <div
                className="w-[45px] border-l border-[#1e3a8a] text-[16px] h-full flex items-center justify-center pt-2"
                style={dataStyle}
              >
                {amount ? psText : ''}
              </div>
            </div>
          </div>
        </div>

        {/* Signatures Row */}
        <div className="h-[80px] flex items-end pb-3 justify-between px-12 w-full text-[13px] text-[#233876]">
          <div className="w-[120px] text-center">Prepared by</div>
          <div className="w-[120px] text-center">Approved by</div>
          <div className="w-[120px] text-center">Passed by</div>
          <div className="w-[120px] text-center">Signature</div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-100">
      {/* Toolbar */}
      <div className="p-3 flex gap-3 shrink-0 bg-white border-b border-slate-200 z-10 sticky top-0 justify-center">
        <button
          onClick={onDownloadPDF}
          className="bg-slate-800 text-white rounded px-4 py-2 flex items-center gap-2 hover:bg-slate-700 transition-colors"
        >
          <Download size={16} /> PDF
        </button>
        <button
          onClick={onDownloadPNG}
          className="bg-white border border-slate-300 rounded px-4 py-2 flex items-center gap-2 hover:bg-slate-50 transition-colors text-slate-700"
        >
          <ImageIcon size={16} /> Image
        </button>
        <button
          onClick={onPrint}
          className="bg-blue-600 text-white rounded px-4 py-2 flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Printer size={16} /> Print
        </button>
      </div>

      {/* A4 Canvas Area - Portrait wrapping two Landscape Vouchers */}
      <div
        ref={containerRef}
        className="flex-1 overflow-x-hidden overflow-y-auto custom-scrollbar flex justify-center p-6 pb-24 print:p-0 bg-slate-200"
      >
        {/* 794px x 1123px standard A4 Size Container */}
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            width: '794px',
            height: `${1123 * scale}px`,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            id="voucher-canvas"
            className="bg-white mx-auto print:shadow-none print:!m-0 text-black p-0 relative flex flex-col items-center justify-between shrink-0 drop-shadow-lg"
            style={{
              width: '794px',
              height: '1123px',
              overflow: 'hidden',
            }}
          >
            <SingleVoucher data={data1} />

            {/* A simple thin dashed line cut marker */}
            <div className="w-[90%] mx-auto border-b border-dashed border-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

            <SingleVoucher data={data2} />
          </div>
        </div>
      </div>

      {/* Hidden High-Quality Download Canvas (NEVER SCALED) */}
      <div
        className="absolute left-[-9999px] top-0 overflow-hidden no-print"
        style={{ width: '794px', height: '1123px', visibility: 'visible' }}
      >
        <div
          id="voucher-download-canvas"
          className="bg-white p-0 relative flex flex-col items-center justify-between shrink-0"
          style={{
            width: '794px',
            height: '1123px',
            overflow: 'hidden',
            fontFamily: "'Times New Roman', Times, serif",
          }}
        >
          <SingleVoucher data={data1} />

          {/* A simple thin dashed line cut marker */}
          <div className="w-[90%] mx-auto border-b border-dashed border-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

          <SingleVoucher data={data2} />
        </div>
      </div>
    </div>
  );
};

export default VoucherPreview;
