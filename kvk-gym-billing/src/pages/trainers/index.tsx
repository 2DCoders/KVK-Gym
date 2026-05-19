import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, MoreVertical, Plus, Search, X, Eye, Edit, Trash2, Dumbbell, Fingerprint } from 'lucide-react';

type TrainerStatus = 'approved' | 'pending' | 'blocked';
type TrainerForm = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  specialty: string;
};

export default function Trainers() {
  const trainers = [
    { id: 1, name: 'Alex Kumar', tid: 'GYM-TRN-20260001', specialty: 'Strength Training', members: 24, status: 'approved' as TrainerStatus },
    { id: 2, name: 'Emma Wilson', tid: 'GYM-TRN-20260002', specialty: 'Yoga & Pilates', members: 18, status: 'approved' as TrainerStatus },
    { id: 3, name: 'David Chen', tid: 'GYM-TRN-20260003', specialty: 'Cardio', members: 32, status: 'pending' as TrainerStatus },
    { id: 4, name: 'Lisa Anderson', tid: 'GYM-TRN-20260004', specialty: 'Nutrition', members: 12, status: 'blocked' as TrainerStatus },
  ];

  const [activeTab, setActiveTab] = useState<TrainerStatus>('approved');
  const [isNewTrainerOpen, setIsNewTrainerOpen] = useState(false);
  const [trainerStep, setTrainerStep] = useState(1);
  const [form, setForm] = useState<TrainerForm>({ firstName: '', lastName: '', phone: '', email: '', specialty: '' });

  // pagination / actions
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openAction, setOpenAction] = useState<{ id: number; top: number; left: number } | null>(null);

  useEffect(() => {
    const handleDoc = () => setOpenAction(null);
    if (openAction) document.addEventListener('mousedown', handleDoc);
    return () => document.removeEventListener('mousedown', handleDoc);
  }, [openAction]);

  const filtered = trainers.filter((t) => t.status === activeTab);
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  const tabs = [
    { key: 'approved', label: 'Approved Trainers' },
    { key: 'pending', label: 'Pending Trainers' },
    { key: 'blocked', label: 'Blocked Trainers' },
  ] as const;

  const openNewTrainerModal = () => { setTrainerStep(1); setIsNewTrainerOpen(true); };
  const closeNewTrainerModal = () => { setIsNewTrainerOpen(false); setTrainerStep(1); };

  const updateField = (field: keyof TrainerForm, value: string) => setForm((c) => ({ ...c, [field]: value }));

  const goToNextStep = () => setTrainerStep(2);
  const goBackStep = () => setTrainerStep(1);

  const handleFinalSubmit = () => {
    // placeholder - in real app submit to API
    closeNewTrainerModal();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Trainer Management</h1>
            <p className="text-sm text-gray-500 mt-1">Search, view and manage gym trainers</p>
          </div>

          <div className="w-full max-w-md">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-md px-3 py-2 text-sm shadow-sm">
              <Search size={16} className="text-gray-400" />
              <input className="w-full outline-none text-sm" placeholder="Search by name, specialty, or trainer ID..." />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={openNewTrainerModal} className="flex items-center gap-2 px-3 py-2.5 bg-primary text-white rounded cursor-pointer bg-blue-700 transition text-sm">
              <Plus size={14} />
              New Trainer
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-4 py-2 border-b border-gray-100 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                const tabCount = trainers.filter((t) => t.status === tab.key).length;

                return (
                  <button
                    key={tab.key}
                    onClick={() => { setActiveTab(tab.key); setPage(1); }}
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition cursor-pointer ${isActive ? 'bg-gray-900 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {tab.label}
                    <span className={`inline-flex min-w-6 items-center justify-center rounded-full px-2 py-0.5 text-xs ${isActive ? 'bg-white/15 text-white' : 'bg-white text-gray-600'}`}>
                      {tabCount}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="text-sm text-gray-600">{tabs.find((t) => t.key === activeTab)?.label}</div>
          </div>

          <div className="px-4 py-3">
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-600 border-b border-gray-100">
                    <th className="py-2 px-3">TRAINER</th>
                    <th className="py-2 px-3">SPECIALTY</th>
                    <th className="py-2 px-3">MEMBERS</th>
                    <th className="py-2 px-3">STATUS</th>
                    <th className="py-2 px-3">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((p) => (
                    <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 px-3 align-top">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-semibold">{p.name.split(' ').map((n: string) => n[0]).slice(0,2).join('')}</div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{p.name}</div>
                            <div className="text-xs text-blue-600">{p.tid}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-3 align-top text-gray-700">{p.specialty}</td>
                      <td className="py-2 px-3 align-top text-gray-700">{p.members}</td>
                      <td className="py-2 px-3 align-top">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${p.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : p.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                          {p.status === 'approved' ? 'Approved' : p.status === 'pending' ? 'Pending' : 'Blocked'}
                        </span>
                      </td>
                      <td className="py-2 px-3 align-top text-gray-500">
                        <div className="relative inline-block">
                          <button onClick={(e) => {
                            e.stopPropagation();
                            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                            const menuWidth = 144;
                            let left = rect.right - menuWidth;
                            left = Math.max(8, Math.min(left, window.innerWidth - menuWidth - 8));
                            const top = rect.bottom + 8;
                            setOpenAction(openAction && openAction.id === p.id ? null : { id: p.id, top, left });
                          }} className="p-1.5 rounded-full hover:bg-gray-100 transition cursor-pointer">
                            <MoreVertical size={14} />
                          </button>
                        </div>

                        {openAction && openAction.id === p.id && createPortal(
                          <div style={{ position: 'fixed', top: openAction.top, left: openAction.left, width: 144 }} onMouseDown={(e) => e.stopPropagation()} className="rounded-md bg-white border shadow-lg z-50">
                            <button onClick={() => { setOpenAction(null); alert(`View ${p.name}`); }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                              <Eye size={14} /> View
                            </button>
                            <button onClick={() => { setOpenAction(null); alert(`Edit ${p.name}`); }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                              <Edit size={14} /> Edit
                            </button>
                            <button onClick={() => { setOpenAction(null); if (confirm(`Delete ${p.name}?`)) { alert(`${p.name} deleted`); } }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-50 cursor-pointer">
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>,
                          document.body,
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="px-4 py-3 border-t border-gray-100 bg-white flex items-center justify-between">
            <div className="text-sm text-gray-600">Showing {total === 0 ? 0 : start + 1} to {Math.min(start + pageSize, total)} of {total} entries</div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600">Rows:</label>
                <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="border rounded-md px-2 py-1 text-sm">
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                </select>
              </div>
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-3 py-1 rounded-md border bg-white text-sm disabled:opacity-50">Prev</button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)} className={`px-2 py-1 text-sm rounded-md ${page === i + 1 ? 'bg-gray-900 text-white' : 'bg-white border'}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
              <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="px-3 py-1 rounded-md border bg-white text-sm disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
      </div>

      {isNewTrainerOpen && createPortal(
        <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/50 px-3 py-4 sm:px-4 sm:py-6">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Add New Trainer</h2>
                <p className="mt-1 text-sm text-gray-500">Provide trainer details to register them in the system.</p>
              </div>
              <button onClick={closeNewTrainerModal} className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900">
                <X size={18} />
              </button>
            </div>

            <div className="border-b border-gray-200 px-5 py-4 sm:px-6">
              <div className="mx-auto grid w-full max-w-xl grid-cols-[1fr_auto_1fr] items-center">
                <div className="flex items-center justify-end pr-4 sm:pr-6">
                  <div className="flex flex-col items-center gap-2 text-center shrink-0">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold ${trainerStep >= 1 ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 bg-white text-gray-400'}`}>
                      1
                    </div>
                    <span className={`text-xs font-medium sm:text-sm ${trainerStep >= 1 ? 'text-blue-600' : 'text-gray-500'}`}>Personal</span>
                  </div>
                </div>

                <div className="h-px w-24 bg-gray-200 sm:w-32 md:w-40" />

                <div className="flex items-center justify-start pl-4 sm:pl-6">
                  <div className="flex flex-col items-center gap-2 text-center shrink-0">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold ${trainerStep >= 2 ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 bg-white text-gray-400'}`}>
                      2
                    </div>
                    <span className={`text-xs font-medium sm:text-sm ${trainerStep >= 2 ? 'text-blue-600' : 'text-gray-500'}`}>Fingerprint</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-h-[calc(92vh-160px)] overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
              {trainerStep === 1 ? (
                <div className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-2 lg:gap-4">
                    <div>
                      <label className="mb-2 block text-xs font-medium text-gray-900 sm:text-sm">First Name <span className="text-red-500">*</span></label>
                      <input value={form.firstName} onChange={(e) => updateField('firstName', e.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="John" />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium text-gray-900 sm:text-sm">Last Name <span className="text-red-500">*</span></label>
                      <input value={form.lastName} onChange={(e) => updateField('lastName', e.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Doe" />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium text-gray-900 sm:text-sm">Phone No <span className="text-red-500">*</span></label>
                      <div className="flex overflow-hidden rounded-lg border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                        <span className="border-r border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500">+94</span>
                        <input value={form.phone} onChange={(e) => updateField('phone', e.target.value)} className="w-full px-4 py-2.5 text-sm outline-none" placeholder="712 345 678" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium text-gray-900 sm:text-sm">Email</label>
                      <input type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="trainer@example.com" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-xs font-medium text-gray-900 sm:text-sm">Specialty</label>
                      <input value={form.specialty} onChange={(e) => updateField('specialty', e.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="e.g., Strength Training" />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-4 mb-5.5">
                    <button onClick={closeNewTrainerModal} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">Cancel</button>
                    <button onClick={goToNextStep} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">Submit & Next <ArrowRight size={16} /></button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                      <Fingerprint size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 sm:text-lg">Fingerprint Scanning</h3>
                      <p className="text-sm text-gray-500">Capture the trainer fingerprint before submitting.</p>
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
                    <div className="rounded-3xl border border-dashed border-blue-300 bg-linear-to-b from-blue-50 to-white p-5 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-blue-700 sm:text-sm">Scanner Ready</p>
                          <h4 className="mt-1 text-lg font-semibold text-gray-900 sm:text-xl">Place Finger on Scanner</h4>
                        </div>
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">Device Connected</span>
                      </div>

                      <div className="mt-6 flex flex-col items-center justify-center rounded-3xl border border-blue-200 bg-white px-5 py-8 text-center shadow-sm sm:mt-8 sm:px-6 sm:py-10">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-blue-100 bg-blue-50 text-blue-600 shadow-inner sm:h-28 sm:w-28">
                          <Fingerprint size={56} strokeWidth={1.8} />
                        </div>
                        <div className="mt-5 space-y-2 sm:mt-6">
                          <p className="text-base font-semibold text-gray-900 sm:text-lg">Fingerprint Scan Pending</p>
                          <p className="text-sm text-gray-500">Use the scanner to capture and verify the trainer fingerprint.</p>
                        </div>
                        <div className="mt-6 grid w-full gap-3 sm:mt-8 sm:grid-cols-3">
                          <div className="rounded-2xl bg-gray-50 px-4 py-3 text-left">
                            <p className="text-xs uppercase tracking-wide text-gray-400">Status</p>
                            <p className="mt-1 text-sm font-medium text-gray-900">Awaiting scan</p>
                          </div>
                          <div className="rounded-2xl bg-gray-50 px-4 py-3 text-left">
                            <p className="text-xs uppercase tracking-wide text-gray-400">Quality</p>
                            <p className="mt-1 text-sm font-medium text-gray-900">-- %</p>
                          </div>
                          <div className="rounded-2xl bg-gray-50 px-4 py-3 text-left">
                            <p className="text-xs uppercase tracking-wide text-gray-400">Match</p>
                            <p className="mt-1 text-sm font-medium text-gray-900">Not checked</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Trainer Summary</h4>
                        <div className="mt-4 space-y-3 text-sm text-gray-600">
                          <div className="flex items-center justify-between gap-4"><span>Name</span><span className="font-medium text-gray-900">{form.firstName || 'John'} {form.lastName || 'Doe'}</span></div>
                          <div className="flex items-center justify-between gap-4"><span>Phone</span><span className="font-medium text-gray-900">+94 {form.phone || '712 345 678'}</span></div>
                          <div className="flex items-center justify-between gap-4"><span>Specialty</span><span className="font-medium text-gray-900">{form.specialty || 'Strength Training'}</span></div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Scan Actions</h4>
                        <p className="mt-3 text-sm text-gray-600">Connect the fingerprint reader and capture the biometric data before submission.</p>
                        <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800">
                          <Fingerprint size={16} />
                          Start Fingerprint Scan
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-4 mb-5.5">
                    <button onClick={goBackStep} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                      <ArrowLeft size={16} />
                      Back
                    </button>
                    <div className="flex items-center gap-3">
                      <button onClick={closeNewTrainerModal} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">Cancel</button>
                      <button onClick={handleFinalSubmit} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700">Submit</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
