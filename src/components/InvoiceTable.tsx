import React from 'react';
import type { Control, UseFormRegister } from 'react-hook-form';
import { useFieldArray, useWatch } from 'react-hook-form';
import { Trash2, PlusCircle, LayoutGrid, Info } from 'lucide-react';
import type { InvoiceData } from '../types/invoiceTypes';

interface InvoiceTableProps {
    control: Control<InvoiceData>;
    register: UseFormRegister<InvoiceData>;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ control, register }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    const watchItems = useWatch({
        control,
        name: "items",
    });

    return (
        <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-secondary-900 flex items-center gap-2">
                    <LayoutGrid className="text-primary-500" size={20} />
                    Line Items
                </h3>
                <button
                    type="button"
                    onClick={() => append({ id: crypto.randomUUID(), name: '', description: '', hsnSac: '', quantity: 1, unitPrice: 0, unit: 'Nos', taxPercent: 18, total: 0 })}
                    className="btn-secondary text-sm py-1.5"
                >
                    <PlusCircle size={14} />
                    Add Item
                </button>
            </div>

            <div className="w-full overflow-hidden border border-secondary-100 rounded-2xl bg-white shadow-sm transition-all hover:shadow-md">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs font-bold text-secondary-500 uppercase tracking-widest bg-secondary-50/50 border-b border-secondary-100">
                        <tr>
                            <th className="px-5 py-4 w-1/3">Item Details</th>
                            <th className="px-4 py-4 w-24 text-center">HSN/SAC</th>
                            <th className="px-4 py-4 w-16 text-center">Qty</th>
                            <th className="px-4 py-4 w-20 text-center">Unit</th>
                            <th className="px-4 py-4 w-28 text-right">Rate</th>
                            <th className="px-4 py-4 w-20 text-center">GST %</th>
                            <th className="px-4 py-4 w-28 text-right">Amount</th>
                            <th className="px-4 py-4 w-10 text-center"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary-50">
                        {fields.map((field, index) => {
                            const itemTotal = (watchItems[index]?.quantity || 0) * (watchItems[index]?.unitPrice || 0);
                            const taxAmount = (itemTotal * (watchItems[index]?.taxPercent || 0)) / 100;
                            const total = itemTotal + taxAmount;

                            return (
                                <tr key={field.id} className="group hover:bg-slate-50/50 transition-colors duration-200">
                                    <td className="px-5 py-5 space-y-3">
                                        <div className="space-y-2">
                                            <input
                                                {...register(`items.${index}.name` as const)}
                                                placeholder="Enter item name"
                                                className="w-full font-bold text-slate-900 bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-2.5 rounded-lg transition-all placeholder:font-normal placeholder:text-slate-400 text-sm shadow-sm"
                                            />
                                            <textarea
                                                {...register(`items.${index}.description` as const)}
                                                placeholder="Add a detailed description..."
                                                rows={2}
                                                className="w-full text-slate-600 bg-slate-50/50 border border-slate-100 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-400/10 p-2.5 rounded-lg transition-all text-xs resize-none placeholder:text-slate-400 shadow-inner"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-4 py-5 align-top">
                                        <input
                                            {...register(`items.${index}.hsnSac` as const)}
                                            placeholder="HSN"
                                            className="w-full text-center text-xs font-bold text-slate-700 bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-2.5 rounded-lg transition-all shadow-sm uppercase"
                                        />
                                    </td>
                                    <td className="px-4 py-5 text-center align-top">
                                        <input
                                            type="number"
                                            {...register(`items.${index}.quantity` as const, { valueAsNumber: true })}
                                            className="w-16 text-center font-bold text-slate-700 bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-2.5 rounded-lg transition-all shadow-sm"
                                        />
                                    </td>
                                    <td className="px-4 py-5 text-center align-top">
                                        <input
                                            {...register(`items.${index}.unit` as const)}
                                            placeholder="Unit"
                                            className="w-full text-center text-xs font-bold text-slate-700 bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-2.5 rounded-lg transition-all shadow-sm"
                                        />
                                    </td>
                                    <td className="px-4 py-5 align-top">
                                        <div className="relative group/input">
                                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold transition-colors group-focus-within/input:text-blue-500">₹</span>
                                            <input
                                                type="number"
                                                {...register(`items.${index}.unitPrice` as const, { valueAsNumber: true })}
                                                className="w-full text-right font-bold text-slate-900 bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-2.5 pl-6 rounded-lg transition-all shadow-sm"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-4 py-5 align-top">
                                        <div className="relative group/input">
                                            <input
                                                type="number"
                                                {...register(`items.${index}.taxPercent` as const, { valueAsNumber: true })}
                                                className="w-full text-center font-bold text-slate-900 bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 p-2.5 pr-6 rounded-lg transition-all shadow-sm"
                                            />
                                            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] font-bold group-focus-within/input:text-blue-500">%</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-5 text-right align-top">
                                        <div className="p-2.5 rounded-lg bg-slate-900 text-white font-bold text-xs text-center shadow-lg transform transition-transform group-hover:scale-105">
                                            ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                        </div>
                                    </td>
                                    <td className="px-4 py-5 text-center align-top">
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-red-500 rounded-xl transition-all shadow-sm hover:shadow-red-200"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {fields.length === 0 && (
                    <div className="py-20 flex flex-col items-center justify-center gap-4 text-secondary-400">
                        <LayoutGrid size={48} className="opacity-20 animate-pulse" />
                        <p className="font-medium">No items added yet</p>
                        <button
                            type="button"
                            onClick={() => append({ id: crypto.randomUUID(), name: '', description: '', hsnSac: '', quantity: 1, unitPrice: 0, unit: 'Nos', taxPercent: 18, total: 0 })}
                            className="px-6 py-2 bg-white border border-secondary-200 rounded-xl text-primary-600 hover:border-primary-500 transition-all font-bold text-sm shadow-sm"
                        >
                            Get Started
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-4 p-4 rounded-xl bg-orange-50 border border-orange-100 flex items-start gap-3">
                <Info className="text-orange-500 mt-0.5" size={16} />
                <div>
                    <p className="text-orange-800 text-xs font-bold leading-tight uppercase tracking-wide">Compliance Warning</p>
                    <p className="text-orange-700 text-xs mt-1">Ensure HSN/SAC codes are accurate as per GST guidelines for the respective goods and services.</p>
                </div>
            </div>
        </div>
    );
};

export default InvoiceTable;
