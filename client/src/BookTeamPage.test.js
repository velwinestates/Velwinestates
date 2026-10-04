import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import BookTeamPage from './BookTeamPage';

function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Alex Farmer' } });
  fireEvent.change(screen.getByLabelText('Contact Number'), { target: { value: '9876543210' } });
  fireEvent.change(screen.getByLabelText('Service Required'), { target: { value: 'Plantation' } });
  fireEvent.change(screen.getByLabelText('Farm Address or Village'), { target: { value: 'Greenfield, North District' } });
}

describe('BookTeamPage', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('submits booking and preferred contact details as multipart data', async () => {
    global.fetch.mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    render(<BookTeamPage />);
    fillRequiredFields();
    fireEvent.change(screen.getByLabelText('Preferred Contact Method'), { target: { value: 'WhatsApp' } });
    fireEvent.change(screen.getByLabelText('Best Time to Contact (optional)'), { target: { value: 'Evening' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit Booking Request' }));

    expect(await screen.findByText(/team booking request has been submitted successfully/i)).toBeInTheDocument();
    const [, request] = global.fetch.mock.calls[0];
    expect(request.method).toBe('POST');
    expect(request.body.get('formType')).toBe('Book My Team');
    const extra = JSON.parse(request.body.get('extra'));
    expect(extra['Preferred Contact Method']).toBe('WhatsApp');
    expect(extra['Preferred Contact Time']).toBe('Evening');
  });

  it('shows validation errors returned by the backend', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Name, phone, service, and farm address are required.' })
    });
    render(<BookTeamPage />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole('button', { name: 'Submit Booking Request' }));

    await waitFor(() => expect(screen.getByText('Name, phone, service, and farm address are required.')).toBeInTheDocument());
  });

  it('requires an email address when email contact is selected', () => {
    render(<BookTeamPage />);
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(screen.getByLabelText('Preferred Contact Method'), { target: { value: 'Email' } });

    expect(emailInput).toBeRequired();
  });
});