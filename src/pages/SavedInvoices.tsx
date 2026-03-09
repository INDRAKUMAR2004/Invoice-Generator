import React, { useState, useEffect } from 'react';
import {
    FileText,
    Search,
    Trash2,
    Eye,
    Filter,
    MoreVertical,
    Calendar,
    User,
    ChevronRight,
    Clock
} from 'lucide-react';
import type { InvoiceData } from '../types/invoiceTypes';
import { formatCurrency } from '../utils/calculateTotals';

const SavedInvoices: React.FC = () => {
    const [invoices, setInvoices] = useState<InvoiceData[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('invoices') || '[]');
        setInvoices(saved);
    }, []);

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this invoice?')) {
            const updated = invoices.filter(inv => inv.id !== id);
            setInvoices(updated);
            localStorage.setItem('invoices', JSON.stringify(updated));
        }
    };

    const filteredInvoices = invoices.filter(inv =>
        inv.customerInfo.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.invoiceNumber?.includes(searchQuery)
    );

    return (
        <main className="min-h-screen pt-24 pb-12 px-8">
            <div className="max-w-[1600px] mx-auto space-y-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl bg-white border border-secondary-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
                            <FileText size={28} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-secondary-900 tracking-tight">Saved Invoices</h1>
                            <p className="text-secondary-400 font-medium">Manage and monitor all your generated invoices.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400 transition-colors group-focus-within:text-primary-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search by client or invoice #"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-secondary-50 border-transparent border-2 rounded-2xl focus:bg-white focus:border-primary-500 transition-all outline-none font-medium placeholder:font-normal"
                            />
                        </div>
                        <button className="p-3 bg-secondary-50 text-secondary-600 rounded-xl hover:bg-secondary-100 transition-colors">
                            <Filter size={20} />
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredInvoices.length > 0 ? filteredInvoices.map((inv) => (
                        <div key={inv.id} className="glass-card group overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl bg-white relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100/10 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
                            <div className="p-8 pb-4">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary-500 w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg shadow-primary-100">INV</div>
                                        <h3 className="font-black text-secondary-900 text-lg tracking-tight">#{inv.invoiceNumber}</h3>
                                    </div>
                                    <button className="text-secondary-300 hover:text-secondary-900 transition-colors">
                                        <MoreVertical size={20} />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-secondary-600 bg-secondary-50 px-4 py-2.5 rounded-2xl">
                                        <User size={16} className="text-indigo-400" />
                                        <span className="text-sm font-bold truncate">{inv.customerInfo.name || 'Untitled Client'}</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex flex-col gap-1 px-4 py-3 bg-blue-50/50 rounded-2xl">
                                            <span className="text-[10px] font-black uppercase text-blue-400 tracking-widest">Date</span>
                                            <span className="text-xs font-bold text-blue-900 flex items-center gap-1">
                                                <Calendar size={12} />
                                                {inv.invoiceDate}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-1 px-4 py-3 bg-red-50/50 rounded-2xl">
                                            <span className="text-[10px] font-black uppercase text-red-400 tracking-widest">Due</span>
                                            <span className="text-xs font-bold text-red-900 flex items-center gap-1">
                                                <Clock size={12} />
                                                {inv.dueDate}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-8 py-6 bg-secondary-900 mt-4 flex items-center justify-between shadow-[0_-8px_16px_rgba(0,0,0,0.05)]">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase text-primary-400 tracking-widest leading-none mb-1 opacity-60">Amount</span>
                                    <span className="text-white text-xl font-black">{formatCurrency(inv.grandTotal || 0)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => inv.id && handleDelete(inv.id)}
                                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 text-white/40 hover:bg-red-500 hover:text-white transition-all transform hover:-rotate-12"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white font-black text-sm rounded-xl hover:bg-primary-500 shadow-xl shadow-primary-900/40 transition-all active:scale-95 group">
                                        View
                                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="lg:col-span-3 py-40 flex flex-col items-center justify-center gap-6 text-secondary-400 bg-white rounded-3xl border border-dashed border-secondary-200 shadow-sm opacity-60">
                            <div className="w-24 h-24 bg-secondary-50 rounded-full flex items-center justify-center">
                                <Eye size={48} className="text-secondary-200" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-black text-secondary-900 mb-2">No Invoices Found</h3>
                                <p className="max-w-xs mx-auto">You haven't generated any invoices yet or your search query didn't match.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default SavedInvoices;
