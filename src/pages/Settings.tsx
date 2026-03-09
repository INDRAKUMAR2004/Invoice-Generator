import React from 'react';
import {
    Settings as SettingsIcon,
    ShieldCheck,
    CreditCard,
    Bell,
    Database,
    User,
    ChevronRight,
    HelpCircle
} from 'lucide-react';

const Settings: React.FC = () => {
    const sections = [
        {
            title: 'Personal Account',
            desc: 'Update your profile and security settings',
            icon: User,
            color: 'text-primary-600',
            bg: 'bg-primary-50',
            items: ['Profile Information', 'Security & Password', 'Two-Factor Authentication']
        },
        {
            title: 'Billing & Plans',
            desc: 'Manage subscriptions and payment methods',
            icon: CreditCard,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            items: ['Subscription Details', 'Payment Methods', 'Invoice History']
        },
        {
            title: 'Business & Team',
            desc: 'Configure organization and user roles',
            icon: ShieldCheck,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            items: ['Business Profile', 'Team Management', 'Permissions & Roles']
        },
        {
            title: 'Notifications',
            desc: 'Customize app alerts and emails',
            icon: Bell,
            color: 'text-orange-600',
            bg: 'bg-orange-50',
            items: ['Desktop Notifications', 'Email Digests', 'Usage Alerts']
        }
    ];

    return (
        <main className="min-h-screen pt-24 pb-12 px-8">
            <div className="max-w-[1200px] mx-auto space-y-12">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl bg-white border border-secondary-100 shadow-sm overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100/10 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-secondary-900 text-white rounded-[24px] flex items-center justify-center shadow-2xl shadow-secondary-900/40">
                            <SettingsIcon size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-secondary-900 tracking-tight">Account Settings</h1>
                            <p className="text-secondary-400 font-medium">Configure and optimize your invoice studio experience.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="px-6 py-3 bg-secondary-900 text-white font-black text-sm rounded-2xl hover:bg-secondary-800 transition-all flex items-center gap-2">
                            Save Changes
                        </button>
                        <button className="p-3 bg-secondary-50 text-secondary-400 rounded-2xl hover:text-secondary-900 transition-all">
                            <HelpCircle size={24} />
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sections.map((section, idx) => (
                        <div key={idx} className="glass-card p-10 bg-white group hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                            <div className={`absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity`}>
                                <section.icon size={160} />
                            </div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`${section.bg} ${section.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-6`}>
                                        <section.icon size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-secondary-900 tracking-tight">{section.title}</h3>
                                        <p className="text-xs font-medium text-secondary-400 uppercase tracking-widest">{section.desc}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 flex-1">
                                    {section.items.map((item, i) => (
                                        <button key={i} className="w-full flex items-center justify-between p-4 bg-secondary-50/50 hover:bg-primary-50 text-secondary-600 hover:text-primary-700 rounded-2xl transition-all font-bold group/item">
                                            <span className="text-sm">{item}</span>
                                            <ChevronRight size={18} className="opacity-0 group-hover/item:opacity-100 transition-all group-hover/item:translate-x-1" />
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-8 pt-8 border-t border-secondary-50 flex items-center justify-between text-secondary-300">
                                    <span className="text-[10px] uppercase font-black tracking-widest leading-none">Status: Configured</span>
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-8 bg-red-50/50 border border-red-100 rounded-[40px] flex items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-red-500 shadow-xl shadow-red-500/10">
                            <Database size={32} />
                        </div>
                        <div>
                            <h4 className="text-xl font-black text-red-900 tracking-tight">Danger Zone</h4>
                            <p className="text-red-700/60 font-medium text-sm">Once you delete your account, there is no going back. Please be certain.</p>
                        </div>
                    </div>

                    <button className="px-10 py-5 bg-red-600 text-white font-black rounded-3xl hover:bg-red-700 transition-all flex items-center gap-3 shadow-xl shadow-red-900/40 active:scale-95">
                        Delete All Data
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Settings;
