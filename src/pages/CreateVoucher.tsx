import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import type { VoucherData } from '../types/voucherTypes';
import VoucherForm from '../components/VoucherForm';
import VoucherPreview from '../components/VoucherPreview';
import { amountToWords } from '../utils/calculateTotals';
import { generatePDF, generatePNG, printInvoice } from '../utils/generatePDF';
import { Save, Receipt, ArrowRight, Sparkles } from 'lucide-react';

const CreateVoucher: React.FC = () => {
    const { register, control, setValue, watch, handleSubmit } = useForm<VoucherData>({
        defaultValues: {
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
        }
    });

    const watchAllFields = useWatch({ control });
    const watchAmount = watch('amount');

    useEffect(() => {
        if (watchAmount) {
            const words = amountToWords(watchAmount);
            setValue('amountInWords', words);
        }
    }, [watchAmount, setValue]);

    const onSubmit = (data: VoucherData) => {
        const savedVouchers = JSON.parse(localStorage.getItem('vouchers') || '[]');
        const newVoucher = {
            ...data,
            id: crypto.randomUUID(),
            status: 'saved',
            createdAt: Date.now(),
        };
        localStorage.setItem('vouchers', JSON.stringify([newVoucher, ...savedVouchers]));
        alert('Voucher saved successfully!');
    };

    return (
        <div className="h-[calc(100vh-72px)] overflow-hidden flex flex-col p-8 bg-[#fafafa]">
            <div className="max-w-[1600px] w-full mx-auto flex flex-col h-full">

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
                            onClick={handleSubmit(onSubmit)}
                            className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl shadow-[0_4px_14px_0_rgba(79,70,229,0.2)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.3)] hover:bg-indigo-500 transition-all flex items-center gap-2 group active:scale-[0.98] text-[13px]"
                        >
                            <Save size={16} className="group-hover:-rotate-12 transition-transform" />
                            <span>Save Voucher</span>
                            <ArrowRight size={14} className="translate-x-0 group-hover:translate-x-1 transition-transform ml-1" />
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 flex-1 overflow-hidden">
                    {/* Left: Editor */}
                    <section className="h-full overflow-y-auto pr-4 custom-scrollbar rounded-2xl bg-white border border-slate-200/60 shadow-sm">
                        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                            <VoucherForm register={register} />
                        </form>
                    </section>

                    {/* Right: Live Preview */}
                    <section className="h-full overflow-hidden rounded-2xl border border-slate-200/60 shadow-sm bg-white relative flex flex-col bg-slate-100">
                        <VoucherPreview
                            data={watchAllFields as VoucherData}
                            onDownloadPDF={() => generatePDF('voucher-canvas', `VOUCHER-${watchAllFields.voucherNo}`)}
                            onDownloadPNG={() => generatePNG('voucher-canvas', `VOUCHER-${watchAllFields.voucherNo}`)}
                            onPrint={() => printInvoice('voucher-canvas')}
                        />
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CreateVoucher;
