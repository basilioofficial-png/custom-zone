const REQUIRED_FIELDS = ['name', 'phone'];
const MAX_FIELD_LENGTH = 2000;

function digitsOnly(value) {
  return String(value || '').replace(/\D/g, '');
}

function sanitize(value) {
  return String(value || '').slice(0, MAX_FIELD_LENGTH).trim();
}

async function forwardToBitrix(lead) {
  const webhookUrl = process.env.BITRIX_WEBHOOK_URL;
  if (!webhookUrl) return { forwarded: false };

  const fields = {
    TITLE: `Выездная кастом-зона — ${lead.name}`,
    NAME: lead.name,
    PHONE: [{ VALUE: lead.phone, VALUE_TYPE: 'WORK' }],
    COMPANY_TITLE: lead.company || '',
    COMMENTS: [
      lead.description && `Задача: ${lead.description}`,
      lead.event_type && `Тип мероприятия: ${lead.event_type}`,
      lead.event_date && `Дата: ${lead.event_date}`,
      lead.city && `Город: ${lead.city}`,
      lead.guests && `Гостей: ${lead.guests}`,
      lead.duration && `Продолжительность: ${lead.duration}`,
      lead.budget && `Бюджет: ${lead.budget}`,
      lead.format && `Формат: ${lead.format}`,
      lead.page_url && `Страница: ${lead.page_url}`,
      lead.referrer && `Referrer: ${lead.referrer}`
    ].filter(Boolean).join('\n'),
    SOURCE_ID: 'WEB',
    UTM_SOURCE: lead.utm_source || '',
    UTM_MEDIUM: lead.utm_medium || '',
    UTM_CAMPAIGN: lead.utm_campaign || '',
    UTM_CONTENT: lead.utm_content || '',
    UTM_TERM: lead.utm_term || ''
  };

  if (lead.contact) {
    if (lead.contact.includes('@') && lead.contact.includes('.')) {
      fields.EMAIL = [{ VALUE: lead.contact, VALUE_TYPE: 'WORK' }];
    } else {
      fields.COMMENTS += `\nTelegram: ${lead.contact}`;
    }
  }

  const res = await fetch(`${webhookUrl.replace(/\/$/, '')}/crm.lead.add.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields })
  });

  if (!res.ok) throw new Error(`bitrix_http_${res.status}`);
  const data = await res.json();
  if (data.error) throw new Error(`bitrix_api_${data.error}`);
  return { forwarded: true, leadId: data.result };
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  // Honeypot: a real visitor never fills this hidden field.
  if (sanitize(body.company_website)) {
    return res.status(200).json({ ok: true });
  }

  // Time-trap: reject submissions faster than a human can fill the form.
  const startedAt = Number(body.started_at);
  if (startedAt && Date.now() - startedAt < 1500) {
    return res.status(200).json({ ok: true });
  }

  const lead = {};
  Object.keys(body).forEach((key) => { lead[key] = sanitize(body[key]); });

  const missing = REQUIRED_FIELDS.filter((field) => !lead[field]);
  if (missing.length) {
    return res.status(400).json({ ok: false, error: 'missing_fields', fields: missing });
  }

  if (digitsOnly(lead.phone).length !== 11) {
    return res.status(400).json({ ok: false, error: 'invalid_phone' });
  }

  try {
    const result = await forwardToBitrix(lead);
    if (!result.forwarded) {
      console.log('[lead] BITRIX_WEBHOOK_URL not set — lead received but not forwarded:', lead);
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[lead] failed to forward to Bitrix24:', err);
    return res.status(502).json({ ok: false, error: 'crm_forward_failed' });
  }
};
