import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Fingerprint, Loader2, MoreVertical, Plus, Search, UserRound, X, Eye, Edit, Trash2 } from 'lucide-react';
import { registerMember, getMembers } from '@/services/members-api';
import { getMembershipPlans } from '@/services/membership-plans-api';
import Alert from '@/components/ui/alert';

type MemberStatus = 'approved' | 'pending' | 'blocked';

type ApiMember = {
  id: string;
  membershipNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  dateOfBirth: string;
  gender: string;
  membershipStatus: string;
  membershipPlan: string;
  identityUserId: string | null;
};

type TableMember = {
  id: string;
  name: string;
  pid: string;
  age: string;
  gender: string;
  phone: string;
  status: MemberStatus;
};

type MemberForm = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  membershipPlan: string;
};

type MemberRegistrationPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  dateOfBirth: string;
  memberType: number;
  membershipPlan: string;
  gender: number;
  deviceFingerprintId1: string | null;
  deviceFingerprintId2: string | null;
};

type MembershipPlan = {
  id: string;
  title: string;
  price: number;
};

type MemberFieldErrors = Partial<Record<keyof MemberForm, string>>;

const sriLankanMobileRegex = /^7\d{8}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateMemberForm = (form: MemberForm): MemberFieldErrors => {
  const errors: MemberFieldErrors = {};

  if (!form.firstName.trim()) {
    errors.firstName = 'First name is required.';
  }

  if (!form.lastName.trim()) {
    errors.lastName = 'Last name is required.';
  }

  if (!form.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required.';
  } else {
    // expect yyyy-mm-dd
    const m = form.dateOfBirth.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) {
      errors.dateOfBirth = 'Enter a valid date (YYYY-MM-DD).';
    } else {
      const y = Number(m[1]);
      const mo = Number(m[2]);
      const d = Number(m[3]);
      const ts = Date.UTC(y, mo - 1, d);
      if (!isFinite(ts)) errors.dateOfBirth = 'Enter a valid date.';
    }
  }

  const phone = form.phone.trim().replace(/[\s-]/g, '');
  if (!sriLankanMobileRegex.test(phone)) {
    errors.phone = 'Enter a valid Sri Lankan mobile number without +94 (e.g. 712345678).';
  }

  if (!emailRegex.test(form.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!form.membershipPlan) {
    errors.membershipPlan = 'Select a membership plan.';
  }

  return errors;
};

const initialMemberForm: MemberForm = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: 'Male',
  phone: '',
  email: '',
  membershipPlan: '',
};

