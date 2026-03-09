import React from 'react';
import { Layers, CheckCircle2, Zap, Monitor, Printer, Smartphone } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Templates: React.FC = () => {
    const templates = [
        {
            id: 'classic',
            name: 'Classic Corporate',
            desc: 'Professional, trustworthy, and traditional. Perfect for any business.',
            color: 'bg-primary-600',
            preview: 'https://images.unsplash.com/photo-1586281380349-631531a34d4f?auto=format&fit=crop&q=80&w=400&h=600'
        },
        {
            id: 'modern',
            name: 'Modern Startup',
            desc: 'Vibrant, bold, and clean. Designed for modern SaaS and Tech firms.',
            color: 'bg-emerald-600',
            preview: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400&h=600'
        },
        {
            id: 'minimal',
            name: 'Minimalist Studio',
            desc: 'Sleek, refined, and elegant. Ideal for designers and boutique agencies.',
            color: 'bg-zinc-800',
            preview: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=400&h=600'
        },
    ];

    return (
        <main className="min-h-screen pt-24 pb-12 px-8">
            <div className="max-w-[1600px] mx-auto space-y-12">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 p-8 rounded-3xl bg-secondary-900 shadow-2xl overflow-hidden relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-primary-500/10 pointer-events-none"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white backdrop-blur-md border border-white/20">
                                <Layers size={24} />
                            </div>
                            <h1 className="text-4xl font-black text-white tracking-tighter">Premium Templates</h1>
                        </div>
                        <p className="text-secondary-400 font-medium max-w-xl">
                            Choose from our curated collection of professional invoice templates.
                            Each design is fully responsive and optimized for both PDF export and physical printing.
                        </p>
                    </div>

                    <div className="relative z-10 flex gap-2 p-1.5 bg-white/5 backdrop-blur-3xl rounded-2xl border border-white/10">
                        <button className="p-3 bg-white/10 text-white rounded-xl"><Monitor size={20} /></button>
                        <button className="p-3 hover:bg-white/5 text-white/40 rounded-xl transition-colors"><Printer size={20} /></button>
                        <button className="p-3 hover:bg-white/5 text-white/40 rounded-xl transition-colors"><Smartphone size={20} /></button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {templates.map((template) => (
                        <div key={template.id} className="group flex flex-col h-full bg-white rounded-[40px] border border-secondary-100 shadow-sm transition-all hover:shadow-2xl hover:-translate-y-4 overflow-hidden">
                            <div className="aspect-[3/4] overflow-hidden relative m-4 rounded-[32px] shadow-inner bg-secondary-50">
                                <img src={template.preview} alt={template.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80" />
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                                    <NavLink
                                        to="/create"
                                        className="w-full py-4 bg-white text-secondary-900 font-black text-sm rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2 active:scale-95"
                                    >
                                        <Zap size={18} fill="currentColor" />
                                        Apply Template
                                    </NavLink>
                                </div>
                                {template.id === 'modern' && (
                                    <div className="absolute top-6 left-6 px-4 py-1.5 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg border border-emerald-400">Popular</div>
                                )}
                            </div>

                            <div className="p-10 pt-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-4 h-4 rounded-full ${template.color} shadow-lg shadow-black/10`}></div>
                                    <h3 className="text-xl font-black text-secondary-900 tracking-tight">{template.name}</h3>
                                </div>
                                <p className="text-secondary-500 font-medium text-sm leading-relaxed mb-8 flex-1">{template.desc}</p>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-emerald-600">
                                        <CheckCircle2 size={16} />
                                        <span className="text-xs font-bold uppercase tracking-widest">Supports Multi-taxation</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-emerald-600">
                                        <CheckCircle2 size={16} />
                                        <span className="text-xs font-bold uppercase tracking-widest">Pixel Perfect PDF Export</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-12 glass-card bg-primary-600 text-white overflow-hidden relative rounded-[40px] shadow-3xl shadow-primary-900/40">
                    <div className="absolute -right-24 -top-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="flex-1 space-y-4 text-center md:text-left">
                            <h2 className="text-4xl font-black tracking-tighter">Need a custom design?</h2>
                            <p className="text-primary-100 font-medium max-w-lg leading-relaxed">
                                Our team of designers can build bespoke invoice templates tailored to your brand identity. Reach out to our 24/7 support team.
                            </p>
                        </div>
                        <button className="px-10 py-5 bg-white text-primary-600 font-black rounded-3xl hover:scale-105 transition-all shadow-2xl active:scale-95 flex items-center gap-3">
                            <Monitor size={20} />
                            Request Custom Design
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Templates;
