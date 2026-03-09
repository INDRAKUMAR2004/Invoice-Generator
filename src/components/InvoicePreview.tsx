import React from 'react';
import type { InvoiceData } from '../types/invoiceTypes';
import { Printer, Download, Image as ImageIcon } from 'lucide-react';
import { amountToWords } from '../utils/calculateTotals';

interface InvoicePreviewProps {
    data: InvoiceData;
    onDownloadPDF: () => void;
    onDownloadPNG: () => void;
    onPrint: () => void;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ data, onDownloadPDF, onDownloadPNG, onPrint }) => {
    const { companyInfo, customerInfo, items = [], invoiceNumber, invoiceDate, dueDate, taxAmount = 0, grandTotal = 0, notes, terms } = data;

    const subtotal = items.reduce((acc, curr) => acc + (curr.quantity * curr.unitPrice), 0);
    const totalTaxableAmount = subtotal;

    return (
        <div className="flex flex-col h-full overflow-hidden bg-slate-50">
            {/* Professional Toolbar */}
            <div className="p-4 flex gap-4 shrink-0 bg-white border-b border-slate-200 z-10 sticky top-0 justify-center no-print">
                <button onClick={onDownloadPDF} className="bg-slate-900 text-white rounded-lg px-6 py-2.5 flex items-center gap-2 hover:bg-slate-800 transition-all shadow-sm font-bold text-sm">
                    <Download size={18} /> Download PDF
                </button>
                <button onClick={onDownloadPNG} className="bg-white border border-slate-200 text-slate-700 rounded-lg px-6 py-2.5 flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm font-bold text-sm">
                    <ImageIcon size={18} /> Export Image
                </button>
                <button onClick={onPrint} className="bg-blue-600 text-white rounded-lg px-6 py-2.5 flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm font-bold text-sm">
                    <Printer size={18} /> Print Now
                </button>
            </div>

            {/* Document Canvas */}
            <div className="flex-1 overflow-auto custom-scrollbar flex justify-center p-12 print:p-0 bg-slate-100/50">
                <div id="invoice-canvas" className="bg-white mx-auto shadow-2xl print:shadow-none print:!m-0 text-slate-800 font-sans relative flex flex-col p-8 border border-slate-200" style={{ width: '842px', minHeight: '1190px' }}>

                    {/* Header Row */}
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex flex-col gap-3 items-start">
                            {companyInfo.logo ? (
                                <img src={companyInfo.logo} alt="Company Logo" className="h-16 w-auto max-w-[250px] object-contain" />
                            ) : (
                                <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-3xl font-black text-slate-300">V</div>
                            )}
                            <div>
                                <h1 className="text-xl font-black text-slate-900 uppercase tracking-wide leading-tight">{companyInfo.name || 'VELAAN MART AGRITECH PRIVATE LIMITED'}</h1>
                                <div className="text-[11px] text-slate-600 leading-tight mt-1">
                                    {companyInfo.address || 'Velaan Mart, FORUM - TABIF, Navalurkottapattu, Trichy Tamil Nadu 620027, India'}
                                    <div className="font-bold mt-1">GSTIN {companyInfo.gstNumber || '33AAKCV5016C1ZO'}</div>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-tighter">TAX INVOICE</h2>
                        </div>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 border border-slate-200 text-[11px] mb-6">
                        <div className="border-r border-slate-200">
                            {[
                                ['Invoice Number', `: INV-${invoiceNumber}`],
                                ['Invoice Date', `: ${invoiceDate}`],
                                ['Terms', ': Net 15'],
                                ['Due Date', `: ${dueDate}`],
                                ['P.O.#', ': SO-03211'],
                                ['E-Way Bill#', ': 551965061333'],
                            ].map(([label, val], idx) => (
                                <div key={idx} className="grid grid-cols-2 p-1 border-b border-slate-100 last:border-0">
                                    <span className="text-slate-500 px-2">{label}</span>
                                    <span className="font-bold text-slate-900">{val}</span>
                                </div>
                            ))}
                        </div>
                        <div>
                            {[
                                ['Place Of Supply', `: ${companyInfo.placeOfSupply || 'Tamil Nadu (33)'}`],
                                ['GSTIN', ': 33AAKCV5016C1ZO'],
                                ['Contact', ': 9715129387'],
                                ['FSSAI License Number', ': 12425028000573'],
                            ].map(([label, val], idx) => (
                                <div key={idx} className="grid grid-cols-2 p-1 border-b border-slate-100 last:border-0">
                                    <span className="text-slate-500 px-2">{label}</span>
                                    <span className="font-bold text-slate-900">{val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bill To / Ship To Headers */}
                    <div className="grid grid-cols-2 gap-0 border-t border-x border-slate-200 bg-slate-50 text-[11px] font-bold">
                        <div className="p-1 px-3 border-r border-slate-200 uppercase tracking-widest text-slate-700">Bill To</div>
                        <div className="p-1 px-3 uppercase tracking-widest text-slate-700">Ship To</div>
                    </div>

                    {/* Bill To / Ship To Details */}
                    <div className="grid grid-cols-2 border border-slate-200 text-[11px] mb-6">
                        <div className="p-3 border-r border-slate-200 min-h-[80px]">
                            <p className="font-black text-slate-900 mb-1">{customerInfo.name || 'The Warden, Institute of Agriculture Hostels, Vamban'}</p>
                            <p className="text-slate-500 whitespace-pre-wrap leading-relaxed">{customerInfo.address || 'Vamban, PUDUKKOTTAI, 622303 Tamil Nadu, India'}</p>
                        </div>
                        <div className="p-3">
                            <p className="font-black text-slate-900 mb-1">{customerInfo.name || 'Vamban'}</p>
                            <p className="text-slate-500 whitespace-pre-wrap leading-relaxed">{customerInfo.address || 'Vamban, PUDUKKOTTAI, 622303 Tamil Nadu, India'}</p>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="flex-1 border border-slate-200">
                        <table className="w-full text-[10px] border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                                    <th className="p-1.5 border-r border-slate-200 w-8">#</th>
                                    <th className="p-1.5 border-r border-slate-200 text-left">Item & Description</th>
                                    <th className="p-1.5 border-r border-slate-200 text-center w-16">HSN/SAC</th>
                                    <th className="p-1.5 border-r border-slate-200 text-center w-16">Qty</th>
                                    <th className="p-1.5 border-r border-slate-200 text-right w-20">Rate</th>
                                    <th className="p-1.5 border-r border-slate-200 text-center" colSpan={2}>CGST</th>
                                    <th className="p-1.5 border-r border-slate-200 text-center" colSpan={2}>SGST</th>
                                    <th className="p-1.5 text-right w-24">Amount</th>
                                </tr>
                                <tr className="bg-slate-50 border-b border-slate-200 text-[9px] text-slate-600">
                                    <th colSpan={5}></th>
                                    <th className="p-1 border-r border-slate-200 text-center">%</th>
                                    <th className="p-1 border-r border-slate-200 text-center">Amt</th>
                                    <th className="p-1 border-r border-slate-200 text-center">%</th>
                                    <th className="p-1 border-r border-slate-200 text-center">Amt</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => {
                                    const cgstRate = item.taxPercent / 2;
                                    const cgstAmt = (item.quantity * item.unitPrice * cgstRate) / 100;
                                    return (
                                        <tr key={item.id} className="border-b border-slate-100 last:border-0 h-10">
                                            <td className="p-1.5 border-r border-slate-200 text-center text-slate-500">{index + 1}</td>
                                            <td className="p-1.5 border-r border-slate-200">
                                                <p className="font-bold text-slate-800">{item.name}</p>
                                                {item.description && <p className="text-[9px] text-slate-400 leading-tight mt-0.5">{item.description}</p>}
                                            </td>
                                            <td className="p-1.5 border-r border-slate-200 text-center">{item.hsnSac || '-'}</td>
                                            <td className="p-1.5 border-r border-slate-200 text-center whitespace-nowrap">
                                                {item.quantity} <span className="text-[8px] text-slate-400">{item.unit || 'Nos'}</span>
                                            </td>
                                            <td className="p-1.5 border-r border-slate-200 text-right">{item.unitPrice.toFixed(2)}</td>
                                            <td className="p-1 border-r border-slate-200 text-center">{cgstRate}%</td>
                                            <td className="p-1 border-r border-slate-200 text-right">{cgstAmt.toFixed(2)}</td>
                                            <td className="p-1 border-r border-slate-200 text-center">{cgstRate}%</td>
                                            <td className="p-1 border-r border-slate-200 text-right">{cgstAmt.toFixed(2)}</td>
                                            <td className="p-1.5 text-right font-bold text-slate-900">{(item.quantity * item.unitPrice).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Summary */}
                    <div className="flex border-x border-b border-slate-200 text-[10px]">
                        <div className="flex-1 p-4 border-r border-slate-200 space-y-4">
                            <div>
                                <p className="text-slate-500">Items in Total {items.length}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total In Words</p>
                                <p className="text-[11px] font-black italic text-slate-900 leading-tight whitespace-normal">{amountToWords(grandTotal)}</p>
                            </div>
                            {notes && (
                                <div>
                                    <p className="font-bold text-slate-500 mb-0.5">Notes</p>
                                    <p className="text-slate-600 leading-tight">{notes}</p>
                                </div>
                            )}
                            {terms && (
                                <div>
                                    <p className="font-bold text-slate-500 mb-0.5">Terms & Conditions</p>
                                    <p className="text-slate-500 text-[9px] leading-tight whitespace-pre-wrap">{terms}</p>
                                </div>
                            )}
                        </div>
                        <div className="w-64 shrink-0 bg-slate-50/20">
                            {[
                                ['Sub Total', subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })],
                                ['Total Taxable Amount', totalTaxableAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })],
                                [`CGST (${(taxAmount || 0) / 2 > 0 ? (taxAmount / subtotal * 50).toFixed(1) + '%' : '0%'})`, (taxAmount / 2).toLocaleString('en-IN', { minimumFractionDigits: 2 })],
                                [`SGST (${(taxAmount || 0) / 2 > 0 ? (taxAmount / subtotal * 50).toFixed(1) + '%' : '0%'})`, (taxAmount / 2).toLocaleString('en-IN', { minimumFractionDigits: 2 })],
                                ['Rounding', (Math.round(grandTotal) - grandTotal).toFixed(2)],
                            ].map(([label, val], idx) => (
                                <div key={idx} className="p-2 px-3 border-b border-slate-100 flex justify-between">
                                    <span className="text-slate-500">{label}</span>
                                    <span className="font-bold">{val}</span>
                                </div>
                            ))}
                            <div className="p-3 px-3 border-b border-slate-100 flex justify-between items-center bg-white">
                                <span className="font-black text-slate-900 text-sm">Total</span>
                                <span className="font-black text-slate-900 text-sm">₹{Math.round(grandTotal).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className="p-3 px-3 bg-slate-50 flex justify-between items-center border-b border-slate-200">
                                <span className="font-black text-slate-900">Balance Due</span>
                                <span className="font-black text-slate-900">₹{Math.round(grandTotal).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                            </div>

                            <div className="mt-12 text-center p-4">
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-16">Authorized Signature</p>
                                <div className="border-t border-slate-200 mx-4"></div>
                            </div>
                        </div>
                    </div>

                    {/* Removed QR Code per request */}

                    <div className="mt-auto text-right text-[9px] text-slate-300">
                        1
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoicePreview;
