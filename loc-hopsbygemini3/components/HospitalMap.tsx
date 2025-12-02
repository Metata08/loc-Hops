import React from 'react';
import { LOCATIONS } from '../constants';

interface HospitalMapProps {
    highlightedLocationId: string | null;
}

export const HospitalMap: React.FC<HospitalMapProps> = ({ highlightedLocationId }) => {
    const activeLocation = highlightedLocationId ? (LOCATIONS as any)[highlightedLocationId] : null;

    return (
        <div className="w-full h-full bg-slate-100 rounded-3xl overflow-hidden relative border border-slate-200 shadow-inner flex flex-col">
            {/* Map Header */}
            <div className="bg-white p-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-bold text-slate-700">Plan de l'Hôpital</h3>
                {activeLocation && (
                    <span className={`px-3 py-1 rounded-full text-white text-sm font-bold animate-pulse ${activeLocation.color}`}>
                        {activeLocation.label} • {activeLocation.floor}
                    </span>
                )}
            </div>

            {/* Schematic Map Visualization */}
            <div className="flex-1 relative p-6 flex items-center justify-center bg-slate-50">
                <div className="relative w-full max-w-md aspect-[3/4] bg-white rounded-xl shadow-xl border-4 border-slate-200 p-4 flex flex-col-reverse gap-2">

                    {/* Floors */}
                    {[4, 3, 2, 1, 0].map((floor) => (
                        <div key={floor} className="flex-1 border-t-2 border-dashed border-slate-100 relative flex items-center justify-center group">
                            <span className="absolute left-2 text-xs text-slate-300 font-mono">
                                {floor === 0 ? 'RDC' : `ETAGE ${floor}`}
                            </span>

                            <div className="flex gap-2 w-full justify-center px-8">
                                {Object.entries(LOCATIONS).filter(([_, loc]: any) => {
                                    if (floor === 0) return loc.floor === 'RDC';
                                    if (floor === 1) return loc.floor === '1er Étage';
                                    if (floor === 2) return loc.floor === '2ème Étage';
                                    if (floor === 3) return loc.floor === '3ème Étage';
                                    if (floor === 4) return loc.floor === '4ème Étage';
                                    return false;
                                }).map(([key, loc]: any) => (
                                    <div
                                        key={key}
                                        className={`
                                    flex-1 h-12 rounded-lg flex items-center justify-center text-[10px] font-bold text-white text-center p-1 transition-all duration-500
                                    ${loc.color}
                                    ${highlightedLocationId === key ? 'scale-110 ring-4 ring-offset-2 ring-indigo-500 z-10 shadow-lg' : 'opacity-40 grayscale'}
                                `}
                                    >
                                        {loc.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
