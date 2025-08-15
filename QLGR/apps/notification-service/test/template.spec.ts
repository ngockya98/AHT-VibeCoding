import mjml2html from 'mjml';
import fs from 'fs';
import path from 'path';

describe('MJML template rendering', () => {
  it('renders booking_reminder template', () => {
    const mjml = fs.readFileSync(path.join(__dirname, '../src/templates/mjml/booking_reminder.mjml'), 'utf8');
    const html = mjml2html(mjml);
    expect(html.html).toContain('Booking Reminder');
  });
});
