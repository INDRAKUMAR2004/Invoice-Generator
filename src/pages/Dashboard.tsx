import React, { useState, useEffect } from 'react';
import {
    TrendingUp,
    Users,
    CreditCard,
    Activity,
    ArrowUpRight,
    Plus,
    ArrowRight,
    Calendar,
    Zap,
    CheckCircle2,
    Clock,
    AlertCircle
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import type { InvoiceData } from '../types/invoiceTypes';
import { formatCurrency } from '../utils/calculateTotals';

const Dashboard: React.FC = () => {
    const [invoices, setInvoices] = useState<InvoiceData[]>([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('invoices') || '[]');
        setInvoices(saved);
    }, []);

    const totalRevenue = invoices.reduce((acc, inv) => acc + (inv.grandTotal || 0), 0);
    const pendingAmount = invoices.length * 5420; // Mock data for dashboard
    const activeClients = new Set(invoices.map(inv => inv.customerInfo.name)).size || 0;

    const stats = [
        { label: 'Total Revenue', value: formatCurrency(totalRevenue), change: '+12.5%', icon: TrendingUp, color: 'text-primary-600', bg: 'bg-primary-50' },
        { label: 'Pending Payment', value: formatCurrency(pendingAmount), change: '+3.2%', icon: CreditCard, color: 'text-orange-600', bg: 'bg-orange-50' },
        { label: 'Active Clients', value: activeClients.toString(), change: '+8.1%', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Invoices Sent', value: invoices.length.toString(), change: '+4.5%', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ];

    return (
        <main className="min-h-screen pt-24 pb-12 px-8 bg-secondary-50/30">
            <div className="max-w-[1600px] mx-auto space-y-12">
                <header className="flex items-end justify-between overflow-hidden relative p-8 rounded-3xl bg-secondary-900 shadow-2xl">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-600/10 to-transparent"></div>
                    <div className="relative z-10">
                        <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Welcome Back, Kumar!</h1>
                        <p className="text-secondary-400 font-medium flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary-500 animate-ping"></span>
                            Your business overview is looking great today.
                        </p>
                    </div>
                    <div className="relative z-10 flex gap-4">
                        <div className="flex flex-col items-end">
                            <p className="text-[10px] font-black uppercase tracking-widest text-secondary-500 mb-1">Today's Date</p>
                            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-white font-bold flex items-center gap-2">
                                <Calendar size={16} className="text-primary-400" />
                                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="glass-card p-6 bg-white/70 hover:shadow-xl transition-all group">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>
                                    <stat.icon size={24} />
                                </div>
                                <div className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">
                                    <ArrowUpRight size={14} />
                                    {stat.change}
                                </div>
                            </div>
                            <p className="text-sm font-bold text-secondary-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-black text-secondary-900 tracking-tight">{stat.value}</h3>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black text-secondary-900 flex items-center gap-3">
                                <Clock className="text-primary-500" size={24} />
                                Recent Invoices
                            </h3>
                            <NavLink to="/invoices" className="text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1">
                                View all <ArrowRight size={14} />
                            </NavLink>
                        </div>

                        <div className="bg-white rounded-3xl border border-secondary-100/50 shadow-sm overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-secondary-50/50 text-[10px] uppercase font-black tracking-widest text-secondary-400">
                                    <tr>
                                        <th className="px-6 py-4">Client</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-secondary-50 text-sm">
                                    {invoices.length > 0 ? invoices.slice(0, 5).map((inv, idx) => (
                                        <tr key={idx} className="hover:bg-primary-50/30 transition-colors">
                                            <td className="px-6 py-4 font-bold text-secondary-900">{inv.customerInfo.name || 'Anonymous Client'}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 w-fit">
                                                    <CheckCircle2 size={10} />
                                                    {inv.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-secondary-500">{inv.invoiceDate}</td>
                                            <td className="px-6 py-4 text-right font-black text-secondary-900">{formatCurrency(inv.grandTotal || 0)}</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-20 text-center text-secondary-400 font-medium">No invoices created yet. Start by creating one!</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-black text-secondary-900 flex items-center gap-3">
                            <Zap className="text-orange-500" size={24} />
                            Quick Actions
                        </h3>
                        <div className="space-y-4">
                            <NavLink to="/create" className="flex items-center gap-4 p-5 bg-primary-600 text-white rounded-3xl hover:bg-primary-500 shadow-xl shadow-primary-900/40 transition-all hover:-translate-y-1 group">
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                    <Plus size={24} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-black text-lg">Create New Invoice</h4>
                                    <p className="text-primary-100 text-xs font-medium">Generate a professional PDF</p>
                                </div>
                                <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </NavLink>

                            <div className="p-6 bg-white border border-secondary-100 rounded-3xl space-y-4">
                                <div className="flex items-center gap-3 text-orange-600">
                                    <AlertCircle size={20} />
                                    <span className="text-sm font-black uppercase tracking-widest">Setup Guide</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                                            <CheckCircle2 size={12} />
                                        </div>
                                        <span className="text-xs font-medium text-secondary-600">Company Details Added</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-400">
                                            <Plus size={12} />
                                        </div>
                                        <span className="text-xs font-medium text-secondary-400">Upload Business Logo</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-400">
                                            <Plus size={12} />
                                        </div>
                                        <span className="text-xs font-medium text-secondary-400">Configure Payment Terms</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
