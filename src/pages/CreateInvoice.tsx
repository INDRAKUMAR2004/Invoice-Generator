import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import type { InvoiceData, LineItem } from '../types/invoiceTypes';
import InvoiceForm from '../components/InvoiceForm';
import InvoicePreview from '../components/InvoicePreview';
import { calculateInvoiceTotals } from '../utils/calculateTotals';
import { generatePDF, generatePNG, printInvoice } from '../utils/generatePDF';
import { Save, FileCheck, ArrowRight, Sparkles } from 'lucide-react';

const CreateInvoice: React.FC = () => {
    const [showPreview, setShowPreview] = React.useState(false);
    const { register, control, setValue, watch, handleSubmit } = useForm<InvoiceData>({
        defaultValues: {
            invoiceNumber: Math.floor(1000 + Math.random() * 9000).toString(),
            invoiceDate: new Date().toISOString().split('T')[0],
            // ... (rest of defaultValues remains the same)
            items: [
                { id: '1', name: 'Premium Service', description: 'Professional consulting service', hsnSac: '998311', quantity: 1, unitPrice: 5000, unit: 'Nos', taxPercent: 18, total: 5900 }
            ],
            discount: 0,
            template: 'classic',
            status: 'draft',
        }
    });

    const watchAllFields = useWatch({ control });
    const watchLogo = watch('companyInfo.logo');

    useEffect(() => {
        const { subtotal, taxAmount, grandTotal } = calculateInvoiceTotals(watchAllFields.items as LineItem[] || [], watchAllFields.discount || 0);
        setValue('subtotal', subtotal);
        setValue('taxAmount', taxAmount);
        setValue('grandTotal', grandTotal);
    }, [watchAllFields.items, watchAllFields.discount, setValue]);

    const onSubmit = (data: InvoiceData) => {
        const savedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
        const newInvoice = {
            ...data,
            id: crypto.randomUUID(),
            status: 'saved',
            createdAt: Date.now(),
        };
        localStorage.setItem('invoices', JSON.stringify([newInvoice, ...savedInvoices]));
        alert('Invoice saved successfully!');
    };

    return (
        <div className="h-[calc(100vh-72px)] overflow-hidden flex flex-col p-8">
            <div className={`w-full mx-auto flex flex-col h-full ${showPreview ? 'max-w-[1700px]' : 'max-w-full'}`}>

                {/* Sleek Minimal Page Header */}
                <header className="flex items-center justify-between mb-8 shrink-0">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-8 h-8 rounded-[10px] bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                                <FileCheck size={16} className="text-blue-600" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create Invoice</h1>
                        </div>
                        <p className="text-[13px] text-slate-500 font-medium flex items-center gap-1.5 ml-[44px]">
                            <Sparkles size={12} className="text-blue-500" />
                            Draft and finalize professional invoices
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowPreview(!showPreview)}
                            className={`px-5 py-2.5 font-semibold rounded-xl border transition-all text-[13px] flex items-center gap-2 ${showPreview ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-inner' : 'bg-white text-slate-700 border-slate-200 shadow-sm hover:bg-slate-50'}`}
                        >
                            <Sparkles size={16} className={showPreview ? 'animate-pulse' : ''} />
                            {showPreview ? 'Hide Preview' : 'Show Preview'}
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                            className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl shadow-[0_4px_14px_0_rgba(59,130,246,0.2)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.3)] hover:bg-blue-500 transition-all flex items-center gap-2 group active:scale-[0.98] text-[13px]"
                        >
                            <Save size={16} className="group-hover:-rotate-12 transition-transform" />
                            <span>Save Invoice</span>
                            <ArrowRight size={14} className="translate-x-0 group-hover:translate-x-1 transition-transform ml-1" />
                        </button>
                    </div>
                </header>

                {/* Workspace Split */}
                <div className={`grid gap-10 flex-1 overflow-hidden transition-all duration-500 ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                    {/* Left: Editor */}
                    <section className={`h-full overflow-y-auto custom-scrollbar rounded-2xl bg-white border border-slate-200/60 shadow-sm transition-all duration-500 ${!showPreview ? 'px-4' : 'pr-4'}`}>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                            <InvoiceForm register={register} control={control} setValue={setValue} watchLogo={watchLogo} />
                        </form>
                    </section>

                    {/* Right: Live Preview */}
                    {showPreview && (
                        <section className="h-full overflow-hidden rounded-2xl border border-slate-200/60 shadow-sm bg-white relative flex flex-col bg-slate-100 animate-in fade-in slide-in-from-right-10 duration-500">
                            <InvoicePreview
                                data={watchAllFields as InvoiceData}
                                onDownloadPDF={() => generatePDF('invoice-canvas', `INV-${watchAllFields.invoiceNumber}`)}
                                onDownloadPNG={() => generatePNG('invoice-canvas', `INV-${watchAllFields.invoiceNumber}`)}
                                onPrint={() => printInvoice('invoice-canvas')}
                            />
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateInvoice;
