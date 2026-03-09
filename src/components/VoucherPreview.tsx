import React from 'react';
import type { VoucherData } from '../types/voucherTypes';
import { Printer, Download, Image as ImageIcon } from 'lucide-react';

interface VoucherPreviewProps {
    data: VoucherData;
    onDownloadPDF: () => void;
    onDownloadPNG: () => void;
    onPrint: () => void;
}

const VoucherPreview: React.FC<VoucherPreviewProps> = ({ data, onDownloadPDF, onDownloadPNG, onPrint }) => {
    const {
        voucherNo,
        date,
        accountHead,
        receiverName,
        address,
        amountInWords,
        accountNo,
        paymentMode,
        chequeNo,
        towards,
        amount,
        regNo,
        orgName,
        orgTagline,
        orgAddress,
        orgPhone,
        orgCell,
        orgEmail,
        orgWebsite,
        orgLogo
    } = data;

    // Use a handwriting font for the inputs
    const handStyle = { fontFamily: "'Caveat', cursive", color: '#1e3a8a', fontSize: '1.4rem' };

    return (
        <div className="flex flex-col h-full overflow-hidden bg-slate-100">
            {/* Toolbar */}
            <div className="p-3 flex gap-3 shrink-0 bg-white border-b border-slate-200 z-10 sticky top-0 justify-center">
                <button onClick={onDownloadPDF} className="bg-slate-800 text-white rounded px-4 py-2 flex items-center gap-2 hover:bg-slate-700 transition-colors">
                    <Download size={16} /> PDF
                </button>
                <button onClick={onDownloadPNG} className="bg-white border border-slate-300 rounded px-4 py-2 flex items-center gap-2 hover:bg-slate-50 transition-colors text-slate-700">
                    <ImageIcon size={16} /> Image
                </button>
                <button onClick={onPrint} className="bg-blue-600 text-white rounded px-4 py-2 flex items-center gap-2 hover:bg-blue-700 transition-colors">
                    <Printer size={16} /> Print
                </button>
            </div>

            {/* A4 Canvas Area */}
            <div className="flex-1 overflow-auto custom-scrollbar flex justify-center p-8 pb-24 print:p-0">
                <div id="voucher-canvas" className="bg-white mx-auto shadow-2xl print:shadow-none print:!m-0 text-black p-6 border-[3px] border-[#4338ca] relative" style={{ width: '842px', minHeight: '595px', height: 'fit-content' }}>
                    {/* Import Google Font for handwriting */}
                    <style dangerouslySetInnerHTML={{ __html: "@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');" }} />

                    {/* Header Section */}
                    <div className="flex justify-between items-start mb-2">
                        <div className="w-20">
                            {orgLogo ? <img src={orgLogo} className="w-full" alt="Logo" /> : (
                                <div className="w-16 h-16 border-2 border-[#4338ca] rounded-full flex items-center justify-center p-1">
                                    <div className="w-full h-full border border-dashed border-[#4338ca] rounded-full flex items-center justify-center text-[#4338ca] font-bold text-xs">LOGO</div>
                                </div>
                            )}
                            <div className="text-[9px] text-center mt-1 text-[#4338ca] underline whitespace-nowrap">{orgWebsite || 'www.organization.org'}</div>
                        </div>
                        <div className="flex-1 text-center px-4">
                            <h1 className="text-3xl font-black text-[#4338ca] uppercase tracking-wide leading-none">{orgName}</h1>
                            {orgTagline && <p className="text-sm italic text-[#4338ca] mt-1">{orgTagline}</p>}
                            <div className="text-[10px] text-slate-700 mt-2 font-medium">
                                <p>{orgAddress}</p>
                                <p className="mt-0.5">
                                    {orgPhone && <span>Ph : {orgPhone} </span>}
                                    {orgCell && <span>Cell : {orgCell} </span>}
                                    {orgEmail && <span>Email : {orgEmail}</span>}
                                </p>
                            </div>
                        </div>
                        <div className="text-[#4338ca] font-bold text-[11px] whitespace-nowrap">
                            Reg.No.: {regNo || '617/2008'}
                        </div>
                    </div>

                    {/* Title Banner */}
                    <div className="flex justify-center items-center gap-12 mb-6">
                        <div className="bg-[#4338ca] text-white px-6 py-1.5 rounded-xl font-bold uppercase tracking-wider text-sm shadow-sm">
                            Payment Voucher
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#4338ca]">Voucher No :</span>
                            <div className="border border-[#4338ca] px-4 py-0.5 rounded-lg min-w-[80px] text-center font-bold text-lg" style={handStyle}>
                                {voucherNo}
                            </div>
                        </div>
                    </div>

                    {/* Body Section 1 */}
                    <div className="space-y-4 text-sm font-bold text-[#4338ca]">
                        <div className="flex items-end gap-2 w-full">
                            <span className="whitespace-nowrap">Account Head :</span>
                            <div className="flex-1 border-b border-dotted border-[#4338ca] pb-0.5 leading-none min-h-[24px]" style={handStyle}>{accountHead}</div>
                            <span className="whitespace-nowrap ml-4">Date :</span>
                            <div className="w-40 border-b border-dotted border-[#4338ca] pb-0.5 text-center leading-none min-h-[24px]" style={handStyle}>{date}</div>
                        </div>

                        <div className="flex items-end gap-2 w-full">
                            <span className="whitespace-nowrap">Name of the Receiver :</span>
                            <div className="flex-1 border-b border-dotted border-[#4338ca] pb-0.5 leading-none min-h-[24px]" style={handStyle}>{receiverName}</div>
                        </div>

                        <div className="flex items-end gap-2 w-full">
                            <span className="whitespace-nowrap">Address :</span>
                            <div className="flex-1 border-b border-dotted border-[#4338ca] pb-0.5 leading-none min-h-[24px]" style={handStyle}>{address}</div>
                        </div>
                    </div>

                    {/* Middle Section (Grid with Amount) */}
                    <div className="mt-6 border-t-[2px] border-[#4338ca] grid grid-cols-[1fr_150px]">
                        <div className="p-4 space-y-4 border-r-[2px] border-[#4338ca] relative">
                            {/* Removed Watermark/Stamp effect for manual sealing */}

                            <div className="flex items-start gap-2">
                                <span className="font-bold text-[#4338ca] whitespace-nowrap mt-1">PAID the sum of Rupees in words</span>
                                <div className="flex-1 border-b border-dotted border-[#4338ca] leading-loose min-h-[60px]" style={handStyle}>
                                    {amountInWords}
                                </div>
                            </div>

                            <div className="flex items-end gap-4 w-full text-sm font-bold text-[#4338ca]">
                                <div className="flex items-end gap-2 flex-1">
                                    <span className="whitespace-nowrap">A/c. No.</span>
                                    <div className="flex-1 border-b border-dotted border-[#4338ca] pb-0.5 leading-none min-h-[24px]" style={handStyle}>{accountNo}</div>
                                </div>
                                <div className="flex items-end gap-2 flex-1">
                                    <span className="whitespace-nowrap">by Cash / Cheque No</span>
                                    <div className="flex-1 border-b border-dotted border-[#4338ca] pb-0.5 leading-none min-h-[24px]" style={handStyle}>
                                        {paymentMode === 'Cash' ? 'Cash' : (chequeNo || '-')}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-2 text-sm font-bold text-[#4338ca]">
                                <span className="whitespace-nowrap mt-1">Date</span>
                                <div className="w-40 border-b border-dotted border-[#4338ca] pb-0.5 text-center min-h-[24px]" style={handStyle}>{date}</div>
                                <span className="whitespace-nowrap mt-1 ml-2">Towards</span>
                                <div className="flex-1 border-b border-dotted border-[#4338ca] leading-relaxed min-h-[80px]" style={handStyle}>
                                    {towards}
                                </div>
                            </div>
                        </div>

                        {/* Amount Column */}
                        <div className="flex flex-col">
                            <div className="grid grid-cols-[1fr_40px] border-b-[2px] border-[#4338ca]">
                                <div className="text-center font-bold text-lg text-[#4338ca] py-1">₹.</div>
                                <div className="text-center font-bold text-lg text-[#4338ca] py-1 border-l-[2px] border-[#4338ca]">Ps.</div>
                            </div>
                            <div className="flex-1 grid grid-cols-[1fr_40px] relative">
                                <div className="flex items-center justify-center p-2 text-3xl font-bold" style={handStyle}>
                                    {Math.floor(amount)}
                                </div>
                                <div className="border-l-[2px] border-[#4338ca] flex items-center justify-center p-2 text-xl font-bold" style={handStyle}>
                                    {((amount - Math.floor(amount)) * 100).toFixed(0).padStart(2, '0') === '00' ? '/-' : ((amount - Math.floor(amount)) * 100).toFixed(0).padStart(2, '0')}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Signatures */}
                    <div className="mt-12 grid grid-cols-4 gap-8">
                        <div className="flex flex-col items-center">
                            <div className="w-full border-b-2 border-slate-300 mb-2 min-h-[40px] flex items-center justify-center italic text-[#4338ca]/30">
                                {/* Sample Scribble if needed */}
                                <div className="text-2xl font-serif">S.P.</div>
                            </div>
                            <p className="text-[10px] font-bold text-[#4338ca] uppercase">Prepared By</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-full border-b-2 border-slate-300 mb-2 min-h-[40px]"></div>
                            <p className="text-[10px] font-bold text-[#4338ca] uppercase">Verified By</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-full border-b-2 border-slate-300 mb-2 min-h-[40px]"></div>
                            <p className="text-[10px] font-bold text-[#4338ca] uppercase">Accountant</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-full border-b-2 border-slate-300 mb-2 min-h-[40px] flex items-center justify-center" style={handStyle}>
                                {receiverName}
                            </div>
                            <p className="text-[10px] font-bold text-[#4338ca] uppercase text-center leading-tight">Receiver's Signature</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoucherPreview;
