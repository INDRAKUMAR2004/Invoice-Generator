import React from 'react';
import { clsx } from 'clsx';
import { Check } from 'lucide-react';

interface TemplateSelectorProps {
    currentTemplate: 'classic' | 'modern' | 'minimal';
    onChange: (template: 'classic' | 'modern' | 'minimal') => void;
}

const templates = [
    { id: 'classic', label: 'Classic', color: 'bg-indigo-600' },
    { id: 'modern', label: 'Modern', color: 'bg-emerald-600' },
    { id: 'minimal', label: 'Minimal', color: 'bg-zinc-800' },
] as const;

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ currentTemplate, onChange }) => {
    return (
        <div className="flex items-center gap-4 bg-white/50 backdrop-blur p-2 rounded-2xl border border-white/50 shadow-sm">
            <span className="text-xs font-bold text-secondary-400 uppercase tracking-widest pl-2">Template</span>
            <div className="flex gap-2">
                {templates.map((template) => (
                    <button
                        key={template.id}
                        onClick={() => onChange(template.id)}
                        className={clsx(
                            "flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-medium text-sm border-2",
                            currentTemplate === template.id
                                ? "bg-white border-primary-500 text-primary-600 shadow-sm ring-4 ring-primary-500/10"
                                : "bg-transparent border-transparent text-secondary-500 hover:bg-white/50 hover:text-secondary-700"
                        )}
                    >
                        <div className={clsx("w-3 h-3 rounded-full", template.color)}></div>
                        {template.label}
                        {currentTemplate === template.id && <Check size={14} strokeWidth={3} />}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TemplateSelector;
