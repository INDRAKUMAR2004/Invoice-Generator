import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import type { VoucherData } from '../types/voucherTypes';
import VoucherForm from '../components/VoucherForm';
import VoucherPreview from '../components/VoucherPreview';
import { amountToWords } from '../utils/calculateTotals';
import { generatePDF, generatePNG, printInvoice } from '../utils/generatePDF';
import { Save, Receipt, ArrowRight, Sparkles } from 'lucide-react';

const CreateVoucher: React.FC = () => {
    const [showPreview, setShowPreview] = useState(false);

    const defaultVoucher: VoucherData = {
        voucherNo: (Math.floor(Math.random() * 1000)).toString().padStart(3, '0'),
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, ' / '),
        orgName: 'TRINITY PLUS SOCIAL TRUST',
        orgTagline: 'Glory to God',
        orgAddress: '329, Katcheri Road, Manapparai, Tiruchirappalli District, Tamil Nadu, India - 621 306.',
        orgPhone: '04332 - 260062',
        orgCell: '9659973206, 9944377012',
        orgEmail: 'trinityplussocial@gmail.com',
        orgWebsite: 'www.trinityplussocial.org',
        regNo: '617/2008',
        accountHead: 'Honorarium',
        receiverName: '',
        address: '',
        amountInWords: '',
        amount: 1000,
        paymentMode: 'Cash',
        towards: '',
        status: 'draft',
    };

    const { register, control, setValue, watch, handleSubmit } = useForm<{voucher1: VoucherData, voucher2: VoucherData}>({
        defaultValues: {
            voucher1: { ...defaultVoucher },
            voucher2: { 
                ...defaultVoucher, 
                voucherNo: (parseInt(defaultVoucher.voucherNo) + 1).toString().padStart(3, '0') 
            }
        }
    });

    const watchAllFields = useWatch({ control });
    const watchAmount1 = watch('voucher1.amount');
    const watchAmount2 = watch('voucher2.amount');

    useEffect(() => {
        if (watchAmount1) {
            setValue('voucher1.amountInWords', amountToWords(watchAmount1));
        }
    }, [watchAmount1, setValue]);

    useEffect(() => {
        if (watchAmount2) {
            setValue('voucher2.amountInWords', amountToWords(watchAmount2));
        }
    }, [watchAmount2, setValue]);

    const onSubmit = (data: { voucher1: VoucherData, voucher2: VoucherData }) => {
        const savedVouchers = JSON.parse(localStorage.getItem('vouchers') || '[]');
        const newVoucher1 = {
            ...data.voucher1,
            id: crypto.randomUUID(),
            status: 'saved',
            createdAt: Date.now(),
        };
        const newVoucher2 = {
            ...data.voucher2,
            id: crypto.randomUUID(),
            status: 'saved',
            createdAt: Date.now() + 1,
        };
        localStorage.setItem('vouchers', JSON.stringify([newVoucher1, newVoucher2, ...savedVouchers]));
        alert('Vouchers saved successfully!');
    };

    return (
        <div className="h-[calc(100vh-72px)] overflow-hidden flex flex-col p-8 bg-[#fafafa]">
            <div className={`mx-auto flex flex-col h-full w-full transition-all duration-500 ${showPreview ? 'max-w-[1700px]' : 'max-w-4xl'}`}>

                {/* Page Header */}
                <header className="flex items-center justify-between mb-8 shrink-0">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-8 h-8 rounded-[10px] bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                                <Receipt size={16} className="text-indigo-600" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Payment Voucher</h1>
                        </div>
                        <p className="text-[13px] text-slate-500 font-medium flex items-center gap-1.5 ml-[44px]">
                            <Sparkles size={12} className="text-indigo-500" />
                            Create professional payment vouchers with ease
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => setShowPreview(!showPreview)}
                            className={`px-5 py-2.5 font-semibold rounded-xl border transition-all text-[13px] flex items-center gap-2 ${showPreview ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-inner' : 'bg-white text-slate-700 border-slate-200 shadow-sm hover:bg-slate-50'}`}
                        >
                            <Sparkles size={16} className={showPreview ? 'animate-pulse' : ''} />
                            {showPreview ? 'Hide Preview' : 'Show Preview'}
                        </button>

                        <button
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                            className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl shadow-[0_4px_14px_0_rgba(79,70,229,0.2)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.3)] hover:bg-indigo-500 transition-all flex items-center gap-2 group active:scale-[0.98] text-[13px]"
                        >
                            <Save size={16} className="group-hover:-rotate-12 transition-transform" />
                            <span>Save Vouchers</span>
                            <ArrowRight size={14} className="translate-x-0 group-hover:translate-x-1 transition-transform ml-1" />
                        </button>
                    </div>
                </header>

                <div className={`grid gap-8 flex-1 overflow-hidden transition-all duration-500 ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                    {/* Left: Editor */}
                    <section className={`h-full overflow-y-auto custom-scrollbar rounded-2xl bg-white border border-slate-200/60 shadow-sm transition-all duration-500 ${!showPreview ? 'px-4' : 'pr-4'}`}>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-16">
                            <VoucherForm register={register} prefix="voucher1" title="Top Voucher (001)" />
                            
                            <div className="w-full flex items-center gap-4 opacity-50">
                                <span className="h-px bg-slate-300 flex-1"></span>
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Page Break</span>
                                <span className="h-px bg-slate-300 flex-1"></span>
                            </div>

                            <VoucherForm register={register} prefix="voucher2" title="Bottom Voucher (002)" />
                        </form>
                    </section>

                    {/* Right: Live Preview */}
                    {showPreview && (
                        <section className="h-full overflow-hidden rounded-2xl border border-slate-200/60 shadow-sm relative flex flex-col bg-slate-100 animate-in fade-in slide-in-from-right-10 duration-500">
                            <VoucherPreview
                                data1={watchAllFields.voucher1 as VoucherData}
                                data2={watchAllFields.voucher2 as VoucherData}
                                onDownloadPDF={() => generatePDF('voucher-download-canvas', `VOUCHERS-${watchAllFields.voucher1?.voucherNo}-${watchAllFields.voucher2?.voucherNo}`)}
                                onDownloadPNG={() => generatePNG('voucher-download-canvas', `VOUCHERS-${watchAllFields.voucher1?.voucherNo}-${watchAllFields.voucher2?.voucherNo}`)}
                                onPrint={() => printInvoice('voucher-canvas')}
                            />
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateVoucher;
