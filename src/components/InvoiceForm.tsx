import React from 'react';
import type { UseFormRegister, Control, UseFormSetValue } from 'react-hook-form';
import type { InvoiceData } from '../types/invoiceTypes';
import InvoiceTable from './InvoiceTable';
import {
    Building2,
    UserCircle2,
    CalendarDays,
    Hash,
    UploadCloud,
    Trash2,
    Mail,
    Phone,
    MapPin,
    ShieldCheck,
    Zap
} from 'lucide-react';
import { clsx } from 'clsx';

interface InvoiceFormProps {
    register: UseFormRegister<InvoiceData>;
    control: Control<InvoiceData>;
    setValue: UseFormSetValue<InvoiceData>;
    watchLogo: string | undefined;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ register, control, setValue, watchLogo }) => {
    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue('companyInfo.logo', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Company Info Section */}
            <div className="glass-card p-8 bg-white/90 backdrop-blur-xl border border-secondary-100/50 shadow-premium overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center animate-pulse">
                        <Building2 size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-secondary-900 leading-none">Your Business</h3>
                        <p className="text-xs font-medium text-secondary-400 mt-1 uppercase tracking-widest">Company details & identity</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-6">
                        <div className="flex items-center gap-6">
                            <label className="relative group cursor-pointer block">
                                <div className={clsx(
                                    "w-32 h-32 rounded-3xl border-2 border-dashed border-secondary-200 bg-secondary-50 flex items-center justify-center overflow-hidden transition-all group-hover:border-primary-500 group-hover:bg-primary-50 shadow-inner",
                                    watchLogo && "border-solid border-primary-500 bg-white"
                                )}>
                                    {watchLogo ? (
                                        <img src={watchLogo} alt="Logo Preview" className="w-full h-full object-contain p-2" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-secondary-400 group-hover:text-primary-500 transition-colors">
                                            <UploadCloud size={32} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Logo</span>
                                        </div>
                                    )}
                                </div>
                                <input type="file" onChange={handleLogoUpload} className="hidden" accept="image/*" />
                                {watchLogo && (
                                    <button
                                        type="button"
                                        onClick={() => setValue('companyInfo.logo', undefined)}
                                        className="absolute -top-2 -right-2 w-8 h-8 bg-white text-red-500 rounded-full shadow-lg border border-red-50 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all transform hover:rotate-12 z-20"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </label>

                            <div className="flex-1 space-y-4">
                                <div>
                                    <label className="label">Company Name</label>
                                    <input {...register('companyInfo.name')} placeholder="e.g. Acme Studio" className="input-field font-bold placeholder:font-normal" />
                                </div>
                                <div>
                                    <label className="label">GST Number <span className="opacity-40 italic">(Optional)</span></label>
                                    <div className="relative">
                                        <ShieldCheck size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" />
                                        <input {...register('companyInfo.gstNumber')} placeholder="e.g. 29AAAAA0000A1Z5" className="input-field pl-10 uppercase font-mono text-sm tracking-wider" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="label">Email Address</label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" />
                                    <input {...register('companyInfo.email')} type="email" placeholder="billing@acme.com" className="input-field pl-10 text-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="label">Phone Number</label>
                                <div className="relative">
                                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" />
                                    <input {...register('companyInfo.phone')} placeholder="+91 99000 00000" className="input-field pl-10 text-sm" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="label">Place of Supply</label>
                                <div className="relative">
                                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" />
                                    <input {...register('companyInfo.placeOfSupply')} placeholder="e.g. Tamil Nadu" className="input-field pl-10 text-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="label">State Code</label>
                                <div className="relative">
                                    <Hash size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" />
                                    <input {...register('companyInfo.stateCode')} placeholder="e.g. 33" className="input-field pl-10 text-sm uppercase" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="label">Business Address</label>
                        <div className="relative">
                            <MapPin size={16} className="absolute left-3 top-3 text-secondary-400" />
                            <textarea
                                {...register('companyInfo.address')}
                                placeholder="Full address, City, ZIP code, Country"
                                rows={6}
                                className="input-field pl-10 py-3 text-sm resize-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Invoice Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-8 bg-white/90 backdrop-blur-xl border border-secondary-100/50 shadow-premium">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                            <UserCircle2 size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-secondary-900 leading-none">Billed To</h3>
                            <p className="text-xs font-medium text-secondary-400 mt-1 uppercase tracking-widest">Client information</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="label">Client Name</label>
                            <input {...register('customerInfo.name')} placeholder="The Client Name" className="input-field font-bold" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="label">Account Email</label>
                                <input {...register('customerInfo.email')} type="email" placeholder="client@example.com" className="input-field text-sm" />
                            </div>
                            <div>
                                <label className="label">Contact Phone</label>
                                <input {...register('customerInfo.phone')} placeholder="+91 00000 00000" className="input-field text-sm" />
                            </div>
                        </div>
                        <div>
                            <label className="label">Mailing Address</label>
                            <textarea {...register('customerInfo.address')} placeholder="Client's office address" rows={3} className="input-field text-sm resize-none" />
                        </div>
                    </div>
                </div>

                <div className="glass-card p-8 bg-white/90 backdrop-blur-xl border border-secondary-100/50 shadow-premium">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                            <CalendarDays size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-secondary-900 leading-none">Timeline</h3>
                            <p className="text-xs font-medium text-secondary-400 mt-1 uppercase tracking-widest">Invoice numbers & dates</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="label">Invoice Number</label>
                            <div className="relative">
                                <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" />
                                <input {...register('invoiceNumber')} className="input-field pl-10 font-black text-primary-600 tracking-wider bg-primary-50/20 border-primary-100" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="label">Issue Date</label>
                                <input type="date" {...register('invoiceDate')} className="input-field text-sm" />
                            </div>
                            <div>
                                <label className="label">Due Date</label>
                                <input type="date" {...register('dueDate')} className="input-field text-sm text-red-500 font-bold border-red-50 bg-red-50/10" />
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-primary-50/50 border border-primary-100 flex items-center gap-3 mt-4">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                                <Hash size={14} className="text-primary-600" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-primary-400 tracking-widest leading-none">Net 30 Days</p>
                                <p className="text-xs text-primary-700 mt-1 font-medium">Auto-calculated payment terms applied.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <InvoiceTable control={control} register={register} />

            {/* Notes & Terms Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-8 bg-white/90 backdrop-blur-xl border border-secondary-100/50 shadow-premium">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                            <Zap size={20} />
                        </div>
                        <h3 className="text-lg font-black text-secondary-900 leading-none">Notes</h3>
                    </div>
                    <textarea
                        {...register('notes')}
                        placeholder="It was wonderful doing business with you. Thank you!"
                        rows={4}
                        className="input-field text-sm resize-none"
                    />
                </div>

                <div className="glass-card p-8 bg-white/90 backdrop-blur-xl border border-secondary-100/50 shadow-premium">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center">
                            <ShieldCheck size={20} />
                        </div>
                        <h3 className="text-lg font-black text-secondary-900 leading-none">Terms & Conditions</h3>
                    </div>
                    <textarea
                        {...register('terms')}
                        placeholder="Please make payment within 30 days..."
                        rows={4}
                        className="input-field text-sm resize-none italic"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between p-8 glass-card border-t-4 border-t-primary-500 bg-secondary-900 text-white overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gradient-to-r from-primary-500/10 to-transparent pointer-events-none"></div>
                <div className="relative z-10 flex flex-col gap-2">
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-primary-400 opacity-60">Ready to Finalize</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black tracking-tight tracking-tighter animate-in zoom-in-50">Saved as Draft</span>
                    </div>
                </div>
                <div className="relative z-10 hidden sm:block">
                    <p className="text-xs text-secondary-400 text-right font-medium max-w-48 leading-relaxed italic opacity-80">"Your settings are automatically synced to the live preview on the right."</p>
                </div>
            </div>
        </div>
    );
};

export default InvoiceForm;
