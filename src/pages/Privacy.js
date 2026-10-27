import { Link } from 'react-router-dom';
import LegalPage from '../components/LegalPage';

export default function Privacy() {
  return (
    <LegalPage kicker="Legal" title="Privacy policy" updated="27 October 2026">
      <p>
        This policy describes how PingList.io (“we”, “us”) handles personal data on the site and
        in the CRM.
      </p>

      <h2>1. Who we are</h2>
      <p>
        PingList.io is the controller for account and site data. For lead records you submit about
        your own prospects, you are typically the controller and we process that data on your
        instructions to provide the Service. Contact: hello@pinglist.io.
      </p>

      <h2>2. Data we collect</h2>
      <ul>
        <li>
          <strong>Account data.</strong> Name, email, password hash, and login timestamps when you
          register.
        </li>
        <li>
          <strong>Billing data.</strong> Subscription status, period dates, invoice amounts, and
          payment references from our payment processor. We do not store full card numbers on our
          servers.
        </li>
        <li>
          <strong>Lead data.</strong> Contacts, notes, stages, and files you or your teammates
          enter.
        </li>
        <li>
          <strong>Site data.</strong> Messages sent through the contact form, and technical logs
          such as IP address, browser type, and security events.
        </li>
        <li>
          <strong>Cookies.</strong> A session cookie or token so you stay signed in. We do not use
          advertising cookies on this site.
        </li>
      </ul>

      <h2>3. Why we use it</h2>
      <p>We process personal data to:</p>
      <ul>
        <li>create and secure your account;</li>
        <li>run your workspace and store the leads your team enters;</li>
        <li>take payment, issue invoices, and show billing in your login;</li>
        <li>reply to support and contact-form messages;</li>
        <li>keep the Service safe, debug faults, and meet legal duties.</li>
      </ul>
      <p>
        Legal bases (where GDPR or similar law applies) include contract (to provide the Service),
        legitimate interests (security and product operations), and legal obligation (tax and
        accounting records).
      </p>

      <h2>4. Processors and sharing</h2>
      <p>
        We share data only with providers needed to run the Service: hosting, email delivery, and a
        payment processor for checkout and receipts. They may process data only on our instructions.
        We do not sell personal data. We may disclose information if required by law or to protect
        the Service and our users.
      </p>

      <h2>5. Lead records</h2>
      <p>
        Lead records and notes are stored so authorised users on your account can see them. You are
        responsible for the personal data your team submits and for having a lawful basis to store
        it.
      </p>

      <h2>6. Retention</h2>
      <p>
        Account and billing records are kept for the life of the account and for a further period
        required for tax and disputes. Workspace data is kept while the subscription is active, then
        deleted or anonymised after a reasonable wind-down unless the law requires a longer hold.
        Contact-form messages are kept only as long as needed to respond.
      </p>

      <h2>7. Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct, delete, or export your
        personal data, to object to or restrict certain processing, and to withdraw consent where
        processing is based on consent. Email hello@pinglist.io. You may also complain to
        your local data protection authority.
      </p>

      <h2>8. Security and transfers</h2>
      <p>
        We use encryption in transit, access controls, and hashed passwords. No method of
        transmission is perfectly secure. If we transfer data internationally, we use appropriate
        safeguards required by applicable law.
      </p>

      <h2>9. Children</h2>
      <p>The Service is for business users. It is not directed at children under 16.</p>

      <h2>10. Changes</h2>
      <p>
        We will update this policy when our practices change. The date at the top will move. Material
        changes will be noted on the site or by email to the account address where required.
      </p>

      <h2>11. Contact</h2>
      <p>
        pinglist.io · hello@pinglist.io. See also our{' '}
        <Link to="/terms">Terms and conditions</Link>.
      </p>
    </LegalPage>
  );
}
