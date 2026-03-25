import React from 'react';
import {
    Hash,
    CalendarDays,
    UserCircle2,
    MapPin,
    Building2,
    Zap,
    CreditCard,
    BookOpen,
    DollarSign
} from 'lucide-react';

interface VoucherFormProps {
    register: any;
    prefix?: string;
    title?: string;
}

const VoucherForm: React.FC<VoucherFormProps> = ({ register, prefix = '', title }) => {
    const p = prefix ? `${prefix}.` : '';

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {title && (
                <div className="pb-2 border-b-2 border-indigo-100 mb-6">
                    <h2 className="text-2xl font-black text-indigo-900">{title}</h2>
                </div>
            )}
            
            {/* Organization Info (Quick Fill or Shared with Invoice) */}
            <div className="glass-card p-8 bg-white/90 backdrop-blur-xl border border-secondary-100 shadow-premium relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                        <Building2 size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-secondary-900 leading-none">Organization Details</h3>
                        <p className="text-xs font-medium text-secondary-400 mt-1 uppercase tracking-widest">Issuer information</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="label">Organization Name</label>
                            <input {...register(`${p}orgName`)} placeholder="TRINITY PLUS SOCIAL TRUST" className="input-field font-bold" />
                        </div>
                        <div>
                            <label className="label">Tagline (optional)</label>
                            <input {...register(`${p}orgTagline`)} placeholder="Glory to God" className="input-field italic" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="label">Registration No.</label>
                                <input {...register(`${p}regNo`)} placeholder="617/2008" className="input-field text-sm" />
                            </div>
                            <div>
                                <label className="label">Website</label>
                                <input {...register(`${p}orgWebsite`)} placeholder="www.trinityplussocial.org" className="input-field text-sm" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="label">Contact Address</label>
                        <textarea {...register(`${p}orgAddress`)} placeholder="329, Katcheri Road, Manapparai..." rows={6} className="input-field text-sm resize-none" />
                    </div>
                </div>
            </div>

            {/* Voucher Core Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-8 bg-white/90 backdrop-blur-xl border border-secondary-100 shadow-premium">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                            <Zap size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-secondary-900 leading-none">Voucher Info</h3>
                            <p className="text-xs font-medium text-secondary-400 mt-1 uppercase tracking-widest">Number & Heading</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="label">Voucher No.</label>
                                <div className="relative">
                                    <Hash size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" />
                                    <input {...register(`${p}voucherNo`)} className="input-field pl-10 font-bold" />
                                </div>
                            </div>
                            <div>
                                <label className="label">Date</label>
                                <div className="relative">
                                    <CalendarDays size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" />
                                    <input type="text" {...register(`${p}date`)} placeholder="24 / 06 / 2021" className="input-field pl-10 text-sm" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="label">Account Head</label>
                            <div className="relative">
                                <BookOpen size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" />
                                <input {...register(`${p}accountHead`)} placeholder="e.g. Honorarium" className="input-field pl-10 font-bold" />
                            </div>
                        </div>
                        <div>
                            <label className="label">Payment Mode</label>
                            <select {...register(`${p}paymentMode`)} className="input-field bg-white">
                                <option value="Cash">Cash</option>
                                <option value="Cheque">Cheque</option>
                                <option value="Transfer">Transfer</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="glass-card p-8 bg-white/90 backdrop-blur-xl border border-secondary-100 shadow-premium">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                            <UserCircle2 size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-secondary-900 leading-none">Receiver</h3>
                            <p className="text-xs font-medium text-secondary-400 mt-1 uppercase tracking-widest">Recipient information</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="label">Receiver Name</label>
                            <input {...register(`${p}receiverName`)} placeholder="Full Name of Receiver" className="input-field font-bold" />
                        </div>
                        <div>
                            <label className="label">Receiver Address</label>
                            <div className="relative">
                                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" />
                                <input {...register(`${p}address`)} placeholder="City, Area" className="input-field pl-10 text-sm" />
                            </div>
                        </div>
                        <div>
                            <label className="label">A/c No / Reference</label>
                            <div className="relative">
                                <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" />
                                <input {...register(`${p}accountNo`)} placeholder="Bank account or reference" className="input-field pl-10 text-sm" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Value Section */}
            <div className="glass-card p-8 bg-white/90 backdrop-blur-xl border border-secondary-100 shadow-premium">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-secondary-900 leading-none">Amount & Purpose</h3>
                        <p className="text-xs font-medium text-secondary-400 mt-1 uppercase tracking-widest">Value detailing</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <label className="label">Amount (Numerical)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-secondary-400">₹</span>
                            <input
                                type="number"
                                step="0.01"
                                {...register(`${p}amount`, { valueAsNumber: true })}
                                className="input-field pl-8 font-black text-2xl"
                            />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <label className="label">Amount in Words</label>
                        <textarea
                            {...register(`${p}amountInWords`)}
                            placeholder="e.g. Three Thousand Only"
                            rows={1}
                            className="input-field font-medium italic resize-none pt-4"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <label className="label">Towards (Description of Payment)</label>
                    <textarea
                        {...register(`${p}towards`)}
                        placeholder="e.g. Honorarium for Guest Faculty for 3 days..."
                        rows={4}
                        className="input-field font-medium resize-none leading-relaxed"
                    />
                </div>
            </div>
        </div>
    );
};

export default VoucherForm;
