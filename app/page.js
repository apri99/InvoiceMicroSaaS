'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Download, Save, RefreshCw } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function InvoiceApp() {
  const [items, setItems] = useState([{ id: 1, desc: 'Jasa Pengembangan Web', qty: 1, price: 1500000 }]);
  const [tax, setTax] = useState(0);

  // Hitung Total
  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const total = subtotal + (subtotal * tax / 100);

  const handleDownload = async () => {
    const element = document.getElementById('invoice-preview');
    const canvas = await html2canvas(element, { scale: 2 });
    const data = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('invoice-pro.pdf');
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
        
        {/* Toolbar Atas */}
        <div className="bg-slate-800 p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 p-2 rounded-lg font-bold">INV</div>
            <h1 className="font-bold text-xl">Invoice Generator Pro</h1>
          </div>
          <button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg flex items-center gap-2 font-bold transition">
            <Download size={18} /> Simpan PDF
          </button>
        </div>

        <div id="invoice-preview" className="p-8 bg-white text-slate-800">
            {/* Header Invoice */}
            <div className="flex justify-between items-start mb-10 border-b pb-8">
                <div>
                    <input type="text" defaultValue="NAMA PERUSAHAAN ANDA" className="text-3xl font-bold uppercase text-slate-700 w-full mb-2 outline-none placeholder:text-slate-300" />
                    <textarea defaultValue="Alamat Bisnis Lengkap&#10;Telp: 0812-3456-7890" className="w-full text-slate-500 text-sm resize-none h-16 outline-none"></textarea>
                </div>
                <div className="text-right">
                    <h2 className="text-4xl font-black text-slate-200 mb-2">INVOICE</h2>
                    <div className="flex items-center justify-end gap-2 mb-1">
                        <span className="font-bold text-slate-500">NO:</span>
                        <input type="text" defaultValue="INV-2026-001" className="text-right font-mono border-b focus:border-blue-500 outline-none w-32" />
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <span className="font-bold text-slate-500">TGL:</span>
                        <input type="date" className="text-right font-mono border-b focus:border-blue-500 outline-none" />
                    </div>
                </div>
            </div>

            {/* Tabel Item */}
            <table className="w-full mb-8">
                <thead>
                    <tr className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider">
                        <th className="py-3 px-2 text-left">Deskripsi</th>
                        <th className="py-3 px-2 text-right w-20">Qty</th>
                        <th className="py-3 px-2 text-right w-32">Harga</th>
                        <th className="py-3 px-2 text-right w-32">Total</th>
                        <th className="py-3 px-2 w-10"></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item.id} className="border-b border-slate-100 group hover:bg-slate-50 transition">
                            <td className="p-2"><input type="text" value={item.desc} onChange={(e) => {const n=[...items];n[index].desc=e.target.value;setItems(n)}} className="w-full bg-transparent outline-none font-medium" /></td>
                            <td className="p-2"><input type="number" value={item.qty} onChange={(e) => {const n=[...items];n[index].qty=Number(e.target.value);setItems(n)}} className="w-full bg-transparent outline-none text-right" /></td>
                            <td className="p-2"><input type="number" value={item.price} onChange={(e) => {const n=[...items];n[index].price=Number(e.target.value);setItems(n)}} className="w-full bg-transparent outline-none text-right" /></td>
                            <td className="p-2 text-right font-bold text-slate-700">{(item.qty * item.price).toLocaleString('id-ID')}</td>
                            <td className="p-2 text-center"><button onClick={() => setItems(items.filter((_, i) => i !== index))} className="text-red-300 hover:text-red-500 opacity-0 group-hover:opacity-100"><Trash2 size={16}/></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={() => setItems([...items, { id: Date.now(), desc: '', qty: 1, price: 0 }])} className="flex items-center gap-2 text-blue-600 font-bold text-sm hover:bg-blue-50 px-3 py-2 rounded transition mb-8">
                <Plus size={16} /> Tambah Baris
            </button>

            {/* Footer Total */}
            <div className="flex justify-end">
                <div className="w-1/2 md:w-1/3 space-y-3">
                    <div className="flex justify-between text-slate-500">
                        <span>Subtotal</span>
                        <span className="font-medium">Rp {subtotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 items-center">
                        <span>Pajak (%)</span>
                        <input type="number" value={tax} onChange={(e) => setTax(Number(e.target.value))} className="w-16 text-right border rounded p-1" />
                    </div>
                    <div className="flex justify-between text-2xl font-bold text-slate-800 border-t pt-4">
                        <span>Total</span>
                        <span>Rp {total.toLocaleString('id-ID')}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
