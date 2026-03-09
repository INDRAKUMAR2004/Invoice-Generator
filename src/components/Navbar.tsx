import React from 'react';
import {
    Bell,
    Search,
    HelpCircle,
    Plus,
    Command
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <header className="sticky top-0 w-full z-40 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 px-8 flex items-center justify-between h-[72px]">
            <div className="flex items-center gap-6 flex-1">
                <div className="group relative flex items-center w-64">
                    <Search size={16} className="absolute left-3 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search invoices..."
                        className="w-full bg-slate-100/50 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 rounded-xl py-2 pl-9 pr-10 text-[13px] text-slate-700 outline-none transition-all placeholder:text-slate-400"
                    />
                    <div className="absolute right-2.5 flex items-center gap-1 opacity-50">
                        <Command size={12} className="text-slate-500" />
                        <span className="text-[10px] font-medium text-slate-500">K</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2 pr-5 border-r border-slate-200/80">
                    <button className="w-9 h-9 text-slate-500 rounded-xl flex items-center justify-center hover:bg-slate-100 hover:text-slate-900 transition-colors relative">
                        <Bell size={18} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 border-2 border-white rounded-full"></span>
                    </button>
                    <button className="w-9 h-9 text-slate-500 rounded-xl flex items-center justify-center hover:bg-slate-100 hover:text-slate-900 transition-colors">
                        <HelpCircle size={18} />
                    </button>
                </div>

                <NavLink to="/create" className="group relative flex items-center gap-2 bg-[#0A0A0B] hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-[13px] font-medium shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all active:scale-[0.98]">
                    <Plus size={16} className="text-white/70 group-hover:text-white transition-colors" />
                    <span>New Invoice</span>
                </NavLink>
            </div>
        </header>
    );
};

export default Navbar;
