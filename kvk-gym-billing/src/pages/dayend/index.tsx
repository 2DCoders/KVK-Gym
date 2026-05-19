import { useState } from 'react';
import { AlertCircle, CheckCircle2, Download, Lock, Search, TrendingUp, Wallet, X } from 'lucide-react';

export default function Dayend() {
  const today = new Date().toISOString().split('T')[0];

  const dayendData = {
    totalRevenue: 89890,
    totalCash: 34900,
    totalCard: 54990,
    totalTransactions: 24,
    cashDiscrepancy: 0,
  };

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [closingNotes, setClosingNotes] = useState('');

  const formatLkr = (amount: number) => `LKR ${amount.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const handleCloseDay = () => {
    setShowCloseModal(false);
    setClosingNotes('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Day End Reconciliation</h1>
            <p className="text-sm text-gray-500 mt-1">Review and close the business day</p>
          </div>

          <div className="w-full max-w-md">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-md px-3 py-2 text-sm shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-gray-300">
              <Search size={16} className="text-gray-400" />
              <input className="w-full outline-none text-sm" placeholder="Search by member or transaction ID..." />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2.5 bg-primary text-white rounded cursor-pointer bg-blue-700 transition-all duration-300 text-sm hover:-translate-y-0.5 hover:shadow-lg hover:bg-blue-800">
              <Download size={14} />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gray-300">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">{formatLkr(dayendData.totalRevenue)}</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <TrendingUp size={20} />
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">Today's total</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gray-300">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Transactions</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">{dayendData.totalTransactions}</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <CheckCircle2 size={20} />
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">Completed payments</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gray-300">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Cash Total</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">{formatLkr(dayendData.totalCash)}</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <Wallet size={20} />
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">Cash collected</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gray-300">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Card Total</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">{formatLkr(dayendData.totalCard)}</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                <AlertCircle size={20} />
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">Card payments</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Cash Reconciliation</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="text-sm text-gray-600">Expected Cash Total</span>
                <span className="text-sm font-semibold text-gray-900">{formatLkr(dayendData.totalCash)}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                <label className="text-sm text-gray-600">Actual Cash Count</label>
                <input type="text" placeholder="LKR 0.00" className="w-32 px-3 py-2 text-right text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                <span className="text-sm text-emerald-700 font-medium">Discrepancy</span>
                <span className="text-sm font-semibold text-emerald-700">{formatLkr(dayendData.cashDiscrepancy)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Closing Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => setShowCloseModal(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-lg font-medium transition-all duration-300 hover:bg-emerald-700 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <Lock size={16} />
                Close Day
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium transition-all duration-300 hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-sm">
                <Download size={16} />
                Print Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCloseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">Close Business Day</h2>
              <button onClick={() => setShowCloseModal(false)} className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900">
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input type="date" value={today} disabled className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Closing Notes (Optional)</label>
                <textarea
                  value={closingNotes}
                  onChange={(e) => setClosingNotes(e.target.value)}
                  placeholder="Add any notes about today's operations..."
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  rows={4}
                />
              </div>
              <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-3">
                <p className="text-xs text-emerald-700">
                  <span className="font-semibold">Summary:</span> Total Revenue {formatLkr(dayendData.totalRevenue)} • {dayendData.totalTransactions} transactions
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 flex items-center gap-3 justify-end">
              <button onClick={() => setShowCloseModal(false)} className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 font-medium transition-all duration-300 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleCloseDay} className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium transition-all duration-300 hover:bg-emerald-700 hover:-translate-y-0.5 hover:shadow-lg">
                Close Day
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}