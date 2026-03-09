import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    FilePlus,
    FileText,
    Settings,
    Layers,
    Zap,
    ChevronRight,
    Sparkles,
    FileStack
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/' },
    { icon: FilePlus, label: 'New Invoice', path: '/create' },
    { icon: FileStack, label: 'Payment Voucher', path: '/voucher' },
    { icon: FileText, label: 'Invoices', path: '/invoices' },
    { icon: Layers, label: 'Templates', path: '/templates' },
    { icon: Settings, label: 'Settings', path: '/settings' },
];

interface SidebarProps {
    isExpanded: boolean;
    setIsExpanded: (expanded: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, setIsExpanded }) => {
    return (
        <aside
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            className={cn(
                "fixed left-0 top-0 h-screen bg-[#0A0A0B] border-r border-white/5 flex flex-col z-50 text-slate-300 font-sans shadow-2xl transition-all duration-300 ease-in-out overflow-hidden group/sidebar",
                isExpanded ? "w-[260px]" : "w-[80px]"
            )}
        >
            {/* Logo Section */}
            <div className={cn("p-6 pt-8 flex items-center transition-all duration-300", isExpanded ? "gap-4" : "justify-center px-0")}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-white/10 shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 blur-xl rounded-full translate-x-3 -translate-y-3"></div>
                    <Zap size={20} className="fill-white relative z-10" />
                </div>
                <div className={cn("transition-opacity duration-300 whitespace-nowrap", isExpanded ? "opacity-100" : "opacity-0 w-0 hidden")}>
                    <h1 className="text-[19px] font-bold tracking-tight text-white leading-none flex items-center gap-2">
                        QuickBill
                    </h1>
                    <p className="text-[10px] font-semibold text-blue-400 uppercase tracking-[0.2em] mt-1.5 opacity-80">Studio Pro</p>
                </div>
            </div>

            {/* Navigation */}
            <div className="px-4 py-2 mt-4 flex-1">
                <p className={cn("px-3 text-[10px] font-bold uppercase tracking-widest text-[#4A4B53] mb-3 transition-opacity duration-300 whitespace-nowrap", isExpanded ? "opacity-100" : "opacity-0 hidden")}>
                    Main Menu
                </p>
                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => cn(
                                "group flex items-center px-3 py-2.5 rounded-xl transition-all duration-300 font-medium text-sm relative overflow-hidden",
                                isExpanded ? "justify-start gap-3" : "justify-center",
                                isActive
                                    ? "bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/5"
                                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                            )}
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>}
                                    <item.icon size={18} className={cn(
                                        "transition-transform duration-300 group-hover:scale-110 shrink-0",
                                        isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"
                                    )} />
                                    <span className={cn("flex-1 transition-opacity duration-300 whitespace-nowrap", isExpanded ? "opacity-100" : "opacity-0 hidden")}>{item.label}</span>
                                    {isExpanded && isActive && <ChevronRight size={14} className="opacity-50 shrink-0" />}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Premium Upgrade Card */}
            <div className={cn("p-5 transition-all duration-300", isExpanded ? "opacity-100" : "opacity-0 pointer-events-none hidden")}>
                <div className="bg-gradient-to-b from-[#1c1c21] to-[#121215] rounded-2xl p-5 border border-white/5 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl transition-transform group-hover:scale-150 duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-1">
                            <Sparkles size={14} className="text-blue-400" />
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Pro Plan</p>
                        </div>
                        <h4 className="font-semibold text-white text-[15px] mb-3 leading-tight">Unlock Advanced<br />Features</h4>
                        <button className="w-full bg-white text-black hover:bg-slate-200 py-2.5 rounded-xl text-xs font-bold transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                            Upgrade Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Profile Section */}
            <div className={cn("p-4 border-t border-white/5 transition-all duration-300", isExpanded ? "m-2 mt-0" : "m-0 px-2 flex justify-center")}>
                <div className={cn("flex items-center p-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5 shadow-sm", isExpanded ? "gap-3" : "justify-center px-0 w-full")}>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-400 p-[2px] shrink-0">
                        <div className="w-full h-full rounded-full border-2 border-[#0A0A0B] overflow-hidden">
                            <img src="https://ui-avatars.com/api/?name=Kumar+S&background=0A0A0B&color=fff" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className={cn("flex-1 overflow-hidden transition-opacity duration-300 whitespace-nowrap", isExpanded ? "opacity-100" : "opacity-0 hidden")}>
                        <p className="text-[13px] font-semibold text-white truncate leading-tight">Kumar S</p>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">Workspace Admin</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
