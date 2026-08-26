import React from 'react';
import { Clock, CheckCircle2, AlertCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function StatusBadge({ status, priority }) {
  if (priority) {
    const p = priority.toLowerCase();
    if (p === 'high') {
      return (
        <span className="badge badge-high">
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D92D20' }} />
          High
        </span>
      );
    }
    if (p === 'medium') {
      return (
        <span className="badge badge-medium">
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#B54708' }} />
          Medium
        </span>
      );
    }
    return (
      <span className="badge badge-low">
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#027A48' }} />
        Low
      </span>
    );
  }

  const s = (status || '').toLowerCase();

  if (s.includes('progress')) {
    return (
      <span className="badge badge-in-progress">
        <Clock size={12} />
        In Progress
      </span>
    );
  }

  if (s.includes('resolved')) {
    return (
      <span className="badge badge-resolved">
        <CheckCircle2 size={12} />
        Resolved
      </span>
    );
  }

  if (s.includes('closed')) {
    return (
      <span className="badge badge-closed">
        <XCircle size={12} />
        Closed
      </span>
    );
  }

  if (s.includes('escalated')) {
    return (
      <span className="badge badge-escalated">
        <AlertTriangle size={12} />
        Escalated
      </span>
    );
  }

  return (
    <span className="badge badge-green">
      <CheckCircle2 size={12} />
      {status || 'Submitted'}
    </span>
  );
}
