import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface AgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AgentModal: React.FC<AgentModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Accredited Education Agent');
  const [signedIn, setSignedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignedIn(true);
    setTimeout(() => {
      setSignedIn(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-sm w-full p-6 relative z-10"
          >
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
            >
              <XMarkIcon className="w-5 h-5 stroke-2" />
            </button>

            <h3 className="text-base font-bold text-slate-950">Portal Login</h3>
            <p className="text-xs text-slate-500 mt-1">Access policy certificates or manage student applications</p>

            {signedIn ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <CheckCircleIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Secure session established. Redirecting to agent dashboard...</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Account Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="agent@agency.com"
                    className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Account Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none"
                  >
                    <option value="Accredited Education Agent">Accredited Education Agent</option>
                    <option value="Individual Student / Visitor">Individual Student / Visitor</option>
                    <option value="University Partner">University Partner</option>
                  </select>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-slate-950 text-white font-semibold text-sm hover:bg-slate-800 transition-colors mt-2 cursor-pointer"
                >
                  Sign In
                </motion.button>
              </form>
            )}

            <p className="text-[11px] text-slate-400 text-center mt-3">
              Need agent API credentials? Contact partner@youroshc.com.au
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
