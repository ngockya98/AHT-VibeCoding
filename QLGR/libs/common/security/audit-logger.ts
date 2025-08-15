import { logger } from '../logger';

export function auditLog({ userId, action, resource, resourceId, details }) {
  logger.info({
    type: 'audit',
    userId,
    action,
    resource,
    resourceId,
    timestamp: new Date().toISOString(),
    details: maskPII(details),
  });
}

function maskPII(data: any) {
  if (!data) return data;
  // Mask phone/email fields
  if (data.phone) data.phone = '***';
  if (data.email) data.email = '***';
  return data;
}