export default function Members() {
  const [members, setMembers] = useState<TableMember[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);
  const [membersError, setMembersError] = useState('');
  const [membershipPlans, setMembershipPlans] = useState<MembershipPlan[]>([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState(false);
  const [plansError, setPlansError] = useState('');

  const [activeTab, setActiveTab] = useState<MemberStatus>('approved');
  const [isNewMemberOpen, setIsNewMemberOpen] = useState(false);
  const [memberStep, setMemberStep] = useState(1);
  const [form, setForm] = useState<MemberForm>(initialMemberForm);
  const [fieldErrors, setFieldErrors] = useState<MemberFieldErrors>({});
  const [submitError, setSubmitError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [pageAlert, setPageAlert] = useState<{ visible: boolean; variant?: 'success' | 'error' | 'warning' | 'info'; title?: string; description?: string }>({ visible: false });

  // pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openAction, setOpenAction] = useState<{ id: string; top: number; left: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Helper functions
  const calculateAge = (dateOfBirth: string): string => {
    try {
      const [day, month, year] = dateOfBirth.split('/').map(Number);
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
      return age > 0 ? `${age} yrs` : '-- yrs';
    } catch {
      return '-- yrs';
    }
  };

  const mapMembershipStatusToTabStatus = (status: string): MemberStatus => {
    if (status === 'Active') return 'approved';
    if (status === 'Inactive') return 'pending';
    return 'blocked';
  };

  // Fetch members on component mount
  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    fetchMembershipPlans();
  }, []);

  const fetchMembers = async () => {
    setIsLoadingMembers(true);
    try {
      const apiMembers: ApiMember[] = await getMembers();

      // Filter members to only show those with membershipNumber starting with "GYM-MEM"
      const filteredApiMembers = apiMembers.filter((member) =>
        member.membershipNumber.startsWith('GYM-MEM')
      );

      // Map API response to table format
      const mappedMembers: TableMember[] = filteredApiMembers.map((member) => ({
        id: member.id,
        name: `${member.firstName} ${member.lastName}`,
        pid: member.membershipNumber,
        age: calculateAge(member.dateOfBirth),
        gender: Number(member.gender) === 1 ? "Male" : "Female",
        phone: member.phoneNumber ? `+94${member.phoneNumber}` : 'N/A',
        status: mapMembershipStatusToTabStatus(member.membershipStatus),
      }));

      setMembers(mappedMembers);
      setMembersError('');
    } catch (error) {
      setMembersError('Failed to load members. Please try again later.');
      setMembers([]);
    } finally {
      setIsLoadingMembers(false);
    }
  };

  const fetchMembershipPlans = async () => {
    setIsLoadingPlans(true);
    try {
      const response = await getMembershipPlans();
      const plans = response?.additionalData?.response ?? response?.response ?? response ?? [];

      const mappedPlans: MembershipPlan[] = Array.isArray(plans)
        ? plans.map((plan: any) => ({
            id: String(plan.id),
            title: String(plan.title ?? 'Unnamed Plan'),
            price: Number(plan.price ?? 0),
          }))
        : [];

      setMembershipPlans(mappedPlans);
      setPlansError('');

      setForm((current) => {
        if (current.membershipPlan || mappedPlans.length === 0) {
          return current;
        }

        return { ...current, membershipPlan: mappedPlans[0].id };
      });
    } catch (error) {
      setPlansError('Failed to load membership plans. Please try again later.');
      setMembershipPlans([]);
    } finally {
      setIsLoadingPlans(false);
    }
  };

  useEffect(() => {
    const handleDoc = () => setOpenAction(null);
    if (openAction) document.addEventListener('mousedown', handleDoc);
    return () => document.removeEventListener('mousedown', handleDoc);
  }, [openAction]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const filteredMembers = members.filter((member) => {
    if (member.status !== activeTab) return false;

    const query = searchTerm.trim().toLowerCase();
    if (!query) return true;

    const statusLabel =
      member.status === 'approved'
        ? 'active'
        : member.status === 'pending'
          ? 'inactive'
          : 'blocked';

    return [member.name, member.pid, member.phone, statusLabel]
      .join(' ')
      .toLowerCase()
      .includes(query);
  });
  const total = filteredMembers.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const pageItems = filteredMembers.slice(start, start + pageSize);
  const selectedMembershipPlan = membershipPlans.find((plan) => plan.id === form.membershipPlan);

  const tabs = [
    { key: 'approved', label: 'Approved Members' },
    { key: 'pending', label: 'Pending Members' },
    { key: 'blocked', label: 'Blocked Members' },
  ] as const;

  const openNewMemberModal = () => {
    setForm(initialMemberForm);
    setFieldErrors({});
    setSubmitError('');
    setMemberStep(1);
    setIsNewMemberOpen(true);
  };

  const closeNewMemberModal = () => {
    setIsNewMemberOpen(false);
    setMemberStep(1);
    setFieldErrors({});
    setSubmitError('');
    setIsRegistering(false);
    setForm(initialMemberForm);
  };

  const updateField = (field: keyof MemberForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const buildRegistrationPayload = (): MemberRegistrationPayload => ({
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    email: form.email.trim(),
    phone: form.phone.trim() ? form.phone.trim() : null,
    // convert local datetime input to RFC3339 / ISO 8601 with Z
    // convert date-only (YYYY-MM-DD) to RFC3339 midnight UTC (e.g. 2017-07-21T00:00:00Z)
    dateOfBirth: (function toIso(d: string) {
      if (!d) return '';
      const m = d.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (!m) return '';
      const y = Number(m[1]);
      const mo = Number(m[2]);
      const day = Number(m[3]);
      return new Date(Date.UTC(y, mo - 1, day)).toISOString();
    })(form.dateOfBirth),
    memberType: 1,
    membershipPlan: form.membershipPlan,
    gender: form.gender === 'Female' ? 2 : 1,
    deviceFingerprintId1: null,
    deviceFingerprintId2: null,
  });

  const goToNextStep = async () => {
    const validationErrors = validateMemberForm(form);
    setFieldErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitError('');
    setIsRegistering(true);

    try {
      await registerMember(buildRegistrationPayload());
      setPageAlert({
        visible: true,
        variant: 'success',
        title: 'Member Registered',
        description: 'The member has been successfully registered.'
      });
      setMemberStep(2);
    } catch (error) {
      setPageAlert({
        visible: true,
        variant: 'error',
        title: 'Registration Failed',
        description: 'An error occurred while registering the member. Please try again.'
      });
    } finally {
      setIsRegistering(false);
      fetchMembers();
    }
  };

  const goBackStep = () => setMemberStep(1);

  const handleFinalSubmit = () => {
    closeNewMemberModal();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {pageAlert.visible && (
        <div>
          <Alert variant={pageAlert.variant as any} title={pageAlert.title} description={pageAlert.description} onClose={() => setPageAlert((s) => ({ ...s, visible: false }))} />
        </div>
      )}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Member Registration</h1>
            <p className="text-sm text-gray-500 mt-1">Search for returning members or register a new one</p>
          </div>
          <div className="w-full max-w-md">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-md px-3 py-2 text-sm shadow-sm">
              <Search size={16} className="text-gray-400" />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full outline-none text-sm"
                placeholder="Search by name, phone, member ID, or status..."
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={openNewMemberModal} className="flex items-center gap-2 px-3 py-2.5 bg-primary text-white rounded cursor-pointer bg-blue-700 transition text-sm">
              <Plus size={14} />
              New Member
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-4 py-2 border-b border-gray-100 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                const tabCount = members.filter((member) => member.status === tab.key).length;

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

            <div className="text-sm text-gray-600">
              {tabs.find((tab) => tab.key === activeTab)?.label}
            </div>
          </div>

          <div className="px-4 py-3">
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-600 border-b border-gray-100">
                    <th className="py-2 px-3">MEMBER</th>
                    <th className="py-2 px-3">AGE</th>
                    <th className="py-2 px-3">GENDER</th>
                    <th className="py-2 px-3">PHONE</th>
                    <th className="py-2 px-3">STATUS</th>
                    <th className="py-2 px-3">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoadingMembers ? (
                    <tr>
                      <td colSpan={6} className="py-8">
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                          <span className="text-sm text-gray-600">Loading members...</span>
                        </div>
                      </td>
                    </tr>
                  ) : membersError ? (
                    <tr>
                      <td colSpan={6} className="py-8">
                        <div className="flex items-center justify-center">
                          <span className="text-sm text-red-600">{membersError}</span>
                        </div>
                      </td>
                    </tr>
                  ) : pageItems.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8">
                        <div className="flex items-center justify-center">
                          <span className="text-sm text-gray-500">No members found</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    pageItems.map((p) => (
                      <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-2 px-3 align-top">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-semibold">{p.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{p.name}</div>
                              <div className="text-xs text-blue-600">{p.pid}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-3 align-top text-gray-700">{p.age}</td>
                        <td className="py-2 px-3 align-top"><span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs">{p.gender}</span></td>
                        <td className="py-2 px-3 align-top text-gray-700">{p.phone}</td>
                        <td className="py-2 px-3 align-top">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-700'
                              : p.status === 'pending'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                            {p.status === 'approved' ? 'Active' : p.status === 'pending' ? 'Inactive' : 'Blocked'}
                          </span>
                        </td>
                        <td className="py-2 px-3 align-top text-gray-500">
                          <div className="relative inline-block">
                            <button onClick={(e) => {
                              e.stopPropagation();
                              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                              const menuWidth = 144; // w-36
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
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
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

      {isNewMemberOpen && createPortal(
        <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/50 px-3 py-4 sm:px-4 sm:py-6">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Register New Member</h2>
                <p className="mt-1 text-sm text-gray-500">Complete all steps to register the member in the system.</p>
              </div>
              <button onClick={closeNewMemberModal} className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900">
                <X size={18} />
              </button>
            </div>

            <div className="border-b border-gray-200 px-5 py-4 sm:px-6">
              <div className="mx-auto grid w-full max-w-xl grid-cols-[1fr_auto_1fr] items-center">
                <div className="flex items-center justify-end pr-4 sm:pr-6">
                  <div className="flex flex-col items-center gap-2 text-center shrink-0">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold ${memberStep >= 1 ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 bg-white text-gray-400'}`}>
                      1
                    </div>
                    <span className={`text-xs font-medium sm:text-sm ${memberStep >= 1 ? 'text-blue-600' : 'text-gray-500'}`}>Personal</span>
                  </div>
                </div>

                <div className="h-px w-24 bg-gray-200 sm:w-32 md:w-40" />

                <div className="flex items-center justify-start pl-4 sm:pl-6">
                  <div className="flex flex-col items-center gap-2 text-center shrink-0">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold ${memberStep >= 2 ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 bg-white text-gray-400'}`}>
                      2
                    </div>
                    <span className={`text-xs font-medium sm:text-sm ${memberStep >= 2 ? 'text-blue-600' : 'text-gray-500'}`}>Fingerprint</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-h-[calc(92vh-160px)] overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
              {memberStep === 1 ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                      <UserRound size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 sm:text-md">Personal Details</h3>
                      <p className="text-sm text-gray-500">Basic identification information</p>
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2 lg:gap-4">
                    <div>
                      <label className="mb-2 block text-xs font-medium text-gray-900 sm:text-sm">First Name <span className="text-red-500">*</span></label>
                      <input value={form.firstName} onChange={(event) => updateField('firstName', event.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="John" />
                      {fieldErrors.firstName ? <p className="mt-2 text-[11px] text-red-600 sm:text-xs">{fieldErrors.firstName}</p> : null}
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium text-gray-900 sm:text-sm">Last Name <span className="text-red-500">*</span></label>
                      <input value={form.lastName} onChange={(event) => updateField('lastName', event.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Doe" />
                      {fieldErrors.lastName ? <p className="mt-2 text-[11px] text-red-600 sm:text-xs">{fieldErrors.lastName}</p> : null}
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium text-gray-900 sm:text-sm">Date of Birth <span className="text-red-500">*</span></label>
                      <input type="date" value={form.dateOfBirth} onChange={(event) => updateField('dateOfBirth', event.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                      {fieldErrors.dateOfBirth ? <p className="mt-2 text-[11px] text-red-600 sm:text-xs">{fieldErrors.dateOfBirth}</p> : <p className="mt-2 text-[11px] text-gray-500 sm:text-xs"></p>}
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium text-gray-900 sm:text-sm">Gender <span className="text-red-500">*</span></label>
                      <select value={form.gender} onChange={(event) => updateField('gender', event.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium text-gray-900 sm:text-sm">Phone No <span className="text-red-500">*</span></label>
                      <div className="flex overflow-hidden rounded-lg border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                        <span className="border-r border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500">+94</span>
                        <input value={form.phone} onChange={(event) => updateField('phone', event.target.value)} inputMode="numeric" maxLength={9} className="w-full px-4 py-2.5 text-sm outline-none" placeholder="712 345 678" />
                      </div>
                      <p className={`mt-2 text-[11px] sm:text-xs ${fieldErrors.phone ? 'text-red-600' : 'text-gray-500'}`}>{fieldErrors.phone ?? 'Enter 9 digits starting with 7, without +94.'}</p>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium text-gray-900 sm:text-sm">Email <span className="text-red-500">*</span></label>
                      <input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="member@example.com" />
                      <p className={`mt-2 text-[11px] sm:text-xs ${fieldErrors.email ? 'text-red-600' : 'text-gray-500'}`}>{fieldErrors.email ?? 'Use a valid email address.'}</p>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium text-gray-900 sm:text-sm">Membership Plan <span className="text-red-500">*</span></label>
                      <select
                        value={form.membershipPlan}
                        onChange={(event) => updateField('membershipPlan', event.target.value)}
                        disabled={isLoadingPlans || membershipPlans.length === 0}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                      >
                        <option value="">{isLoadingPlans ? 'Loading plans...' : 'Select a plan'}</option>
                        {membershipPlans.map((plan) => (
                          <option key={plan.id} value={plan.id}>
                            {plan.title} - LKR {plan.price.toLocaleString()}
                          </option>
                        ))}
                      </select>
                      {plansError ? <p className="mt-2 text-[11px] text-red-600 sm:text-xs">{plansError}</p> : null}
                      {fieldErrors.membershipPlan ? <p className="mt-2 text-[11px] text-red-600 sm:text-xs">{fieldErrors.membershipPlan}</p> : null}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-4 mb-5.5">
                    <button onClick={closeNewMemberModal} className="rounded-lg cursor-pointer border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                      Cancel
                    </button>
                    <button onClick={goToNextStep} disabled={isRegistering} className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400">
                      {isRegistering ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                      {isRegistering ? 'Registering...' : 'Submit & Next'}
                    </button>
                  </div>
                  {submitError ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {submitError}
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                      <Fingerprint size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 sm:text-lg">Fingerprint Scanning</h3>
                      <p className="text-sm text-gray-500">Capture the member fingerprint before submitting.</p>
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
                          <Fingerprint size={48} strokeWidth={1.8} className="sm:hidden" />
                          <Fingerprint size={56} strokeWidth={1.8} className="hidden sm:block" />
                        </div>
                        <div className="mt-5 space-y-2 sm:mt-6">
                          <p className="text-base font-semibold text-gray-900 sm:text-lg">Fingerprint Scan Pending</p>
                          <p className="text-sm text-gray-500">Use the scanner to capture and verify the member fingerprint.</p>
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
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Member Summary</h4>
                        <div className="mt-4 space-y-3 text-sm text-gray-600">
                          <div className="flex items-center justify-between gap-4"><span>Name</span><span className="font-medium text-gray-900">{form.firstName || 'John'} {form.lastName || 'Doe'}</span></div>
                          <div className="flex items-center justify-between gap-4"><span>Phone</span><span className="font-medium text-gray-900">+94 {form.phone || '712 345 678'}</span></div>
                          <div className="flex items-center justify-between gap-4">
                            <span>Plan</span>
                            <span className="font-medium text-gray-900">
                              {selectedMembershipPlan ? `${selectedMembershipPlan.title} - LKR ${selectedMembershipPlan.price.toLocaleString()}` : 'Select a plan'}
                            </span>
                          </div>
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
                      <button onClick={closeNewMemberModal} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                        Cancel
                      </button>
                      <button onClick={handleFinalSubmit} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
                        Submit
                      </button>
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
